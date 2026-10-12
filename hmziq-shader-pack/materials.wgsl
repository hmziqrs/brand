// hmziq texture lab — original procedural materials, no image textures.
// One fullscreen triangle, 256-byte uniform. Render to rgba8unorm/bgra8unorm.
// Fragment output is display-encoded sRGB. See README for native wgpu usage.
struct Layer {
  shape: vec4f, // algorithm, scale, distortion, detail
  surface: vec4f, // direction radians, seed, density, speed
  tone: vec4f, // contrast, balance, grain, reserved
};
struct Params {
  viewport: vec4f, // width, height, time, output: beauty/height/normal/mask
  mixing: vec4f, // amount, mode, exposure, saturation
  light: vec4f, // relief, direction, vignette, roughness
  dark: vec4f,
  mid: vec4f,
  bright: vec4f,
  view: vec4f, // offset x, offset y, zoom, split (-1 = off)
  finish: vec4f, // global grain, light intensity, reserved, reserved
  a: Layer,
  b: Layer,
  reserved0: vec4f,
  reserved1: vec4f,
};
@group(0) @binding(0) var<uniform> u: Params;
const PI: f32 = 3.14159265359;
const TAU: f32 = 6.28318530718;
fn hash11(p: vec2f) -> f32 {
  let v = vec2u(bitcast<u32>(i32(floor(p.x))), bitcast<u32>(i32(floor(p.y))));
  var n = (v.x * 1597334677u) ^ (v.y * 3812015801u);
  n = (n ^ (n >> 16u)) * 2246822519u;
  n = (n ^ (n >> 13u)) * 3266489917u;
  n = n ^ (n >> 16u);
  return f32(n) / 4294967295.0;
}
fn hash22(p: vec2f) -> vec2f { return vec2f(hash11(p), hash11(p + vec2f(91, 713))); }
fn noise(p: vec2f) -> f32 {
  let i = floor(p); let f = fract(p); let q = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  return mix(mix(hash11(i), hash11(i + vec2f(1,0)), q.x), mix(hash11(i + vec2f(0,1)), hash11(i + vec2f(1,1)), q.x), q.y);
}
fn rotate(p: vec2f, a: f32) -> vec2f { return vec2f(cos(a)*p.x-sin(a)*p.y, sin(a)*p.x+cos(a)*p.y); }
fn fbm(p0: vec2f, octaves: i32) -> f32 {
  var p = p0; var sum = 0.0; var amp = 0.5; var norm = 0.0;
  for (var i=0; i<6; i++) {
    if i >= octaves { break; }
    sum += noise(p) * amp; norm += amp;
    p = rotate(p, 0.53) * 2.07 + vec2f(13.7, 3.2); amp *= 0.49;
  }
  return sum / norm;
}
fn ridged(p0: vec2f, octaves: i32) -> f32 {
  var p=p0; var sum=0.0; var amp=0.5; var norm=0.0;
  for(var i=0;i<5;i++) {
    if i >= octaves { break; }
    sum += (1.0-abs(noise(p)*2.0-1.0))*amp; norm+=amp;
    p=rotate(p,0.37)*2.14+vec2f(7.1,3.7);amp*=0.5;
  }
  return sum/norm;
}
// F1, distance to nearest cell boundary (F2-F1), cell identity.
fn cells(p: vec2f) -> vec3f {
  let base=floor(p); let f=fract(p); var first=9.0; var second=9.0; var identity=0.0;
  for(var y=-1;y<=1;y++){for(var x=-1;x<=1;x++){
    let g=vec2f(f32(x),f32(y));let rnd=hash22(base+g);let d=length(g+rnd-f);
    if d<first {second=first;first=d;identity=rnd.x;} else if d<second {second=d;}
  }}
  return vec3f(first,second-first,identity);
}
// Nearest feature point: displacement XY, cell identity, radial distance.
fn cell_point(p: vec2f) -> vec4f {
  let base=floor(p);let f=fract(p);var result=vec4f(0,0,0,9);
  for(var y=-1;y<=1;y++){for(var x=-1;x<=1;x++){
    let g=vec2f(f32(x),f32(y));let rnd=hash22(base+g);
    let delta=f-g-rnd;let dist=length(delta);
    if dist<result.w {result=vec4f(delta,rnd.x,dist);}
  }}
  return result;
}
// Sparse rounded line segments. R is the core, G its offset reflective edge.
fn strokes(p: vec2f,spread: f32,width: f32,aa: f32) -> vec2f {
  let base=floor(p);let f=fract(p);var core=0.0;var edge=0.0;
  for(var y=-1;y<=1;y++){for(var x=-1;x<=1;x++){
    let g=vec2f(f32(x),f32(y));let rnd=hash22(base+g+vec2f(83,127));
    let angle=(rnd.x-0.5)*spread;
    let v=rotate(f-g-rnd,-angle);
    let len=0.13+rnd.y*0.43;
    let wobble=sin(v.x*4.0+rnd.x*TAU)*0.009*spread;
    let tip=max(abs(v.x)-len,0.0);
    let d=length(vec2f(tip,v.y+wobble));
    let d2=length(vec2f(tip,v.y+wobble-width*2.8));
    let fade=0.5+0.5*rnd.y;
    core=max(core,(1.0-smoothstep(width,width+aa,d))*fade);
    edge=max(edge,(1.0-smoothstep(width*0.5,width+aa,d2))*fade);
  }}
  return vec2f(core,edge);
}

// Returns height, pigment/light field, metallic response.
fn material(pos: vec2f, layer: Layer) -> vec3f {
  let mode=i32(layer.shape.x+0.5);
  let detail=i32(clamp(layer.shape.w,2.0,6.0));
  let seed=layer.surface.y;
  let density=layer.surface.z;
  let time=u.viewport.z*layer.surface.w;
  let p=rotate(pos*layer.shape.y,layer.surface.x)+vec2f(seed*0.173,seed*0.397)+vec2f(time*0.035,time*0.021);
  let distortion=layer.shape.z;
  let warp=vec2f(fbm(p*0.62+vec2f(5.2,1.3),3),fbm(p*0.62+vec2f(1.1,9.2),3))-0.5;
  let q=p+warp*distortion*2.7;
  var height=0.5;var tone=0.5;var metal=0.3;
  switch mode {
    // Rust blooms over fine, pitted substrate. Rough fronts, smooth metal islands.
    case 0: {
      let local=p+warp*distortion*0.65;
      let coarse_field=fbm(local*2.5,detail);
      let micro=fbm(p*27.0+warp*0.2,3);
      let spread=smoothstep(0.35,0.64,coarse_field+0.10*(micro-0.5));
      let pits=cells(p*(18.0+density*17.0));
      let pock=1.0-smoothstep(0.07,0.24,pits.x);
      let crust=ridged(p*10.5,4);
      height=0.30+spread*0.16+crust*0.065-pock*0.026;
      tone=0.17+spread*0.67+(micro-0.5)*0.30-pock*0.11;
      metal=mix(0.4,0.025,spread);
    }
    // Long, anisotropic brushed striations under a broad travelling reflection.
    case 1: {
      let bands=fbm(vec2f(q.x*0.17,q.y*(3.0+density*3.0)),detail);
      let brush=noise(vec2f(q.x*0.75,q.y*(160.0+density*90.0)));
      let hair=noise(vec2f(q.x*4.0,q.y*610.0));
      let reflection=pow(0.5+0.5*sin(q.y*2.2+fbm(q*0.45,3)*5.0),3.0);
      height=0.3+bands*0.35+brush*0.065;
      tone=0.12+bands*0.36+reflection*0.5+(brush-0.5)*0.13+(hair-0.5)*0.05;
      metal=0.95;
    }
    // Wrinkled foil: sharp ridges and soft rolled folds at several scales.
    case 2: {
      let w=vec2f(fbm(q*0.55,detail),fbm(q*0.55+13.0,detail));
      let fold=sin(q.y*(3.0+density*2.0)+w.x*9.0+w.y*4.0);
      let crease=pow(1.0-abs(fold),6.0);
      height=0.34+fold*0.19+ridged(q*2.0,4)*0.27;
      tone=0.18+(fold*0.5+0.5)*0.38+crease*0.27+fbm(q*6.0,3)*0.18;
      metal=1.0;
    }
    // Fractured mineral plates with a dark network of uneven cracks.
    case 3: {
      let c=cells(q*(2.5+density*2.5));
      let crack=smoothstep(0.01,0.08,c.y);
      let speck=fbm(q*38.0,detail);
      height=crack*(0.36+c.z*0.3)+speck*0.12;
      tone=0.09+crack*(0.2+c.z*0.45)+(speck-0.5)*0.21;
      metal=0.42+0.35*c.z;
    }
    // Warped strata. Continuous sediment, not geometric contour primitives.
    case 4: {
      let strata=q.y*(6.0+density*5.0)+fbm(q*0.65,detail)*7.0;
      let band=0.5+0.5*sin(strata*TAU);
      let silt=fbm(q*24.0,3);
      let narrow=pow(band,14.0);
      height=0.35+band*0.15+fbm(q*1.9,detail)*0.24;
      tone=0.18+band*0.32+narrow*0.18+(silt-0.5)*0.15;
      metal=0.18;
    }
    // Woven interference, a dense cross-modulated lattice of fibers.
    case 5: {
      let phase=q.x*(15.0+density*19.0)+sin(q.y*2.0)*distortion;
      let a=sin(phase+fbm(q*0.4,detail)*4.0);
      let b=sin(q.y*(16.3+density*17.0)+q.x*1.7+cos(q.x*1.3)*distortion);
      let weave=a*b;
      let envelope=0.5+0.5*sin(q.x*1.3+q.y*0.7+weave*2.0);
      height=0.48+weave*0.11;
      tone=0.18+envelope*0.48+weave*0.16;
      metal=0.65;
    }
    // Refracted caustic network. Smooth, bright cellular wavefronts.
    case 6: {
      let c=cells(q*(2.0+density*2.0));
      let d=cells(rotate(q,-0.3)*(3.1+density*1.0)+vec2f(11.0,7.0));
      let a=pow(1.0-clamp(c.y*3.8,0.0,1.0),8.0);
      let b=pow(1.0-clamp(d.y*4.0,0.0,1.0),10.0);
      height=fbm(q*1.3,detail)*0.6+c.x*0.18;
      tone=0.10+fbm(q*0.7,3)*0.24+a*0.58+b*0.28;
      metal=0.8;
    }
    // Flowing etched fibers with variable thickness, distinct from brushed alloy.
    case 7: {
      let flow=fbm(q*0.8,detail)*4.5+fbm(q*2.2,3)*0.9;
      let phase=q.y*(22.0+density*25.0)+flow*(1.0+distortion*0.4);
      let fiber=pow(0.5+0.5*sin(phase),8.0);
      let shoulder=0.5+0.5*sin(phase+0.7);
      let broad=fbm(q*0.45,3);
      height=0.32+shoulder*0.08+broad*0.28;
      tone=0.1+broad*0.3+fiber*(0.25+broad*0.3);
      metal=0.75;
    }
    // Matte powder, useful as either a quiet material or a mixing layer.
    case 8: {
      let coarse=fbm(q*4.0,detail);
      let dust=hash11(q*(300.0+density*180.0));
      let clumps=noise(q*85.0);
      height=0.35+coarse*0.2+clumps*0.045;
      tone=0.2+coarse*0.44+(dust-0.5)*0.19+(clumps-0.5)*0.14;
      metal=0.02;
    }
    // Directional reflected light: layered streaks through a textured optical field.
    case 9: {
      let bend=p.y*(1.0+p.x*0.018)+fbm(p*0.32,3)*distortion*0.5;
      let bands=fbm(vec2f(p.x*0.12,bend*(7.0+density*5.0)),detail);
      let beams=pow(bands,4.0)*2.5;
      let streak=pow(noise(vec2f(p.x*0.11,bend*(44.0+density*25.0))),16.0);
      let wash=fbm(vec2f(p.x*0.25,bend*1.3),3);
      height=0.4+bands*0.2;
      tone=0.12+wash*0.43+beams*0.7+streak*0.34;
      metal=0.58;
    }
    // Sintered ceramic: smooth porous hollows, thick rims and fine pinholes.
    case 10: {
      let pore=cells(q*(3.0+density*3.0));
      let micro=cells(q*(19.0+density*6.0)+17.0);
      let body=smoothstep(0.08,0.65,pore.x);
      let rim=exp(-pow((pore.x-0.51)*8.0,2.0));
      let pin=(1.0-smoothstep(0.06,0.18,micro.x))*0.1;
      let chalk=fbm(q*34.0,detail);
      height=0.24+body*0.35+rim*0.025-pin*0.35;
      tone=0.18+body*0.56+rim*0.15-pin+(chalk-0.5)*0.1;
      metal=0.05;
    }
    // Hand-hammered finish: broad overlapping impressions and tiny tool marks.
    case 11: {
      let c=cells(q*(5.0+density*4.0));
      let d=cells(rotate(q,0.8)*(7.0+density*2.0)+31.0);
      let dimples=pow(clamp(c.x,0.0,1.0),0.65);
      let fine=fbm(q*30.0,detail);
      height=0.3+dimples*0.21+d.x*0.055+(fine-0.5)*0.025;
      tone=0.18+dimples*0.30+c.z*0.17+fbm(q*0.9,3)*0.20;
      metal=0.98;
    }
    // Ink wash: nested domain advection creates pools, feathering and filaments.
    case 12: {
      let advect=vec2f(fbm(q*0.9,detail),fbm(q*0.9+vec2f(9,7),detail));
      let flow=q+advect*(1.4+distortion*2.0);
      let ink=fbm(flow*(1.7+density),detail);
      let eddy=fbm(flow*4.0+advect*3.0,detail);
      let body=smoothstep(0.24,0.73,ink+(eddy-0.5)*0.18);
      let feather=pow(1.0-abs(eddy*2.0-1.0),7.0);
      height=0.38+body*0.08;
      tone=0.10+body*0.79+(feather-0.5)*0.09;
      metal=0.02;
    }
    // Frost: intersecting, directionally stretched crystal ridges and cloudy ice.
    case 13: {
      let crystal=q*(1.2+density*0.55);
      let a=ridged(vec2f(crystal.x*14.0,crystal.y*1.4),detail);
      let turned=rotate(crystal,1.0472);
      let b=ridged(vec2f(turned.x*18.0,turned.y*1.6),detail);
      let turned2=rotate(crystal,-1.0472);
      let c=ridged(vec2f(turned2.x*11.0,turned2.y*1.2),detail);
      let needles=pow(clamp(max(a,max(b,c)),0.0,1.0),7.0);
      let cloud=fbm(q*1.3,detail);
      height=0.28+cloud*0.16+needles*0.055;
      tone=0.1+cloud*0.35+needles*1.3;
      metal=0.6;
    }
    // Terrazzo: inset polygonal aggregate with a second population of fine chips.
    case 14: {
      let stone=cells((p+warp*distortion*0.35)*(5.0+density*4.0));
      let tiny=cells(q*(27.0+density*9.0)+73.0);
      let chip=smoothstep(0.065,0.10,stone.y)*smoothstep(0.18,0.28,stone.z);
      let grit=smoothstep(0.14,0.20,tiny.y)*smoothstep(0.6,0.7,tiny.z);
      let dust=fbm(p*65.0,detail);
      height=0.40+chip*0.012+grit*0.003+(dust-0.5)*0.007;
      tone=mix(0.87,0.08+stone.z*0.49,chip)-grit*0.28+(dust-0.5)*0.07;
      metal=0.12+chip*0.25;
    }
    // Liquid chrome: coherent low-frequency surface and narrow reflected lobes.
    case 15: {
      let flow=vec2f(fbm(q*0.55,detail),fbm(q*0.55+vec2f(3,19),detail));
      let liquid=q+flow*(1.0+distortion*2.4);
      let swell=fbm(liquid*(0.9+density*0.6),detail);
      let curvature=sin(swell*13.0+liquid.y*0.7);
      let reflection=pow(0.5+0.5*cos(swell*18.0+liquid.x*0.4),9.0);
      height=0.3+swell*0.4+curvature*0.07;
      tone=0.1+(curvature*0.5+0.5)*0.44+reflection*0.50;
      metal=1.0;
    }
    // Wind-shaped dunes: asymmetric crests, sheltered slopes and windblown grains.
    case 16: {
      let flow=fbm(q*0.55,detail);
      let phase=q.y*(3.0+density*3.0)+flow*(4.0+distortion*2.0);
      let wave=0.5+0.5*sin(phase);
      let dune=pow(wave,2.4);
      let ripples=sin(phase*11.0+fbm(q*2.0,3)*3.0)*0.5+0.5;
      let dust=hash11(p*700.0);
      height=0.3+dune*0.24+ripples*0.009;
      tone=0.22+dune*0.49+(ripples-0.5)*0.12+(dust-0.5)*0.07;
      metal=0.025;
    }
    // Halftone: area-modulated print dots on a gently distressed paper field.
    case 17: {
      let freq=15.0+density*17.0;
      let grid=rotate(p,0.7854)*freq;
      let cell=floor(grid);
      let center=rotate((cell+0.5)/freq,-0.7854);
      let field=fbm(center*1.6+warp*distortion*1.2,detail);
      let radius=0.09+smoothstep(0.25,0.75,field)*0.57;
      let edge=max(0.015,freq*3.0/u.viewport.y);
      let dots=1.0-smoothstep(radius-edge,radius+edge,length(fract(grid)-0.5));
      let paper=fbm(p*45.0,3);
      height=0.4+dots*0.005;
      tone=0.06+dots*0.86+(paper-0.5)*0.045;
      metal=0.0;
    }
    // Cut timber: irregular seasonal rings, radial vessels and latewood bands.
    case 18: {
      let center=hash22(vec2f(seed,seed+13.0))*2.4-1.2;
      let wood=rotate(pos*layer.shape.y,layer.surface.x)-center;
      let radial=length(wood*vec2f(1.0,1.12)+warp*distortion*0.9);
      let growth=radial*(6.0+density*6.0)+fbm(wood*2.0+seed*0.11,detail)*distortion*2.0;
      let latewood=pow(0.5+0.5*sin(growth*TAU),12.0);
      let fibers=fbm(vec2f(radial*85.0,atan2(wood.y,wood.x)*12.0),detail);
      let vessels=pow(noise(wood*110.0),12.0);
      height=0.38+latewood*0.035+fibers*0.025;
      tone=0.7-latewood*0.4+(fibers-0.5)*0.22-vessels*0.19;
      metal=0.02;
    }
    // Linen: alternating over-under yarns with slubs and individual filaments.
    case 19: {
      let cloth=(p+warp*distortion*0.18)*(12.0+density*12.0);
      let cell=floor(cloth);let f=fract(cloth);
      let over=((i32(cell.x)+i32(cell.y)) & 1)==0;
      let across=select(f.x,f.y,over);let along=select(f.y,f.x,over);
      let yarn=pow(max(0.0,cos((across-0.5)*PI)),0.6);
      let bend=0.72+0.28*sin(along*PI);
      let filament=sin(across*TAU*8.0+noise(p*5.0)*2.0);
      let slub=fbm(p*14.0,detail);
      height=0.3+yarn*bend*0.085+filament*0.002;
      tone=0.18+yarn*bend*0.46+(slub-0.5)*0.22+filament*0.045;
      metal=0.015;
    }
    // Carbon twill: two-over/two-under bundles with a diagonal weave repeat.
    case 20: {
      let cloth=rotate(p+warp*distortion*0.1,0.7854)*(8.0+density*8.0);
      let cell=floor(cloth);let f=fract(cloth);
      let over=((i32(cell.x)-i32(cell.y)) & 3)<2;
      let across=select(f.x,f.y,over);let along=select(f.y,f.x,over);
      let bundle=pow(max(0.0,sin(across*PI)),0.42);
      let filaments=0.5+0.5*sin(across*TAU*10.0);
      let reflection=pow(0.5+0.5*sin(p.x*0.85+p.y*0.55+select(0.0,1.4,over)),4.0);
      let resin=fbm(q*3.0,detail);
      height=0.35+bundle*0.035+(sin(along*PI))*0.006+filaments*0.0007;
      tone=0.08+bundle*0.22+reflection*bundle*0.36+filaments*0.065+(resin-0.5)*0.07;
      metal=0.92;
    }
    // Leather: padded irregular pebbles, shallow seams and fine pores.
    case 21: {
      let local=p+warp*distortion*0.3;
      let c=cells(local*(13.0+density*10.0));
      let dome=smoothstep(0.0,0.21,c.y);
      let pores=pow(noise(q*170.0),8.0);
      let wrinkles=ridged(local*1.9,detail);
      height=0.38+dome*0.035+wrinkles*0.025-pores*0.006;
      tone=0.18+dome*0.26+wrinkles*0.16+c.z*0.1-pores*0.12;
      metal=0.09;
    }
    // Creased paper: intersecting piecewise-planar folds, plus soft pulp detail.
    case 22: {
      let paper=p+warp*distortion*0.35;
      var folds=0.0;var crease=1.0;
      for(var i=0;i<6;i++){
        let rnd=hash22(vec2f(f32(i)+seed,41.0));
        let axis=vec2f(cos(rnd.x*TAU),sin(rnd.x*TAU));
        let phase=dot(paper,axis)*(0.7+rnd.y*2.7)*(0.7+density*0.3)+rnd.x*11.0;
        let fold=abs(fract(phase)-0.5);
        folds+=fold*(0.14+0.08*rnd.x);
        crease=min(crease,fold);
      }
      let pulp=fbm(p*45.0,detail);
      height=0.2+folds+(pulp-0.5)*0.002;
      tone=0.67+(folds-0.28)*0.2-exp(-crease*170.0)*0.03+(pulp-0.5)*0.045;
      metal=0.01;
    }
    // Enamel worn by irregular, broken scratch tracks with reflective edges.
    case 23: {
      let freq=4.0+density*4.0;
      let marks=strokes(p*freq,0.25+distortion*2.0,0.0025,max(0.001,freq*3.0/u.viewport.y));
      let orange_peel=fbm(q*23.0,detail);
      let reflection=pow(0.5+0.5*sin(p.y*1.7+fbm(q*0.8,3)*3.0),5.0);
      height=0.4+(orange_peel-0.5)*0.009-marks.x*0.013;
      tone=0.12+reflection*0.18+(orange_peel-0.5)*0.12+marks.x*0.32+marks.y*0.34;
      metal=0.72;
    }
    // Mica: densely packed tilted facets with sparse, sharp glitter reflections.
    case 24: {
      let c=cell_point(q*(11.0+density*8.0));
      let tilt=vec2f(cos(c.z*TAU),sin(c.z*TAU));
      let facet=dot(c.xy,tilt);
      let gleam=pow(0.5+0.5*sin(c.z*TAU+p.x*0.23+p.y*0.1),15.0);
      let small=cells(q*(39.0+density*17.0)+53.0);
      let grit=fbm(q*63.0,detail);
      height=0.39+facet*0.018+small.z*0.002;
      tone=0.08+c.z*0.18+gleam*0.70+facet*0.15+(grit-0.5)*0.12;
      metal=0.95;
    }
    // Cooled lava: rough basalt slabs separated by narrow, bright fissures.
    case 25: {
      let rock=cells(q*(1.8+density*1.9));
      let fracture=1.0-smoothstep(0.012,0.07,rock.y);
      let crust=ridged(q*13.0,detail);
      let rope=pow(0.5+0.5*sin(q.x*19.0+fbm(q*3.0,3)*16.0),6.0);
      let ash=fbm(q*49.0,3);
      height=0.35+crust*0.075+rope*0.012-fracture*0.07;
      tone=0.16+crust*0.23+ash*0.12+rope*0.04+fracture*(0.60+rock.z*0.24);
      metal=0.18;
    }
    // Condensation: scattered raised lenses and their small offset highlights.
    case 26: {
      let freq=4.0+density*3.0;
      let c=cell_point((p+warp*distortion*0.22)*freq);
      let radius=0.11+c.z*0.25;
      let r=c.w/radius;
      let coverage=(1.0-smoothstep(0.91,1.0,r))*smoothstep(0.2,0.27,c.z);
      let dome=sqrt(max(0.0,1.0-r*r))*coverage;
      let rim=exp(-pow((r-0.86)*17.0,2.0))*coverage;
      let highlight=exp(-dot(c.xy/radius+vec2f(0.29,0.31),c.xy/radius+vec2f(0.29,0.31))*58.0)*coverage;
      let backdrop=fbm(q*1.1+c.xy*dome*1.3,detail);
      height=0.38+dome*0.13;
      tone=0.20+backdrop*0.25-dome*0.11+rim*0.17+highlight*0.67;
      metal=0.78;
    }
    // Optical coating: overlapping interference frequencies through a warped film.
    case 27: {
      let flow=vec2f(fbm(q*0.55,detail),fbm(q*0.55+vec2f(21,6),detail));
      let film=fbm(q*0.82+flow*(2.0+distortion*2.1),detail);
      let thickness=film*(7.0+density*7.0);
      let fringe=sin(thickness*3.0)*0.26+sin(thickness*6.7+0.6)*0.15+cos(thickness*11.0)*0.06;
      height=0.33+film*0.19;
      tone=0.5+fringe;
      metal=0.84;
    }
    // Labyrinth: interacting wave fields form smooth, raised wandering tracks.
    case 28: {
      let v=q*(9.0+density*5.0);
      let field=sin(v.x+cos(v.y*0.72))+cos(v.y+sin(v.x*0.63));
      let ridge=exp(-pow(field*2.9,2.0));
      let fine=fbm(q*38.0,detail);
      height=0.33+ridge*0.10+(fine-0.5)*0.003;
      tone=0.12+ridge*0.65+(fine-0.5)*0.08;
      metal=0.6;
    }
    // Handmade paper: mixed short and long fibers in an uneven pulp sheet.
    case 29: {
      let freq=8.0+density*5.0;
      let fibers=strokes(q*freq,6.0,0.004,max(0.001,freq*3.0/u.viewport.y));
      let fine=strokes(rotate(p,0.83)*freq*2.4,4.5,0.004,max(0.001,freq*7.2/u.viewport.y));
      let pulp=fbm(q*5.0,detail);
      height=0.4+(pulp-0.5)*0.02+fibers.x*0.003-fine.x*0.002;
      tone=0.57+(pulp-0.5)*0.48+fibers.x*0.19-fine.x*0.20;
      metal=0.015;
    }
    default: {height=0.5;tone=0.5;metal=0.0;}
  }
  let grain=(hash11(p*540.0)-0.5)*layer.tone.z*0.28;
  tone=(tone-0.5)*layer.tone.x+0.5+layer.tone.y+grain;
  return vec3f(height,clamp(tone,0.0,1.0),metal);
}
fn blend(a: f32, b: f32, mode: i32) -> f32 {
  switch mode {
    case 1: { return a*b; }
    case 2: { return 1.0-(1.0-a)*(1.0-b); }
    case 3: { return select(2.0*a*b,1.0-2.0*(1.0-a)*(1.0-b),a>0.5); }
    case 4: { return (1.0-2.0*b)*a*a+2.0*b*a; }
    case 5: { return abs(a-b); }
    default: { return b; }
  }
}
fn ramp(t0: f32) -> vec3f {
  let t=clamp(t0,0.0,1.0);
  let lower=mix(u.dark.rgb,u.mid.rgb,smoothstep(0.03,0.63,t));
  return mix(lower,u.bright.rgb,smoothstep(0.57,1.0,t));
}
@vertex fn vs_main(@builtin(vertex_index) i: u32) -> @builtin(position) vec4f {
  let p=array<vec2f,3>(vec2f(-1,-1),vec2f(3,-1),vec2f(-1,3));
  return vec4f(p[i],0,1);
}
@fragment fn fs_main(@builtin(position) frag: vec4f) -> @location(0) vec4f {
  let screen=frag.xy/u.viewport.xy;
  let p=(frag.xy-u.viewport.xy*0.5)/u.viewport.y*3.0/max(u.view.z,0.1)+u.view.xy;
  let a=material(p,u.a);
  var field=a;
  if u.mixing.x>0.0001 {
    let b=material(p,u.b);
    field=vec3f(mix(a.x,b.x,u.mixing.x),mix(a.y,blend(a.y,b.y,i32(u.mixing.y+0.5)),u.mixing.x),mix(a.z,b.z,u.mixing.x));
  }
  if u.view.w>=0.0 && screen.x<u.view.w {field=a;}
  // Derivatives are outside the uniformly selected material algorithms.
  let gradient=vec2f(dpdx(field.x),dpdy(field.x))*u.viewport.y/3.0;
  let normal=normalize(vec3f(-gradient*u.light.x,1.0));
  if u.viewport.w>0.5 && u.viewport.w<1.5 {return vec4f(vec3f(clamp(field.x,0.0,1.0)),1);}
  if u.viewport.w>1.5 && u.viewport.w<2.5 {return vec4f(normal*0.5+0.5,1);}
  if u.viewport.w>2.5 {return vec4f(vec3f(field.y),1);}
  let light=normalize(vec3f(cos(u.light.y)*0.65,sin(u.light.y)*0.65,0.8));
  let diffuse=max(0.0,dot(normal,light));
  let halfVector=normalize(light+vec3f(0,0,1));
  let shininess=mix(100.0,5.0,u.light.w);
  let spec=pow(max(0.0,dot(normal,halfVector)),shininess)*field.z*(1.0-u.light.w*0.72);
  var color=ramp(field.y);
  color*=mix(1.0,0.48+diffuse*0.72,u.finish.y);
  color+=u.bright.rgb*spec*u.finish.y*0.55;
  let radial=length((screen-0.5)*vec2f(1.0,0.8));
  color*=1.0-u.light.z*smoothstep(0.15,0.75,radial);
  let grain=(hash11((p+vec2f(91.4,5.1))*520.0)-0.5)*u.finish.x*0.16;
  color+=vec3f(grain);
  let luminance=dot(color,vec3f(0.2126,0.7152,0.0722));
  color=mix(vec3f(luminance),color,u.mixing.w)*exp2(u.mixing.z);
  return vec4f(clamp(color,vec3f(0),vec3f(1)),1);
}

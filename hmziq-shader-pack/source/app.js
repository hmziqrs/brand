'use strict';
const $=id=>document.getElementById(id),copy=o=>JSON.parse(JSON.stringify(o));
const shader=$('shader').textContent.trim();
const thumbs=JSON.parse($('thumbnails').textContent);
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
let state=copy(looks[0]),baseline=copy(state),activeLayer='a',gpu=null,playing=false,visible=true,frameId=0,lastTime=0,dirty=true,exporting=false,split=-1;
let saved=[];try{const v=JSON.parse(localStorage.getItem('hmziq-texture-looks')||'[]');if(Array.isArray(v))saved=v.slice(0,24).filter(x=>x&&x.a&&x.b&&Array.isArray(x.palette));}catch{}
const canvas=$('canvas');
const layerControls=[
 ['scale','Scale',.25,4,.01,v=>v.toFixed(2)+'×'],
 ['warp','Distortion',0,2,.01,v=>Math.round(v*100)+'%'],
 ['detail','Detail',2,6,1,v=>v+' octaves'],
 ['angle','Direction',-Math.PI,Math.PI,.01,v=>Math.round(v*180/Math.PI)+'°'],
 ['density','Density',.2,3,.01,v=>v.toFixed(2)+'×'],
 ['contrast','Contrast',.5,2.5,.01,v=>v.toFixed(2)+'×'],
 ['balance','Balance',-.4,.4,.01,v=>(v>0?'+':'')+v.toFixed(2)],
 ['grain','Material grain',0,1,.01,v=>Math.round(v*100)+'%'],
];
const finishControls=[
 ['relief','Relief',0,2.5,.01,v=>v.toFixed(2)],
 ['roughness','Roughness',0,1,.01,v=>Math.round(v*100)+'%'],
 ['lightAngle','Light direction',-Math.PI,Math.PI,.01,v=>Math.round(v*180/Math.PI)+'°'],
 ['lightIntensity','Lighting',0,1,.01,v=>Math.round(v*100)+'%'],
 ['grain','Finish grain',0,1,.01,v=>Math.round(v*100)+'%'],
 ['exposure','Exposure',-1,1,.01,v=>(v>0?'+':'')+v.toFixed(2)],
 ['saturation','Saturation',0,1.6,.01,v=>Math.round(v*100)+'%'],
 ['vignette','Edge shade',0,1,.01,v=>Math.round(v*100)+'%'],
];
const hexRGB=hex=>[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)/255);
function params(s,width,height,output=0,compare=-1){
 const a=l=>[l.mode,l.scale,l.warp,l.detail,l.angle,l.seed,l.density,l.speed,l.contrast,l.balance,l.grain,0];
 return new Float32Array([width,height,s.time,output,s.mix,s.blend,s.exposure,s.saturation,s.relief,s.lightAngle,s.vignette,s.roughness,...hexRGB(s.palette[0]),1,...hexRGB(s.palette[1]),1,...hexRGB(s.palette[2]),1,s.offsetX,s.offsetY,s.zoom,compare,s.grain,s.lightIntensity,0,0,...a(s.a),...a(s.b),0,0,0,0,0,0,0,0]);
}
function note(text,error=false){$('notice').textContent=text;$('notice').classList.toggle('error',error);}
function changed(){ $('edited').hidden=false; requestDraw(); }
function makeControls(container,defs,prefix,isLayer){
 for(const [key,label,min,max,step] of defs){const row=document.createElement('label');row.className='control';
  row.innerHTML='<span>'+label+'<output id="'+prefix+key+'-value"></output></span><input id="'+prefix+key+'" type="range" min="'+min+'" max="'+max+'" step="'+step+'">';container.append(row);
  $(prefix+key).addEventListener('input',()=>{(isLayer?state[activeLayer]:state)[key]=Number($(prefix+key).value);updateValues();changed();});
 }
}
function updateValues(){
 for(const [key,,, , ,format] of layerControls){$('l-'+key).value=state[activeLayer][key];$('l-'+key+'-value').value=format(state[activeLayer][key]);}
 for(const [key,,, , ,format] of finishControls){$('f-'+key).value=state[key];$('f-'+key+'-value').value=format(state[key]);}
 $('algorithm').value=String(state[activeLayer].mode);$('material-note').textContent=algorithms[state[activeLayer].mode].note;
 $('a-name').textContent=algorithms[state.a.mode].name;$('b-name').textContent=algorithms[state.b.mode].name;
 $('seed').value=state[activeLayer].seed;$('mix').value=state.mix;$('mix-value').value=Math.round(state.mix*100)+'%';$('blend').value=String(state.blend);
 for(let i=0;i<3;i++)$('color-'+i).value=state.palette[i];
 $('palette').value=Object.keys(palettes).find(k=>JSON.stringify(palettes[k])===JSON.stringify(state.palette))||'';
 $('speed').value=String(state.speed);$('time').value=state.time;$('time-value').value=state.time.toFixed(1)+' s';
 $('layer-a').setAttribute('aria-pressed',String(activeLayer==='a'));$('layer-b').setAttribute('aria-pressed',String(activeLayer==='b'));
}
function setLayer(which){activeLayer=which;updateValues();if(which==='b'&&state.mix===0)note('Layer B is at 0%. Increase its amount to see the mix.');}
function applyLook(next,keepPalette=false){
 const previousPalette=[...state.palette];state=copy(next);if(keepPalette)state.palette=previousPalette;baseline=copy(state);playing=false;lastTime=0;split=-1;activeLayer='a';
 $('compare').setAttribute('aria-pressed','false');$('compare-line').hidden=true;$('split-control').hidden=true;
 $('look-name').textContent=state.name;$('edited').hidden=true;$('play').textContent='Play';$('play').setAttribute('aria-pressed','false');
 document.querySelectorAll('.preset-card').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.id===state.id)));
 if(thumbs[state.id]){$('still').src=thumbs[state.id];$('still').alt=state.name+' texture preview';}
 if(gpu)note('Choose a starting point, then edit either layer.');
 canvas.setAttribute('aria-label',state.name+', procedural material. Adjust layers, blending, palette, and lighting with the controls.');
 updateValues();requestDraw();
}
function requestDraw(){dirty=true;if(!frameId)frameId=requestAnimationFrame(frame);}
function frame(time){
 frameId=0;if(!gpu)return;
 const moving=playing&&!reduced.matches&&visible&&!document.hidden;
 if(moving){if(lastTime)state.time=(state.time+Math.min((time-lastTime)/1000,.12)*state.speed)%60;lastTime=time;$('time').value=state.time;$('time-value').value=state.time.toFixed(1)+' s';}
 else lastTime=0;
 if(visible&&!document.hidden&&(dirty||moving)){gpu.render(state,canvas.width,canvas.height,Number($('output').value),split);dirty=false;}
 if(moving)frameId=requestAnimationFrame(frame);
}
class GPU {
 constructor(device,context,format){this.device=device;this.context=context;this.format=format;this.pipelines={};this.uniform=device.createBuffer({size:256,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});}
 async initialize(){
  const module=this.device.createShaderModule({code:shader,label:'Procedural materials'}),info=await module.getCompilationInfo();
  const errors=info.messages.filter(m=>m.type==='error');if(errors.length)throw new Error(errors.map(m=>'Line '+m.lineNum+': '+m.message).join('\n'));
  for(const format of new Set([this.format,'rgba8unorm'])){
   const pipeline=await this.device.createRenderPipelineAsync({layout:'auto',vertex:{module,entryPoint:'vs_main'},fragment:{module,entryPoint:'fs_main',targets:[{format}]},primitive:{topology:'triangle-list'}});
   const bind=this.device.createBindGroup({layout:pipeline.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.uniform}}]});this.pipelines[format]={pipeline,bind};
  }
 }
 render(s,width,height,output=0,compare=-1,texture=null,format=this.format,readback=null){
  this.device.queue.writeBuffer(this.uniform,0,params(s,width,height,output,compare));
  const target=texture||this.context.getCurrentTexture(),encoder=this.device.createCommandEncoder();
  const pass=encoder.beginRenderPass({colorAttachments:[{view:target.createView(),clearValue:[0,0,0,1],loadOp:'clear',storeOp:'store'}]});
  const {pipeline,bind}=this.pipelines[format];pass.setPipeline(pipeline);pass.setBindGroup(0,bind);pass.draw(3);pass.end();
  if(readback)encoder.copyTextureToBuffer({texture:target},{buffer:readback.buffer,bytesPerRow:readback.stride,rowsPerImage:height},[width,height]);
  this.device.queue.submit([encoder.finish()]);
 }
 async png(s,width,height,output=0){
  const stride=Math.ceil(width*4/256)*256,device=this.device;
  const texture=device.createTexture({size:[width,height],format:'rgba8unorm',usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_SRC});
  const buffer=device.createBuffer({size:stride*height,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});
  try{
   this.render(s,width,height,output,-1,texture,'rgba8unorm',{buffer,stride});await buffer.mapAsync(GPUMapMode.READ);
   const src=new Uint8Array(buffer.getMappedRange()),pixels=new Uint8ClampedArray(width*height*4);
   for(let y=0;y<height;y++)pixels.set(src.subarray(y*stride,y*stride+width*4),y*width*4);
   const c=document.createElement('canvas');c.width=width;c.height=height;c.getContext('2d').putImageData(new ImageData(pixels,width,height),0,0);
   return await new Promise((resolve,reject)=>c.toBlob(b=>b?resolve(b):reject(new Error('PNG encoding failed.')),'image/png'));
  }finally{buffer.unmap();buffer.destroy();texture.destroy();}
 }
}
function disableLive(disabled){document.querySelectorAll('.inspector input,.inspector select,.palette-row input,.palette-row select,#play,#time,#compare,#output,#export,#new-seed,#speed,#mono-dark,#mono-light,#reverse-palette,#keep-palette').forEach(el=>el.disabled=disabled);}
async function initialize(){
 disableLive(true);
 try{
  if(!navigator.gpu)throw new Error('This browser did not provide WebGPU.');
  const adapter=await navigator.gpu.requestAdapter({powerPreference:'high-performance'});if(!adapter)throw new Error('No WebGPU adapter is available.');
  const device=await adapter.requestDevice(),context=canvas.getContext('webgpu'),format=navigator.gpu.getPreferredCanvasFormat();
  if(!context)throw new Error('A WebGPU canvas could not be created.');context.configure({device,format,alphaMode:'opaque'});
  const renderer=new GPU(device,context,format);await renderer.initialize();gpu=renderer;
  device.addEventListener('uncapturederror',e=>{console.error(e.error.message);note('A GPU error occurred. Reduce preview quality or reopen the file.',true);});
  device.lost.then(()=>{gpu=null;playing=false;disableLive(true);$('still').hidden=false;$('backend').textContent='Static preview';note('The GPU connection was lost. Reopen the file to restore live controls.',true);});
  $('still').hidden=true;$('backend').textContent='WebGPU';document.querySelector('.render-status').classList.add('ready');disableLive(false);
  if(reduced.matches){$('play').disabled=true;note('Animation is off because your device requests reduced motion.');}
  else note('Choose a starting point, then edit either layer.');
  resize();requestDraw();
 }catch(error){$('backend').textContent='Static previews';note(error.message+' Preset images remain available. Live controls need WebGPU; try serving the file from localhost.',true);console.error(error.message);}
}
function resize(){
 const rect=$('stage').getBoundingClientRect(),q=Number($('quality').value),ratio=Math.min(devicePixelRatio||1,1.5)*q;
 canvas.width=Math.max(1,Math.round(rect.width*ratio));canvas.height=Math.max(1,Math.round(rect.height*ratio));$('dimensions').textContent=canvas.width+' × '+canvas.height;
 requestDraw();
}
function download(blob,name){const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),30000);}
function recipe(s=state,width=Number($('export-size').value),height=Math.round(width*canvas.height/canvas.width)){return {schema:'hmziq-material-v2',name:s.name,recipe:copy(s),uniformFloats:Array.from(params(s,width,height,Number($('output').value),-1)),uniformBytes:256,outputSize:[width,height],shader:'materials.wgsl',outputMap:Number($('output').value),colorSpace:'sRGB-encoded output to a non-sRGB render target',tileable:false};}
function jsonDownload(value,name){download(new Blob([JSON.stringify(value,null,2)],{type:'application/json'}),name);}
function validateRecipe(data){
 const s=data?.recipe;if(data.schema!=='hmziq-material-v2'||!s)throw new Error('Choose a recipe exported from this texture lab.');
 const clamp=(n,min,max)=>Math.max(min,Math.min(max,Number(n)));
 for(const side of ['a','b']){
  if(!s[side])throw new Error('The recipe is missing a layer.');
  for(const [key,,min,max]of layerControls){if(!Number.isFinite(s[side][key]))throw new Error('Invalid '+key+' value.');s[side][key]=clamp(s[side][key],min,max);}
  if(!Number.isInteger(s[side].mode)||s[side].mode<0||s[side].mode>=algorithms.length)throw new Error('Unknown material algorithm.');
  if(!Number.isFinite(s[side].seed))throw new Error('Invalid seed.');s[side].seed=clamp(s[side].seed,0,9999);s[side].speed=clamp(s[side].speed??.35,0,2);
 }
 for(const [key,,min,max]of finishControls){if(!Number.isFinite(s[key]))throw new Error('Invalid '+key+' value.');s[key]=clamp(s[key],min,max);}
 if(!Array.isArray(s.palette)||s.palette.length!==3||s.palette.some(x=>typeof x!=='string'||!/^#[\da-f]{6}$/i.test(x)))throw new Error('The palette must contain three hex colors.');
 for(const key of ['mix','blend','zoom','offsetX','offsetY','time','speed'])if(!Number.isFinite(s[key]))throw new Error('Invalid '+key+' value.');
 s.mix=clamp(s.mix,0,1);s.blend=Math.round(clamp(s.blend,0,5));s.zoom=clamp(s.zoom,.25,4);s.time=clamp(s.time,0,60);s.speed=clamp(s.speed,.25,2);s.offsetX=clamp(s.offsetX,-100,100);s.offsetY=clamp(s.offsetY,-100,100);
 s.name=String(data.name||s.name||'Imported look').slice(0,80);s.id=String(s.id||'imported').slice(0,80);return s;
}
function showSaved(){
 $('saved-section').hidden=!saved.length;$('saved-grid').textContent='';
 saved.forEach((s,i)=>{const b=document.createElement('button');b.className='saved-look';b.textContent=s.name;b.addEventListener('click',()=>{try{applyLook(validateRecipe({schema:'hmziq-material-v2',recipe:copy(s)}));}catch(e){note('This saved look could not be loaded.',true);}});$('saved-grid').append(b);});
}
const guide=`# hmziq Texture Lab

Original procedural materials inspired by the grain, directional reflections and textured color fields visible on voidzero.dev, viteplus.dev and rolldown.rs. No website image assets or shader source were copied. The brand document supplies the starting identity and oxide palette; this is a new material exploration, not a recreation of its rings or 3D scenes.

## Use
Open hmziq-shader-studio.html in a WebGPU-enabled browser. No network requests are needed. Select a starting look; edit Layer A or B; choose a blend mode and amount. Palette, lighting and finish apply to the result. Compare A / mix shows Layer A on the left and the composite on the right. With text adds editable sample copy for checking a section treatment. Export never includes that copy or the comparison split.

Static preset images appear if WebGPU is not available, and live controls are disabled explicitly. If local-file WebGPU is blocked, serve the folder: python3 -m http.server 8000. Then open http://localhost:8000/hmziq-shader-studio.html.

## Algorithms
0 Oxide corrosion: multi-scale corrosion fronts, cellular pitting and ridged crust.
1 Brushed alloy: anisotropic scratches, broad bands and directional reflection.
2 Folded foil: domain-warped folded surfaces and sharp creases.
3 Mineral fracture: Worley cells, F2-F1 cracks and granular plates.
4 Sediment: domain-warped strata and silt detail.
5 Interference weave: cross-modulated fibers and a low-frequency envelope.
6 Caustic glass: two warped cellular wavefront fields.
7 Etched silk: fine, flowing ridges over a broad surface.
8 Powder: coarse deposits, fine clumps and dense stochastic granulation.
9 Light sweep: anisotropic multi-scale beams through a grainy optical field.
10 Porous ceramic: smooth cellular hollows, broad rims and secondary pinholes.
11 Hammered metal: overlapping cellular dimples with fine tool marks.
12 Ink diffusion: nested domain advection, pigment pools and feathering.
13 Frost crystals: three directionally stretched ridged fields over cloudy ice.
14 Terrazzo: two populations of inset polygonal chips in a granular binder.
15 Liquid chrome: coherent warped swells and narrow reflected lobes.
16 Wind-shaped sand: asymmetric dune crests, fine ripples and grains.
17 Halftone print: area-modulated dot radii sampled on a rotated print grid.
18 End-grain wood: perturbed seasonal rings, radial fibers and sparse vessels.
19 Woven linen: alternating over-under yarns, slubs and individual filaments.
20 Carbon twill: two-over/two-under bundles, fine carbon strands and resin highlights.
21 Pebbled leather: rounded cellular grain, shallow seams and pores.
22 Creased paper: six seeded, intersecting piecewise-planar fold fields with fine pulp.
23 Scratched enamel: sparse rounded scratch segments with offset reflective edges.
24 Mica flakes: tilted nearest-cell facets, secondary grains and sharp glints.
25 Lava fissures: ridged basalt slabs, fine rope-like crust and bright cell boundaries.
26 Condensation: sparse rounded lenses, displaced substrate sampling and highlights.
27 Interference film: overlapping fringe frequencies driven by warped thickness.
28 Embossed labyrinth: nonlinear interacting wave fields form raised winding tracks.
29 Fibrous paper: two populations of short and long fibers in an irregular pulp field.

## Expanded collection
All previous 32 looks, their algorithm IDs and the 24 palettes are preserved. This texture-focused expansion adds 12 material algorithms and one starting look for each, for 44 looks and 30 algorithms total. Existing recipe files and saved looks still work. The New filter shows this latest batch, Previous shows the prior 20 additions, and Original shows the first 12 looks.

White on black and Black on white set neutral grayscale ramps. Reverse palette exchanges the shadow and light color stops, retaining the middle stop; it reverses the palette, not the final lit image. Lighting, finish grain and vignette remain independently adjustable. For a flat ink-on-paper treatment, reduce Lighting and Edge shade to zero.

Use All, New, Previous, Monochrome, or Original to filter the gallery. Keep palette when switching looks carries the current colors to the next preset; it is off by default. Gallery thumbnails always show the factory preset colors. The two monochrome quick buttons and Reverse palette apply to either built-in or custom colors.

These are procedural visual models, not physically accurate simulations. Blending combines pigment fields before palette mapping and linearly combines height and metallic response. This gives a useful material-mixing workflow; it is not a Photoshop RGB compositor. Normal maps are screen-space derivative normals derived from the procedural height.

## Native wgpu / WebGPU
Use materials.wgsl with entry points vs_main and fs_main. One fullscreen triangle: draw(3). No vertex buffers, samplers or textures. Group 0 / binding 0 is a 256-byte uniform buffer, visible to the fragment shader. All fields are vec4<f32> and aligned to 16 bytes. Recipe JSON includes 64 ready-to-upload float values.

vec4 slots (four floats per slot):
0 viewport: width, height, active time seconds, output map (0 surface / 1 height / 2 normal / 3 pigment).
1 mixing: B amount, blend mode (0 normal / 1 multiply / 2 screen / 3 overlay / 4 soft light / 5 difference), exposure in stops, saturation.
2 light: relief, direction radians, vignette, roughness.
3,4,5: shadow, midtone, highlight RGB, unused alpha 1.
6 view: offset x, offset y, zoom, comparison split (-1 off).
7 finish: global grain, light intensity, 0, 0.
8 layer A shape: mode, scale, distortion, octaves.
9 layer A surface: direction radians, seed, density, speed.
10 layer A tone: contrast, balance, grain, 0.
11,12,13: the same three vectors for layer B.
14,15: reserved zeros.

The shader emits display-encoded sRGB values into Rgba8Unorm/Bgra8Unorm. For an sRGB render target, convert the final RGB to linear before output, or render to a non-sRGB intermediate. Height, normal and pigment maps are data and must stay non-sRGB. PNG exports use 8 bits per channel; normal maps are RGB encoded from -1..1 into 0..1. Textures are opaque, not seamless/tileable, and should use clamp-to-edge.

Derivatives depend on export resolution and can alias on extremely fine structures. Choose the final output size first and use enough pixels for the intended use. These are background treatments; avoid repeating the PNG as a tile. A procedural shader can cover any viewport without seams from image repetition.

## Performance and motion
All work is in the fragment shader. High detail, mixed cellular materials and 4K exports are expensive; choose Fast preview while exploring. Animation is paused by default and when the tab or preview is hidden. Reduced-motion preferences disable playback; still editing remains available. Animation is a slow drift through the fields, not a guaranteed seamless loop.

Save look stores a recipe locally in this browser; Recipe JSON is the portable version. No data is sent anywhere. Preset gallery images are still snapshots of the original looks and do not change when the palette is edited.

References, visually inspected 2026-09-28:
https://voidzero.dev/
https://viteplus.dev/
https://rolldown.rs/
WGSL: https://gpuweb.github.io/gpuweb/wgsl/
wgpu shaders: https://wgpu.rs/doc/wgpu/documentation/shaders/index.html
`;
function wire(){
 makeControls($('layer-controls'),layerControls,'l-',true);makeControls($('finish-controls'),finishControls,'f-',false);
 algorithms.forEach((a,i)=>{const o=document.createElement('option');o.value=i;o.textContent=a.name;$('algorithm').append(o);});
 for(const name of Object.keys(palettes)){const o=document.createElement('option');o.value=name;o.textContent=name;$('palette').append(o);}
 for(const [index,preset] of looks.entries()){const b=document.createElement('button');b.className='preset-card';b.dataset.id=preset.id;b.dataset.collection=index<12?'original':index<32?'previous':'new';b.dataset.mono=String(preset.palette.every(c=>c.slice(1,3)===c.slice(3,5)&&c.slice(3,5)===c.slice(5,7)));b.setAttribute('aria-pressed',String(preset.id===state.id));b.setAttribute('aria-label','Load '+preset.name);const img=document.createElement('img');img.alt='';if(thumbs[preset.id])img.src=thumbs[preset.id];const name=document.createElement('span');name.textContent=preset.name;b.append(img,name);b.addEventListener('click',()=>applyLook(preset,$('keep-palette').checked));$('preset-grid').append(b);}
 document.querySelectorAll('[data-filter]').forEach(button=>button.onclick=()=>{
  const filter=button.dataset.filter;document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  document.querySelectorAll('.preset-card').forEach(b=>b.hidden=!(filter==='all'||filter===b.dataset.collection||filter==='mono'&&b.dataset.mono==='true'));
 });
 for(const [id,name]of [['mono-dark','White on black'],['mono-light','Black on white']])$(id).onclick=()=>{state.palette=[...palettes[name]];updateValues();changed();};
 $('reverse-palette').onclick=()=>{state.palette.reverse();updateValues();changed();};
 $('layer-a').onclick=()=>setLayer('a');$('layer-b').onclick=()=>setLayer('b');
 $('algorithm').onchange=()=>{state[activeLayer].mode=Number($('algorithm').value);updateValues();changed();};
 $('seed').oninput=()=>{state[activeLayer].seed=Math.max(0,Math.min(9999,Number($('seed').value)||0));changed();};
 $('new-seed').onclick=()=>{state[activeLayer].seed=crypto.getRandomValues(new Uint32Array(1))[0]%10000;updateValues();changed();};
 $('mix').oninput=()=>{state.mix=Number($('mix').value);updateValues();changed();};$('blend').onchange=()=>{state.blend=Number($('blend').value);changed();};
 for(let i=0;i<3;i++)$('color-'+i).oninput=()=>{state.palette[i]=$('color-'+i).value;updateValues();changed();};
 $('palette').onchange=()=>{if(palettes[$('palette').value])state.palette=[...palettes[$('palette').value]];updateValues();changed();};
 $('time').oninput=()=>{state.time=Number($('time').value);$('time-value').value=state.time.toFixed(1)+' s';requestDraw();};
 $('speed').onchange=()=>{state.speed=Number($('speed').value);};
 $('play').onclick=()=>{if(!gpu||reduced.matches)return;playing=!playing;lastTime=0;$('play').textContent=playing?'Pause':'Play';$('play').setAttribute('aria-pressed',String(playing));requestDraw();};
 $('compare').onclick=()=>{split=split<0?.5:-1;$('compare-line').hidden=split<0;$('split-control').hidden=split<0;$('compare').setAttribute('aria-pressed',String(split>=0));$('split').value=.5;$('compare-line').style.left='50%';requestDraw();};
 $('split').oninput=()=>{split=Number($('split').value);$('split-value').value=Math.round(split*100)+'%';$('compare-line').style.left=(split*100)+'%';requestDraw();};
 for(const [id,show]of [['raw-view',false],['section-view',true]])$(id).onclick=()=>{$('sample-copy').hidden=!show;$('raw-view').setAttribute('aria-pressed',String(!show));$('section-view').setAttribute('aria-pressed',String(show));};
 $('full').onclick=()=>{if(document.fullscreenElement)document.exitFullscreen();else $('stage').requestFullscreen().catch(()=>note('Fullscreen is unavailable in this preview.'));};
 $('quality').onchange=resize;$('output').onchange=requestDraw;
 $('reset').onclick=()=>applyLook(baseline);
 $('save').onclick=()=>{const item=copy(state);item.name=state.name+' · '+(saved.length+1);saved.push(item);saved=saved.slice(-24);try{localStorage.setItem('hmziq-texture-looks',JSON.stringify(saved));showSaved();note('Look saved. Export its recipe to keep a portable copy.');}catch{note('Local saving is unavailable. Use Recipe JSON to save this look.',true);}};
 $('load').onclick=()=>$('file-input').click();$('file-input').onchange=async()=>{const f=$('file-input').files[0];if(!f)return;try{if(f.size>1048576)throw new Error('Recipe files must be smaller than 1 MB.');applyLook(validateRecipe(JSON.parse(await f.text())));note('Recipe loaded.');}catch(e){note(e.message,true);}finally{$('file-input').value='';}};
 $('export').onclick=async()=>{if(!gpu||exporting)return;exporting=true;$('export').disabled=true;const wasPlaying=playing;playing=false;
  try{const width=Number($('export-size').value),height=Math.round(width*canvas.height/canvas.width),output=Number($('output').value);note('Rendering '+width+' × '+height+'…');const blob=await gpu.png(copy(state),width,height,output);download(blob,state.id+'-'+['surface','height','normal','pigment'][output]+'.png');note('PNG exported at '+width+' × '+height+'.');}catch(e){note('Export failed. Try a smaller size. '+e.message,true);}finally{exporting=false;$('export').disabled=false;playing=wasPlaying;requestDraw();}
 };
 $('wgsl').onclick=()=>download(new Blob([shader],{type:'text/plain'}),'materials.wgsl');
 $('recipe').onclick=()=>jsonDownload(recipe(),state.id+'-recipe.json');$('all-recipes').onclick=()=>jsonDownload({schema:'hmziq-material-collection-v2',looks:looks.map(s=>recipe(s))},'hmziq-material-recipes.json');
 $('guide').onclick=()=>download(new Blob([guide],{type:'text/markdown'}),'README.md');
 new ResizeObserver(resize).observe($('stage'));
 new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;lastTime=0;if(visible)requestDraw();}).observe($('stage'));
 document.addEventListener('visibilitychange',()=>{lastTime=0;if(!document.hidden)requestDraw();});
 reduced.addEventListener('change',()=>{if(reduced.matches){playing=false;$('play').textContent='Play';$('play').setAttribute('aria-pressed','false');}$('play').disabled=reduced.matches||!gpu;requestDraw();});
}
wire();updateValues();showSaved();initialize();
window.textureLab={looks,algorithms,palettes,params,recipe,validateRecipe,shader,guide,applyLook,
 get state(){return copy(state)},get ready(){return !!gpu},get playing(){return playing},
 async png(s,width=1024,height=640,map=0){if(!gpu)throw new Error('GPU not ready');return gpu.png(s,width,height,map)},
 setState(patch){Object.assign(state,patch);updateValues();changed();},
};

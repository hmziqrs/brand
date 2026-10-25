/*
 * The backdrop shaders: ten full-bleed WebGL scenes for hero sections, each a `shade(uv)`
 * function wrapped in a shared prelude (noise, fbm, a four-stop color ramp) and a shared
 * grade (zoom, exposure, vignette, grain, gamma). Every dial is a `u_<key>` float uniform.
 */
import palettes from "./backdrop-palettes.json";

export type BackdropDial = { key: string; label: string; min: number; max: number; step: number; start: number };
export type BackdropColors = { bg: string; low: string; mid: string; high: string };
export type BackdropKind = (typeof backdropKinds)[number];
export type Backdrop = { kind: BackdropKind; name: string; dials: BackdropDial[]; shade: string };

export const backdropPalettes: Record<"oxide" | "ember" | "harbor" | "bone", BackdropColors> = palettes;
export const backdropKinds = ["aurora", "metal", "ink", "topo", "glass", "particles", "silk", "halftone", "mesh", "rings", "orb", "refract", "swirl"] as const;

const dial = (key: string, label: string, min: number, max: number, start: number, step = 0.01): BackdropDial => ({ key, label, min, max, step, start });

export const commonDials: BackdropDial[] = [
	dial("speed", "Speed", -3, 3, 1, 0.05),
	dial("zoom", "Zoom", 0.25, 4, 1, 0.05),
	dial("exposure", "Exposure", 0.2, 3, 1, 0.05),
	dial("vignette", "Vignette", 0, 2, 1, 0.05),
	dial("grain", "Film grain", 0, 1, 0.15),
	dial("gamma", "Gamma", 0.4, 2, 1),
];

export const PRELUDE = `
precision highp float;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec3 u_bg;
uniform vec3 u_low;
uniform vec3 u_mid;
uniform vec3 u_high;
uniform float u_zoom;
uniform float u_exposure;
uniform float u_vignette;
uniform float u_grain;
uniform float u_gamma;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

vec2 hash2(vec2 p) {
  return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = p * 2.03 + vec2(1.7, 9.2);
    a *= 0.5;
  }
  return v;
}

vec3 ramp(float t) {
  t = clamp(t, 0.0, 1.0);
  if (t < 0.33) return mix(u_bg, u_low, t / 0.33);
  if (t < 0.66) return mix(u_low, u_mid, (t - 0.33) / 0.33);
  return mix(u_mid, u_high, (t - 0.66) / 0.34);
}

mat2 rot(float a) {
  float c = cos(a);
  float s = sin(a);
  return mat2(c, -s, s, c);
}
`;

export const POSTLUDE = `
void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / u_resolution.y;
  vec3 col = shade(uv / u_zoom);
  col *= u_exposure;
  col *= mix(1.0, smoothstep(1.3, 0.2, length(uv)), u_vignette);
  col += (hash(gl_FragCoord.xy + fract(u_time * 0.37) * vec2(113.0, 57.0)) - 0.5) * 0.12 * u_grain;
  gl_FragColor = vec4(pow(max(col, vec3(0.0)), vec3(u_gamma)), 1.0);
}
`;

const uniforms = (dials: BackdropDial[]) => dials.map((d) => `uniform float u_${d.key};`).join("\n");
export const fragmentFor = (b: Backdrop) => `${PRELUDE}\n${uniforms(b.dials)}\n${b.shade}\n${POSTLUDE}`;

export const backdrops: Record<BackdropKind, Backdrop> = {
	aurora: {
		kind: "aurora",
		name: "Aurora",
		dials: [
			dial("bands", "Curtains", 1, 6, 4, 1),
			dial("height", "Height", -0.6, 0.6, 0),
			dial("sway", "Sway", 0, 3, 1),
			dial("softness", "Softness", 0.2, 4, 1),
			dial("rays", "Rays", 0, 1, 0.6),
			dial("tilt", "Tilt", -1, 1, 0),
			dial("intensity", "Intensity", 0, 3, 1),
		],
		shade: `
vec3 shade(vec2 uv) {
  uv = rot(u_tilt) * uv;
  vec3 col = mix(u_bg, u_low * 0.35, smoothstep(-0.6, 0.8, uv.y));
  for (int i = 0; i < 6; i++) {
    float fi = float(i);
    if (fi >= u_bands) break;
    float x = uv.x * (1.2 + fi * 0.35) + fi * 1.7;
    float curve = u_height + 0.5 * u_sway * (fbm(vec2(x * 0.6, u_time * 0.15 + fi)) - 0.5) + fi * 0.07 - 0.15;
    float d = uv.y - curve;
    float curtain = exp(-max(d, 0.0) * (6.0 / u_softness)) * smoothstep(-0.03, 0.02, d);
    float rays = mix(1.0, 0.4 + 0.9 * noise(vec2(x * 9.0, u_time * 0.4 + fi)), u_rays);
    vec3 c = mix(u_mid, u_high, fi / 5.0);
    col += c * curtain * rays * u_intensity * 0.35;
  }
  return col;
}`,
	},
	metal: {
		kind: "metal",
		name: "Liquid metal",
		dials: [
			dial("detail", "Detail", 0.2, 3, 1),
			dial("warp", "Warp", 0, 4, 1.6),
			dial("relief", "Relief", 0, 3, 1),
			dial("shine", "Shine tightness", 0, 3, 1),
			dial("specular", "Specular", 0, 3, 1),
			dial("size", "Blob size", 0.1, 1.5, 0.55),
			dial("mask", "Blob mask", 0, 1, 1),
		],
		shade: `
float field(vec2 p) {
  vec2 q = vec2(fbm(p + u_time * 0.1 * vec2(1.0, 0.3)), fbm(p + vec2(5.2, 1.3) - u_time * 0.08));
  return fbm(p + u_warp * q);
}

vec3 shade(vec2 uv) {
  vec2 p = uv * u_detail * 2.0;
  float e = 0.01;
  float h = field(p);
  vec2 g = vec2(field(p + vec2(e, 0.0)) - h, field(p + vec2(0.0, e)) - h) / e;
  vec3 n = normalize(vec3(-g * u_relief * 0.3, 1.0));
  float fres = pow(1.0 - n.z, 2.0);
  vec3 col = ramp(0.25 + (0.5 + 0.5 * n.y) * 0.55 + (h - 0.5) * 0.4);
  vec3 l = normalize(vec3(0.4, 0.6, 0.7));
  float spec = pow(max(dot(reflect(-l, n), vec3(0.0, 0.0, 1.0)), 0.0), u_shine * 40.0 + 4.0);
  col += u_high * spec * u_specular + u_mid * fres * 0.5;
  float blob = smoothstep(u_size + 0.04, u_size - 0.04, length(uv) + 0.25 * (h - 0.5));
  return mix(col, u_bg, (1.0 - blob) * u_mask);
}`,
	},
	ink: {
		kind: "ink",
		name: "Ink in water",
		dials: [
			dial("scale", "Scale", 0.3, 5, 1.6),
			dial("curl", "Curl", 0, 6, 3),
			dial("spread", "Spread", 0.1, 2, 0.9),
			dial("density", "Density", 0, 3, 1),
			dial("bloom", "Bloom", 0, 3, 1),
			dial("originX", "Origin X", -1, 1, 0),
			dial("originY", "Origin Y", -0.6, 0.6, 0),
		],
		shade: `
vec3 shade(vec2 uv) {
  vec2 p = uv - vec2(u_originX, u_originY);
  float r = length(p);
  vec2 q = p * u_scale;
  float t = u_time * 0.15;
  vec2 w = vec2(fbm(q + t), fbm(q + vec2(3.1, 7.4) - t));
  vec2 w2 = vec2(fbm(q + u_curl * w + vec2(1.7, 9.2) + t * 0.5), fbm(q + u_curl * w + vec2(8.3, 2.8)));
  float d = fbm(q + u_curl * w2);
  float reach = u_spread * (0.6 + 0.15 * sin(u_time * 0.2));
  float mask = smoothstep(reach, reach * 0.2, r + (d - 0.5) * 0.6);
  float ink = clamp(d * mask * u_density * 1.6, 0.0, 1.0);
  vec3 col = mix(u_bg, ramp(ink), smoothstep(0.0, 0.3, ink));
  return col + u_high * pow(ink, 6.0) * u_bloom;
}`,
	},
	topo: {
		kind: "topo",
		name: "Topographic",
		dials: [
			dial("scale", "Scale", 0.2, 4, 1.2),
			dial("lines", "Line count", 2, 40, 14, 1),
			dial("width", "Line width", 0.1, 3, 1),
			dial("major", "Major every", 1, 10, 5, 1),
			dial("fill", "Elevation fill", 0, 2, 0.6),
			dial("ink", "Line ink", 0, 2, 1),
			dial("drift", "Drift", 0, 3, 1),
		],
		shade: `
vec3 shade(vec2 uv) {
  float t = u_time * 0.03 * u_drift;
  float h = fbm(uv * u_scale + vec2(t, t * 0.6)) + 0.3 * fbm(uv * u_scale * 2.0 - t * 0.7);
  float v = h * u_lines;
  float f = fract(v);
  float dist = min(f, 1.0 - f);
  float line = smoothstep(u_width * 0.06, 0.0, dist);
  float major = step(mod(floor(v + 0.5), max(u_major, 1.0)), 0.5);
  vec3 col = u_bg + ramp(h) * u_fill * 0.4;
  return mix(col, mix(u_mid, u_high, major), clamp(line * (0.45 + 0.55 * major) * u_ink, 0.0, 1.0));
}`,
	},
	glass: {
		kind: "glass",
		name: "Voronoi glass",
		dials: [
			dial("cells", "Cells", 1, 16, 5, 0.1),
			dial("refract", "Refraction", 0, 4, 1),
			dial("edge", "Edge width", 0, 3, 1),
			dial("drift", "Cell drift", 0, 3, 1),
			dial("sheen", "Sheen", 0, 3, 1),
			dial("glow", "Light behind", 0, 2, 1),
		],
		shade: `
vec3 shade(vec2 uv) {
  vec2 p = uv * u_cells;
  vec2 i = floor(p);
  vec2 f = fract(p);
  float d1 = 8.0;
  float d2 = 8.0;
  vec2 best = vec2(0.0);
  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      vec2 g = vec2(float(x), float(y));
      vec2 o = hash2(i + g);
      o = 0.5 + 0.5 * sin(u_time * 0.4 * u_drift + 6.2831 * o);
      vec2 r = g + o - f;
      float d = dot(r, r);
      if (d < d1) {
        d2 = d1;
        d1 = d;
        best = r;
      } else if (d < d2) {
        d2 = d;
      }
    }
  }
  float edge = sqrt(d2) - sqrt(d1);
  vec2 bp = uv + best * u_refract * 0.15 / u_cells * 4.0;
  float g = fbm(bp * 1.5 + u_time * 0.05);
  vec3 col = ramp(smoothstep(0.25, 0.85, g) * u_glow);
  col += u_high * 0.15 * u_sheen * smoothstep(0.0, -0.6, best.y);
  return mix(u_high * 0.85, col, smoothstep(0.0, u_edge * 0.08 + 0.001, edge));
}`,
	},
	particles: {
		kind: "particles",
		name: "Particle field",
		dials: [
			dial("density", "Density", 0.3, 3, 1),
			dial("flow", "Flow", -3, 3, 1),
			dial("curl", "Currents", 0, 4, 1.5),
			dial("size", "Point size", 0.2, 3, 1),
			dial("brightness", "Brightness", 0, 3, 1),
			dial("haze", "Haze", 0, 2, 1),
		],
		shade: `
vec3 shade(vec2 uv) {
  vec3 col = u_bg + u_low * 0.3 * u_haze * fbm(uv * 2.0 + u_time * 0.05);
  for (int l = 0; l < 4; l++) {
    float fl = float(l);
    float sc = u_density * (8.0 + fl * 6.0);
    vec2 w = uv + u_curl * 0.15 * (vec2(noise(uv * 2.0 + u_time * 0.1 + fl), noise(uv * 2.0 + 5.3 - u_time * 0.1)) - 0.5);
    vec2 p = w * sc + vec2(u_time * u_flow * (0.4 + fl * 0.25), 0.0);
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 h = hash2(i + fl * 17.0);
    vec2 c = 0.2 + 0.6 * h + 0.15 * sin(u_time * (1.0 + h) + h * 6.28);
    float d = length(f - c);
    float tw = 0.5 + 0.5 * sin(u_time * 3.0 * h.x + h.y * 20.0);
    float s = smoothstep(u_size * 0.1 * (1.0 - fl * 0.15), 0.0, d) * step(0.35, h.x);
    col += mix(u_mid, u_high, h.y) * s * (0.4 + 0.6 * tw) * (1.0 - fl * 0.2) * u_brightness;
  }
  return col;
}`,
	},
	silk: {
		kind: "silk",
		name: "Flowing silk",
		dials: [
			dial("folds", "Folds", 0.5, 8, 3),
			dial("wrinkle", "Wrinkle", 0, 3, 1),
			dial("softness", "Softness", 0.1, 3, 1),
			dial("sheen", "Sheen", 0, 3, 1),
			dial("angle", "Angle", -1.6, 1.6, 0.5),
			dial("light", "Light", 0, 2, 1),
		],
		shade: `
float silkH(vec2 p) {
  float t = u_time * 0.2;
  p.x += 0.3 * sin(p.y * 1.3 + t);
  return sin(p.x * u_folds + 1.5 * sin(p.y * 0.8 + t) + fbm(p * 0.7 + t * 0.3) * u_wrinkle * 1.8);
}

vec3 shade(vec2 uv) {
  vec2 p = rot(u_angle) * uv * 2.0;
  float e = 0.005;
  float h = silkH(p);
  float dx = (silkH(p + vec2(e, 0.0)) - h) / e;
  float dy = (silkH(p + vec2(0.0, e)) - h) / e;
  vec3 n = normalize(vec3(-dx, -dy, u_softness * 6.0));
  vec3 l = normalize(vec3(-0.5, 0.6, 0.6));
  float diff = max(dot(n, l), 0.0);
  float spec = pow(max(dot(reflect(-l, n), vec3(0.0, 0.0, 1.0)), 0.0), 12.0) * u_sheen;
  return ramp(0.1 + diff * 0.75 * u_light) + u_high * spec * 0.6;
}`,
	},
	halftone: {
		kind: "halftone",
		name: "Dot matrix",
		dials: [
			dial("cells", "Dots across", 6, 120, 40, 1),
			dial("ripple", "Ripple rings", 0, 3, 1),
			dial("rippleMix", "Ripple vs cloud", 0, 1, 0.5),
			dial("fill", "Fill", 0, 3, 1),
			dial("angle", "Grid angle", -0.8, 0.8, 0.785),
			dial("originX", "Origin X", -1, 1, 0),
			dial("originY", "Origin Y", -0.6, 0.6, 0),
		],
		shade: `
vec3 shade(vec2 uv) {
  vec2 g = rot(u_angle) * uv * u_cells;
  vec2 c = floor(g) + 0.5;
  vec2 f = g - c;
  vec2 cw = (rot(-u_angle) * c) / u_cells;
  float r = length(cw - vec2(u_originX, u_originY));
  float wave = 0.5 + 0.5 * sin(r * u_ripple * 10.0 - u_time * 2.0);
  float field = mix(fbm(cw * 2.0 + u_time * 0.1), wave, u_rippleMix);
  float rad = 0.5 * sqrt(clamp(field * u_fill, 0.0, 1.0));
  float aa = 1.5 * u_cells / u_resolution.y;
  float dotMask = smoothstep(rad + aa, rad - aa, length(f));
  return mix(u_bg, mix(u_mid, u_high, field), dotMask);
}`,
	},
	mesh: {
		kind: "mesh",
		name: "Gradient mesh",
		dials: [
			dial("size", "Blob size", 0.1, 1.5, 0.5),
			dial("wander", "Wander", 0, 3, 1),
			dial("warp", "Warp", 0, 3, 1),
			dial("sharpness", "Edge sharpness", 0.5, 6, 1.5),
			dial("presence", "Presence", 0, 2, 1),
		],
		shade: `
vec2 blobAt(float i) {
  return vec2(sin(u_time * 0.13 * (1.0 + i * 0.3) + i * 2.1) * 0.8, cos(u_time * 0.11 * (1.0 + i * 0.2) + i * 1.3) * 0.45) * u_wander;
}

vec3 shade(vec2 uv) {
  uv += 0.2 * u_warp * (vec2(noise(uv * 2.0 + u_time * 0.1), noise(uv * 2.0 + 4.7 - u_time * 0.1)) - 0.5);
  vec3 sum = vec3(0.0);
  float tot = 0.0;
  float peak = 0.0;
  for (int i = 0; i < 4; i++) {
    float fi = float(i);
    vec2 d = uv - blobAt(fi);
    float w = pow(exp(-dot(d, d) / (u_size * u_size)), 1.0 / u_sharpness);
    vec3 c = fi < 0.5 ? u_low : fi < 1.5 ? u_mid : fi < 2.5 ? u_high : mix(u_mid, u_high, 0.5);
    sum += c * w;
    tot += w;
    peak = max(peak, w);
  }
  return mix(u_bg, sum / max(tot, 0.0001), clamp(peak * u_presence, 0.0, 1.0));
}`,
	},
	rings: {
		kind: "rings",
		name: "Rings",
		dials: [
			dial("rings", "Rings", 1, 5, 3, 1),
			dial("radius", "Radius", 0.3, 1.4, 0.9),
			dial("thick", "Thickness", 0.2, 3, 1),
			dial("spin", "Spin", -3, 3, 1),
			dial("tilt", "Tilt", -1.6, 1.6, 0.4),
			dial("glow", "Glow", 0, 3, 1),
			dial("shine", "Shine", 0, 3, 1),
		],
		shade: `
float sdTorus(vec3 p, vec2 t) {
  vec2 q = vec2(length(p.xz) - t.x, p.y);
  return length(q) - t.y;
}

float map(vec3 p) {
  float d = 1000.0;
  for (int i = 0; i < 5; i++) {
    float fi = float(i);
    if (fi >= u_rings) break;
    vec3 q = p;
    q.xy = rot(u_time * 0.2 * u_spin + fi * 1.1) * q.xy;
    q.yz = rot(u_time * 0.15 * u_spin + fi * 0.7 + u_tilt) * q.yz;
    d = min(d, sdTorus(q, vec2(u_radius * (1.0 - fi * 0.12), u_thick * 0.06)));
  }
  return d;
}

vec3 shade(vec2 uv) {
  vec3 ro = vec3(0.0, 0.0, 3.0);
  vec3 rd = normalize(vec3(uv, -1.6));
  vec3 col = mix(u_bg, u_low * 0.4, smoothstep(-0.8, 0.8, uv.y));
  float t = 0.0;
  float closest = 10.0;
  for (int i = 0; i < 72; i++) {
    float d = map(ro + rd * t);
    closest = min(closest, d);
    if (d < 0.001 || t > 6.0) break;
    t += d;
  }
  col += u_mid * exp(-closest * 12.0) * 0.5 * u_glow;
  if (t < 6.0) {
    vec3 p = ro + rd * t;
    vec2 e = vec2(0.001, 0.0);
    vec3 n = normalize(vec3(map(p + e.xyy) - map(p - e.xyy), map(p + e.yxy) - map(p - e.yxy), map(p + e.yyx) - map(p - e.yyx)));
    vec3 l = normalize(vec3(0.5, 0.7, 0.6));
    float diff = max(dot(n, l), 0.0);
    float spec = pow(max(dot(reflect(-l, n), -rd), 0.0), 24.0) * u_shine;
    float rim = pow(1.0 - max(dot(n, -rd), 0.0), 3.0);
    col = ramp(0.3 + diff * 0.6) + u_high * spec + u_mid * rim * 0.6;
  }
  return col;
}`,
	},
	orb: {
		kind: "orb",
		name: "Voice orb",
		dials: [
			dial("size", "Size", 0.1, 0.8, 0.32),
			dial("wobble", "Wobble", 0, 3, 1),
			dial("lobes", "Lobes", 1, 8, 3, 1),
			dial("swirl", "Inner swirl", 0, 4, 1.5),
			dial("rim", "Rim light", 0, 3, 1),
			dial("halo", "Halo", 0, 3, 1),
		],
		shade: `
vec3 shade(vec2 uv) {
  float r = length(uv);
  float a = atan(uv.y, uv.x);
  float edge = u_size * (1.0 + 0.08 * u_wobble * sin(a * u_lobes + u_time * 1.4) + 0.05 * u_wobble * sin(a * (u_lobes + 2.0) - u_time * 2.1));
  float inside = smoothstep(edge + 0.004, edge - 0.004, r);
  vec2 q = uv / max(u_size, 0.01);
  q = rot(u_swirl * (1.0 - r / max(edge, 0.01)) + u_time * 0.3) * q;
  float body = fbm(q * 1.6 + u_time * 0.2);
  vec3 inner = ramp(0.35 + body * 0.65 - r / max(edge, 0.01) * 0.25);
  float rim = smoothstep(edge - 0.06, edge, r) * inside;
  vec3 col = u_bg + u_mid * 0.25 * u_halo * exp(-max(r - edge, 0.0) * 9.0);
  col = mix(col, inner + u_high * rim * u_rim, inside);
  return col;
}`,
	},
	refract: {
		kind: "refract",
		name: "Refraction band",
		dials: [
			dial("stripes", "Stripes", 4, 80, 26, 1),
			dial("band", "Band width", 0.05, 0.8, 0.22),
			dial("bend", "Bend", 0, 3, 1),
			dial("split", "Color split", 0, 3, 1),
			dial("travel", "Travel", 0, 3, 1),
			dial("angle", "Angle", -1.6, 1.6, 0.2),
		],
		shade: `
float stripes(vec2 p) {
  return 0.5 + 0.5 * sin(p.x * u_stripes + fbm(p * 1.5) * 2.0);
}

vec3 shade(vec2 uv) {
  vec2 p = rot(u_angle) * uv;
  float center = sin(u_time * 0.4 * u_travel) * 0.6;
  float d = (p.y - center) / max(u_band, 0.01);
  float lens = exp(-d * d);
  float push = d * lens * 0.12 * u_bend;
  float off = 0.015 * u_split * lens;
  vec3 col;
  col.r = ramp(stripes(p + vec2(push + off, 0.0))).r;
  col.g = ramp(stripes(p + vec2(push, 0.0))).g;
  col.b = ramp(stripes(p + vec2(push - off, 0.0))).b;
  return mix(u_bg + u_low * 0.3 * stripes(p), col, 0.4 + 0.6 * lens);
}`,
	},
	swirl: {
		kind: "swirl",
		name: "Swirl",
		dials: [
			dial("twist", "Twist", 0, 12, 4),
			dial("arms", "Arms", 1, 8, 3, 1),
			dial("tightness", "Tightness", 0.2, 4, 1),
			dial("softness", "Softness", 0.05, 1, 0.35),
			dial("drift", "Drift", 0, 3, 1),
			dial("size", "Size", 0.2, 2, 0.8),
		],
		shade: `
vec3 shade(vec2 uv) {
  float r = length(uv);
  float a = atan(uv.y, uv.x);
  float spin = a * u_arms + log(r + 0.05) * u_twist * u_tightness - u_time * 0.6 * u_drift;
  float bands = 0.5 + 0.5 * sin(spin + fbm(uv * 3.0 + u_time * 0.1) * 2.0);
  bands = smoothstep(0.5 - u_softness * 0.5, 0.5 + u_softness * 0.5, bands);
  float fade = smoothstep(u_size, 0.0, r);
  return mix(u_bg, ramp(0.2 + bands * 0.8), fade);
}`,
	},
};

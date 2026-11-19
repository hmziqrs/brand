import { reducedMotion } from "@hmziq/brand-core/motion/canvas";

export const razorSketches = ["slit", "chevrons", "ripple", "paper", "monolith", "barbs", "split"] as const;
export type RazorSketch = (typeof razorSketches)[number];

const vertex = `attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}`;

const fragment = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform float uLx;
uniform int uSketch;
uniform vec3 uClicks[4];

const float PI = 3.14159265;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3. - 2. * f);
  return mix(mix(hash(i), hash(i + vec2(1., 0.)), f.x), mix(hash(i + vec2(0., 1.)), hash(i + vec2(1., 1.)), f.x), f.y);
}
float taper(float t) { return pow(sin(PI * clamp(t, 0., 1.)), 0.7); }
float edge(float dist, float w, float aa) { return 1. - smoothstep(w, w + aa * 1.2, dist); }

float velvet(vec2 p) {
  float n = noise(p * 2.5 + uTime * 0.02) * 0.6 + noise(p * 6. - uTime * 0.03) * 0.4;
  return 0.022 + 0.02 * n;
}

float slit(vec2 p, float aa) {
  float t = (p.x + 0.36) / 0.72;
  float on = step(0., t) * step(t, 1.);
  float y = p.y - 0.035 * sin(PI * clamp(t, 0., 1.)) + 0.02;
  float open = smoothstep(0.0, 0.25, fract(uTime / 9.)) * (1. - smoothstep(0.8, 1.0, fract(uTime / 9.)));
  float w = (0.0015 + 0.006 * open) * taper(t) + aa * 0.2;
  return edge(abs(y), w, aa) * on;
}

float chevrons(vec2 p, float aa) {
  float c = cos(radians(40.));
  float s = sin(radians(40.));
  float lit = 0.;
  float bright = mod(floor(uTime * 0.6), 9.);
  for (int i = 0; i < 9; i++) {
    float k = float(i);
    vec2 q = vec2(abs(p.x), p.y + 0.32 - k * 0.07);
    float along = q.x * s + q.y * c;
    float across = abs(q.x * c - q.y * s);
    float t = along / 0.5;
    float on = step(0., t) * step(t, 1.);
    float strength = k == bright ? 1. : 0.18;
    lit = max(lit, edge(across, 0.0018 * taper(t) + aa * 0.2, aa) * on * strength);
  }
  return lit;
}

float ripple(vec2 p, float aa, out float shade) {
  float r = length(p * vec2(1., 1.25));
  float h = sin(r * 38. - uTime * 0.8) * exp(-r * 2.2);
  float dh = cos(r * 38. - uTime * 0.8) * 38. * exp(-r * 2.2);
  vec2 g = normalize(p * vec2(1., 1.5625) + 1e-5) * dh * 0.02;
  float struck = 0.;
  for (int i = 0; i < 4; i++) {
    vec3 c = uClicks[i];
    if (c.z < 0. || c.z > 3.5) continue;
    vec2 d = p - c.xy;
    float rc = length(d);
    float env = exp(-pow(rc - c.z * 0.32, 2.) / 0.004) * pow(1. - c.z / 3.5, 2.);
    g += normalize(d + 1e-5) * cos(rc * 60. - c.z * 9.) * 60. * env * 0.012;
    struck = max(struck, env);
  }
  vec3 n = normalize(vec3(-g, 1.));
  vec3 l = normalize(vec3(uLx * 0.6, 0.7, 0.6));
  vec3 hv = normalize(l + vec3(0., 0., 1.));
  shade = 0.012 * max(0., dot(n, l)) * (1. - smoothstep(0.3, 0.6, r));
  float spec = smoothstep(0.985, 0.999, dot(n, hv));
  return spec * max((1. - smoothstep(0.25, 0.6, r)) * step(0., h + 0.2), struck);
}

float paper(vec2 p, float aa, out float shade) {
  float lit = 0.;
  shade = 0.;
  for (int i = 0; i < 5; i++) {
    float k = float(i);
    float base = -0.3 + k * 0.14 + 0.015 * sin(uTime * 0.25 + k * 1.3);
    float y = base + abs(p.x) * 0.75;
    if (p.y < y) shade += 0.006;
    float t = 1. - abs(p.x) / 0.7;
    float on = step(0., t);
    lit = max(lit, edge(abs(p.y - y), 0.0016 * taper(t * 0.5 + 0.5) + aa * 0.2, aa) * on * (0.35 + 0.5 * smoothstep(0.3, 0.9, sin(uTime * 0.4 - k * 0.9) * 0.5 + 0.5)));
  }
  return lit;
}

float monolith(vec2 p, float aa, out float shade, out float body) {
  vec2 c = vec2(0., clamp(p.y, -0.32, 0.32));
  float d = length(p - c) - 0.09;
  body = 1. - smoothstep(-aa, aa, d);
  float x = clamp(p.x / 0.09, -1., 1.);
  vec3 n = normalize(vec3(x, 0., sqrt(max(0., 1. - x * x))));
  vec3 r = vec3(0., 0., -1.) + 2. * n.z * n;
  float stripe = 0.35 * sin(uTime * 0.12) + uLx * 0.5;
  float spec = 1. - smoothstep(0.004, 0.02, abs(r.x - stripe));
  shade = 0.01 + 0.05 * pow(1. - n.z, 3.);
  float rim = edge(abs(d), aa * 0.4, aa) * 0.25;
  return (spec * 0.95 + rim) * body + rim * (1. - body);
}

float barbs(vec2 p, float aa) {
  vec2 q = vec2(abs(p.x), p.y);
  float c = cos(radians(42.));
  float s = sin(radians(42.));
  float along = q.x * s + q.y * c;
  float across = q.x * c - q.y * s;
  float bend = across + 0.12 * along * along;
  float k = floor(bend / 0.024 + 0.5);
  float dist = abs(bend - k * 0.024);
  float t = along / 0.55;
  float on = step(0., t) * step(t, 1.) * step(-9., k) * step(k, 9.);
  float wave = exp(-pow(k - (fract(uTime / 10.) * 26. - 13.), 2.) / 0.5);
  return edge(dist, (0.0008 + 0.0016 * wave) * taper(t) + aa * 0.2, aa) * on * (0.14 + 0.86 * wave);
}

float split(vec2 p, float aa, out float shade) {
  float a = radians(62. + 3. * sin(uTime * 0.15));
  vec2 nrm = vec2(cos(a), sin(a));
  float d = dot(p, nrm);
  shade = d > 0. ? 0.012 : 0.;
  float t = (dot(p, vec2(-nrm.y, nrm.x)) + 0.5) / 1.0;
  return edge(abs(d), 0.0016 * taper(t) + aa * 0.2, aa) * step(0., t) * step(t, 1.);
}

void main() {
  vec2 p = (gl_FragCoord.xy - vec2(0.68, 0.5) * uRes) / uRes.y;
  float aa = 1.0 / uRes.y;
  float lum = velvet(p);
  float line = 0.;
  float shade = 0.;
  if (uSketch == 0) line = slit(p, aa);
  else if (uSketch == 1) line = chevrons(p, aa);
  else if (uSketch == 2) line = ripple(p, aa, shade);
  else if (uSketch == 3) line = paper(p, aa, shade);
  else if (uSketch == 4) {
    float body;
    line = monolith(p, aa, shade, body);
    lum = mix(lum, 0.008, body);
  } else if (uSketch == 5) line = barbs(p, aa);
  else line = split(p, aa, shade);
  lum += shade + (hash(gl_FragCoord.xy + fract(uTime)) - 0.5) * 0.005;
  gl_FragColor = vec4(vec3(mix(lum, 0.96, clamp(line, 0., 1.))), 1.);
}
`;

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader) ?? "shader");
  return shader;
}

/** Runs one razor sketch on `canvas`, filling it; on `ripple` a click drops a new ripple where it lands. Still for reduced motion. Returns the cleanup. */
export function mountRazorSketch(canvas: HTMLCanvasElement, sketch: RazorSketch) {
  const gl = canvas.getContext("webgl", { antialias: false });
  if (!gl) return () => {};
  const program = gl.createProgram()!;
  gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, vertex));
  gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, fragment));
  gl.linkProgram(program);
  gl.useProgram(program);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const at = gl.getAttribLocation(program, "a");
  gl.enableVertexAttribArray(at);
  gl.vertexAttribPointer(at, 2, gl.FLOAT, false, 0, 0);
  const uRes = gl.getUniformLocation(program, "uRes");
  const uTime = gl.getUniformLocation(program, "uTime");
  const uLx = gl.getUniformLocation(program, "uLx");
  gl.uniform1i(gl.getUniformLocation(program, "uSketch"), razorSketches.indexOf(sketch));
  const uClicks = gl.getUniformLocation(program, "uClicks");
  const clicks: { x: number; y: number; t: number }[] = [];
  const packed = new Float32Array(12);

  const still = reducedMotion();
  let light = 0;
  let aim = 0;
  let pointed = -99;
  let t = 0;
  let last = 0;
  let raf = 0;
  let visible = true;

  const draw = () => {
    gl.uniform2f(uRes, canvas.width, canvas.height);
    gl.uniform1f(uTime, t);
    gl.uniform1f(uLx, light);
    for (let i = 0; i < 4; i++) {
      const c = clicks[i];
      packed.set(c ? [c.x, c.y, t - c.t] : [0, 0, -1], i * 3);
    }
    gl.uniform3fv(uClicks, packed);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };
  const size = () => {
    const box = canvas.getBoundingClientRect();
    const dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.round(box.width * dpr));
    canvas.height = Math.max(1, Math.round(box.height * dpr));
    gl.viewport(0, 0, canvas.width, canvas.height);
    if (still) draw();
  };
  const loop = (now: number) => {
    raf = requestAnimationFrame(loop);
    const dt = Math.min(0.05, last ? (now - last) / 1000 : 0.016);
    last = now;
    if (!visible) return;
    t += dt;
    const target = t - pointed < 3 ? aim : Math.sin(t * 0.15) * 0.4;
    light += (target - light) * (1 - Math.exp(-dt * 1.5));
    draw();
  };
  const move = (e: PointerEvent) => {
    aim = (e.clientX / innerWidth - 0.5) * 1.4;
    pointed = t;
  };
  const press = (e: PointerEvent) => {
    const box = canvas.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    if (x < 0 || y < 0 || x > box.width || y > box.height) return;
    clicks.push({ x: (x - 0.68 * box.width) / box.height, y: (box.height - y - 0.5 * box.height) / box.height, t });
    if (clicks.length > 4) clicks.shift();
  };

  const ro = new ResizeObserver(size);
  ro.observe(canvas);
  const io = new IntersectionObserver((entries) => (visible = entries.some((e) => e.isIntersecting)));
  io.observe(canvas);
  size();
  if (!still) {
    raf = requestAnimationFrame(loop);
    addEventListener("pointermove", move, { passive: true });
    addEventListener("pointerdown", press);
  }
  return () => {
    cancelAnimationFrame(raf);
    removeEventListener("pointermove", move);
    removeEventListener("pointerdown", press);
    ro.disconnect();
    io.disconnect();
  };
}

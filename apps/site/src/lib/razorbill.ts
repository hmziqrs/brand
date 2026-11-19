import { reducedMotion } from "@hmziq/brand-core/motion/canvas";

export type RazorLook = "blades" | "wave" | "long" | "obsidian" | "horizon";

const looks: Record<RazorLook, number> = { blades: 0, wave: 1, long: 2, obsidian: 3, horizon: 4 };

const vertex = `attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}`;

const fragment = `
precision highp float;
uniform vec2 uC;
uniform float uS;
uniform float uTime;
uniform float uLx;
uniform int uMode;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

const float ANGLE = 0.663225;

float bladeAt(vec2 P, float aa, out vec3 n, out float rim, out float row, out float x) {
  float side = P.x < 0. ? -1. : 1.;
  vec2 q = vec2(abs(P.x), P.y);
  float ca = cos(ANGLE);
  float sa = sin(ANGLE);
  q = mat2(ca, sa, -sa, ca) * q;
  vec2 cell = vec2(0.17, 0.052);
  row = floor(q.y / cell.y);
  q.x += mod(row, 2.) * cell.x * 0.5;
  vec2 l = (fract(q / cell) - 0.5) * cell;
  float len = cell.x * 0.47;
  float wid = cell.y * 0.36;
  x = clamp(abs(l.x) / len, 0., 1.);
  float hw = wid * (1. - x * x);
  float d = abs(l.y) - hw;
  float body = (1. - smoothstep(-aa, aa, d)) * step(abs(l.x), len);
  float s = clamp(l.y / max(hw, 1e-4), -1., 1.);
  vec2 along = vec2(ca * side, -sa);
  vec2 across = vec2(sa * side, ca);
  vec2 slope = across * s * 1.1 + along * sign(l.x) * x * 0.35;
  n = normalize(vec3(slope, sqrt(max(0., 1. - s * s)) + 0.12));
  rim = (1. - smoothstep(aa * 0.6, aa * 1.8, abs(d))) * step(0., l.y) * step(abs(l.x), len);
  return body;
}

float box(vec2 r, vec2 c, vec2 h, float soft) {
  vec2 e = smoothstep(h + soft, h - soft, abs(r - c));
  return e.x * e.y;
}

vec4 obsidian(vec2 p, float aa) {
  float mask = 1. - smoothstep(0.55, 1.05, length(p * vec2(0.85, 1.)));
  vec3 n;
  float rim;
  float row;
  float x;
  float body = bladeAt(p, aa, n, rim, row, x);
  vec3 r = vec3(0., 0., -1.) + 2. * n.z * n;
  vec2 c = vec2(0.32 * sin(uTime * 0.11) + uLx * 0.45, 0.52);
  float spec = box(r.xy, c, vec2(0.42, 0.16), 0.015);
  spec += 0.3 * box(r.xy, vec2(-c.x * 0.6, -0.5), vec2(0.6, 0.05), 0.02);
  float env = 0.03 + 0.09 * smoothstep(-0.3, 0.9, r.y);
  float fres = pow(1. - n.z, 3.) * 0.1;
  float lum = 0.006 + env * 0.6 + fres + spec * 0.9;
  float bg = 0.022 + (hash(gl_FragCoord.xy + fract(uTime)) - 0.5) * 0.005;
  return vec4(vec3(mix(bg, min(lum, 0.97), body * mask)), 1.);
}

vec4 horizon(vec2 p) {
  float bg = 0.02 + (hash(gl_FragCoord.xy + fract(uTime)) - 0.5) * 0.005;
  vec3 ro = vec3(0., 0.55, 0.);
  vec3 fwd = normalize(vec3(0., -0.3, 1.));
  vec3 right = vec3(1., 0., 0.);
  vec3 up = normalize(cross(fwd, right));
  vec3 rd = normalize(fwd + p.x * right * 0.9 + p.y * up * 0.9);
  float side = 1. - smoothstep(0.75, 1.15, abs(p.x));
  if (rd.y > -0.002) return vec4(vec3(bg), 1.);
  float t = -ro.y / rd.y;
  vec3 hit = ro + rd * t;
  vec2 P = vec2(hit.x, hit.z - 0.5) * 0.75;
  float aa = 2.4 * t * 0.75 / uS / max(0.3, -rd.y * 2.5);
  vec3 n2;
  float rim;
  float row;
  float x;
  float body = bladeAt(P, aa, n2, rim, row, x);
  vec3 n = normalize(vec3(n2.x, n2.z, n2.y));
  vec3 r = reflect(rd, n);
  float drift = 0.25 * sin(uTime * 0.1) + uLx * 0.35;
  float spec = smoothstep(0.02, 0.06, r.y) * smoothstep(0.32, 0.2, r.y) * smoothstep(0.55, 0.4, abs(r.x - drift));
  float span = 1.1 / 0.052;
  float front = mix(span * 2., -4., fract(uTime / 12.));
  float band = exp(-pow(row - front, 2.) / 0.35);
  float env = 0.03 + 0.1 * smoothstep(-0.1, 0.5, r.y);
  float lum = 0.008 + env * 0.6 + 0.85 * spec;
  lum = mix(lum, 0.96, rim * band * (1. - x * x));
  float fog = exp(-t * 0.2);
  float near = smoothstep(0.2, 0.9, t);
  return vec4(vec3(mix(bg, min(lum, 0.97), body * fog * near * side)), 1.);
}

void main() {
  if (uMode == 3) {
    gl_FragColor = obsidian((gl_FragCoord.xy - uC) / uS, 1.2 / uS);
    return;
  }
  if (uMode == 4) {
    gl_FragColor = horizon((gl_FragCoord.xy - uC) / uS);
    return;
  }
  vec2 p = (gl_FragCoord.xy - uC) / uS;
  float aa = 1.2 / uS;
  float mask = 1. - smoothstep(0.55, 1.05, length(p * vec2(0.85, 1.)));

  vec2 q = vec2(abs(p.x), p.y);
  float a = radians(38.);
  q = mat2(cos(a), sin(a), -sin(a), cos(a)) * q;

  vec2 cell = uMode == 2 ? vec2(0.3, 0.075) : vec2(0.17, 0.052);
  float row = floor(q.y / cell.y);
  q.x += mod(row, 2.) * cell.x * 0.5;
  vec2 id = vec2(floor(q.x / cell.x), row);
  vec2 l = (fract(q / cell) - 0.5) * cell;

  float len = cell.x * (uMode == 2 ? 0.46 : 0.47);
  float wid = cell.y * (uMode == 2 ? 0.26 : 0.36);
  float x = clamp(abs(l.x) / len, 0., 1.);
  float prof = 1. - x * x;
  if (uMode == 2) {
    float u = clamp((l.x / len + 1.) * 0.5, 0., 1.);
    prof = pow(1. - u, 0.85) * smoothstep(0., 0.12, u);
  }
  float hw = wid * prof;
  float d = abs(l.y) - hw;
  float body = (1. - smoothstep(-aa, aa, d)) * step(abs(l.x), len);

  float s = clamp(l.y / max(hw, 1e-4), -1., 1.);
  float tilt = sin(uTime * 0.35 - id.y * 0.32 + id.x * 0.5) * 0.55 + uLx * 0.6;
  float facing = clamp(s * 0.9 + tilt, -1., 1.);
  float shade = 0.035 + 0.11 * pow(max(0., facing), 3.) + 0.02 * (1. - abs(s));

  float rim = (1. - smoothstep(aa * 0.6, aa * 1.8, abs(d))) * step(0., l.y) * step(abs(l.x), len);
  float catchLight = smoothstep(0.4, 0.8, tilt) * (1. - x * x);
  if (uMode >= 1) {
    float span = 1.1 / cell.y;
    float front = mix(-span, span, fract(uTime / 14.));
    float band = exp(-pow(id.y - front, 2.) / 0.35);
    shade = 0.03 + 0.06 * pow(max(0., facing), 3.) + 0.012 * (1. - abs(s)) + 0.06 * band * (0.5 + 0.5 * s);
    catchLight = band * (1. - x * x);
  }
  float razor = rim * catchLight;

  float lum = 0.026 + (hash(gl_FragCoord.xy + fract(uTime)) - 0.5) * 0.005;
  lum = mix(lum, shade, body * mask);
  lum = mix(lum, 0.96, razor * mask);
  gl_FragColor = vec4(vec3(lum), 1.);
}
`;

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader) ?? "shader");
  return shader;
}

/**
 * After the razorbill, without the bird: rows of glossy black blades laid in a V, like its eye
 * lines, each shaped like its beak. A slow wave tilts them, and wherever a blade turns to the
 * light its upper edge flashes as a razor-thin white line. `wave` keeps the blades in velvet
 * black and sends one razor V up through them; `long` does the same with long, sharp beak-shaped
 * blades. `obsidian` renders the blades as polished black that reflects a hard studio light;
 * `horizon` lays them on a floor receding in perspective, with the razor V coming toward you.
 * The cursor moves the light. Still for reduced motion. Returns the cleanup.
 */
export function mountRazorbill(canvas: HTMLCanvasElement, look: RazorLook = "blades") {
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
  const uC = gl.getUniformLocation(program, "uC");
  const uS = gl.getUniformLocation(program, "uS");
  const uTime = gl.getUniformLocation(program, "uTime");
  const uLx = gl.getUniformLocation(program, "uLx");
  gl.uniform1i(gl.getUniformLocation(program, "uMode"), looks[look]);

  const still = reducedMotion();
  let light = 0;
  let aim = 0;
  let pointed = -99;
  let t = 0;
  let last = 0;
  let raf = 0;
  let visible = true;

  const draw = () => {
    const wide = canvas.width / canvas.height > 1.3;
    gl.uniform2f(uC, canvas.width * (wide ? 0.72 : 0.5), canvas.height * (wide ? 0.5 : 0.3));
    gl.uniform1f(uS, canvas.height * (wide ? 0.55 : 0.4));
    gl.uniform1f(uTime, t);
    gl.uniform1f(uLx, light);
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

  const ro = new ResizeObserver(size);
  ro.observe(canvas);
  const io = new IntersectionObserver((entries) => (visible = entries.some((e) => e.isIntersecting)));
  io.observe(canvas);
  size();
  if (!still) {
    raf = requestAnimationFrame(loop);
    addEventListener("pointermove", move, { passive: true });
  }

  return () => {
    cancelAnimationFrame(raf);
    removeEventListener("pointermove", move);
    ro.disconnect();
    io.disconnect();
  };
}

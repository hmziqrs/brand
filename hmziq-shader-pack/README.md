# hmziq Texture Lab

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

## Included files
- hmziq-shader-studio.html: the self-contained interactive lab.
- materials.wgsl: all 30 material algorithms and the mixer.
- textures/: 44 GPU-rendered, opaque, 960 × 600 PNG starting looks. Export larger versions from the lab, up to 4096 pixels wide.
- recipes/: matching per-look JSON uniforms, plus a collection. Import a single recipe file using Load recipe.
- texture-preview.jpg: contact sheet of all starting looks.
- source/: editable interface code, presets, embedded thumbnails, and the licensed Onest font. Run `python3 source/build.py` from this folder to rebuild the standalone HTML. Python standard library only.
- VERIFICATION.md: the rendering and interaction checks performed.

The included PNGs are snapshots at time 0. Recipe uniform dimensions match those PNGs. When rendering the shader in your own app, update slot 0 width and height to the current target dimensions.

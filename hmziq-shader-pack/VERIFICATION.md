# Verification

Verified on 2026-09-29 with Chromium 133 / SwiftShader Vulkan.

- WGSL compiled and WebGPU initialized
- 44 looks, 30 algorithms, 24 preserved palettes and complete preview images
- New, Previous, Original, Monochrome and All gallery filters
- Both monochrome directions render and Reverse palette restores the prior output
- Keep palette preserves custom colors; disabling it restores factory colors
- All 32 previous-version recipes still import
- Layer selection, algorithm, blend and amount alter rendered pixels
- Seed and palette controls update the material
- Comparison and editable section preview work
- Saved look restores edited recipe
- Portable recipe export and import round-trip
- Normal-map PNG download completes through the UI
- WGSL source download matches the rendered shader
- Surface, height, normal and pigment produce distinct exports
- Animation advances and pauses
- Reduced-motion preference disables playback
- No automated WCAG A/AA violations
- 390px and 320px layouts have no horizontal overflow
- No runtime errors or external asset requests
- Unsupported browser shows selectable stills and disables live controls
- All previous 32 recipes and GPU-rendered pixels exactly match version 2

All 44 supplied PNGs were rendered from the included WGSL. The downloaded normal map was decoded and checked for correct dimensions, varying RGB values, and opaque alpha. Desktop and mobile layouts were visually inspected.

The browser implementation was tested with WebGPU via a software Vulkan adapter. Native Rust wgpu integration, Metal, and other hardware/browser combinations were not executed. Automated accessibility checks do not replace a complete manual audit.

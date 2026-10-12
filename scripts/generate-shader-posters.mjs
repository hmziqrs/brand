import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const require = createRequire(import.meta.url);
const coreDir = path.join(root, 'packages/brand-core');
const sourceDir = path.join(root, 'hmziq-shader-pack/textures');
const outputDir = path.join(coreDir, 'shader-textures');
const presetPath = path.join(coreDir, 'src/shaders/presets.json');
const presetData = JSON.parse(await fs.readFile(presetPath, 'utf8'));
const presetIds = presetData.looks.map(({ id }) => id);
const outputSpecs = [
	{ suffix: '960', width: 960, quality: 85 },
	{ suffix: '480', width: 480, quality: 82 },
];
const storeEntries = (await fs.readdir(path.join(root, 'node_modules/.pnpm')))
	.filter((entry) => entry.startsWith('sharp@'))
	.sort();
let sharpPath;
for (const entry of storeEntries) {
	const candidate = path.join(root, 'node_modules/.pnpm', entry, 'node_modules/sharp');
	try {
		require.resolve(candidate);
		sharpPath = candidate;
		break;
	} catch {}
}

if (!sharpPath) throw new Error('Sharp is not present in the existing pnpm store.');
const sharp = require(sharpPath);
await fs.mkdir(outputDir, { recursive: true });

const hash = (bytes) => createHash('sha256').update(bytes).digest('hex');
const pascal = (id) => id.split('-').map((part) => part[0].toUpperCase() + part.slice(1)).join('');
const sourcePngSha256 = {};
const generatedFiles = [];

for (const id of presetIds) {
	const sourcePath = path.join(sourceDir, `${id}.png`);
	const sourceBytes = await fs.readFile(sourcePath);
	sourcePngSha256[id] = hash(sourceBytes);
	for (const { suffix, width, quality } of outputSpecs) {
		const relativePath = `packages/brand-core/shader-textures/${id}-${suffix}.webp`;
		const outputPath = path.join(root, relativePath);
		await sharp(sourceBytes).resize({ width }).webp({ quality }).toFile(outputPath);
		generatedFiles.push({ path: relativePath, sha256: hash(await fs.readFile(outputPath)) });
	}
}

const oxideSource = path.join(sourceDir, 'oxide-bloom.png');
const oxideOutput = path.join(outputDir, 'oxide-bloom.png');
await fs.copyFile(oxideSource, oxideOutput);
generatedFiles.push({ path: 'packages/brand-core/shader-textures/oxide-bloom.png', sha256: hash(await fs.readFile(oxideOutput)) });

const imports = presetIds.flatMap((id) => [
	`import ${pascal(id)}960 from './shader-textures/${id}-960.webp?url';`,
	`import ${pascal(id)}480 from './shader-textures/${id}-480.webp?url';`,
]);
const entries = presetIds.map((id) =>
	`\t'${id}': { src: ${pascal(id)}960, srcset: \`${'${'}${pascal(id)}480} 480w, ${'${'}${pascal(id)}960} 960w\`, width: 960, height: 600 },`,
);
const jsSource = [
	...imports,
	"import oxideBloomPng from './shader-textures/oxide-bloom.png?url';",
	'',
	'export const shaderPosters = {',
	...entries,
	'};',
	'',
	'export const shaderPng = oxideBloomPng;',
	'',
].join('\n');
const declaration = [
	'export declare const shaderPosters: Record<string, { src: string; srcset: string; width: number; height: number }>',
	'export declare const shaderPng: string',
	'',
].join('\n');

for (const [relativePath, contents] of [
	['packages/brand-core/shader-posters.js', jsSource],
	['packages/brand-core/shader-posters.d.ts', declaration],
]) {
	const outputPath = path.join(root, relativePath);
	await fs.writeFile(outputPath, contents);
	generatedFiles.push({ path: relativePath, sha256: hash(Buffer.from(contents)) });
}

const manifest = {
	outputs: outputSpecs.map(({ suffix, width, quality }) => ({ suffix, width, height: width * 5 / 8, quality, format: 'webp' })),
	presetIds,
	sourcePngSha256,
	generatedFiles,
};
await fs.writeFile(path.join(coreDir, 'shader-posters-manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);

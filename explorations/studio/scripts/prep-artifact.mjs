import { readFileSync, writeFileSync, rmSync, cpSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const build = join(root, 'build');
const out = process.argv[2] ?? join(root, 'artifact');

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
cpSync(join(build, 'kit'), join(out, 'kit'), { recursive: true });

const html = readFileSync(join(build, 'index.html'), 'utf8').replaceAll('"/kit/', '"./kit/');
const head = html.match(/<head>([\s\S]*?)<\/head>/)[1].replace(/<meta charset[^>]*>\s*/, '').replace(/<meta name="viewport"[^>]*>\s*/, '');
const body = html.match(/<body>([\s\S]*?)<\/body>/)[1];
writeFileSync(join(out, 'index.html'), `${head.trim()}\n${body.trim()}\n`);

const files = [];
const walk = (d) => {
	for (const f of readdirSync(d)) {
		const p = join(d, f);
		if (statSync(p).isDirectory()) walk(p);
		else if ((/\.woff$/.test(f) && readdirSync(d).some((g) => g.endsWith('.woff2') && g.startsWith(f.split('.')[0] + '.'))) || /-(cyrillic|cyrillic-ext|greek|greek-ext|vietnamese|math|symbols2?)-[^/]*\.woff2$/.test(f)) rmSync(p);
		else files.push(p.slice(out.length + 1));
	}
};
walk(join(out, 'kit'));
writeFileSync(join(out, 'files.json'), JSON.stringify(files));
console.log(`${files.length} files, page at ${join(out, 'index.html')}`);

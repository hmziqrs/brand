import { chromium } from 'playwright';
const [,, url, out, mode = 'dark', full = '0', width = '1440'] = process.argv;
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: +width, height: +width < 800 ? 860 : 900 } });
const p = await ctx.newPage();
const errs = [];
p.on('pageerror', e => errs.push(e.message));
p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
const [theme, oxide = 'a'] = mode.split(':');
await p.addInitScript(([m, o]) => { try { localStorage.setItem('studio-theme', m); localStorage.setItem('studio-oxide', o); } catch {} }, [theme, oxide]);
await p.goto(url, { waitUntil: 'networkidle', timeout: 90000 }).catch(e => errs.push('nav ' + e.message));
await p.waitForTimeout(2500);
await p.addStyleTag({ content: '.studio-bar{display:none!important}' });
await p.evaluate(async () => {
	for (let y = 0; y < document.documentElement.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); }
	window.scrollTo(0, 0);
});
await p.waitForTimeout(1200);
await p.screenshot({ path: out, type: 'jpeg', quality: 75, fullPage: full === '1' });
console.log(out, errs.length ? 'ERRORS:\n' + errs.join('\n') : 'no errors');
await b.close();

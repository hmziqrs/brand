import type { AccentFont, Hue, Light, Sans } from './swaps';

const store = (k: string, v: string) => {
	try {
		localStorage.setItem(k, v);
	} catch {}
};

class Prefs {
	dark = $state(true);
	oxide = $state<Light>('e');
	sans = $state<Sans>('onest');
	serif = $state<AccentFont>('page');
	hue = $state<Hue>('oxide');

	readonly colorKey = $derived(`${this.dark}:${this.oxide}:${this.hue}`);

	init() {
		const d = document.documentElement.dataset;
		this.dark = document.documentElement.classList.contains('dark');
		this.oxide = d.light === 'e' ? 'e' : ((d.oxide as Light) ?? 'e');
		this.sans = (d.sans as Sans) ?? 'onest';
		this.serif = (d.serif as AccentFont) ?? 'page';
		this.hue = (d.hue as Hue) ?? 'oxide';
	}

	toggleTheme() {
		this.dark = !this.dark;
		document.documentElement.classList.toggle('dark', this.dark);
		store('studio-theme', this.dark ? 'dark' : 'light');
	}

	setOxide(o: Light) {
		this.oxide = o;
		const d = document.documentElement.dataset;
		if (o === 'e') d.light = 'e';
		else delete d.light;
		d.oxide = o === 'e' ? 'b' : o;
		store('studio-light', o);
	}

	setSans(s: Sans) {
		this.sans = s;
		const d = document.documentElement.dataset;
		if (s === 'onest') delete d.sans;
		else d.sans = s;
		store('studio-sans', s);
	}

	setSerif(s: AccentFont) {
		this.serif = s;
		const d = document.documentElement.dataset;
		if (s === 'page') delete d.serif;
		else d.serif = s;
		store('studio-serif', s);
	}

	setHue(h: Hue) {
		this.hue = h;
		const d = document.documentElement.dataset;
		if (h === 'oxide') delete d.hue;
		else d.hue = h;
		d.oxide = d.oxide ?? 'a';
		store('studio-hue', h);
	}
}

export const prefs = new Prefs();

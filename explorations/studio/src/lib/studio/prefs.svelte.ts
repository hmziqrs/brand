class Prefs {
	dark = $state(true);
	oxide = $state<'a' | 'b' | 'c'>('a');

	init() {
		this.dark = document.documentElement.classList.contains('dark');
		this.oxide = (document.documentElement.dataset.oxide as 'a' | 'b' | 'c') ?? 'a';
	}

	toggleTheme() {
		this.dark = !this.dark;
		document.documentElement.classList.toggle('dark', this.dark);
		try {
			localStorage.setItem('studio-theme', this.dark ? 'dark' : 'light');
		} catch {}
	}

	setOxide(o: 'a' | 'b' | 'c') {
		this.oxide = o;
		document.documentElement.dataset.oxide = o;
		try {
			localStorage.setItem('studio-oxide', o);
		} catch {}
	}
}

export const prefs = new Prefs();

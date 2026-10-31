export type Verdict = 'keep' | 'nuke' | 'star' | undefined;

type Row = { id: string; v?: Verdict | null; note?: string };
type Db = {
	collection(path: string): { onSnapshot(next: (s: { docs: { data(): Record<string, unknown> | undefined }[] }) => void, err?: (e: unknown) => void): () => void };
	doc(path: string): { set(data: Record<string, unknown>): Promise<void> };
};

const KEY = 'studio-verdicts';
const docId = (id: string) => encodeURIComponent(id).replace(/%/g, '_');

class Verdicts {
	all = $state<Record<string, Verdict>>({});
	notes = $state<Record<string, string>>({});
	synced = $state(false);
	#db: Db | null = null;
	#timers = new Map<string, ReturnType<typeof setTimeout>>();

	init() {
		try {
			this.all = JSON.parse(localStorage.getItem(KEY) ?? '{}');
			this.notes = JSON.parse(localStorage.getItem(KEY + '-notes') ?? '{}');
		} catch {}
		const claude = (window as unknown as { claude?: { use(n: string): Promise<unknown> } }).claude;
		claude
			?.use('db')
			.then((db) => {
				if (!db) return;
				this.#db = db as Db;
				this.#db.collection('verdicts').onSnapshot(
					(snap) => {
						for (const d of snap.docs) {
							const r = d.data() as Row | undefined;
							if (!r?.id) continue;
							this.all[r.id] = r.v ?? undefined;
							if (r.note !== undefined) this.notes[r.id] = r.note;
						}
						this.synced = true;
						this.#local();
					},
					() => (this.synced = false)
				);
			})
			.catch(() => {});
	}

	set(id: string, v: Verdict) {
		this.all[id] = this.all[id] === v ? undefined : v;
		this.#save(id, 0);
	}

	note(id: string, text: string) {
		this.notes[id] = text;
		this.#save(id, 700);
	}

	#local() {
		try {
			localStorage.setItem(KEY, JSON.stringify(this.all));
			localStorage.setItem(KEY + '-notes', JSON.stringify(this.notes));
		} catch {}
	}

	#save(id: string, delay: number) {
		this.#local();
		if (!this.#db) return;
		clearTimeout(this.#timers.get(id));
		this.#timers.set(
			id,
			setTimeout(() => {
				this.#db
					?.doc(`verdicts/${docId(id)}`)
					.set({ id, v: this.all[id] ?? null, note: this.notes[id] ?? '', at: Date.now() })
					.catch(() => {});
			}, delay)
		);
	}

	report() {
		const ids = new Set([...Object.keys(this.all), ...Object.keys(this.notes)]);
		const lines: string[] = [];
		for (const v of ['star', 'keep', 'nuke'] as const) {
			const hit = [...ids].filter((id) => this.all[id] === v);
			if (hit.length) lines.push(`${v.toUpperCase()}:`, ...hit.map((id) => `  ${id}${this.notes[id] ? ` — ${this.notes[id]}` : ''}`));
		}
		const loose = [...ids].filter((id) => !this.all[id] && this.notes[id]);
		if (loose.length) lines.push('NOTES:', ...loose.map((id) => `  ${id} — ${this.notes[id]}`));
		return lines.join('\n');
	}
}

export const verdicts = new Verdicts();

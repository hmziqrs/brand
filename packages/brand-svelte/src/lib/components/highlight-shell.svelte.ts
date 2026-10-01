/*
 * Shell commands, highlighted the way people scan them: the program in the
 * function color, flags in the keyword color, quoted text in the string
 * color. The same --code-* tokens Shiki uses for everything else.
 *
 * The React lab returns nodes; here each part is a { text, tone } pair and
 * the component paints it, so no framework types leak into the kit.
 */
const shellToken = /("(?:[^"\\]|\\.)*")|(\s--?[\w-]+)/g;

export type ShellPart = { text: string; tone?: "function" | "string" | "keyword" };

export function highlightShell(command: string): ShellPart[] {
	const [program, ...rest] = command.split(/(?=\s)/);
	const tail = rest.join("");
	const parts: ShellPart[] = [{ text: program, tone: "function" }];
	let last = 0;
	for (const m of tail.matchAll(shellToken)) {
		parts.push({ text: tail.slice(last, m.index) });
		parts.push({ text: m[0], tone: m[1] ? "string" : "keyword" });
		last = m.index + m[0].length;
	}
	parts.push({ text: tail.slice(last) });
	return parts;
}

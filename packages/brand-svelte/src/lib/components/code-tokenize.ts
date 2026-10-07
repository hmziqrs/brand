/*
 * Code colors come from the --code-* tokens in theme.css through Shiki's
 * css-variables theme, so highlighting follows light/dark and the brand
 * color. The theme itself is core's code-theme.ts. Add a language by
 * importing it from "shiki/langs/<name>.mjs" below.
 */
import { createHighlighterCoreSync } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";
import bash from "shiki/langs/bash.mjs";
import json from "shiki/langs/json.mjs";
import python from "shiki/langs/python.mjs";
import rust from "shiki/langs/rust.mjs";
import svelte from "shiki/langs/svelte.mjs";
import toml from "shiki/langs/toml.mjs";
import typescript from "shiki/langs/typescript.mjs";
import { hmziqCode } from "@hmziq/brand-core/code-theme";

export type CodeLanguage = "bash" | "json" | "python" | "rust" | "svelte" | "toml" | "typescript" | "text";
export type Token = { content: string; color?: string };

const highlighter = createHighlighterCoreSync({
	themes: [hmziqCode],
	langs: [bash, json, python, rust, svelte, toml, typescript],
	engine: createJavaScriptRegexEngine(),
});

export function tokenize(code: string, lang: CodeLanguage): Token[][] {
	if (lang === "text") return code.split("\n").map((line) => [{ content: line }]);
	return highlighter.codeToTokens(code, { lang, theme: "hmziq" }).tokens;
}

export type CodeFile = { label: string; code: string; lang?: CodeLanguage };

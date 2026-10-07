import { getContext, setContext } from "svelte";

export type QuestionnaireItemStatus = "unanswered" | "answered" | "skipped";
export type QuestionnaireShortcutMode = "letters" | "numbers";
export type QuestionnaireInputType =
	| "date"
	| "datetime-local"
	| "email"
	| "month"
	| "number"
	| "password"
	| "search"
	| "tel"
	| "text"
	| "time"
	| "url"
	| "week";
export type QuestionnaireChoiceDefinition = { disabled?: boolean; value: string };
export type QuestionnaireItemDefinition = {
	choices?: readonly QuestionnaireChoiceDefinition[];
	disabled?: boolean;
	name: string;
	required?: boolean;
};
export type QuestionnaireCollection = {
	enabledItems: QuestionnaireItemDefinition[];
	itemByName: Map<string, QuestionnaireItemDefinition>;
	items: readonly QuestionnaireItemDefinition[];
};
export type QuestionnaireAnswerControl = {
	disabled: boolean;
	element: HTMLElement;
	id: string;
	ownDisabled?: boolean;
	type: "choice" | "input";
	value?: string;
};
export type QuestionnaireItemOptions = {
	disabled: boolean;
	invalid: boolean;
	multiple: boolean;
	name: string;
	required: boolean;
};
export type QuestionnaireControllerOptions = {
	defaultItem?: string;
	item?: string;
	items?: readonly QuestionnaireItemDefinition[];
	noValidate?: boolean;
	onItemChange?: (item: string) => void;
	onReset?: (event: Event) => void;
	onSubmit?: (event: SubmitEvent) => void;
	shortcuts?: QuestionnaireShortcutMode;
};

export const hasValue = (value: unknown): boolean =>
	Array.isArray(value)
		? value.some((entry) => String(entry).trim().length > 0)
		: value != null && String(value).trim().length > 0;

const shortcutTokens = (mode: QuestionnaireShortcutMode | null) =>
	mode === "letters"
		? Array.from({ length: 26 }, (_, index) => String.fromCharCode(65 + index))
		: mode === "numbers"
			? Array.from({ length: 9 }, (_, index) => String(index + 1))
			: [];

const shortcutTokenForKey = (key: string, mode: QuestionnaireShortcutMode) => {
	const token = mode === "letters" ? key.toUpperCase() : key;
	return shortcutTokens(mode).includes(token) ? token : null;
};

export const ariaKeyShortcuts = (shortcut: string | null, enter: boolean) =>
	[shortcut, enter ? "Enter" : null].filter(Boolean).join(" ") || undefined;

const isAnsweredControl = (control: QuestionnaireAnswerControl) =>
	control.type === "choice"
		? (control.element as HTMLInputElement).checked
		: control.element.hasAttribute("name") && hasValue((control.element as HTMLInputElement).value);

const isEmptyTextControl = (control: QuestionnaireAnswerControl | null) =>
	control?.type === "input" &&
	["email", "password", "search", "tel", "text", "url"].includes((control.element as HTMLInputElement).type) &&
	!hasValue((control.element as HTMLInputElement).value);

const isTextLike = (element: Element) =>
	element instanceof HTMLTextAreaElement || element instanceof HTMLSelectElement
		? true
		: element instanceof HTMLInputElement
			? !["button", "checkbox", "radio", "reset", "submit"].includes(element.type)
			: element instanceof HTMLElement && element.isContentEditable;

const isRadio = (element: Element): element is HTMLInputElement =>
	element instanceof HTMLInputElement && element.type === "radio";

const byDocumentPosition = (a: { element: HTMLElement | null }, b: { element: HTMLElement | null }) => {
	if (a.element === b.element || !a.element || !b.element) return 0;
	const position = a.element.compareDocumentPosition(b.element);
	return position & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : position & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0;
};

const collectionOf = (items: readonly QuestionnaireItemDefinition[] | undefined): QuestionnaireCollection | null =>
	items === undefined
		? null
		: {
				enabledItems: items.filter((item) => !item.disabled),
				itemByName: new Map(items.map((item) => [item.name, item])),
				items,
			};

const initialItemName = (collection: QuestionnaireCollection | null, preferred: string | undefined): string | null => {
	if (!collection) return preferred ?? null;
	if (preferred) {
		const item = collection.itemByName.get(preferred);
		if (item && !item.disabled) return item.name;
	}
	return collection.enabledItems[0]?.name ?? null;
};

const shortcutMapFromDefinition = (definition: QuestionnaireItemDefinition, mode: QuestionnaireShortcutMode | null) => {
	const map = new Map<string, string>();
	if (!mode) return map;
	const tokens = shortcutTokens(mode);
	let index = 0;
	for (const choice of definition.choices ?? []) {
		if (choice.disabled) continue;
		const token = tokens[index];
		if (!token) break;
		map.set(choice.value, token);
		index += 1;
	}
	return map;
};

export class QuestionnaireItemController {
	readonly root: QuestionnaireController;
	name = $state("");
	disabled = $state(false);
	invalidProp = $state(false);
	multiple = $state(false);
	required = $state(false);

	element: HTMLFieldSetElement | null = $state(null);
	answerControls = $state<QuestionnaireAnswerControl[]>([]);
	attempted = $state(false);
	selectedAnswerIds = $state<string[]>([]);
	skipped = $state(false);
	resetVersion = $state(0);
	descriptionIds = $state<string[]>([]);
	errorIds = $state<string[]>([]);
	prevStatus: QuestionnaireItemStatus = "unanswered";
	private defaults: string[] = [];
	private prevMultiple: boolean;

	constructor(root: QuestionnaireController, options: QuestionnaireItemOptions) {
		this.root = root;
		this.name = options.name;
		this.disabled = options.disabled;
		this.invalidProp = options.invalid;
		this.multiple = options.multiple;
		this.required = options.required;
		this.prevMultiple = options.multiple;
	}

	sortedControls = $derived.by(() => {
		void this.root.domVersion;
		return [...this.answerControls].sort(byDocumentPosition);
	});
	enabledControls = $derived(this.sortedControls.filter((control) => !control.disabled));
	hasSelection = $derived(this.enabledControls.some((control) => this.selectedAnswerIds.includes(control.id)));
	status = $derived<QuestionnaireItemStatus>(this.skipped ? "skipped" : this.hasSelection ? "answered" : "unanswered");
	canSkip = $derived(this.status === "skipped" && !this.required);
	consideredValid = $derived(this.disabled || this.canSkip || (!this.invalidProp && this.status === "answered"));
	invalid = $derived(!this.disabled && !this.canSkip && (this.invalidProp || (this.attempted && !this.consideredValid)));
	hasInputAnswer = $derived(this.enabledControls.some((control) => control.type === "input"));
	active = $derived.by(() => !this.disabled && this.root.currentItemName === this.name);
	shortcuts = $derived.by(() => this.root.shortcuts);
	definition = $derived.by(() => this.root.itemDefinitionByName?.get(this.name) ?? null);
	shortcutByChoiceValue = $derived.by(() =>
		this.definition ? shortcutMapFromDefinition(this.definition, this.root.shortcuts) : null
	);
	shortcutByAnswerId = $derived.by(() => {
		if (this.shortcutByChoiceValue) return new Map<string, string>();
		const tokens = shortcutTokens(this.root.shortcuts);
		const choices = this.enabledControls.filter((control) => control.type === "choice").slice(0, tokens.length);
		return new Map(choices.map((control, index) => [control.id, tokens[index]!]));
	});

	syncProps(options: QuestionnaireItemOptions) {
		this.name = options.name;
		this.disabled = options.disabled;
		this.invalidProp = options.invalid;
		this.multiple = options.multiple;
		this.required = options.required;
	}

	private setSelection(id: string, selected: boolean) {
		this.selectedAnswerIds = selected
			? this.multiple
				? this.selectedAnswerIds.includes(id)
					? this.selectedAnswerIds
					: [...this.selectedAnswerIds, id]
				: [id]
			: this.selectedAnswerIds.filter((entry) => entry !== id);
	}

	setAnswerSelectionFromInteraction(id: string, selected: boolean) {
		this.skipped = false;
		this.setSelection(id, selected);
	}

	syncControlledAnswerSelection(id: string, selected: boolean) {
		if (selected) this.skipped = false;
		this.setSelection(id, selected);
	}

	registerAnswerSelection(id: string, defaultSelected: boolean): () => void {
		if (defaultSelected) {
			this.defaults = [...this.defaults.filter((entry) => entry !== id), id];
			this.selectedAnswerIds = this.multiple
				? this.selectedAnswerIds.includes(id)
					? this.selectedAnswerIds
					: [...this.selectedAnswerIds, id]
				: this.selectedAnswerIds.length
					? this.selectedAnswerIds
					: [id];
		}
		return () => {
			this.defaults = this.defaults.filter((entry) => entry !== id);
			this.selectedAnswerIds = this.selectedAnswerIds.filter((entry) => entry !== id);
		};
	}

	setAnswerDefault(id: string, defaultSelected: boolean) {
		this.defaults = defaultSelected
			? this.defaults.includes(id)
				? this.defaults
				: [...this.defaults, id]
			: this.defaults.filter((entry) => entry !== id);
	}

	registerAnswerControl(control: QuestionnaireAnswerControl): () => void {
		this.answerControls = [
			...this.answerControls.filter((entry) => entry.element !== control.element && entry.id !== control.id),
			control,
		];
		return () => {
			this.answerControls = this.answerControls.filter((entry) => entry !== control);
		};
	}

	registerDescription(id: string): () => void {
		this.descriptionIds = this.descriptionIds.includes(id) ? this.descriptionIds : [...this.descriptionIds, id];
		return () => {
			this.descriptionIds = this.descriptionIds.filter((entry) => entry !== id);
		};
	}

	registerError(id: string): () => void {
		this.errorIds = this.errorIds.includes(id) ? this.errorIds : [...this.errorIds, id];
		return () => {
			this.errorIds = this.errorIds.filter((entry) => entry !== id);
		};
	}

	syncMultipleTransition() {
		const previous = this.prevMultiple;
		this.prevMultiple = this.multiple;
		if (!previous || this.multiple) return;
		const first = this.enabledControls.find((control) => this.selectedAnswerIds.includes(control.id));
		this.selectedAnswerIds = first ? [first.id] : [];
	}

	validate() {
		this.attempted = true;
		if (!this.consideredValid) return false;
		if (!this.root.nativeValidation) return true;
		const control = this.enabledControls.find(
			(control) =>
				isAnsweredControl(control) &&
				(control.element as HTMLInputElement).willValidate &&
				!(control.element as HTMLInputElement).validity.valid
		);
		if (control) {
			control.element.focus();
			(control.element as HTMLInputElement).reportValidity();
			return false;
		}
		return true;
	}

	focus() {
		this.element?.focus();
	}

	focusInvalid() {
		const filled = this.element?.querySelector<HTMLInputElement>("input[data-filled][name]:not(:disabled)");
		const control = this.element?.querySelector<HTMLInputElement>(
			"input:not([type=hidden]):not(:disabled), textarea:not(:disabled)"
		);
		(filled ?? control ?? this.element)?.focus();
	}

	reset() {
		this.attempted = false;
		this.skipped = false;
		this.selectedAnswerIds = this.multiple ? [...this.defaults] : this.defaults.slice(0, 1);
		this.resetVersion += 1;
	}

	skip() {
		if (this.required) return;
		this.selectedAnswerIds = [];
		this.skipped = true;
	}

	getAnswerByElement(element: Element) {
		return this.enabledControls.find((control) => control.element === element) ?? null;
	}

	getAnswerByShortcut(token: string) {
		if (this.shortcutByChoiceValue) {
			const value = Array.from(this.shortcutByChoiceValue.entries()).find(([, entry]) => entry === token)?.[0];
			return this.enabledControls.find((control) => control.type === "choice" && control.value === value) ?? null;
		}
		const id = Array.from(this.shortcutByAnswerId.entries()).find(([, entry]) => entry === token)?.[0];
		return this.enabledControls.find((control) => control.id === id) ?? null;
	}

	moveAnswerFocus(element: Element, direction: "next" | "previous") {
		const controls = this.enabledControls;
		const index = controls.findIndex((control) => control.element === element);
		const current = index < 0 ? null : (controls[index] ?? null);
		if (
			!controls.length ||
			(isTextLike(element) && !isEmptyTextControl(current)) ||
			(index < 0 && element !== this.element)
		) {
			return false;
		}
		const next =
			index < 0
				? (controls.find(isAnsweredControl) ??
					(direction === "next" ? controls[0] : controls[controls.length - 1]))
				: controls[(index + (direction === "next" ? 1 : -1) + controls.length) % controls.length];
		if (!next || next.element === element || (index >= 0 && isRadio(element) && isRadio(next.element))) return false;
		next.element.focus();
		if (next.type === "choice" && isRadio(next.element)) next.element.click();
		return true;
	}
}

export class QuestionnaireController {
	collection = $state<QuestionnaireCollection | null>(null);
	defaultItem = $state<string | undefined>(undefined);
	itemProp = $state<string | undefined>(undefined);
	shortcuts = $state<QuestionnaireShortcutMode | null>(null);
	nativeValidation = $state(true);
	onItemChange: ((item: string) => void) | undefined;
	onReset: ((event: Event) => void) | undefined;
	onSubmit: ((event: SubmitEvent) => void) | undefined;

	renderedItems = $state<QuestionnaireItemController[]>([]);
	uncontrolledItemName = $state<string | null>(null);
	formElement = $state<HTMLFormElement | null>(null);
	domVersion = $state(0);
	intent: { name: string; target: "item" | "invalid" } | null = null;
	previousName: string | null | undefined;

	constructor(options: QuestionnaireControllerOptions) {
		this.collection = collectionOf(options.items);
		this.defaultItem = options.defaultItem;
		this.itemProp = options.item;
		this.shortcuts = options.shortcuts ?? null;
		this.nativeValidation = options.noValidate !== false;
		this.onItemChange = options.onItemChange;
		this.onReset = options.onReset;
		this.onSubmit = options.onSubmit;
		this.uncontrolledItemName = initialItemName(this.collection, options.defaultItem);
		this.previousName = options.item !== undefined ? options.item : this.uncontrolledItemName;
	}

	syncProps(options: QuestionnaireControllerOptions) {
		this.collection = collectionOf(options.items);
		this.defaultItem = options.defaultItem;
		this.itemProp = options.item;
		this.shortcuts = options.shortcuts ?? null;
		this.nativeValidation = options.noValidate !== false;
		this.onItemChange = options.onItemChange;
		this.onReset = options.onReset;
		this.onSubmit = options.onSubmit;
	}

	controlled = $derived(this.itemProp !== undefined);
	currentItemName = $derived(this.controlled ? this.itemProp! : this.uncontrolledItemName);
	itemDefinitionByName = $derived(this.collection?.itemByName ?? null);
	sortedRendered = $derived.by(() => {
		void this.domVersion;
		return this.renderedItems.filter((item) => !item.disabled).sort(byDocumentPosition);
	});
	renderedByName = $derived(new Map(this.sortedRendered.map((item) => [item.name, item])));
	enabledNames = $derived(
		this.collection ? this.collection.enabledItems.map((item) => item.name) : this.sortedRendered.map((item) => item.name)
	);
	currentIndex = $derived(this.enabledNames.indexOf(this.currentItemName ?? ""));
	activeRenderedItem = $derived(
		this.currentIndex < 0 || !this.currentItemName ? null : (this.renderedByName.get(this.currentItemName) ?? null)
	);
	activeDefinition = $derived(this.currentItemName ? this.itemDefinitionByName?.get(this.currentItemName) : undefined);
	activeItemRequired = $derived(
		this.currentIndex < 0 ? null : this.activeDefinition ? !!this.activeDefinition.required : (this.activeRenderedItem?.required ?? false)
	);
	activeItemStatus = $derived(
		this.currentIndex < 0 ? null : (this.activeRenderedItem?.status ?? (this.currentItemName ? "unanswered" : null))
	);
	orderedItems = $derived(
		this.collection
			? this.collection.enabledItems.flatMap((definition) => {
					const item = this.renderedByName.get(definition.name);
					return item ? [item] : [];
				})
			: this.sortedRendered
	);
	total = $derived(this.enabledNames.length);
	currentNumber = $derived(this.currentIndex < 0 ? 0 : this.currentIndex + 1);
	first = $derived(this.total > 0 && this.currentIndex === 0);
	last = $derived(this.total > 0 && this.currentIndex === this.total - 1);

	registerItem(item: QuestionnaireItemController): () => void {
		this.renderedItems = [...this.renderedItems.filter((entry) => entry.element !== item.element && entry.name !== item.name), item];
		return () => {
			this.renderedItems = this.renderedItems.filter((entry) => entry !== item);
		};
	}

	setItem(name: string, target: "item" | "invalid" = "item") {
		if (name === this.currentItemName) return;
		this.intent = { name, target };
		if (!this.controlled) this.uncontrolledItemName = name;
		this.onItemChange?.(name);
	}

	goPrevious() {
		if (this.currentIndex <= 0) return;
		this.setItem(this.enabledNames[this.currentIndex - 1]!);
	}

	goNext() {
		const item = this.activeRenderedItem;
		if (!item || this.currentIndex >= this.total - 1) return;
		if (!item.validate()) {
			item.focusInvalid();
			return;
		}
		this.setItem(this.enabledNames[this.currentIndex + 1]!);
	}

	goNextOrSubmit() {
		const item = this.activeRenderedItem;
		if (!item) return;
		if (!item.validate()) {
			item.focusInvalid();
			return;
		}
		if (this.last) {
			this.formElement?.requestSubmit();
			return;
		}
		this.setItem(this.enabledNames[this.currentIndex + 1]!);
	}

	skipCurrent() {
		const item = this.activeRenderedItem;
		if (!item || item.required) return;
		item.skip();
		if (!this.last) {
			this.setItem(this.enabledNames[this.currentIndex + 1]!);
			return;
		}
		queueMicrotask(() => {
			this.formElement?.requestSubmit();
		});
	}

	handleReset(event: Event) {
		this.onReset?.(event);
		if (event.defaultPrevented) return;
		for (const item of this.renderedItems) item.reset();
		const name = this.collection
			? initialItemName(this.collection, this.defaultItem)
			: (this.sortedRendered.find((item) => item.name === this.defaultItem)?.name ?? this.sortedRendered[0]?.name);
		if (name) this.setItem(name);
	}

	handleSubmit(event: SubmitEvent) {
		const invalidItem = this.orderedItems.find((item) => !item.validate());
		if (invalidItem) {
			event.preventDefault();
			this.setItem(invalidItem.name, "invalid");
			if (invalidItem.name === this.currentItemName) {
				invalidItem.focusInvalid();
				this.intent = null;
			}
			return;
		}
		this.onSubmit?.(event);
	}

	handleKeydown(event: KeyboardEvent) {
		if (event.defaultPrevented || event.isComposing || event.keyCode === 229) return;
		const item = this.activeRenderedItem;
		if (!item || !(event.target instanceof Element)) return;
		if (event.key === "Enter" && (event.metaKey || event.ctrlKey) && !event.altKey && !event.shiftKey) {
			event.preventDefault();
			if (!event.repeat) this.goNextOrSubmit();
			return;
		}
		if (event.metaKey || event.ctrlKey || event.altKey) return;
		if ((event.key === "ArrowUp" || event.key === "ArrowDown") && item.moveAnswerFocus(event.target, event.key === "ArrowDown" ? "next" : "previous")) {
			event.preventDefault();
			return;
		}
		if ((event.key === "ArrowLeft" || event.key === "ArrowRight") && !isTextLike(event.target) && !isRadio(event.target)) {
			event.preventDefault();
			if (event.repeat) return;
			if (event.key === "ArrowLeft") this.goPrevious();
			else if (item.status !== "unanswered") this.goNext();
			return;
		}
		if (event.key === "Enter") {
			const answer = item.getAnswerByElement(event.target);
			if (!answer) return;
			event.preventDefault();
			if (!event.repeat && isAnsweredControl(answer)) this.goNextOrSubmit();
			return;
		}
		if (!this.shortcuts || isTextLike(event.target)) return;
		const token = shortcutTokenForKey(event.key, this.shortcuts);
		const answer = token ? item.getAnswerByShortcut(token) : null;
		if (answer) {
			event.preventDefault();
			if (!event.repeat) {
				answer.element.focus();
				if (answer.type === "choice") (answer.element as HTMLInputElement).click();
			}
		}
	}
}

const QUESTIONNAIRE_ROOT_KEY = Symbol.for("hmziq-questionnaire");
const QUESTIONNAIRE_ITEM_KEY = Symbol.for("hmziq-questionnaire-item");

export function setQuestionnaire(options: QuestionnaireControllerOptions) {
	return setContext(QUESTIONNAIRE_ROOT_KEY, new QuestionnaireController(options));
}

export function useQuestionnaireController(caller = "useQuestionnaire") {
	const controller = getContext<QuestionnaireController>(QUESTIONNAIRE_ROOT_KEY);
	if (!controller) throw new Error(`${caller} must be used within a Questionnaire.Root component.`);
	return controller;
}

export function setQuestionnaireItem(root: QuestionnaireController, options: QuestionnaireItemOptions) {
	return setContext(QUESTIONNAIRE_ITEM_KEY, new QuestionnaireItemController(root, options));
}

export function useQuestionnaireItemController(caller = "useQuestionnaireItem") {
	const controller = getContext<QuestionnaireItemController>(QUESTIONNAIRE_ITEM_KEY);
	if (!controller) throw new Error(`${caller} must be used within a Questionnaire.Item component.`);
	return controller;
}

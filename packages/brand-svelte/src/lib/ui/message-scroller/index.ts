import Provider from "./message-scroller-provider.svelte";
import Root from "./message-scroller.svelte";
import Viewport from "./message-scroller-viewport.svelte";
import Content from "./message-scroller-content.svelte";
import Item from "./message-scroller-item.svelte";
import Button from "./message-scroller-button.svelte";
import {
	useMessageScroller,
	useMessageScrollerScrollable,
	useMessageScrollerVisibility,
} from "./context.svelte.js";

export {
	Provider,
	Root,
	Viewport,
	Content,
	Item,
	Button,
	useMessageScroller,
	useMessageScrollerScrollable,
	useMessageScrollerVisibility,
	//
	Provider as MessageScrollerProvider,
	Root as MessageScroller,
	Viewport as MessageScrollerViewport,
	Content as MessageScrollerContent,
	Item as MessageScrollerItem,
	Button as MessageScrollerButton,
};

export type {
	MessageScrollerDefaultScrollPosition,
	MessageScrollerButtonDirection,
	MessageScrollerScrollAlign,
	MessageScrollerScrollOptions,
	MessageScrollerScrollable,
	MessageScrollerVisibilityState,
} from "./context.svelte.js";
export { MessageScrollerController } from "./context.svelte.js";

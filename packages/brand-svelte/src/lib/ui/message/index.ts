import Avatar from "./message-avatar.svelte";
import Content from "./message-content.svelte";
import Footer from "./message-footer.svelte";
import Group from "./message-group.svelte";
import Header from "./message-header.svelte";
import Root, { type MessageAlign } from "./message.svelte";

export {
	Root,
	Group,
	Avatar,
	Content,
	Header,
	Footer,
	type MessageAlign,
	//
	Root as Message,
	Group as MessageGroup,
	Avatar as MessageAvatar,
	Content as MessageContent,
	Header as MessageHeader,
	Footer as MessageFooter,
};

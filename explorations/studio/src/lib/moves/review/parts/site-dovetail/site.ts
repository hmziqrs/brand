import {
	siLinear,
	siJira,
	siNotion,
	siFigma,
	siZendesk,
	siIntercom,
	siHubspot,
	siGooglemeet,
	siZoom,
	siTypeform,
	siQualtrics,
	siClaude,
	siCursor,
	siGithub,
	siGoogleplay,
	siAppstore,
	siMiro,
	siConfluence,
	siGooglesheets,
	siGoogledrive,
	siGmail,
	siLoom,
	siTrustpilot,
	siSurveymonkey,
	siSnowflake,
	siAirtable,
	siX,
	siBluesky,
	siYoutube
} from 'simple-icons';

export const brand = 'Contextline';
export const base = '#/p/site-dovetail';
export const to = (slug: string) => `${base}/${slug}`;

export type Tool = { name: string; icon: { path: string } };

export const tools: Tool[] = [
	{ name: 'Zendesk', icon: siZendesk },
	{ name: 'Intercom', icon: siIntercom },
	{ name: 'HubSpot', icon: siHubspot },
	{ name: 'Google Meet', icon: siGooglemeet },
	{ name: 'Zoom', icon: siZoom },
	{ name: 'Typeform', icon: siTypeform },
	{ name: 'Qualtrics', icon: siQualtrics },
	{ name: 'Google Play', icon: siGoogleplay },
	{ name: 'App Store', icon: siAppstore },
	{ name: 'Trustpilot', icon: siTrustpilot },
	{ name: 'SurveyMonkey', icon: siSurveymonkey },
	{ name: 'Gmail', icon: siGmail },
	{ name: 'Loom', icon: siLoom },
	{ name: 'Google Drive', icon: siGoogledrive },
	{ name: 'Google Sheets', icon: siGooglesheets },
	{ name: 'Airtable', icon: siAirtable },
	{ name: 'Snowflake', icon: siSnowflake }
];

export const sinks: Tool[] = [
	{ name: 'Linear', icon: siLinear },
	{ name: 'Jira', icon: siJira },
	{ name: 'Notion', icon: siNotion },
	{ name: 'Figma', icon: siFigma },
	{ name: 'Confluence', icon: siConfluence },
	{ name: 'Miro', icon: siMiro },
	{ name: 'Claude', icon: siClaude },
	{ name: 'Cursor', icon: siCursor },
	{ name: 'GitHub', icon: siGithub }
];

export const social = [
	{ name: 'X', icon: siX },
	{ name: 'Bluesky', icon: siBluesky },
	{ name: 'YouTube', icon: siYoutube }
];

export const nav = [
	{ label: 'Product', href: to('product') },
	{ label: 'Customers', href: to('customers') },
	{ label: 'Pricing', href: to('pricing') },
	{ label: 'Company', href: to('about') },
	{ label: 'Blog', href: to('blog') }
];

export type Column = { title: string; links: { label: string; href: string; tag?: string }[] };

export const columns: Column[] = [
	{
		title: 'Platform',
		links: [
			{ label: 'Replicas', href: to('product'), tag: 'New' },
			{ label: 'Signals', href: to('product') },
			{ label: 'Agents', href: to('product') },
			{ label: 'Boards', href: to('product'), tag: 'Beta' },
			{ label: 'Studies', href: to('product') },
			{ label: 'Ask', href: to('product') },
			{ label: 'Briefs', href: to('product') },
			{ label: 'Pricing', href: to('pricing') }
		]
	},
	{
		title: 'Teams',
		links: [
			{ label: 'Design', href: to('home') },
			{ label: 'Research', href: to('home') },
			{ label: 'Product', href: to('home') },
			{ label: 'Support & CX', href: to('home') },
			{ label: 'Sales', href: to('home') },
			{ label: 'Marketing', href: to('home') }
		]
	},
	{
		title: 'Resources',
		links: [
			{ label: 'Blog', href: to('blog') },
			{ label: 'Field notes', href: to('post') },
			{ label: 'Changelog', href: to('blog') },
			{ label: 'Events', href: to('blog') },
			{ label: 'Help centre', href: to('contact') },
			{ label: 'Live tours', href: to('contact') }
		]
	},
	{
		title: 'Customers',
		links: [
			{ label: 'All stories', href: to('customers') },
			{ label: 'Banking', href: to('customers') },
			{ label: 'Hardware', href: to('customers') },
			{ label: 'Health', href: to('customers') },
			{ label: 'Software', href: to('customers') }
		]
	},
	{
		title: 'Company',
		links: [
			{ label: 'About & careers', href: to('about') },
			{ label: 'Book a demo', href: to('contact') },
			{ label: 'Talk to sales', href: to('contact') },
			{ label: 'Trust centre', href: to('pricing') }
		]
	}
];

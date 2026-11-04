import type { CvData } from "@hmziq/brand-core/cv-page";
import type { LabEntry, LabsIndexData } from "@hmziq/brand-core/labs-index";

export const cvData: CvData = {
	site: 'cv.hmziq.rs',
	updated: 'Updated on May 18, 2026',
	name: 'Hamza Iqbal',
	role: 'Full Stack Engineer | Rust, Flutter, React Native',
	about: [
		'A self-taught engineer with 9+ years of experience, I’ve built different types of software solutions like travel booking platforms, social networks, online stores, and business applications. I mostly use Rust, Flutter, NextJS, NodeJS, and React Native.',
		'Outside of coding, I enjoy flying drones and playing story-rich video games like Detroit: Become Human and Cyber punk.'
	],
	contact: [
		{ id: 'email', label: 'hmziqrs@gmail.com', href: 'mailto:hmziqrs@gmail.com' },
		{ id: 'telegram', label: '@hmziqrs', href: 'https://t.me/hmziqrs' },
		{ id: 'x', label: '@hmziqrs', href: 'https://x.com/hmziqrs' },
		{ id: 'linkedin', label: 'linkedin/hmziqrs', href: 'https://www.linkedin.com/in/hmziqrs' }
	],
	download: {
		title: 'Download CV',
		files: [
			['PDF (light mode)', 'https://cv.hmziq.rs/files/hmziqrs-light-cv.pdf'],
			['PDF (dark mode)', 'https://cv.hmziq.rs/files/hmziqrs-dark-cv.pdf'],
			['JPEG (light mode)', 'https://cv.hmziq.rs/files/hmziqrs-light-cv.pdf'],
			['JPEG (dark mode)', 'https://cv.hmziq.rs/files/hmziqrs-dark-cv.pdf']
		]
	},
	skills: [
		{ group: 'Web', items: ['React JS', 'Next JS', 'Tailwind CSS', 'Webassembly', 'Typescript', 'Material UI', 'Firebase'] },
		{ group: 'Mobile', items: ['Dioxus', 'Flutter', 'React Native', 'Socket.IO', 'Internationalization', 'Multi Threaded Apps', 'E2E Testing', 'Pixel Perfect UI', 'Parallax Animations'] },
		{ group: 'Server', items: ['Rust', 'Axum', 'Node JS', 'Adonis JS', 'Express JS', 'CLI App', 'Github Actions', 'Postgres'] }
	],
	span: '9+ years · Dec 2016 - Present',
	roles: [
		{
			org: 'Mixfame',
			type: 'Freelance',
			tone: 'green',
			role: 'Freelance mobile engineer',
			dates: 'Dec 2023 - Jun 2024',
			stack: ['Flutter', 'Bloc', 'Provider', 'Firebase', 'Analytics', 'Animations', 'Notifications', 'In-app purchase'],
			lines: ['Built Flutter mobile app from scratch for Mixfame, a talent management platform, integrating Firebase, and In app purchase.', 'Deeplinking via push notifications and dynamic links for user engagement and retention.']
		},
		{
			org: 'Toptal',
			type: 'Contracter',
			tone: 'orange',
			role: 'Freelance software engineer',
			dates: 'Sep 2021 - Present',
			now: true,
			stack: ['Flutter', 'Golang', 'React JS', 'React Native', 'Typescript', 'Firebase', 'Node JS', 'Adonis JS', 'Postgres', 'Ethereum', 'Ethers'],
			lines: [
				'Built a React Native app prototype for BasedApp (fintech startup) integrating Web3, SafeWallet, Magic Link, and various blockchain functionalities.',
				'Developed Quest Social’s real-time backend (AdonisJS, MySQL, Socket.io) and React Native mobile app with improved state management, revamped designs and new features, successfully publishing to App Store and Play Store.',
				'Prototyped a Flutter mobile app for New York based trading startup.'
			]
		},
		{
			org: 'Voxlabs',
			type: 'Contract',
			tone: 'purple',
			role: 'Project software engineer',
			dates: 'Aug 2021 - Oct 2021',
			stack: ['Flutter', 'Firebase', 'Typescript', 'React JS', 'Material UI'],
			lines: ['Developed a vanilla JavaScript paywall plugin with ad-block bypass capabilities through dynamic CSS implementation, along with a admin panel built using React, TypeScript, Zustand, and Firebase.', 'Maintained an existing Flutter mobile application and did code reviews of junior developers’ work.']
		},
		{
			org: 'Sastaticket.pk',
			type: 'Full time',
			tone: 'blue',
			role: 'Software engineer',
			dates: 'Jan 2021 - Aug 2021',
			stack: ['Flutter', 'Bloc', 'Provider', 'Firebase', 'Analytics', 'Animations', 'Notifications', 'Payments', 'Google Drive API', 'Node JS', 'Github Actions'],
			lines: [
				'Architected and developed Pakistan’s top-ranked airline travel app using Flutter and Bloc design pattern, successfully publishing on App Store and Play Store.',
				'Implemented robust development infrastructure including multi-environment configuration and automated workflows for internationalization, boilerplate code, assets generation, and deployment processes.',
				'Integrated analytics suite (Webengage, Mixpanel, AppsFlyer, Facebook, Firebase) and multiple payment gateways (Easypaisa, Jazzcash, Paypro, 3D-secured Credit/Debit cards).',
				'Hacked a zero cost CI/CD solution using Github Actions and NodeJS for automated APK distribution to Google Drive with email notifications.'
			]
		},
		{
			org: 'Upwork / Fiverr',
			type: 'Contracter',
			tone: 'orange',
			role: 'Freelance software engineer',
			dates: 'May 2018 - Oct 2021',
			stack: ['React JS', 'React Native', 'Flutter', 'Bloc', 'Redux', 'Redux Saga', 'Node JS', 'Adonis JS', 'Asana API', 'Dropbox API', 'MYSQL', 'Firebase', 'Notifications', 'AWS (S3, SES, RDS, EC2)'],
			lines: [
				'Provided full stack development services for ReactJS, React Native, Flutter, and NodeJS, delivering prototypes and production ready applications',
				'Built and published multiple mobile applications including ‘Grow Youth App’ using React Native with Redux and WordPress API integration, launching on both App Store and Play Store.',
				'Prototypes a background video processing app using React Native threads and NodeJS/Dropbox integration.',
				'Developed a full-stack small CMS with ExpressJS and React Native App for management of business information repositories.',
				'Built Wheelbees, a comprehensive chat application for drivers featuring social authentication, real-time messaging with voice notes and images, advanced search capabilities (text/speech/image recognition), and push notifications.'
			]
		},
		{
			org: 'Fetch Sky',
			type: 'Full time',
			tone: 'blue',
			role: 'Software engineer',
			dates: 'Dec 2016 - Oct 2018',
			stack: ['React JS', 'React Native', 'Redux', 'Redux Saga', 'styled-components', 'webpack', 'Firebase', 'Analytics', 'Node JS', 'MYSQL', 'Angular JS', 'Notifications', 'Puppeteer', 'AWS (S3, SES)'],
			lines: [
				'Worked on Peekaboo Guru, a location-based and lifestyle platform, developing its NodeJS/MySQL backend, ReactJS web app, and React Native mobile app.',
				'Built custom modules including a lightweight image cropping and sizing module using node-canvas, integrated Redux ecosystem (Redux-Saga, ImmutableJS) for state management, and implemented third-party services like Firebase analytics and OneSignal notifications.',
				'Developed internal tools including an AngularJS admin panel and a server-side rendered analytics dashboard with PDF reporting capabilities.'
			]
		}
	],
	counts: [
		['Open Source', 'open source'],
		['Product', 'products']
	],
	projects: [
		{ title: 'Flutter UI Designs', kind: 'Open Source', category: 'Mobile App', art: 'surfaces', links: [['Google Play', 'https://play.google.com/store/apps/details?id=com.onemdev.flutter_ui_challenges'], ['Github', 'https://github.com/hmziqrs/flutter-ui-designs'], ['Web', 'https://flutter-uis.hmziq.xyz/']] },
		{ title: 'Flutter movie concept', kind: 'Open Source', category: 'Mobile App', art: 'phone', links: [['Google Play', 'https://play.google.com/store/apps/details?id=com.onemdev.invmovieconcept1'], ['Github', 'https://github.com/hmziqrs/invmovieconcept1'], ['Web', 'https://movieui.hmziq.xyz/']] },
		{ title: 'React Native Loop', kind: 'Open Source', category: 'Mobile App', art: 'fan', links: [['Google Play', 'https://play.google.com/store/apps/details?id=com.onemdev.rnloop'], ['Github', 'https://github.com/hmziqrs/react-native-loop-game'], ['Web', 'https://rnloop.hmziq.xyz/']] },
		{ title: 'Gandalf', kind: 'Open Source', category: 'Mobile App', art: 'webview', links: [['Google Play', 'https://play.google.com/store/apps/details?id=com.onemdev.gandalf'], ['Github', 'https://github.com/hmziqrs/gandlaf-sax'], ['Web', 'https://gandalf.hmziq.xyz/']] },
		{ title: 'Golang minesweeper', kind: 'Open Source', category: 'CLI App', art: 'terminal', links: [['Github', 'https://github.com/hmziqrs/go-minesweeper']] },
		{ title: 'My CV', kind: 'Open Source', category: 'Web App', art: 'plan', links: [['Github', 'https://github.com/hmziqrs/cv'], ['Web', 'https://cv.hmziq.rs/']] },
		{ title: 'Wheelbees', kind: 'Product', category: 'Full Stack', art: 'queue', links: [['Google Play', 'https://play.google.com/store/apps/details?id=com.wheelbees'], ['App Store', 'https://apps.apple.com/nl/app/wheelbees/id1585504248'], ['Web', 'https://wheelbees.com/']] },
		{ title: 'QuestSocial', kind: 'Product', category: 'Full Stack', art: 'endpoints', links: [['App Store', 'https://apps.apple.com/us/app/questsocial/id1529478932']] },
		{ title: 'Mixfame', kind: 'Product', category: 'Mobile App', art: 'phone', links: [['Google Play', 'https://play.google.com/store/apps/details?id=com.mobile.mixfame'], ['App Store', 'https://apps.apple.com/us/app/mixfame/id1586985916'], ['Web', 'https://mixfame.com/']] },
		{ title: 'Peekaboo Guru', kind: 'Product', category: 'Full Stack', art: 'database', links: [['Google Play', 'https://play.google.com/store/search?q=peekaboo%20guru&c=apps'], ['App Store', 'https://apps.apple.com/pk/app/peekaboo-guru/id1114129707'], ['Web', 'https://peekaboo.guru/']] },
		{ title: 'Sastaticket.pk', kind: 'Product', category: 'Mobile App', art: 'request', links: [['Google Play', 'https://play.google.com/store/apps/details?id=com.pk.sastaticket'], ['App Store', 'https://apps.apple.com/by/app/sastaticket-flight-hotels/id1564441908'], ['Web', 'https://www.sastaticket.pk/']] },
		{ title: 'Grow youth ministry', kind: 'Product', category: 'Mobile App', art: 'native', links: [['Google Play', 'https://play.google.com/store/apps/details?id=com.growappv2'], ['App Store', 'https://apps.apple.com/us/app/grow-youth-kids-ministry/id1260816727']] }
	],
	legal: '© 2026 Hamza Iqbal. All rights reserved.'
};

const labsStats = [
	{ value: '7009', label: 'Contributions this year' },
	{ value: '81', label: 'Repositories' },
	{ value: '102', label: 'Followers' }
];

const labsEntries: LabEntry[] = [
	{ n: '01', title: 'Flutter UI Designs', line: 'Cross-platform Flutter UI collection for mobile, web and desktop', kind: 'Experiments', stack: 'Flutter', stars: 332, forks: 60, updated: '2024-11-20', art: 'surfaces', href: 'https://flutter-uis.hmziq.xyz/', topics: ['flutter', 'ui-design', 'animations'] },
	{ n: '02', title: 'Inv Movie Concept 1', line: 'Cross-platform movie UI with complex scroll animations in Flutter', kind: 'Experiments', stack: 'Flutter', stars: 63, forks: 18, updated: '2024-11-20', art: 'phone', href: 'https://movieui.hmziq.xyz/', topics: ['flutter', 'concept', 'flutter-animation'] },
	{ n: '03', title: 'React Native Loop Game', line: 'Infinity loop puzzle game clone built with React Native', kind: 'Games', stack: 'Web', stars: 23, forks: 12, updated: '2024-11-20', art: 'fan', href: 'https://rnloop.hmziq.xyz/', topics: ['web', 'puzzle-game', 'react-hooks'] },
	{ n: '04', title: 'Flutter Experiments', line: 'Experimental Flutter project for testing various Flutter features', kind: 'Experiments', stack: 'Flutter', stars: 15, forks: 2, updated: '2019-06-07', art: 'tools', href: 'https://github.com/hmziqrs/Flutter-Experiments', topics: ['flutter', 'dart', 'experimental'] },
	{ n: '05', title: 'RuxLog Frontend', line: 'Multi-version frontend project with TypeScript and Rust components', kind: 'Experiments', stack: 'Web', stars: 0, updated: '2025-11-11', art: 'window', href: 'https://github.com/hmziqrs/ruxlog-frontend', topics: ['typescript', 'frontend', 'web'] },
	{ n: '06', title: 'Go Cross Screenshot', line: 'Cross-platform Go CLI tool for taking screenshots', kind: 'Tools', stack: 'Go', stars: 2, forks: 1, updated: '2020-07-30', art: 'native', href: 'https://github.com/hmziqrs/go-cross-screenshot', topics: ['web', 'cross-platform', 'screenshot-capture'] },
	{ n: '07', title: 'FHGLLAUNCH', line: 'Simple Dart command-line application with Flutter integration', kind: 'Tools', stack: 'Dart', stars: 2, updated: '2022-01-06', art: 'terminal', href: 'https://github.com/hmziqrs/fhgllaunch', topics: ['dart', 'flutter', 'cli'] },
	{ n: '08', title: 'Claude Multi', line: 'TypeScript CLI to manage multiple 3rd-party integrated Claude Code instances', kind: 'Tools', stack: 'TypeScript', stars: 29, forks: 4, updated: '2026-08-28', art: 'lanes', href: 'https://claude-multi.hmziq.xyz/', topics: ['typescript', 'cli', 'ai', 'developer-tools'] },
	{ n: '09', title: 'ruxlog-backend', line: 'Rust Axum web application with authentication and blog management', kind: 'Experiments', stack: 'Rust', stars: 3, forks: 3, updated: '2026-07-29', art: 'endpoints', href: 'https://github.com/hmziqrs/ruxlog-backend', topics: ['rust', 'axum', 'backend'] },
	{ n: '10', title: 'Epic Sax Gandalf Infinite', line: 'Multi-platform Epic Sax Gandalf infinite loop application', kind: 'Games', stack: 'Flutter', stars: 3, updated: '2026-06-02', art: 'webview', href: 'https://gandalf.hmziq.xyz/', topics: ['flutter', 'multi-platform', 'entertainment'] },
	{ n: '11', title: 'RuxLog', line: 'Full-stack Rust blog platform with Axum and Dioxus', kind: 'Experiments', stack: 'Rust', stars: 3, forks: 3, updated: '2026-07-29', art: 'database', href: 'https://github.com/hmziqrs/ruxlog', topics: ['rust', 'fullstack', 'blog'] },
	{ n: '12', title: 'go-minesweeper', line: 'CLI-based minesweeper game built with Go', kind: 'Games', stack: 'Go', stars: 1, updated: '2021-08-18', art: 'modules', href: 'https://github.com/hmziqrs/go-minesweeper', topics: ['web', 'game', 'cli'] }
];

export const labsData: LabsIndexData = {
	kicker: 'hmziq labs · A new experiment most weeks',
	seed: 'hmziq labs',
	title: ['Small things, ', 'built to learn.'],
	lede: 'Each experiment is one question answered in code: how does this screen feel in three frameworks, can this game run in a terminal, does this tool deserve to exist.',
	github: 'https://github.com/hmziqrs',
	stats: labsStats,
	heading: 'Experiments',
	kinds: ['Experiments', 'Games', 'Tools'],
	updated: 'Updated on 1, Sep 2026',
	entries: labsEntries
};

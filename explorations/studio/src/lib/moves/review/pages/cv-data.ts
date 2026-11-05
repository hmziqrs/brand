import type { CvData } from '@hmziq/brand-core/cv-page';

export const cv: CvData = {
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

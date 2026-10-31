import type { Move } from '$studio/types';

const f = (name: string) => `src/lib/moves/site-clicky/${name}.svelte`;

export const moves: Move[] = [
	{ id: 'site-clicky/menubar', axis: 'nav', name: 'HeyClicky study: OS menubar nav', file: f('menubar'), notes: 'Translucent macOS-style menubar: lowercase links, centred ^■^ mark, status icons, live clock, oxide get link.' },
	{ id: 'site-clicky/dot-desk', axis: 'texture', name: 'Cursor-bulging dot desk', file: f('dot-desk'), notes: 'Canvas dot grid that swells and pushes away from the cursor, the nearest dots turning oxide.' },
	{ id: 'site-clicky/desk-window', axis: 'cards', name: 'Draggable desk window', file: f('desk-window'), notes: 'Window chrome with traffic lights, palette-tinted title bar and soft drop shadow; drag it by the bar.' },
	{ id: 'site-clicky/desk-hero', axis: 'hero', name: 'Scattered desktop hero', file: f('desk-hero'), notes: 'Giant lowercase name over a desk of draggable material windows, kaomoji, folders and a name sticker; pill download buttons.' },
	{ id: 'site-clicky/buddy-demo', axis: 'section', name: 'Buddy points-and-circles demo', file: f('buddy-demo'), notes: 'A fake sheet app: ask a chip or click a cell and the oxide cursor glides over, hand-circles the target and explains.' },
	{ id: 'site-clicky/voice-card', axis: 'section', name: 'Hold-to-talk voice card', file: f('voice-card'), notes: 'Big oxide mic button; holding it animates a waveform, releasing cycles example questions.' },
	{ id: 'site-clicky/agent-notch', axis: 'section', name: 'Agents under the notch', file: f('agent-notch'), notes: 'Notch pill with agent job cards ticking through their plan; a button hands it a new job.' },
	{ id: 'site-clicky/notes-manifesto', axis: 'section', name: 'Notes-app manifesto', file: f('notes-manifesto'), notes: 'Manifesto in a yellow-bar notes window with a highlighter phrase and a blinking signature, flanked by square arcs.' },
	{ id: 'site-clicky/square-arc', axis: 'illustration', name: 'Palette square arcs', file: f('square-arc'), notes: 'Rainbow arch of stacked rounded squares blending between two palette colours; squares hop on hover.' },
	{ id: 'site-clicky/feedback-wall', axis: 'cards', name: 'Window feedback wall', file: f('feedback-wall'), notes: 'Sliding giant headline over a staggered three-column wall of tinted window posts (invented), fading into a join button.' },
	{ id: 'site-clicky/plan-windows', axis: 'cards', name: 'Plan windows', file: f('plan-windows'), notes: 'Three plans as tinted app windows with a monthly/yearly pill toggle and an inverted mono student strip.' },
	{ id: 'site-clicky/faq-window', axis: 'section', name: 'FAQ in a window', file: f('faq-window'), notes: 'Kit accordion inside a faq.txt window under a big lowercase title.' },
	{ id: 'site-clicky/desk-footer', axis: 'footer', name: 'Face footer', file: f('desk-footer'), notes: 'Lowercase link columns and disclaimer over a giant clickable mono face whose nose is the oxide square.' }
];

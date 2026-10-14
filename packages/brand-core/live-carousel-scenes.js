import overview from './live-media/overview.png?url';
import members from './live-media/members.png?url';

export const liveBentoPresets = {
  showcase: [
    { id: 'overview', type: 'image', title: 'A workspace, in view.', body: 'A preview of the kit’s overview screen.', src: overview, alt: 'Overview screen with visitors, sign-ups, and usage.' },
    { id: 'story', type: 'text', title: 'One card.\nThree scenes.', body: 'Images, words, and materials share the same space.', detail: 'Image / Copy / Motion' },
    { id: 'surface', type: 'material', title: 'Let the surface move.', body: 'Copper starts moving after the words settle.', material: 'copper-sweep', shape: 'ring' },
  ],
  words: [
    { id: 'words', type: 'text', title: 'Copper\nin type.', body: 'Light moves through the letterforms.', material: 'copper-sweep', detail: 'Copper sweep' },
    { id: 'space', type: 'text', title: 'Folded\nin foil.', body: 'The same letters take on a folded surface.', material: 'folded-foil', detail: 'Folded foil' },
    { id: 'pause', type: 'text', title: 'A moment\nto read.', body: 'Each scene holds before the next appears.', detail: 'Reading pause' },
  ],
  materials: [
    { id: 'copper', type: 'material', title: 'Copper sweep', body: 'A moving texture, held inside a ring.', material: 'copper-sweep', shape: 'ring' },
    { id: 'carbon', type: 'material', title: 'Carbon twill', body: 'The next material takes the same stage.', material: 'carbon-twill', shape: 'disc' },
    { id: 'foil', type: 'material', title: 'Folded foil', body: 'A slower turn across the folded surface.', material: 'folded-foil', shape: 'tile' },
  ],
  gallery: [
    { id: 'members', type: 'image', title: 'Members', body: 'One image fades into the next.', src: members, alt: 'The kit’s members screen in dark mode.' },
    { id: 'overview', type: 'image', title: 'Overview', body: 'The caption follows the image.', src: overview, alt: 'The kit’s overview screen in light mode.' },
    { id: 'detail', type: 'text', title: 'Keep the\ncontext.', body: 'Use the last scene for a detail worth reading.', detail: 'Gallery / 03' },
  ],
};

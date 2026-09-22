import { useState } from 'react';
import { Row } from './Row';
import { Button } from './components/Button';
import { TextField, TextAreaField } from './components/Field';
import { Toggle } from './components/Toggle';
import { Checkbox } from './components/Checkbox';
import { Tag } from './components/Tag';
import { Avatar, AvatarAdd } from './components/Avatar';
import { Tabs } from './components/Tabs';
import { Plate, type PlateGround } from './components/Plate';
import { CodeBlock } from './components/CodeBlock';
import { Dialog } from './components/Dialog';
import { NodeGraph } from './components/NodeGraph';
import { ChatPanel } from './components/ChatPanel';
import { SearchBar } from './components/SearchBar';
import { MarkdownEditor } from './components/MarkdownEditor';
import { BlogCard } from './components/BlogCard';
import type { Accent } from './theme';

const TAB_LABELS = ['Elements', 'Palette', 'Paper'];

const CARD_COPY = [
  [
    { meta: 'Plate 01', title: 'Painted ground', body: 'A scan of real gouache fills the plate. Brush and paper do the work; no gradient is involved.' },
    { meta: 'Plate 02', title: 'Pattern ground', body: 'A repeating mark scan, cropped like a photograph. Same slot, different material.' },
    { meta: 'Plate 03', title: 'Flat field', body: 'One opaque colour, nothing on top. This is the default for every element in the kit.' },
  ],
  [
    { meta: 'Ink', title: 'Soot 2A2018', body: 'Warm near-black for type and rules. Never pure black.' },
    { meta: 'Primary', title: 'Gouache C9532A', body: 'One element per view carries it. Two at most.' },
    { meta: 'Secondary', title: 'Pine 33482F', body: 'Answers the orange in tags, plates and marks.' },
  ],
  [
    { meta: 'Tile', title: 'One texture', body: 'The same file at 60px on a tag and 300px on a plate.' },
    { meta: 'Overlay', title: 'Fixed wash', body: 'A multiply layer over the viewport keeps grain continuous on scroll.' },
    { meta: 'Swap', title: 'Real paper', body: 'Point the file at a scan and nothing else changes.' },
  ],
];

const SWATCHES = [
  ['#33482F', '#C9532A', '#3A6A96'],
  ['#2A2018', '#C9532A', '#33482F'],
  ['#E9E6DB', '#F4F2EB', '#33482F'],
];

const POSITIONS = ['50% 30%', '20% 40%', 'center'];

function plateGround(tab: number, i: number): PlateGround {
  if (tab === 0 && i === 0) {
    return { color: '#4A6742', image: '/leaves.png', position: POSITIONS[i], blend: 'multiply', filter: 'brightness(1.42) saturate(0.92)' };
  }
  if (tab === 0 && i === 1) {
    return { color: SWATCHES[0][1], image: '/spots.png', position: POSITIONS[i] };
  }
  return { color: SWATCHES[tab][i], position: POSITIONS[i] };
}

const POSTS = [
  {
    date: '12 Mar',
    tag: 'process',
    title: 'Mixing a palette on paper first',
    excerpt: 'Three fields and one ink, chosen with a brush before anything was typed into a stylesheet.',
    read: '4 min',
    ground: { color: '#4A6742', image: '/leaves.png', position: '50% 30%', blend: 'multiply' as const, filter: 'brightness(1.42) saturate(0.92)' },
  },
  {
    date: '04 Mar',
    tag: 'pattern',
    title: 'Scans beat gradients, every time',
    excerpt: 'A repeating mark carries grain, pressure and mistakes. A gradient carries none of those.',
    read: '6 min',
    ground: { color: '#C9532A', image: '/spots.png', position: '30% 50%' },
  },
  {
    date: '26 Feb',
    tag: 'notes',
    title: 'Nine elements is a whole system',
    excerpt: 'What a small kit gets you: consistency by scarcity, and nothing left to argue about.',
    read: '3 min',
    ground: { color: '#3A6A96', position: 'center' },
  },
];

export interface GouacheKitProps {
  accent?: Accent;
}

export default function App({ accent = 'gouache' }: GouacheKitProps) {
  const [clicks, setClicks] = useState(0);
  const [grain, setGrain] = useState(true);
  const [whiskers, setWhiskers] = useState(true);
  const [tab, setTab] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const btnTone = accent === 'cobalt' ? 'cobalt' : 'gouache';

  return (
    <div className="gk-page">
      {grain && <div className="gk-grain-overlay" />}

      <div className="gk-container">
        {/* NAV */}
        <div className="gk-nav">
          <span className="gk-nav__mark">Gouache</span>
          <div className="gk-nav__links">
            <span className="gk-nav__link--active">Elements</span>
            <span>Palette</span>
            <span>Paper</span>
          </div>
        </div>

        {/* HEADER */}
        <div className="gk-hero">
          <div>
            <h1 className="gk-hero__title">A small set of painted elements.</h1>
            <p className="gk-hero__lede">
              One hairline of ink, one flat field of colour, one layer of grain. Nothing raised, nothing outlined
              twice. Code sits in the same paper as everything else.
            </p>
          </div>
          <div className="gk-hero__image" />
        </div>

        {/* 01 BUTTONS */}
        <Row index="01" label="Buttons">
          <div className="gk-btn-row">
            <Button tone={btnTone} onClick={() => setClicks((c) => c + 1)}>
              Primary
            </Button>
            <Button tone="secondary">Secondary</Button>
            <Button tone="cobalt">Cobalt</Button>
            <Button tone="quiet">Quiet</Button>
            <Button disabled>Disabled</Button>
          </div>
          <div className="gk-btn-row__note">pressed {clicks}×</div>
        </Row>

        {/* 02 FIELDS */}
        <Row index="02" label="Fields">
          <div className="gk-field-grid">
            <TextField label="Title" placeholder="Leopard, in a chair" />
            <TextAreaField label="Note" rows={2} placeholder="More grain, fewer straight lines." />
          </div>
        </Row>

        {/* 03 CONTROLS */}
        <Row index="03" label="Controls">
          <div className="gk-controls">
            <Toggle checked={grain} onChange={setGrain} label="Paper grain" accent={accent} />
            <Checkbox checked={whiskers} onChange={setWhiskers} label="Show whiskers" accent={accent} />
            <Checkbox checked={false} onChange={() => {}} label="Locked" accent={accent} disabled />
          </div>
        </Row>

        {/* 04 MARKS */}
        <Row index="04" label="Marks">
          <div className="gk-marks">
            <div className="gk-tags">
              <Tag tone="gouache">gouache</Tag>
              <Tag tone="cobalt">cobalt</Tag>
              <Tag tone="pine">pine</Tag>
              <Tag tone="outline">draft</Tag>
            </div>
            <div className="gk-avatars">
              <Avatar initials="MF" tone="pine" />
              <Avatar initials="KL" tone="cobalt" />
              <AvatarAdd />
            </div>
          </div>
        </Row>

        {/* 05 PLATES */}
        <Row index="05" label="Plates">
          <Tabs labels={TAB_LABELS} active={tab} onSelect={setTab} accent={accent} />
          <div className="gk-plate-grid">
            {CARD_COPY[tab].map((card, i) => (
              <Plate key={card.title} ground={plateGround(tab, i)} meta={card.meta} title={card.title} body={card.body} />
            ))}
          </div>
        </Row>

        {/* 06 CODE */}
        <Row index="06" label="Code">
          <CodeBlock />
          <div className="gk-code-note">Inverted variant available for dark plates.</div>
        </Row>

        {/* 07 DIALOG */}
        <Row index="07" label="Dialog">
          <div className="gk-dialog-trigger-row">
            <Button tone="secondary" onClick={() => setModalOpen(true)}>
              Open dialog
            </Button>
            <span className="gk-dialog-trigger-row__note">Floated over a wash of the same paper.</span>
          </div>
        </Row>

        {/* PAPER NOTE */}
        <Row index="08" label="Paper" noBottomPadding>
          <p className="gk-paper-note">
            Every surface reads its texture from one file, <code>paper-light.png</code> — a seamless scan tiled
            across the page, with a second copy fixed over the viewport and multiplied at 50% so the fibre carries
            over the paint as well as the paper. The painted fields stay flat, which keeps their colour exactly
            where it was mixed. Swap that one file and the whole set changes material.
          </p>
        </Row>

        {/* 09 NODES */}
        <Row index="09" label="Nodes" noBottomPadding spaced>
          <NodeGraph accent={accent} />
        </Row>

        {/* 10 CHAT */}
        <Row index="10" label="Chat" noBottomPadding spaced>
          <ChatPanel />
        </Row>

        {/* 11 SEARCH */}
        <Row index="11" label="Search" noBottomPadding spaced>
          <SearchBar />
        </Row>

        {/* 12 EDITOR */}
        <Row index="12" label="Editor" noBottomPadding spaced>
          <MarkdownEditor />
        </Row>

        {/* 13 WRITING */}
        <Row index="13" label="Writing" noBottomPadding spaced>
          <div className="gk-posts">
            {POSTS.map((post) => (
              <BlogCard key={post.title} {...post} />
            ))}
          </div>
        </Row>
      </div>

      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        eyebrow="Sketchbook"
        title="Save this sketch?"
        confirmLabel="Save"
        cancelLabel="Not yet"
        onConfirm={() => setModalOpen(false)}
      >
        It goes in with the grain baked in. The lines can always be redrawn later.
      </Dialog>
    </div>
  );
}

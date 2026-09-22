import { useMemo, useState } from 'react';
import { colors, fonts } from '../theme';

const DEFAULT_TEXT = [
  '# Working on paper',
  '',
  'Two panes, one material. The source is set in mono on a',
  'slightly darker plate; the reading side gets the serif.',
  '',
  '## What the parser handles',
  '',
  '- headings, one and two',
  '- paragraphs and blank lines',
  '- bullets, quotes and `inline` code',
  '',
  '> Keep the vocabulary small enough to remember.',
  '',
  '    npm i gouache-kit',
].join('\n');

type Mode = 'split' | 'write' | 'read';

interface Block {
  marker: string;
  markerWidth: string;
  family: string;
  size: string;
  lineHeight: string;
  letterSpacing: string;
  color: string;
  marginTop: string;
  text: string;
}

function parseMarkdown(text: string): Block[] {
  const blocks: Block[] = [];
  let first = true;
  for (const raw of text.split('\n')) {
    const line = raw.replace(/\s+$/, '');
    if (!line.trim()) continue;
    const mt = first ? '0px' : '14px';
    const base = {
      marker: '',
      markerWidth: '0px',
      family: fonts.serif,
      size: '17px',
      lineHeight: '1.6',
      letterSpacing: '0',
      color: colors.body,
      marginTop: mt,
    };
    if (line.startsWith('# ')) {
      blocks.push({ ...base, family: fonts.display, size: '30px', lineHeight: '1.25', color: colors.ink, text: line.slice(2), marginTop: first ? '0px' : '22px' });
    } else if (line.startsWith('## ')) {
      blocks.push({ ...base, family: fonts.display, size: '20px', lineHeight: '1.3', color: colors.ink, text: line.slice(3), marginTop: first ? '0px' : '22px' });
    } else if (line.startsWith('- ')) {
      blocks.push({ ...base, marker: '—', markerWidth: '14px', text: line.slice(2), marginTop: first ? '0px' : '6px' });
    } else if (line.startsWith('> ')) {
      blocks.push({ ...base, markerWidth: '3px', size: '18px', color: colors.pine, text: line.slice(2), marginTop: first ? '0px' : '18px' });
    } else if (line.startsWith('    ')) {
      blocks.push({ ...base, family: fonts.mono, size: '13px', lineHeight: '1.9', letterSpacing: '0.02em', color: colors.ink, text: line.trim(), marginTop: first ? '0px' : '18px' });
    } else {
      blocks.push({ ...base, text: line });
    }
    first = false;
  }
  return blocks;
}

const MODE_TABS: [Mode, string][] = [
  ['split', 'Split'],
  ['write', 'Source'],
  ['read', 'Reading'],
];

export function MarkdownEditor() {
  const [text, setText] = useState(DEFAULT_TEXT);
  const [mode, setMode] = useState<Mode>('split');

  const blocks = useMemo(() => parseMarkdown(text), [text]);
  const words = useMemo(() => text.trim().split(/\s+/).filter(Boolean).length, [text]);

  const showSource = mode !== 'read';
  const showPreview = mode !== 'write';

  return (
    <div>
      <div className="gk-md-toolbar">
        <div className="gk-md-tabs">
          {MODE_TABS.map(([key, label]) => {
            const active = mode === key;
            return (
              <button
                key={key}
                type="button"
                className="gk-md-tab"
                onClick={() => setMode(key)}
                style={{
                  backgroundColor: active ? colors.pine : 'transparent',
                  color: active ? colors.creamAlt2 : colors.body,
                  borderColor: active ? colors.pine : 'rgba(36,28,20,0.22)',
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
        <span className="gk-md-count">
          {words} words · {text.length} chars
        </span>
      </div>

      <div className="gk-md-panes" style={{ gridTemplateColumns: mode === 'split' ? '1fr 1fr' : '1fr' }}>
        {showSource && (
          <div className="gk-md-source">
            <textarea
              rows={16}
              value={text}
              onChange={(e) => setText(e.target.value)}
              spellCheck={false}
              className="gk-md-source__textarea"
            />
          </div>
        )}
        {showPreview && (
          <div className="gk-md-preview">
            {blocks.map((b, i) => (
              <div key={i} className="gk-md-block" style={{ marginTop: b.marginTop }}>
                <span className="gk-md-block__marker" style={{ width: b.markerWidth }}>
                  {b.marker}
                </span>
                <div
                  style={{
                    fontFamily: b.family,
                    fontSize: b.size,
                    lineHeight: b.lineHeight,
                    letterSpacing: b.letterSpacing,
                    color: b.color,
                  }}
                >
                  {b.text}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

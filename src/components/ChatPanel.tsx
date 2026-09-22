import { useState, type KeyboardEvent } from 'react';
import { colors } from '../theme';

export interface ChatMessage {
  who: 'you' | 'gouache';
  text: string;
}

const INITIAL: ChatMessage[] = [
  { who: 'you', text: 'A specimen sheet for the paper kit — nine elements, one texture.' },
  {
    who: 'gouache',
    text: 'Laid it out as numbered rows. Orange leads, pine answers, and the grain sits over everything at half strength.',
  },
];

export function ChatPanel() {
  const [msgs, setMsgs] = useState<ChatMessage[]>(INITIAL);
  const [draft, setDraft] = useState('');

  const submit = () => {
    const t = draft.trim();
    if (!t) return;
    setMsgs((prev) => [
      ...prev,
      { who: 'you', text: t },
      { who: 'gouache', text: 'Noted — mixing that on the same paper.' },
    ]);
    setDraft('');
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  const hasDraft = draft.trim().length > 0;

  return (
    <div>
      <div className="gk-chat">
        {msgs.map((m, i) => {
          const you = m.who === 'you';
          return (
            <div key={i} className={`gk-chat__row ${you ? 'gk-chat__row--you' : 'gk-chat__row--them'}`}>
              <div className={`gk-chat__bubble ${you ? 'gk-chat__bubble--you' : 'gk-chat__bubble--them'}`}>
                <div className={`gk-chat__who ${you ? 'gk-chat__who--you' : 'gk-chat__who--them'}`}>{m.who}</div>
                <div className="gk-chat__text">{m.text}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="gk-composer">
        <textarea
          rows={2}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Describe what you want to make…"
          className="gk-composer__textarea"
        />
        <div className="gk-composer__row">
          <button type="button" className="gk-composer__attach">
            +
          </button>
          <div className="gk-composer__meta">
            <span className="gk-composer__model">
              Gouache 1 <span className="gk-composer__model-sub">medium</span>
            </span>
            <button
              type="button"
              className="gk-composer__send"
              onClick={submit}
              style={{ backgroundColor: hasDraft ? colors.pine : '#C6BDAC' }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
      <div className="gk-chat-hint">
        {hasDraft ? 'enter to send · shift+enter for a new line' : 'the composer sits on the same plate as the code block'}
      </div>
    </div>
  );
}

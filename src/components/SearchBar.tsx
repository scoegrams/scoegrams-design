import { useState } from 'react';
import { colors } from '../theme';

const ALL_TERMS = [
  'buttons', 'fields', 'controls', 'marks', 'plates', 'code',
  'dialog', 'paper', 'nodes', 'chat', 'writing', 'search',
];

export function SearchBar() {
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();
  const hits = q ? ALL_TERMS.filter((t) => t.includes(q)) : ALL_TERMS.slice(0, 6);
  const matched = hits.length > 0;
  const results = matched ? hits : ['no matches'];

  return (
    <div className="gk-search-wrap">
      <div className="gk-search-bar">
        <span className="gk-search-bar__glass" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search the kit"
          className="gk-search-bar__input"
        />
        <span className="gk-search-bar__hint">{q ? `${hits.length} found` : '⌘K'}</span>
      </div>
      <div className="gk-search-results">
        {results.map((label) => (
          <span
            key={label}
            className="gk-search-result"
            style={{
              color: q && matched ? colors.creamAlt2 : colors.body,
              backgroundColor: q && matched ? colors.pine : 'transparent',
              borderColor: q && matched ? colors.pine : 'rgba(36,28,20,0.22)',
            }}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

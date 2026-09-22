export const colors = {
  ink: '#241C14',
  soot: '#2A2018',
  body: '#3B3128',
  muted: '#6A5C4C',
  muted2: '#7E7162',
  rule: 'rgba(36,28,20,0.3)',
  ruleLight: 'rgba(42,32,24,0.28)',
  ruleInput: 'rgba(42,32,24,0.4)',
  ruleSoft: 'rgba(42,32,24,0.35)',
  ruleFaint: 'rgba(36,28,20,0.22)',
  ruleDisabled: 'rgba(42,32,24,0.16)',

  paper: '#F4F2EB',
  panel: '#EFECE3',
  code: '#E9E6DB',
  dialogBg: '#EDE6D8',
  bubbleYou: '#E4DFD2',

  cream: '#F6F0E4',
  creamAlt: '#F1EDE1',
  creamAlt2: '#F7F5EE',

  gouache: '#C9532A',
  gouacheHover: '#B8461E',
  cobalt: '#3A6A96',
  cobaltHover: '#2F5A81',
  pine: '#33482F',

  selection: '#CBD5BE',
} as const;

export const fonts = {
  display: "'Chelsea Market', cursive",
  serif: "'Newsreader', Georgia, serif",
  mono: "'IBM Plex Mono', monospace",
} as const;

export type Accent = 'gouache' | 'cobalt';

export function accentColor(accent: Accent): string {
  return accent === 'cobalt' ? colors.cobalt : colors.gouache;
}

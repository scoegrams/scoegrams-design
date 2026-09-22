import { useMemo, useState } from 'react';
import { accentColor, colors, type Accent } from '../theme';

interface GraphNode {
  id: string;
  x: number;
  y: number;
  r: number;
}

const NODES: GraphNode[] = [
  { id: 'prompt', x: 360, y: 58, r: 19 },
  { id: 'sampler', x: 210, y: 128, r: 17 },
  { id: 'latent', x: 328, y: 168, r: 18 },
  { id: 'denoise', x: 434, y: 162, r: 16 },
  { id: 'seed', x: 528, y: 162, r: 7 },
  { id: 'mask', x: 222, y: 196, r: 14 },
  { id: 'vae', x: 332, y: 240, r: 15 },
  { id: 'upscale', x: 168, y: 278, r: 16 },
  { id: 'compose', x: 424, y: 292, r: 14 },
  { id: 'output', x: 300, y: 326, r: 14 },
];

const EDGES: [number, number][] = [
  [0, 1], [0, 2], [0, 3], [1, 2], [2, 3], [3, 4], [2, 6], [5, 7], [7, 8], [6, 9], [5, 2],
];

const VIEW_W = 700;
const VIEW_H = 360;

export interface NodeGraphProps {
  accent?: Accent;
}

export function NodeGraph({ accent = 'gouache' }: NodeGraphProps) {
  const [hover, setHover] = useState<number | null>(null);
  const accentHex = accentColor(accent);

  const near = useMemo(() => {
    const set = new Set<number>();
    if (hover === null) return set;
    set.add(hover);
    EDGES.forEach(([a, b]) => {
      if (a === hover) set.add(b);
      if (b === hover) set.add(a);
    });
    return set;
  }, [hover]);

  return (
    <div>
      <div className="gk-graph">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} preserveAspectRatio="none" className="gk-graph__svg">
          {EDGES.map(([a, b], i) => {
            const on = hover === null || a === hover || b === hover;
            const stroke = hover !== null && on ? colors.pine : on ? accentHex : 'rgba(36,28,20,0.16)';
            const width = hover !== null && on ? 3 : 2;
            return (
              <line
                key={i}
                x1={NODES[a].x}
                y1={NODES[a].y}
                x2={NODES[b].x}
                y2={NODES[b].y}
                stroke={stroke}
                strokeWidth={width}
                strokeLinecap="round"
              />
            );
          })}
        </svg>
        {NODES.map((n, i) => {
          const on = hover === null || near.has(i);
          const fill = hover === i ? colors.pine : on ? accentHex : '#DAD3C4';
          const ring = hover === i ? '0 0 0 6px rgba(51,72,47,0.16)' : 'none';
          return (
            <div
              key={n.id}
              className="gk-graph__node"
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              style={{
                left: `${(n.x / VIEW_W) * 100}%`,
                top: `${(n.y / VIEW_H) * 100}%`,
                width: n.r * 2,
                height: n.r * 2,
                marginLeft: -n.r,
                marginTop: -n.r,
                backgroundColor: fill,
                boxShadow: ring,
              }}
            />
          );
        })}
        <div className="gk-graph__readout" style={{ color: hover === null ? colors.muted2 : colors.pine }}>
          {hover === null ? 'graph · idle' : `${NODES[hover].id} · ${near.size - 1} linked`}
        </div>
      </div>
      <div className="gk-graph-foot">
        <span>hover a node to trace its edges</span>
        <span className="gk-graph-foot__count">
          {EDGES.length} edges · {NODES.length} nodes
        </span>
      </div>
    </div>
  );
}

import type { CSSProperties } from 'react';

export interface PlateGround {
  /** Base flat colour the plate is mixed from. */
  color: string;
  /** Optional scanned texture (leaves.png, spots.png, …) laid over the colour. */
  image?: string;
  position?: string;
  blend?: CSSProperties['backgroundBlendMode'];
  filter?: string;
}

export interface PlateProps {
  ground: PlateGround;
  meta: string;
  title: string;
  body: string;
  aspect?: string;
}

export function Plate({ ground, meta, title, body, aspect = '4 / 5' }: PlateProps) {
  return (
    <div>
      <div
        className="gk-plate__swatch"
        style={{
          aspectRatio: aspect,
          backgroundColor: ground.color,
          backgroundImage: ground.image ? `url('${ground.image}')` : 'none',
          backgroundPosition: ground.position ?? 'center',
          backgroundBlendMode: ground.blend ?? 'normal',
          filter: ground.filter ?? 'none',
        }}
      />
      <div className="gk-plate__meta">{meta}</div>
      <div className="gk-plate__title">{title}</div>
      <p className="gk-plate__body">{body}</p>
    </div>
  );
}

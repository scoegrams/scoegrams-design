import type { PlateGround } from './Plate';

export interface BlogCardProps {
  ground: PlateGround;
  date: string;
  tag: string;
  title: string;
  excerpt: string;
  read: string;
  href?: string;
}

export function BlogCard({ ground, date, tag, title, excerpt, read, href = '#' }: BlogCardProps) {
  return (
    <a href={href} className="gk-post">
      <div
        className="gk-post__swatch"
        style={{
          backgroundColor: ground.color,
          backgroundImage: ground.image ? `url('${ground.image}')` : 'none',
          backgroundPosition: ground.position ?? 'center',
          backgroundBlendMode: ground.blend ?? 'normal',
          filter: ground.filter ?? 'none',
        }}
      />
      <div className="gk-post__meta">
        <span>{date}</span>
        <span className="gk-post__tag">{tag}</span>
      </div>
      <div className="gk-post__title">{title}</div>
      <p className="gk-post__excerpt">{excerpt}</p>
      <span className="gk-post__read">{read}</span>
    </a>
  );
}

import type { Motif as MotifName } from "@/lib/content";
import { seeded } from "@/lib/utils";

/**
 * Line-art motifs for image placeholders. Deliberately abstract and editorial —
 * they hint at the subject of the photograph that belongs here without
 * pretending to be one. Drawn in currentColor; the parent sets the tone.
 */
export function Motif({ name, seed = 1 }: { name: MotifName; seed?: number }) {
  return (
    <svg
      viewBox="0 0 400 500"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      fill="none"
      stroke="currentColor"
      aria-hidden
    >
      {ART[name](seeded(seed * 9973))}
    </svg>
  );
}

type Rand = () => number;

const ART: Record<MotifName, (r: Rand) => React.ReactNode> = {
  containers: (r) => {
    const out: React.ReactNode[] = [];
    const rows = 7;
    for (let row = 0; row < rows; row++) {
      const y = 470 - row * 46;
      const cols = row > 4 ? 2 : 4;
      const offset = row % 2 ? 30 : -10;
      for (let c = 0; c < cols; c++) {
        if (r() < 0.12) continue;
        const x = offset + c * 118 + (row > 4 ? 120 : 0);
        out.push(
          <g key={`${row}-${c}`} strokeOpacity={0.18 + r() * 0.2}>
            <rect x={x} y={y - 40} width={112} height={40} />
            {Array.from({ length: 11 }, (_, k) => (
              <line key={k} x1={x + 8 + k * 9.6} x2={x + 8 + k * 9.6} y1={y - 36} y2={y - 4} strokeOpacity={0.6} />
            ))}
          </g>,
        );
      }
    }
    // crane
    out.push(
      <g key="crane" strokeOpacity={0.35}>
        <path d="M300 40 L300 160 M330 40 L330 160 M300 40 L330 70 M330 40 L300 70 M300 70 L330 100 M330 70 L300 100 M300 100 L330 130 M330 100 L300 130" />
        <path d="M150 40 H420 M150 52 H420" />
        <path d="M200 52 V110" strokeDasharray="2 4" />
        <rect x="186" y="110" width="28" height="12" />
      </g>,
    );
    return out;
  },

  road: () => {
    const vx = 230;
    const vy = 210;
    return (
      <g>
        <line x1="0" x2="400" y1={vy} y2={vy} strokeOpacity={0.4} />
        {[-520, -260, -60, 80, 360, 640].map((x, i) => (
          <line key={i} x1={vx} y1={vy} x2={x} y2={500} strokeOpacity={0.22} />
        ))}
        {Array.from({ length: 9 }, (_, i) => {
          const t = Math.pow((i + 1) / 10, 1.9);
          const y = vy + t * 290;
          return <line key={i} x1={vx - t * 6} x2={vx - t * 6} y1={y} y2={y + t * 26} strokeWidth={1 + t * 5} strokeOpacity={0.5} />;
        })}
        {/* palms */}
        {[40, 82, 330].map((x, i) => (
          <g key={i} strokeOpacity={0.3}>
            <path d={`M${x} ${vy} Q${x + 6} ${vy - 60} ${x + 2} ${vy - 110}`} />
            <path d={`M${x + 2} ${vy - 110} q -30 0 -42 20 M${x + 2} ${vy - 110} q 30 -4 40 16 M${x + 2} ${vy - 110} q -14 -22 -34 -24 M${x + 2} ${vy - 110} q 18 -20 36 -18`} />
          </g>
        ))}
        <circle cx="300" cy="120" r="34" strokeOpacity={0.25} />
      </g>
    );
  },

  sea: (r) => (
    <g>
      <circle cx="270" cy="170" r="46" strokeOpacity={0.3} />
      <line x1="0" x2="400" y1="230" y2="230" strokeOpacity={0.5} />
      {Array.from({ length: 22 }, (_, i) => {
        const y = 240 + i * i * 0.55 + i * 6;
        const amp = 1 + i * 0.45;
        const len = 14 + i * 3;
        let d = `M -20 ${y}`;
        for (let x = -20; x <= 420; x += len) d += ` q ${len / 2} ${-amp} ${len} 0`;
        return <path key={i} d={d} strokeOpacity={0.1 + r() * 0.18} />;
      })}
      {/* vessel */}
      <g strokeOpacity={0.55}>
        <path d="M70 224 L190 224 L180 236 L82 236 Z" />
        <path d="M150 224 V206 H178 V224 M156 206 V196 H170 V206" />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={86 + i * 15} y={212} width={13} height={12} />
        ))}
      </g>
    </g>
  ),

  grain: (r) => (
    <g>
      {Array.from({ length: 420 }, (_, i) => {
        const x = r() * 420 - 10;
        const y = Math.pow(r(), 0.7) * 520 - 10;
        const rot = r() * 180;
        const s = 0.7 + r() * 0.6;
        return (
          <ellipse
            key={i}
            cx={x}
            cy={y}
            rx={7 * s}
            ry={2.6 * s}
            transform={`rotate(${rot} ${x} ${y})`}
            strokeOpacity={0.12 + r() * 0.3}
          />
        );
      })}
    </g>
  ),

  warehouse: () => {
    const vx = 200;
    const vy = 230;
    const levels = [80, 150, 230, 320, 420];
    return (
      <g>
        {[-40, 120, 280, 440].map((x, i) => (
          <line key={`u${i}`} x1={x} y1={0} x2={x} y2={500} strokeOpacity={0.35} />
        ))}
        {levels.map((y, i) => (
          <g key={i}>
            <line x1={-40} y1={y} x2={vx - 40} y2={vy + (y - vy) * 0.25} strokeOpacity={0.3} />
            <line x1={440} y1={y} x2={vx + 40} y2={vy + (y - vy) * 0.25} strokeOpacity={0.3} />
          </g>
        ))}
        <rect x={vx - 40} y={vy - 40} width={80} height={110} strokeOpacity={0.45} />
        {Array.from({ length: 6 }, (_, i) => (
          <g key={`b${i}`} strokeOpacity={0.25}>
            <rect x={-20 + i * 22} y={160 - i * 3} width={18} height={18} />
            <rect x={330 - i * 22} y={160 - i * 3} width={18} height={18} />
            <rect x={-20 + i * 22} y={260 + i * 2} width={20} height={20} />
            <rect x={330 - i * 22} y={260 + i * 2} width={20} height={20} />
          </g>
        ))}
        <line x1={0} y1={500} x2={vx} y2={vy + 70} strokeOpacity={0.2} />
        <line x1={400} y1={500} x2={vx} y2={vy + 70} strokeOpacity={0.2} />
      </g>
    );
  },

  architecture: () => (
    <g>
      {Array.from({ length: 9 }, (_, i) => {
        const x = 30 + i * 44;
        return (
          <g key={i}>
            <line x1={x} x2={x} y1={60} y2={500} strokeOpacity={0.4} />
            <line x1={x + 22} x2={x + 22} y1={60} y2={500} strokeOpacity={0.12} />
          </g>
        );
      })}
      <line x1={0} x2={400} y1={60} y2={60} strokeOpacity={0.5} />
      <line x1={0} x2={400} y1={48} y2={48} strokeOpacity={0.25} />
      {Array.from({ length: 30 }, (_, i) => (
        <line key={`s${i}`} x1={-200 + i * 22} y1={500} x2={100 + i * 22} y2={60} strokeOpacity={0.05} />
      ))}
    </g>
  ),

  portrait: () => (
    <g>
      {Array.from({ length: 9 }, (_, i) => (
        <circle key={`h${i}`} cx={200} cy={185} r={22 + i * 7} strokeOpacity={0.05 + (8 - i) * 0.025} />
      ))}
      <circle cx={200} cy={185} r={58} strokeOpacity={0.5} />
      <path d="M70 520 C 80 360, 150 300, 200 300 C 250 300, 320 360, 330 520" strokeOpacity={0.5} />
      <path d="M100 520 C 112 390, 160 330, 200 330 C 240 330, 288 390, 300 520" strokeOpacity={0.18} />
    </g>
  ),

  people: () => (
    <g>
      {[
        [120, 210, 1],
        [235, 190, 1.15],
        [330, 225, 0.9],
      ].map(([x, y, s], i) => (
        <g key={i} strokeOpacity={0.45 - i * 0.08}>
          <circle cx={x} cy={y} r={30 * s} />
          <path d={`M${x - 80 * s} 520 C ${x - 74 * s} ${y + 90 * s}, ${x - 30 * s} ${y + 50 * s}, ${x} ${y + 50 * s} C ${x + 30 * s} ${y + 50 * s}, ${x + 74 * s} ${y + 90 * s}, ${x + 80 * s} 520`} />
        </g>
      ))}
      <line x1={0} x2={400} y1={120} y2={120} strokeOpacity={0.12} />
    </g>
  ),

  route: () => (
    <g>
      <path d="M60 420 C 120 260, 300 300, 340 90" strokeDasharray="3 7" strokeOpacity={0.6} />
      <circle cx={60} cy={420} r={6} strokeOpacity={0.8} />
      <circle cx={340} cy={90} r={6} strokeOpacity={0.8} />
      <circle cx={340} cy={90} r={18} strokeOpacity={0.25} />
    </g>
  ),

  products: () => (
    <g strokeOpacity={0.4}>
      <line x1={0} x2={400} y1={380} y2={380} strokeOpacity={0.3} />
      <rect x={60} y={230} width={70} height={150} rx={6} />
      <rect x={70} y={214} width={50} height={16} rx={3} />
      <rect x={150} y={270} width={90} height={110} rx={4} />
      <line x1={150} x2={240} y1={300} y2={300} strokeOpacity={0.2} />
      <path d="M262 380 V300 Q262 280 282 280 H318 Q338 280 338 300 V380" />
      <rect x={284} y={262} width={32} height={18} rx={3} />
      <ellipse cx={200} cy={420} rx={170} ry={8} strokeOpacity={0.12} />
    </g>
  ),
};

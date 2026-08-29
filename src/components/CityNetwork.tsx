const cities = [
  { name: 'New Delhi', angle: -90 },
  { name: 'Lucknow', angle: -30 },
  { name: 'Varanasi', angle: 30 },
  { name: 'Shillong', angle: 90 },
  { name: 'Kochi', angle: 150 },
  { name: 'Bhuj', angle: 210 },
];

const R = 120;
const LABEL_R = 158;
const CX = 220;
const CY = 190;

function point(angleDeg: number, radius = R) {
  const a = (angleDeg * Math.PI) / 180;
  return { x: CX + radius * Math.cos(a), y: CY + radius * Math.sin(a) };
}

function labelAnchor(angleDeg: number): 'start' | 'middle' | 'end' {
  const cos = Math.cos((angleDeg * Math.PI) / 180);
  if (cos > 0.3) return 'start';
  if (cos < -0.3) return 'end';
  return 'middle';
}

export default function CityNetwork() {
  return (
    <svg viewBox="0 0 470 380" className="mx-auto w-full max-w-md">
      {cities.map((c, i) => {
        const p = point(c.angle);
        return (
          <line
            key={`l-${i}`}
            x1={CX}
            y1={CY}
            x2={p.x}
            y2={p.y}
            stroke="rgba(244,236,223,0.22)"
            strokeWidth={1}
            strokeDasharray="3 4"
          />
        );
      })}
      {cities.map((c, i) => {
        const a = point(c.angle);
        const b = point(cities[(i + 1) % cities.length].angle);
        return (
          <line
            key={`ring-${i}`}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke="rgba(193,85,46,0.35)"
            strokeWidth={1}
          />
        );
      })}
      <circle cx={CX} cy={CY} r={36} fill="#c1552e" />
      <text
        x={CX}
        y={CY + 5}
        textAnchor="middle"
        fontSize="12"
        fontWeight={700}
        fill="#fff"
        style={{ fontFamily: 'Work Sans, sans-serif', letterSpacing: '0.04em' }}
      >
        NUKKAD
      </text>
      {cities.map((c, i) => {
        const node = point(c.angle);
        const label = point(c.angle, LABEL_R);
        return (
          <g key={`n-${i}`}>
            <circle cx={node.x} cy={node.y} r={7} fill="#f4ecdf" stroke="#c1552e" strokeWidth={2} />
            <text
              x={label.x}
              y={label.y}
              textAnchor={labelAnchor(c.angle)}
              dominantBaseline="middle"
              fontSize="13"
              fontWeight={600}
              fill="#f4ecdf"
              style={{ fontFamily: 'Work Sans, sans-serif' }}
            >
              {c.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

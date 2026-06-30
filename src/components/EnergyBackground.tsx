const BOLT = "M 14 0 L 4 26 L 10 26 L 0 52 L 20 20 L 14 20 Z"

const BOLTS = [
  { x: '6%',  y: '8%',  s: 1.6, delay: 0,   dur: 5   },
  { x: '80%', y: '22%', s: 2.0, delay: 1.8, dur: 6.5 },
  { x: '38%', y: '10%', s: 1.1, delay: 3.4, dur: 4.5 },
  { x: '16%', y: '58%', s: 1.8, delay: 0.7, dur: 5.5 },
  { x: '85%', y: '65%', s: 1.3, delay: 4.0, dur: 4   },
  { x: '52%', y: '38%', s: 0.9, delay: 2.2, dur: 7   },
  { x: '68%', y: '48%', s: 1.5, delay: 5.5, dur: 5   },
]

export default function EnergyBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 50, mixBlendMode: 'screen' }}
      aria-hidden="true"
    >
      {/* Diagonal sweep beams */}
      <div className="eb-beam eb-beam-1" />
      <div className="eb-beam eb-beam-2" />
      <div className="eb-beam eb-beam-3" />

      {/* Lightning bolts */}
      {BOLTS.map((b, i) => (
        <svg
          key={i}
          viewBox="0 0 20 52"
          className="absolute"
          style={{
            left: b.x,
            top: b.y,
            width: `${20 * b.s}px`,
            height: `${52 * b.s}px`,
            animation: `eb-bolt ${b.dur}s ${b.delay}s infinite ease-in-out`,
          }}
        >
          <path d={BOLT} stroke="rgba(180,215,255,0.55)" strokeWidth="1.2" fill="rgba(180,215,255,0.07)" strokeLinejoin="round" />
        </svg>
      ))}

      <style>{`
        @keyframes eb-bolt {
          0%, 100% { opacity: 0; transform: scale(0.92); }
          25%, 75%  { opacity: 0.7; transform: scale(1); }
          50%       { opacity: 1; transform: scale(1.04); }
        }

        .eb-beam {
          position: absolute;
          top: -10%;
          left: 0;
          width: 2px;
          height: 120%;
          filter: blur(3px);
        }

        .eb-beam-1 {
          background: linear-gradient(to bottom, transparent, rgba(200,230,255,0.45) 35%, rgba(180,215,255,0.35) 65%, transparent);
          animation: eb-sweep-1 13s 0s infinite linear;
        }
        .eb-beam-2 {
          background: linear-gradient(to bottom, transparent, rgba(200,230,255,0.35) 40%, rgba(180,215,255,0.25) 60%, transparent);
          animation: eb-sweep-2 18s 5s infinite linear;
        }
        .eb-beam-3 {
          background: linear-gradient(to bottom, transparent, rgba(210,235,255,0.30) 45%, rgba(180,215,255,0.20) 55%, transparent);
          animation: eb-sweep-3 11s 9s infinite linear;
        }

        @keyframes eb-sweep-1 {
          0%   { transform: rotate(16deg) translateX(-120vw); opacity: 0; }
          6%   { opacity: 1; }
          94%  { opacity: 0.5; }
          100% { transform: rotate(16deg) translateX(220vw); opacity: 0; }
        }
        @keyframes eb-sweep-2 {
          0%   { transform: rotate(22deg) translateX(-120vw); opacity: 0; }
          6%   { opacity: 1; }
          94%  { opacity: 0.4; }
          100% { transform: rotate(22deg) translateX(220vw); opacity: 0; }
        }
        @keyframes eb-sweep-3 {
          0%   { transform: rotate(11deg) translateX(-120vw); opacity: 0; }
          6%   { opacity: 1; }
          94%  { opacity: 0.6; }
          100% { transform: rotate(11deg) translateX(220vw); opacity: 0; }
        }
      `}</style>
    </div>
  )
}

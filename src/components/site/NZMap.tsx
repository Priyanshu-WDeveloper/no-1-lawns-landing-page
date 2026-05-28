export function NZMap() {
  return (
    <div className="w-full max-w-md mx-auto">
      <svg viewBox="0 0 240 500" fill="none" className="w-full h-auto drop-shadow-md">
        {/* North Island */}
        <path
          d="M95,45 C140,65 158,115 148,170 C140,210 128,238 102,255 C86,228 72,185 68,138 C65,92 75,58 95,45 Z"
          fill="oklch(0.58 0.17 145 / 0.85)"
          stroke="oklch(0.35 0.12 150)"
          strokeWidth="1.5"
        />
        {/* South Island */}
        <path
          d="M105,270 C72,302 58,360 75,415 C82,448 95,472 108,472 C116,472 126,448 133,415 C146,358 140,302 111,270 Z"
          fill="oklch(0.58 0.17 145 / 0.85)"
          stroke="oklch(0.35 0.12 150)"
          strokeWidth="1.5"
        />

        {/* Auckland */}
        <g transform="translate(115, 72)">
          <line x1="0" y1="0" x2="40" y2="-20" stroke="oklch(0.35 0.12 150)" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="6" fill="#3F7D20" stroke="white" strokeWidth="2" />
          <text x="44" y="-22" className="text-[11px]" fill="oklch(0.35 0.12 150)" fontWeight="700" fontFamily="system-ui">Auckland</text>
        </g>

        {/* Hamilton */}
        <g transform="translate(88, 130)">
          <line x1="0" y1="0" x2="-30" y2="-18" stroke="oklch(0.35 0.12 150)" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="5" fill="#3F7D20" stroke="white" strokeWidth="2" />
          <text x="-34" y="-20" className="text-[11px]" fill="oklch(0.35 0.12 150)" fontWeight="700" fontFamily="system-ui" textAnchor="end">Hamilton</text>
        </g>

        {/* Tauranga */}
        <g transform="translate(142, 140)">
          <line x1="0" y1="0" x2="30" y2="-18" stroke="oklch(0.35 0.12 150)" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="5" fill="#3F7D20" stroke="white" strokeWidth="2" />
          <text x="34" y="-20" className="text-[11px]" fill="oklch(0.35 0.12 150)" fontWeight="700" fontFamily="system-ui">Tauranga</text>
        </g>

        {/* Wellington */}
        <g transform="translate(98, 248)">
          <line x1="0" y1="0" x2="-35" y2="-15" stroke="oklch(0.35 0.12 150)" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="5" fill="#3F7D20" stroke="white" strokeWidth="2" />
          <text x="-39" y="-17" className="text-[11px]" fill="oklch(0.35 0.12 150)" fontWeight="700" fontFamily="system-ui" textAnchor="end">Wellington</text>
        </g>

        {/* Christchurch */}
        <g transform="translate(125, 345)">
          <line x1="0" y1="0" x2="35" y2="-18" stroke="oklch(0.35 0.12 150)" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="5" fill="#3F7D20" stroke="white" strokeWidth="2" />
          <text x="39" y="-20" className="text-[11px]" fill="oklch(0.35 0.12 150)" fontWeight="700" fontFamily="system-ui">Christchurch</text>
        </g>
      </svg>
    </div>
  );
}

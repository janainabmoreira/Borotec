const BoroscopeIllustration = () => (
  <svg viewBox="0 0 560 420" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <linearGradient id="diBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#07101E" />
        <stop offset="100%" stopColor="#0F1E35" />
      </linearGradient>
      <radialGradient id="diCenter" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#06D6E1" stopOpacity="0.18" />
        <stop offset="100%" stopColor="#06D6E1" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="diCardA" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0C1E30" />
        <stop offset="100%" stopColor="#091525" />
      </linearGradient>
      <filter id="diGlow">
        <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="b" />
        <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>

    {/* Background */}
    <rect width="560" height="420" fill="url(#diBg)" />

    {/* Dot grid */}
    {Array.from({ length: 14 }, (_, row) =>
      Array.from({ length: 19 }, (_, col) => (
        <circle key={`${row}-${col}`} cx={col * 31 + 15} cy={row * 31 + 15}
          r="0.7" fill="#06D6E1" opacity="0.07" />
      ))
    )}

    {/* ── CENTRO ── */}
    {/* Glow ambient */}
    <circle cx="280" cy="210" r="140" fill="url(#diCenter)" />

    {/* Connecting lines center → cards */}
    <line x1="280" y1="210" x2="118" y2="110" stroke="#06D6E1" strokeWidth="0.8" opacity="0.2" strokeDasharray="5 4" />
    <line x1="280" y1="210" x2="442" y2="110" stroke="#06D6E1" strokeWidth="0.8" opacity="0.2" strokeDasharray="5 4" />
    <line x1="280" y1="210" x2="118" y2="310" stroke="#F97316" strokeWidth="0.8" opacity="0.2" strokeDasharray="5 4" />
    <line x1="280" y1="210" x2="442" y2="310" stroke="#F97316" strokeWidth="0.8" opacity="0.2" strokeDasharray="5 4" />

    {/* Center badge */}
    <circle cx="280" cy="210" r="44" fill="#0C1E30" stroke="#06D6E1" strokeWidth="1.2" opacity="0.9" />
    <circle cx="280" cy="210" r="38" fill="none" stroke="#06D6E1" strokeWidth="0.5" opacity="0.3" strokeDasharray="4 3" >
      <animateTransform attributeName="transform" type="rotate"
        from="0 280 210" to="360 280 210" dur="18s" repeatCount="indefinite" />
    </circle>
    {/* Shield icon */}
    <path d="M280 180 L296 187 L296 203 C296 214 280 222 280 222 C280 222 264 214 264 203 L264 187 Z"
      fill="none" stroke="#06D6E1" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M274 203 L278 207 L287 197" stroke="#06D6E1" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" fill="none" />
    {/* BOROTEC text */}
    <text x="280" y="232" fontFamily="sans-serif" fontSize="7" fontWeight="700"
      fill="#06D6E1" textAnchor="middle" opacity="0.8" letterSpacing="1.5">BOROTEC</text>

    {/* Pulse rings */}
    <circle cx="280" cy="210" r="52" fill="none" stroke="#06D6E1" strokeWidth="0.6" opacity="0">
      <animate attributeName="r" values="44;80;44" dur="3s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.4;0;0.4" dur="3s" repeatCount="indefinite" />
    </circle>

    {/* ── CARD 1 — Assistência Técnica (topo esquerdo) ── */}
    <rect x="20" y="55" width="196" height="110" rx="14" fill="url(#diCardA)"
      stroke="#06D6E1" strokeWidth="1" opacity="0.9" />
    <rect x="20" y="55" width="196" height="4" rx="2" fill="#06D6E1" opacity="0.7" />
    {/* Wrench icon */}
    <g transform="translate(46, 82)" stroke="#06D6E1" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d="M14 2C9.58 2 6 5.58 6 10c0 1.48.41 2.86 1.12 4.04L2 19.17 4.83 22l5.13-5.12A7.94 7.94 0 0 0 14 18c4.42 0 8-3.58 8-8s-3.58-8-8-8z"
        transform="scale(0.85)" />
      <circle cx="12" cy="8.5" r="2.5" transform="scale(0.85)" fill="#06D6E1" opacity="0.25" />
    </g>
    {/* Icon background circle */}
    <circle cx="58" cy="95" r="18" fill="#06D6E1" opacity="0.08" />
    {/* Wrench simple */}
    <path d="M52 88 C49 85 49 80 52 78 C54 76 57 76 59 78 L64 73 L67 76 L62 81 C64 83 64 86 62 88 C60 90 54 91 52 88Z"
      fill="none" stroke="#06D6E1" strokeWidth="1.4" strokeLinejoin="round" />
    <line x1="64" y1="88" x2="70" y2="94" stroke="#06D6E1" strokeWidth="2"
      strokeLinecap="round" opacity="0.7" />

    <text x="85" y="86" fontFamily="sans-serif" fontSize="10.5" fontWeight="700"
      fill="white" opacity="0.9">Assistência técnica</text>
    <text x="85" y="100" fontFamily="sans-serif" fontSize="9" fill="white" opacity="0.5">
      Suporte pós-venda
    </text>
    <text x="85" y="113" fontFamily="sans-serif" fontSize="8.5" fill="white" opacity="0.35">
      em todo o Brasil
    </text>
    <text x="32" y="148" fontFamily="sans-serif" fontSize="8" fill="#06D6E1" opacity="0.5">
      Atendimento rápido e qualificado
    </text>

    {/* ── CARD 2 — Marcas Mundiais (topo direito) ── */}
    <rect x="344" y="55" width="196" height="110" rx="14" fill="url(#diCardA)"
      stroke="#06D6E1" strokeWidth="1" opacity="0.9" />
    <rect x="344" y="55" width="196" height="4" rx="2" fill="#06D6E1" opacity="0.7" />
    {/* Globe icon */}
    <circle cx="372" cy="95" r="18" fill="#06D6E1" opacity="0.08" />
    <circle cx="372" cy="95" r="13" fill="none" stroke="#06D6E1" strokeWidth="1.3" />
    <ellipse cx="372" cy="95" rx="6.5" ry="13" fill="none" stroke="#06D6E1"
      strokeWidth="1" opacity="0.6" />
    <line x1="359" y1="95" x2="385" y2="95" stroke="#06D6E1" strokeWidth="1" opacity="0.6" />
    <line x1="361" y1="88" x2="383" y2="88" stroke="#06D6E1" strokeWidth="0.8" opacity="0.4" />
    <line x1="361" y1="102" x2="383" y2="102" stroke="#06D6E1" strokeWidth="0.8" opacity="0.4" />

    <text x="398" y="86" fontFamily="sans-serif" fontSize="10.5" fontWeight="700"
      fill="white" opacity="0.9">Marcas líderes</text>
    <text x="398" y="100" fontFamily="sans-serif" fontSize="9" fill="white" opacity="0.5">
      Representante oficial
    </text>
    <text x="398" y="113" fontFamily="sans-serif" fontSize="8.5" fill="white" opacity="0.35">
      de fabricantes mundiais
    </text>
    <text x="356" y="148" fontFamily="sans-serif" fontSize="8" fill="#06D6E1" opacity="0.5">
      Tecnologia de ponta certificada
    </text>

    {/* ── CARD 3 — Equipe Especializada (baixo esquerdo) ── */}
    <rect x="20" y="255" width="196" height="110" rx="14" fill="url(#diCardA)"
      stroke="#F97316" strokeWidth="1" opacity="0.9" />
    <rect x="20" y="255" width="196" height="4" rx="2" fill="#F97316" opacity="0.7" />
    {/* People icon */}
    <circle cx="58" cy="295" r="18" fill="#F97316" opacity="0.08" />
    <circle cx="54" cy="289" r="5" fill="none" stroke="#F97316" strokeWidth="1.3" />
    <path d="M44 302 C44 296 48 293 54 293 C60 293 64 296 64 302"
      fill="none" stroke="#F97316" strokeWidth="1.3" strokeLinecap="round" />
    <circle cx="65" cy="288" r="4" fill="none" stroke="#F97316" strokeWidth="1.1" opacity="0.6" />
    <path d="M58 301 C58 296 61 294 65 294 C69 294 72 296 72 301"
      fill="none" stroke="#F97316" strokeWidth="1.1" strokeLinecap="round" opacity="0.6" />

    <text x="85" y="286" fontFamily="sans-serif" fontSize="10.5" fontWeight="700"
      fill="white" opacity="0.9">Equipe técnica</text>
    <text x="85" y="300" fontFamily="sans-serif" fontSize="9" fill="white" opacity="0.5">
      Especializada
    </text>
    <text x="85" y="313" fontFamily="sans-serif" fontSize="8.5" fill="white" opacity="0.35">
      e em constante atualização
    </text>
    <text x="32" y="348" fontFamily="sans-serif" fontSize="8" fill="#F97316" opacity="0.5">
      Profissionais certificados
    </text>

    {/* ── CARD 4 — Consultoria (baixo direito) ── */}
    <rect x="344" y="255" width="196" height="110" rx="14" fill="url(#diCardA)"
      stroke="#F97316" strokeWidth="1" opacity="0.9" />
    <rect x="344" y="255" width="196" height="4" rx="2" fill="#F97316" opacity="0.7" />
    {/* Headset / consultation icon */}
    <circle cx="372" cy="295" r="18" fill="#F97316" opacity="0.08" />
    {/* Chat bubble */}
    <path d="M362 285 L382 285 C384 285 385 286 385 288 L385 298 C385 300 384 301 382 301 L370 301 L365 306 L365 301 C363 301 362 300 362 298 L362 288 C362 286 363 285 362 285Z"
      fill="none" stroke="#F97316" strokeWidth="1.3" strokeLinejoin="round" />
    <line x1="366" y1="291" x2="381" y2="291" stroke="#F97316" strokeWidth="1" opacity="0.6" />
    <line x1="366" y1="295" x2="378" y2="295" stroke="#F97316" strokeWidth="1" opacity="0.6" />

    <text x="398" y="286" fontFamily="sans-serif" fontSize="10.5" fontWeight="700"
      fill="white" opacity="0.9">Consultoria</text>
    <text x="398" y="300" fontFamily="sans-serif" fontSize="9" fill="white" opacity="0.5">
      técnica personalizada
    </text>
    <text x="398" y="313" fontFamily="sans-serif" fontSize="8.5" fill="white" opacity="0.35">
      para cada aplicação
    </text>
    <text x="356" y="348" fontFamily="sans-serif" fontSize="8" fill="#F97316" opacity="0.5">
      Solução certa para cada cliente
    </text>

    {/* Dot connectors center → cards */}
    <circle cx="118" cy="110" r="3.5" fill="#06D6E1" opacity="0.5" />
    <circle cx="442" cy="110" r="3.5" fill="#06D6E1" opacity="0.5" />
    <circle cx="118" cy="310" r="3.5" fill="#F97316" opacity="0.5" />
    <circle cx="442" cy="310" r="3.5" fill="#F97316" opacity="0.5" />

    {/* Bottom label */}
    <text x="280" y="400" fontFamily="sans-serif" fontSize="8" fill="#06D6E1"
      opacity="0.2" textAnchor="middle" letterSpacing="4">NOSSOS DIFERENCIAIS</text>
  </svg>
);

export default BoroscopeIllustration;

// Paleta fixa de cores de destaque para linhas de produto. Precisa ser um
// conjunto de classes Tailwind LITERAIS no código-fonte — o Tailwind só gera
// a classe se ela aparecer como string completa em algum arquivo escaneado
// no build; montar `bg-${accent}-500/15` dinamicamente a partir do banco
// simplesmente não funciona. Por isso o admin escolhe uma destas chaves em
// um <select>, nunca texto livre.
export type AccentKey =
  | 'cyan' | 'accent' | 'purple' | 'yellow' | 'teal' | 'orange' | 'emerald' | 'blue' | 'rose';

type AccentClasses = {
  pillBg: string; pillText: string;   // selo "Linha X" no hero / dropdown
  badgeBg: string; badgeText: string; // selo sólido sobre a foto do card de produto
  iconBg: string; iconText: string;   // caixa do ícone
  iconTextMuted: string;               // ícone grande no card sem foto (versão com opacidade)
  blurBg: string;                     // círculo decorativo desfocado (bg-* sólido)
  barFrom: string;                    // barra de gradiente no topo do card da Home (from-*)
  cardBgFrom: string;                 // fundo em gradiente do card sem foto (from-*)
};

// Cada valor precisa ser escrito por extenso (nunca `${x}/70` em runtime) —
// o scanner do Tailwind só gera a classe se ela existir como string literal
// completa em algum arquivo, concatenar em tempo de execução não funciona.
export const ACCENT_COLORS: Record<AccentKey, AccentClasses> = {
  cyan:    { pillBg: 'bg-cyan/15',        pillText: 'text-cyan',        badgeBg: 'bg-cyan/90',        badgeText: 'text-charcoal', iconBg: 'bg-cyan/20',        iconText: 'text-cyan',        iconTextMuted: 'text-cyan/70',        blurBg: 'bg-cyan/5',        barFrom: 'from-cyan/60',        cardBgFrom: 'from-cyan/15'        },
  accent:  { pillBg: 'bg-accent/15',      pillText: 'text-accent',      badgeBg: 'bg-accent/90',      badgeText: 'text-white',    iconBg: 'bg-accent/20',      iconText: 'text-accent',      iconTextMuted: 'text-accent/70',      blurBg: 'bg-accent/5',      barFrom: 'from-accent/60',      cardBgFrom: 'from-accent/15'      },
  purple:  { pillBg: 'bg-purple-500/15',  pillText: 'text-purple-400',  badgeBg: 'bg-purple-500/90',  badgeText: 'text-white',    iconBg: 'bg-purple-500/20',  iconText: 'text-purple-400',  iconTextMuted: 'text-purple-400/70',  blurBg: 'bg-purple-500/5',  barFrom: 'from-purple-400/60',  cardBgFrom: 'from-purple-500/15'  },
  yellow:  { pillBg: 'bg-yellow-500/15',  pillText: 'text-yellow-400',  badgeBg: 'bg-yellow-500/90',  badgeText: 'text-white',    iconBg: 'bg-yellow-500/20',  iconText: 'text-yellow-400',  iconTextMuted: 'text-yellow-400/70',  blurBg: 'bg-yellow-500/5',  barFrom: 'from-yellow-400/60',  cardBgFrom: 'from-yellow-500/15'  },
  teal:    { pillBg: 'bg-teal-500/15',    pillText: 'text-teal-400',    badgeBg: 'bg-teal-500/90',    badgeText: 'text-white',    iconBg: 'bg-teal-500/20',    iconText: 'text-teal-400',    iconTextMuted: 'text-teal-400/70',    blurBg: 'bg-teal-500/5',    barFrom: 'from-teal-400/60',    cardBgFrom: 'from-teal-500/15'    },
  orange:  { pillBg: 'bg-orange-500/15',  pillText: 'text-orange-400',  badgeBg: 'bg-orange-500/90',  badgeText: 'text-white',    iconBg: 'bg-orange-500/20',  iconText: 'text-orange-400',  iconTextMuted: 'text-orange-400/70',  blurBg: 'bg-orange-500/5',  barFrom: 'from-orange-400/60',  cardBgFrom: 'from-orange-500/15'  },
  emerald: { pillBg: 'bg-emerald-500/15', pillText: 'text-emerald-400', badgeBg: 'bg-emerald-500/90', badgeText: 'text-white',    iconBg: 'bg-emerald-500/20', iconText: 'text-emerald-400', iconTextMuted: 'text-emerald-400/70', blurBg: 'bg-emerald-500/5', barFrom: 'from-emerald-400/60', cardBgFrom: 'from-emerald-500/15' },
  blue:    { pillBg: 'bg-blue-500/15',    pillText: 'text-blue-400',    badgeBg: 'bg-blue-500/90',    badgeText: 'text-white',    iconBg: 'bg-blue-500/20',    iconText: 'text-blue-400',    iconTextMuted: 'text-blue-400/70',    blurBg: 'bg-blue-500/5',    barFrom: 'from-blue-400/60',    cardBgFrom: 'from-blue-500/15'    },
  rose:    { pillBg: 'bg-rose-500/15',    pillText: 'text-rose-400',    badgeBg: 'bg-rose-500/90',    badgeText: 'text-white',    iconBg: 'bg-rose-500/20',    iconText: 'text-rose-400',    iconTextMuted: 'text-rose-400/70',    blurBg: 'bg-rose-500/5',    barFrom: 'from-rose-400/60',    cardBgFrom: 'from-rose-500/15'    },
};

export const ACCENT_OPTIONS: { value: AccentKey; label: string }[] = [
  { value: 'cyan',    label: 'Ciano (padrão)'          },
  { value: 'accent',  label: 'Laranja (cor de destaque do site)' },
  { value: 'purple',  label: 'Roxo'                     },
  { value: 'yellow',  label: 'Amarelo'                  },
  { value: 'teal',    label: 'Verde-azulado'            },
  { value: 'orange',  label: 'Laranja (tom literal)'    },
  { value: 'emerald', label: 'Esmeralda'                },
  { value: 'blue',    label: 'Azul'                     },
  { value: 'rose',    label: 'Rosa'                     },
];

export function getAccentClasses(accent: string): AccentClasses {
  return ACCENT_COLORS[accent as AccentKey] ?? ACCENT_COLORS.cyan;
}

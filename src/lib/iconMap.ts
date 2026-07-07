import {
  Camera, Plug2, Lightbulb, Video, Battery, Monitor, FileVideo,
  Thermometer, Waves, Eye, ScanSearch, Droplets, Shield, Zap,
  Wrench, Ruler, Activity, Package, type LucideIcon,
} from 'lucide-react';

export const ICON_MAP: Record<string, LucideIcon> = {
  Camera, Plug2, Lightbulb, Video, Battery, Monitor, FileVideo,
  Thermometer, Waves, Eye, ScanSearch, Droplets, Shield, Zap,
  Wrench, Ruler, Activity, Package,
};

export const ICON_OPTIONS: { value: string; label: string }[] = [
  { value: 'Camera',      label: 'Câmera'             },
  { value: 'Video',       label: 'Vídeo'              },
  { value: 'FileVideo',   label: 'Arquivo de Vídeo'   },
  { value: 'Monitor',     label: 'Monitor / Tela'     },
  { value: 'Eye',         label: 'Olho / Visão'       },
  { value: 'ScanSearch',  label: 'Varredura / Scan'   },
  { value: 'Ruler',       label: 'Régua / Medição'    },
  { value: 'Shield',      label: 'Escudo / Proteção'  },
  { value: 'Droplets',    label: 'Gotas / Água'       },
  { value: 'Waves',       label: 'Ondas'              },
  { value: 'Thermometer', label: 'Termômetro'         },
  { value: 'Zap',         label: 'Raio / Energia'     },
  { value: 'Battery',     label: 'Bateria'            },
  { value: 'Plug2',       label: 'Plugue / Conexão'   },
  { value: 'Lightbulb',   label: 'Lâmpada / Luz'      },
  { value: 'Wrench',      label: 'Chave / Ferramenta' },
  { value: 'Activity',    label: 'Atividade / Sinal'  },
  { value: 'Package',     label: 'Pacote / Caixa'     },
];

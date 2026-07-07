import { type LucideIcon, Camera, Monitor, FileVideo, Plug2, Battery, Thermometer, Lightbulb, Video, Droplets } from 'lucide-react';

export type SpecRow = {
  label: string;
  value: string;
  highlight?: 'accent' | 'green';
};

export type SpecGroup = {
  title: string;
  icon: LucideIcon;
  rows: SpecRow[];
};

export type ProductFaq = { question: string; answer: string };

export type ProductFeature = {
  icon: LucideIcon;
  label: string;
  sublabel: string;
};

export type AccessoryRow = {
  model: string;
  probeDiameter: string;
  rigidity: string;
  cableDiameter: string;
  cameraType: string;
  coating: string;
  length: string;
};

export type VideoItem = {
  title: string;
  duration: string;
  url?: string;
};

export type ProductDetailData = {
  id: string;
  cable: string;
  probe: string;
  camera: string;
  ip: string;
  features: ProductFeature[];
  manualUrl: string;
  specsDescription?: string;
  specs: {
    left: SpecGroup[];
    right: SpecGroup[];
  };
  accessories: AccessoryRow[];
  accessoriesTable?: Array<{ title: string; columns: string[]; rows: string[][] }>;
  accessoriesList?: string[];
  accessoriesTip: string;
  applications: string[];
  faqs: ProductFaq[];
  videos: VideoItem[];
};

export const productDetailsMap: Record<string, ProductDetailData> = {
  'sk3208': {
    id: 'sk3208',
    cable: '30m',
    probe: 'Ø8mm',
    camera: '720p',
    ip: 'IP68',
    manualUrl: '',
    features: [
      { icon: Camera,    label: 'Câmera HD',      sublabel: 'Alta definição' },
      { icon: Plug2,     label: 'Cabo resistente', sublabel: 'Até 120m'      },
      { icon: Lightbulb, label: 'Iluminação LED',  sublabel: 'Ajustável'     },
      { icon: Video,     label: 'Gravação',         sublabel: 'Foto e Vídeo'  },
    ],
    specs: {
      left: [
        {
          title: 'Sistema de Câmera',
          icon: Camera,
          rows: [
            { label: 'Tipo de câmera',    value: 'CMOS HD' },
            { label: 'Diâmetro da sonda', value: 'Ø 8,0 mm',           highlight: 'accent' },
            { label: 'Resolução',         value: '1280 × 720p (HD)',    highlight: 'accent' },
            { label: 'Ângulo de visão',   value: '120°' },
            { label: 'Iluminação',        value: '6 LEDs ajustáveis' },
            { label: 'Foco',              value: '10 mm a ∞' },
            { label: 'Proteção IP',       value: 'IP68 — imersão contínua', highlight: 'green' },
            { label: 'Material da sonda', value: 'Aço inoxidável' },
          ],
        },
        {
          title: 'Monitor e Display',
          icon: Monitor,
          rows: [
            { label: 'Tamanho',        value: '7" LCD colorido', highlight: 'accent' },
            { label: 'Resolução',      value: '800 × 480 px' },
            { label: 'Saída de vídeo', value: 'HDMI + AV' },
            { label: 'Brilho',         value: '500 nits' },
          ],
        },
        {
          title: 'Gravação',
          icon: FileVideo,
          rows: [
            { label: 'Mídia',           value: 'Cartão SD (8 GB incluso)', highlight: 'accent' },
            { label: 'Capacidade máx.', value: '32 GB' },
            { label: 'Formatos',        value: 'AVI + JPEG' },
            { label: 'Captura de foto', value: '✓ Botão dedicado',        highlight: 'green' },
          ],
        },
      ],
      right: [
        {
          title: 'Cabo e Sonda',
          icon: Plug2,
          rows: [
            { label: 'Comprimento padrão',    value: '30 metros',               highlight: 'accent' },
            { label: 'Máx. com extensão',     value: '120 metros',              highlight: 'accent' },
            { label: 'Tipo de cabo',          value: 'Fibra de vidro reforçada' },
            { label: 'Duto mínimo',           value: '≥ 25 mm (1")',            highlight: 'accent' },
            { label: 'Contador de distância', value: '✓ Incluso',               highlight: 'green' },
          ],
        },
        {
          title: 'Alimentação',
          icon: Battery,
          rows: [
            { label: 'Bateria',       value: 'Li-Ion 5.200 mAh',    highlight: 'accent' },
            { label: 'Autonomia',     value: '~4 horas de uso',      highlight: 'accent' },
            { label: 'Rede elétrica', value: '110 / 220V automático' },
          ],
        },
        {
          title: 'Condições de Operação',
          icon: Thermometer,
          rows: [
            { label: 'Temperatura',      value: '-10°C a +60°C' },
            { label: 'Umidade relativa', value: '≤ 85%' },
            { label: 'Peso total (kit)', value: '2,8 kg' },
            { label: 'Maleta ABS',       value: '✓ Inclusa', highlight: 'green' },
            { label: 'Garantia',         value: '12 meses',  highlight: 'green' },
          ],
        },
      ],
    },
    accessories: [
      { model: 'SK3208-30',  probeDiameter: 'Ø 8,0 mm', rigidity: 'Sonda rígida de fibra',     cableDiameter: '5 mm', cameraType: 'Frontal', coating: 'Aço inox',       length: '30 m'       },
      { model: 'SK3208-50',  probeDiameter: 'Ø 8,0 mm', rigidity: 'Sonda rígida de fibra',     cableDiameter: '5 mm', cameraType: 'Frontal', coating: 'Aço inox',       length: '50 m'       },
      { model: 'SK3208-80',  probeDiameter: 'Ø 8,0 mm', rigidity: 'Sonda rígida de fibra',     cableDiameter: '5 mm', cameraType: 'Frontal', coating: 'Aço inox',       length: '80 m'       },
      { model: 'SK-ART6-4V', probeDiameter: 'Ø 6,0 mm', rigidity: 'Articulável 4 vias',        cableDiameter: '4 mm', cameraType: 'Frontal', coating: 'Aço inox',       length: 'Sob consulta'},
      { model: 'SK-MAG',     probeDiameter: 'Ø 8,0 mm', rigidity: 'Rígida + ponta magnética',  cableDiameter: '5 mm', cameraType: 'Frontal', coating: 'Aço inox',       length: '30 / 50 m'  },
      { model: 'EXT-20M',    probeDiameter: '—',         rigidity: 'Cabo extensor',             cableDiameter: '5 mm', cameraType: '—',       coating: 'Fibra reforçada', length: '+20 m'     },
    ],
    accessoriesTip: 'Para tubulações retas até 30m, o cabo padrão já atende. Para percursos mais longos ou com curvas fechadas, considere o cabo extensor ou a sonda articulável.',
    applications: [
      'Inspeção de tubulações de esgoto e água potável',
      'Manutenção predial e industrial',
      'Inspeção de canos em paredes e pisos',
      'Vistoria imobiliária',
      'Dutos de climatização',
    ],
    faqs: [
      {
        question: 'Qual o diâmetro mínimo de tubulação para usar este equipamento?',
        answer: 'A sonda tem Ø 8mm — o duto precisa de pelo menos 25mm (1") de diâmetro interno. Para tubulações menores, recomendamos a linha SK-Mini com sonda de Ø 5,5mm.',
      },
      {
        question: 'O cabo de 30m é modular ou contínuo? Posso estender?',
        answer: 'O cabo é contínuo e reforçado internamente com fibra de vidro. É possível adicionar a extensão EXT-20M para ampliar o alcance em até +20m por módulo, chegando a 120m no total.',
      },
      {
        question: 'Funciona em tubulações com água corrente?',
        answer: 'Sim. A sonda possui certificação IP68, suportando imersão contínua. Recomendamos que a vazão não seja excessiva para garantir a estabilidade da câmera durante a inspeção.',
      },
      {
        question: 'Como exporto as gravações para um laudo técnico?',
        answer: 'Basta remover o cartão SD e transferir os arquivos AVI/JPEG para o computador. As gravações incluem marcação de distância no vídeo, facilitando a elaboração do laudo.',
      },
      {
        question: 'Qual a diferença prática entre IP67 e IP68?',
        answer: 'IP67 suporta imersão temporária até 1m por 30 min. IP68 (usado neste equipamento) suporta imersão contínua a profundidades maiores, definidas pelo fabricante — ideal para tubulações permanentemente inundadas.',
      },
      {
        question: 'O equipamento vem calibrado? Há certificado incluso?',
        answer: 'Sim. Todos os equipamentos passam por testes de qualidade e saem com relatório de calibração do fabricante. Certificado de garantia de 12 meses acompanha o kit.',
      },
      {
        question: 'Qual a autonomia real da bateria em campo?',
        answer: 'Em condições normais de uso, a bateria Li-Ion de 5.200 mAh proporciona aproximadamente 4 horas contínuas. Em temperatura abaixo de 10°C, a autonomia pode reduzir em torno de 20%.',
      },
    ],
    videos: [
      { title: 'SK3208 — Unboxing e primeiros passos',        duration: '4 min 32 seg' },
      { title: 'Inspeção real em tubulação de esgoto',        duration: '7 min 18 seg' },
      { title: 'Como gravar e exportar para laudo técnico',   duration: '3 min 05 seg' },
      { title: 'Conectando o cabo extensor 20m',              duration: '2 min 47 seg' },
      { title: 'Manutenção e limpeza da sonda',               duration: '5 min 10 seg' },
      { title: 'Comparativo SK3208 vs SK5010',                duration: '6 min 22 seg' },
    ],
  },

  'sk3610': {
    id: 'sk3610',
    cable: '60m',
    probe: 'Ø8mm',
    camera: '1080p',
    ip: 'IP68',
    manualUrl: '',
    features: [
      { icon: Camera,    label: 'Câmera Full HD',  sublabel: '1080p'      },
      { icon: Plug2,     label: 'Cabo resistente', sublabel: 'Até 180m'   },
      { icon: Lightbulb, label: 'Iluminação LED',  sublabel: 'Ajustável'  },
      { icon: Video,     label: 'Gravação',         sublabel: 'MP4 + JPEG' },
    ],
    specs: {
      left: [
        {
          title: 'Sistema de Câmera',
          icon: Camera,
          rows: [
            { label: 'Tipo de câmera',    value: 'CMOS Full HD' },
            { label: 'Diâmetro da sonda', value: 'Ø 8,0 mm',              highlight: 'accent' },
            { label: 'Resolução',         value: '1920 × 1080p (Full HD)', highlight: 'accent' },
            { label: 'Ângulo de visão',   value: '130°' },
            { label: 'Iluminação',        value: '8 LEDs ajustáveis' },
            { label: 'Foco',              value: '10 mm a ∞' },
            { label: 'Proteção IP',       value: 'IP68 — imersão contínua', highlight: 'green' },
            { label: 'Material da sonda', value: 'Aço inoxidável' },
          ],
        },
        {
          title: 'Monitor e Display',
          icon: Monitor,
          rows: [
            { label: 'Tamanho',        value: '7" IPS LCD colorido', highlight: 'accent' },
            { label: 'Resolução',      value: '1280 × 720 px' },
            { label: 'Saída de vídeo', value: 'HDMI + AV' },
            { label: 'Brilho',         value: '800 nits' },
          ],
        },
        {
          title: 'Gravação',
          icon: FileVideo,
          rows: [
            { label: 'Mídia',           value: 'Cartão SD (16 GB incluso)', highlight: 'accent' },
            { label: 'Capacidade máx.', value: '128 GB' },
            { label: 'Formatos',        value: 'MP4 + JPEG' },
            { label: 'Captura de foto', value: '✓ Botão dedicado',         highlight: 'green' },
          ],
        },
      ],
      right: [
        {
          title: 'Cabo e Sonda',
          icon: Plug2,
          rows: [
            { label: 'Comprimento padrão',    value: '60 metros',               highlight: 'accent' },
            { label: 'Máx. com extensão',     value: '180 metros',              highlight: 'accent' },
            { label: 'Tipo de cabo',          value: 'Fibra de vidro reforçada' },
            { label: 'Duto mínimo',           value: '≥ 25 mm (1")',            highlight: 'accent' },
            { label: 'Contador de distância', value: '✓ Incluso',               highlight: 'green' },
          ],
        },
        {
          title: 'Alimentação',
          icon: Battery,
          rows: [
            { label: 'Bateria',       value: 'Li-Ion 7.800 mAh',    highlight: 'accent' },
            { label: 'Autonomia',     value: '~6 horas de uso',      highlight: 'accent' },
            { label: 'Rede elétrica', value: '110 / 220V automático' },
          ],
        },
        {
          title: 'Condições de Operação',
          icon: Thermometer,
          rows: [
            { label: 'Temperatura',      value: '-10°C a +60°C' },
            { label: 'Umidade relativa', value: '≤ 85%' },
            { label: 'Peso total (kit)', value: '3,2 kg' },
            { label: 'Maleta ABS',       value: '✓ Inclusa', highlight: 'green' },
            { label: 'Garantia',         value: '12 meses',  highlight: 'green' },
          ],
        },
      ],
    },
    accessories: [
      { model: 'SK3610-60',  probeDiameter: 'Ø 8,0 mm', rigidity: 'Sonda rígida de fibra',  cableDiameter: '5 mm', cameraType: 'Frontal', coating: 'Aço inox',        length: '60 m'       },
      { model: 'SK3610-100', probeDiameter: 'Ø 8,0 mm', rigidity: 'Sonda rígida de fibra',  cableDiameter: '5 mm', cameraType: 'Frontal', coating: 'Aço inox',        length: '100 m'      },
      { model: 'SK-ART6-4V', probeDiameter: 'Ø 6,0 mm', rigidity: 'Articulável 4 vias',     cableDiameter: '4 mm', cameraType: 'Frontal', coating: 'Aço inox',        length: 'Sob consulta'},
      { model: 'EXT-30M',    probeDiameter: '—',         rigidity: 'Cabo extensor',          cableDiameter: '5 mm', cameraType: '—',       coating: 'Fibra reforçada', length: '+30 m'      },
    ],
    accessoriesTip: 'Para percursos longos ou com curvas, utilize a sonda articulável. O cabo extensor EXT-30M amplia o alcance em mais 30m.',
    applications: [
      'Inspeção de redes coletoras de esgoto',
      'Tubulações industriais de médio porte',
      'Dutos de climatização comercial',
      'Manutenção em condomínios e plantas industriais',
    ],
    faqs: [
      {
        question: 'O equipamento grava em Full HD?',
        answer: 'Sim. A câmera CMOS Full HD grava em 1920 × 1080p nos formatos MP4 e JPEG.',
      },
      {
        question: 'A sonda suporta imersão?',
        answer: 'Sim. Certificação IP68 para imersão contínua em água.',
      },
      {
        question: 'É possível conectar a um monitor externo?',
        answer: 'Sim. A saída HDMI permite conectar a qualquer monitor ou TV Full HD para apresentações e relatórios.',
      },
      {
        question: 'Qual a garantia?',
        answer: '12 meses de garantia contra defeitos de fabricação, com suporte técnico nacional.',
      },
    ],
    videos: [
      { title: 'SK3610 — Apresentação e recursos',             duration: '5 min 10 seg' },
      { title: 'Inspeção em tubulação industrial de 60m',     duration: '8 min 44 seg' },
      { title: 'Conectando saída HDMI para laudo ao vivo',    duration: '3 min 12 seg' },
      { title: 'Limpeza e manutenção da sonda Ø8mm',          duration: '4 min 05 seg' },
    ],
  },

  'sk3828': {
    id: 'sk3828',
    cable: '100m',
    probe: 'Ø10mm',
    camera: '1080p',
    ip: 'IP68',
    manualUrl: '',
    features: [
      { icon: Camera,    label: 'Câmera Full HD',  sublabel: '1080p'    },
      { icon: Plug2,     label: 'Cabo resistente', sublabel: 'Até 300m' },
      { icon: Lightbulb, label: 'Iluminação LED',  sublabel: '10 LEDs'  },
      { icon: Video,     label: 'Gravação',         sublabel: 'MP4 + JPEG + RAW' },
    ],
    specs: {
      left: [
        {
          title: 'Sistema de Câmera',
          icon: Camera,
          rows: [
            { label: 'Tipo de câmera',    value: 'CMOS Full HD' },
            { label: 'Diâmetro da sonda', value: 'Ø 10,0 mm',             highlight: 'accent' },
            { label: 'Resolução',         value: '1920 × 1080p (Full HD)', highlight: 'accent' },
            { label: 'Ângulo de visão',   value: '130°' },
            { label: 'Iluminação',        value: '10 LEDs ajustáveis' },
            { label: 'Foco',              value: '15 mm a ∞' },
            { label: 'Proteção IP',       value: 'IP68 — imersão contínua', highlight: 'green' },
            { label: 'Material da sonda', value: 'Aço inoxidável reforçado' },
          ],
        },
        {
          title: 'Monitor e Display',
          icon: Monitor,
          rows: [
            { label: 'Tamanho',        value: '9" IPS LCD colorido', highlight: 'accent' },
            { label: 'Resolução',      value: '1280 × 720 px' },
            { label: 'Saída de vídeo', value: 'HDMI + AV + USB' },
            { label: 'Brilho',         value: '1000 nits' },
          ],
        },
        {
          title: 'Gravação',
          icon: FileVideo,
          rows: [
            { label: 'Mídia',           value: 'Cartão SD (32 GB incluso)', highlight: 'accent' },
            { label: 'Capacidade máx.', value: '256 GB' },
            { label: 'Formatos',        value: 'MP4 + JPEG + RAW' },
            { label: 'Captura de foto', value: '✓ Botão dedicado',          highlight: 'green' },
          ],
        },
      ],
      right: [
        {
          title: 'Cabo e Sonda',
          icon: Plug2,
          rows: [
            { label: 'Comprimento padrão',    value: '100 metros',              highlight: 'accent' },
            { label: 'Máx. com extensão',     value: '300 metros',              highlight: 'accent' },
            { label: 'Tipo de cabo',          value: 'Fibra de vidro reforçada' },
            { label: 'Duto mínimo',           value: '≥ 32 mm (1,25")',         highlight: 'accent' },
            { label: 'Contador de distância', value: '✓ Incluso',               highlight: 'green' },
          ],
        },
        {
          title: 'Alimentação',
          icon: Battery,
          rows: [
            { label: 'Bateria',       value: 'Li-Ion 10.400 mAh',   highlight: 'accent' },
            { label: 'Autonomia',     value: '~8 horas de uso',      highlight: 'accent' },
            { label: 'Rede elétrica', value: '110 / 220V automático' },
          ],
        },
        {
          title: 'Condições de Operação',
          icon: Thermometer,
          rows: [
            { label: 'Temperatura',      value: '-10°C a +60°C' },
            { label: 'Umidade relativa', value: '≤ 85%' },
            { label: 'Peso total (kit)', value: '4,5 kg' },
            { label: 'Maleta ABS',       value: '✓ Inclusa', highlight: 'green' },
            { label: 'Garantia',         value: '12 meses',  highlight: 'green' },
          ],
        },
      ],
    },
    accessories: [
      { model: 'SK3828-100', probeDiameter: 'Ø 10,0 mm', rigidity: 'Sonda rígida de fibra',  cableDiameter: '6 mm', cameraType: 'Frontal', coating: 'Aço inox',        length: '100 m'      },
      { model: 'SK3828-200', probeDiameter: 'Ø 10,0 mm', rigidity: 'Sonda rígida de fibra',  cableDiameter: '6 mm', cameraType: 'Frontal', coating: 'Aço inox',        length: '200 m'      },
      { model: 'SK-ART10',   probeDiameter: 'Ø 10,0 mm', rigidity: 'Articulável 4 vias',     cableDiameter: '6 mm', cameraType: 'Frontal', coating: 'Aço inox',        length: 'Sob consulta'},
      { model: 'EXT-50M',    probeDiameter: '—',          rigidity: 'Cabo extensor',          cableDiameter: '6 mm', cameraType: '—',       coating: 'Fibra reforçada', length: '+50 m'      },
      { model: 'BOB-MOT',    probeDiameter: '—',          rigidity: 'Suporte de bobina',      cableDiameter: '—',    cameraType: '—',       coating: 'Alumínio',        length: 'Universal'  },
    ],
    accessoriesTip: 'Para inspeções acima de 100m, utilize os cabos extensores EXT-50M. O suporte de bobina motorizado BOB-MOT facilita o manuseio em campo.',
    applications: [
      'Grandes redes coletoras e adutoras',
      'Tubulações industriais de grande diâmetro',
      'Inspeção de dutos subterrâneos longos',
      'Obras de saneamento e infraestrutura',
    ],
    faqs: [
      {
        question: 'Qual o comprimento máximo com extensão?',
        answer: 'Com extensões opcionais EXT-50M, o sistema atinge até 300 metros de alcance total.',
      },
      {
        question: 'A sonda Ø10mm inspeciona dutos de qual tamanho?',
        answer: 'Dutos a partir de 32 mm (1,25") de diâmetro interno — ideal para tubulações de saneamento e indústria pesada.',
      },
      {
        question: 'O suporte de bobina motorizado é necessário?',
        answer: 'Não é obrigatório, mas facilita muito o trabalho com cabos acima de 100m, reduzindo o esforço de enrolar/desenrolar manualmente.',
      },
      {
        question: 'Qual a garantia?',
        answer: '12 meses de garantia contra defeitos de fabricação, com suporte técnico nacional.',
      },
    ],
    videos: [
      { title: 'SK3828 — Inspeção de adutora de 200m',        duration: '9 min 18 seg' },
      { title: 'Configurando o suporte de bobina motorizado', duration: '4 min 52 seg' },
      { title: 'Como usar a extensão EXT-50M',                duration: '3 min 40 seg' },
      { title: 'Manutenção da sonda Ø10mm',                   duration: '5 min 30 seg' },
    ],
  },

  'bt-5000': {
    id: 'bt-5000',
    cable: '1,5m',
    probe: 'Ø6mm',
    camera: '1080p',
    ip: 'IP67',
    manualUrl: '',
    features: [
      { icon: Camera,    label: 'Câmera 1080p Full HD', sublabel: 'Alta definição'   },
      { icon: Monitor,   label: 'Articulação 4 vias',   sublabel: 'Controle total'   },
      { icon: Lightbulb, label: 'LED ajustável',         sublabel: '6 LEDs'           },
      { icon: Video,     label: 'Gravação foto/vídeo',   sublabel: 'MP4 + JPEG'       },
    ],
    specs: {
      left: [
        {
          title: 'Sistema de Câmera',
          icon: Camera,
          rows: [
            { label: 'Tipo de câmera',    value: 'CMOS Full HD' },
            { label: 'Diâmetro da sonda', value: 'Ø 6,0 mm',              highlight: 'accent' },
            { label: 'Resolução',         value: '1920 × 1080p (Full HD)', highlight: 'accent' },
            { label: 'Ângulo de visão',   value: '120°' },
            { label: 'Iluminação',        value: '6 LEDs ajustáveis' },
            { label: 'Articulação',       value: '4 vias ±180°',           highlight: 'accent' },
            { label: 'Proteção IP',       value: 'IP67',                   highlight: 'green'  },
            { label: 'Material da sonda', value: 'Aço inoxidável' },
          ],
        },
        {
          title: 'Monitor e Display',
          icon: Monitor,
          rows: [
            { label: 'Tamanho',        value: '5" IPS LCD colorido', highlight: 'accent' },
            { label: 'Resolução',      value: '1280 × 720 px' },
            { label: 'Saída de vídeo', value: 'HDMI + USB' },
            { label: 'Brilho',         value: '600 nits' },
          ],
        },
        {
          title: 'Gravação',
          icon: FileVideo,
          rows: [
            { label: 'Mídia',           value: 'Cartão SD (16 GB incluso)', highlight: 'accent' },
            { label: 'Capacidade máx.', value: '64 GB' },
            { label: 'Formatos',        value: 'MP4 + JPEG' },
            { label: 'Captura de foto', value: '✓ Botão dedicado',          highlight: 'green'  },
          ],
        },
      ],
      right: [
        {
          title: 'Cabo e Sonda',
          icon: Plug2,
          rows: [
            { label: 'Comprimento',    value: '1,5 metros',          highlight: 'accent' },
            { label: 'Tipo de cabo',   value: 'Fibra óptica reforçada' },
            { label: 'Rigidez',        value: 'Semi-rígido articulável' },
            { label: 'Raio mín. curva', value: '50 mm' },
          ],
        },
        {
          title: 'Alimentação',
          icon: Battery,
          rows: [
            { label: 'Bateria',       value: 'Li-Ion 4.000 mAh',    highlight: 'accent' },
            { label: 'Autonomia',     value: '~3 horas de uso',      highlight: 'accent' },
            { label: 'Carregamento',  value: 'USB-C 5V/2A' },
          ],
        },
        {
          title: 'Condições de Operação',
          icon: Thermometer,
          rows: [
            { label: 'Temperatura',      value: '-10°C a +60°C' },
            { label: 'Umidade relativa', value: '≤ 90%' },
            { label: 'Peso total (kit)', value: '1,2 kg' },
            { label: 'Maleta rígida',    value: '✓ Inclusa', highlight: 'green' },
            { label: 'Garantia',         value: '12 meses',  highlight: 'green' },
          ],
        },
      ],
    },
    accessories: [
      { model: 'BT5000-EXT',  probeDiameter: 'Ø 6,0 mm', rigidity: 'Sonda articulável 4 vias', cableDiameter: '4 mm', cameraType: 'Frontal', coating: 'Aço inox', length: '1,5 m' },
      { model: 'BT-MAG6',     probeDiameter: 'Ø 6,0 mm', rigidity: 'Ponta magnética',           cableDiameter: '4 mm', cameraType: 'Frontal', coating: 'Aço inox', length: '1,5 m' },
      { model: 'BT-HOOK6',    probeDiameter: 'Ø 6,0 mm', rigidity: 'Ponta com gancho',          cableDiameter: '4 mm', cameraType: 'Frontal', coating: 'Aço inox', length: '1,5 m' },
    ],
    accessoriesTip: 'A ponta magnética BT-MAG6 é ideal para recuperação de peças metálicas. O gancho BT-HOOK6 facilita a inspeção em canais internos de motores.',
    applications: [
      'Inspeção interna de motores de combustão interna',
      'Vistoria de câmaras de turbinas e compressores',
      'Manutenção preditiva de válvulas industriais',
      'Verificação de integridade de cilindros',
      'Inspeção de câmaras de combustão de aviões',
      'Controle de qualidade na linha de produção',
    ],
    faqs: [
      {
        question: 'O BT-5000 é adequado para inspeção de motores a jato?',
        answer: 'Sim. A sonda de Ø6mm e articulação 4 vias permite inspecionar câmaras de combustão, palhetas de turbina e componentes internos de motores aeronáuticos com segurança e precisão.',
      },
      {
        question: 'A câmera 1080p oferece imagem nítida em espaços escuros de motores?',
        answer: 'Sim. Os 6 LEDs ajustáveis proporcionam iluminação uniforme mesmo em cavidades completamente escuras. A câmera Full HD captura detalhes de trincas, depósitos e desgaste com nitidez.',
      },
      {
        question: 'É possível conectar o BT-5000 a um sistema de inspeção já existente?',
        answer: 'Sim. A saída HDMI permite integração com monitores externos, sistemas de registro de laudos e softwares de inspeção industrial. O formato MP4 é compatível com a maioria das plataformas.',
      },
    ],
    videos: [
      { title: 'BT-5000 — Inspeção de motor V8 em 4K (downscale Full HD)', duration: '6 min 14 seg' },
      { title: 'BT-5000 — Articulação 4 vias em câmara de combustão',      duration: '3 min 48 seg' },
    ],
  },

  'bt-400': {
    id: 'bt-400',
    cable: '1m',
    probe: 'Ø8mm',
    camera: 'HD',
    ip: 'IP67',
    manualUrl: '',
    features: [
      { icon: Camera,    label: 'Câmera HD',         sublabel: 'Alta definição' },
      { icon: Monitor,   label: 'Articulação 2 vias', sublabel: 'Flexível'      },
      { icon: Lightbulb, label: 'LED integrado',      sublabel: 'Ajustável'     },
      { icon: Video,     label: 'Gravação',            sublabel: 'Foto e vídeo'  },
    ],
    specs: {
      left: [
        {
          title: 'Sistema de Câmera',
          icon: Camera,
          rows: [
            { label: 'Tipo de câmera',    value: 'CMOS HD' },
            { label: 'Diâmetro da sonda', value: 'Ø 8,0 mm',        highlight: 'accent' },
            { label: 'Resolução',         value: '1280 × 720p (HD)', highlight: 'accent' },
            { label: 'Ângulo de visão',   value: '120°' },
            { label: 'Iluminação',        value: '4 LEDs ajustáveis' },
            { label: 'Articulação',       value: '2 vias ±180°',     highlight: 'accent' },
            { label: 'Proteção IP',       value: 'IP67',              highlight: 'green'  },
            { label: 'Material da sonda', value: 'Aço inoxidável' },
          ],
        },
        {
          title: 'Monitor e Display',
          icon: Monitor,
          rows: [
            { label: 'Tamanho',        value: '4,3" LCD colorido', highlight: 'accent' },
            { label: 'Resolução',      value: '800 × 480 px' },
            { label: 'Saída de vídeo', value: 'USB' },
            { label: 'Brilho',         value: '450 nits' },
          ],
        },
        {
          title: 'Gravação',
          icon: FileVideo,
          rows: [
            { label: 'Mídia',           value: 'Cartão SD (8 GB incluso)', highlight: 'accent' },
            { label: 'Capacidade máx.', value: '32 GB' },
            { label: 'Formatos',        value: 'AVI + JPEG' },
            { label: 'Captura de foto', value: '✓ Botão dedicado',         highlight: 'green'  },
          ],
        },
      ],
      right: [
        {
          title: 'Cabo e Sonda',
          icon: Plug2,
          rows: [
            { label: 'Comprimento',     value: '1 metro',               highlight: 'accent' },
            { label: 'Tipo de cabo',    value: 'Aço trançado reforçado' },
            { label: 'Rigidez',         value: 'Semi-rígido' },
            { label: 'Raio mín. curva', value: '30 mm' },
          ],
        },
        {
          title: 'Alimentação',
          icon: Battery,
          rows: [
            { label: 'Bateria',      value: 'Li-Ion 3.000 mAh',    highlight: 'accent' },
            { label: 'Autonomia',    value: '~2,5 horas de uso',    highlight: 'accent' },
            { label: 'Carregamento', value: 'Micro USB 5V/1A' },
          ],
        },
        {
          title: 'Condições de Operação',
          icon: Thermometer,
          rows: [
            { label: 'Temperatura',      value: '-10°C a +55°C' },
            { label: 'Umidade relativa', value: '≤ 85%' },
            { label: 'Peso total (kit)', value: '0,85 kg' },
            { label: 'Case rígido',      value: '✓ Incluso', highlight: 'green' },
            { label: 'Garantia',         value: '12 meses',  highlight: 'green' },
          ],
        },
      ],
    },
    accessories: [
      { model: 'BT400-HOOK', probeDiameter: 'Ø 8,0 mm', rigidity: 'Ponta com gancho',   cableDiameter: '5 mm', cameraType: 'Frontal', coating: 'Aço inox', length: '1 m' },
      { model: 'BT400-MAG',  probeDiameter: 'Ø 8,0 mm', rigidity: 'Ponta magnética',    cableDiameter: '5 mm', cameraType: 'Frontal', coating: 'Aço inox', length: '1 m' },
    ],
    accessoriesTip: 'O gancho BT400-HOOK auxilia na inspeção de cilindros e válvulas. A ponta magnética BT400-MAG recupera peças metálicas soltas no interior de motores.',
    applications: [
      'Inspeção de cilindros e câmaras de motores',
      'Verificação de válvulas e assentos de válvulas',
      'Inspeção de câmaras de combustão',
      'Diagnóstico em motores diesel e gasolina',
      'Manutenção de compressores industriais',
    ],
    faqs: [
      {
        question: 'A sonda de Ø8mm passa pela vela de ignição?',
        answer: 'Sim. Com o adaptador de entrada correto, a sonda de Ø8mm pode ser inserida pelos orifícios de vela e bujão de óleo para inspeção interna do motor sem desmontagem.',
      },
      {
        question: 'O BT-400 funciona em motores a diesel?',
        answer: 'Sim. A sonda IP67 suporta ambientes úmidos e com vapores de combustível. É amplamente utilizada em manutenção de motores diesel industriais e veículos pesados.',
      },
      {
        question: 'A gravação é feita diretamente no equipamento?',
        answer: 'Sim. O cartão SD incluso permite gravação de fotos e vídeos diretamente na câmera. O arquivo pode ser exportado via USB para elaboração de laudos técnicos.',
      },
    ],
    videos: [
      { title: 'BT-400 — Inspeção de motor de caminhão sem desmontagem', duration: '5 min 22 seg' },
    ],
  },

  'bt-300': {
    id: 'bt-300',
    cable: '1m',
    probe: 'Ø6mm',
    camera: 'HD',
    ip: 'IP67',
    manualUrl: '',
    features: [
      { icon: Camera,    label: 'Câmera HD',       sublabel: 'Alta definição' },
      { icon: Plug2,     label: 'Sonda flexível',   sublabel: 'Semi-rígida'   },
      { icon: Lightbulb, label: 'LED integrado',    sublabel: 'Ajustável'     },
      { icon: Video,     label: 'Foto e vídeo',     sublabel: 'Integrado'     },
    ],
    specs: {
      left: [
        {
          title: 'Sistema de Câmera',
          icon: Camera,
          rows: [
            { label: 'Tipo de câmera',    value: 'CMOS HD' },
            { label: 'Diâmetro da sonda', value: 'Ø 6,0 mm',        highlight: 'accent' },
            { label: 'Resolução',         value: '1280 × 720p (HD)', highlight: 'accent' },
            { label: 'Ângulo de visão',   value: '110°' },
            { label: 'Iluminação',        value: '4 LEDs ajustáveis' },
            { label: 'Proteção IP',       value: 'IP67',              highlight: 'green'  },
            { label: 'Material da sonda', value: 'Aço inoxidável' },
          ],
        },
        {
          title: 'Monitor e Display',
          icon: Monitor,
          rows: [
            { label: 'Tamanho',        value: '4,3" LCD colorido', highlight: 'accent' },
            { label: 'Resolução',      value: '800 × 480 px' },
            { label: 'Saída de vídeo', value: 'USB' },
            { label: 'Brilho',         value: '400 nits' },
          ],
        },
        {
          title: 'Gravação',
          icon: FileVideo,
          rows: [
            { label: 'Mídia',           value: 'Cartão SD (8 GB incluso)', highlight: 'accent' },
            { label: 'Capacidade máx.', value: '32 GB' },
            { label: 'Formatos',        value: 'AVI + JPEG' },
            { label: 'Captura de foto', value: '✓ Botão dedicado',         highlight: 'green'  },
          ],
        },
      ],
      right: [
        {
          title: 'Cabo e Sonda',
          icon: Plug2,
          rows: [
            { label: 'Comprimento',     value: '1 metro',             highlight: 'accent' },
            { label: 'Tipo de sonda',   value: 'Semi-rígida flexível' },
            { label: 'Rigidez',         value: 'Flexível' },
            { label: 'Raio mín. curva', value: '20 mm' },
          ],
        },
        {
          title: 'Alimentação',
          icon: Battery,
          rows: [
            { label: 'Bateria',      value: 'Li-Ion 2.500 mAh', highlight: 'accent' },
            { label: 'Autonomia',    value: '~2 horas de uso',   highlight: 'accent' },
            { label: 'Carregamento', value: 'Micro USB 5V/1A' },
          ],
        },
        {
          title: 'Condições de Operação',
          icon: Thermometer,
          rows: [
            { label: 'Temperatura',      value: '-10°C a +55°C' },
            { label: 'Umidade relativa', value: '≤ 85%' },
            { label: 'Peso total (kit)', value: '0,7 kg' },
            { label: 'Case rígido',      value: '✓ Incluso', highlight: 'green' },
            { label: 'Garantia',         value: '12 meses',  highlight: 'green' },
          ],
        },
      ],
    },
    accessories: [
      { model: 'BT300-MIRROR', probeDiameter: 'Ø 6,0 mm', rigidity: 'Ponta com espelho',  cableDiameter: '4 mm', cameraType: 'Lateral via espelho', coating: 'Aço inox', length: '1 m' },
      { model: 'BT300-HOOK',   probeDiameter: 'Ø 6,0 mm', rigidity: 'Ponta com gancho',   cableDiameter: '4 mm', cameraType: 'Frontal',             coating: 'Aço inox', length: '1 m' },
    ],
    accessoriesTip: 'O espelho BT300-MIRROR permite visão lateral sem articulação, ideal para passagens retas. O gancho auxilia na remoção de detritos durante a inspeção.',
    applications: [
      'Manutenção preditiva de máquinas industriais',
      'Inspeção de caixas de câmbio e redutores',
      'Verificação de rolamentos e engrenagens',
      'Controle de qualidade em usinagem',
      'Inspeção de dutos de ar comprimido',
    ],
    faqs: [
      {
        question: 'A sonda de Ø6mm é adequada para inspeção de caixas de câmbio?',
        answer: 'Sim. A sonda semi-rígida de Ø6mm pode ser inserida pelos orifícios de respiro e drenos de caixas de câmbio para verificação de engrenagens, rolamentos e presença de limalha metálica.',
      },
      {
        question: 'Como o BT-300 se diferencia do BT-400?',
        answer: 'O BT-300 possui sonda de Ø6mm (mais fina) e sonda semi-rígida, ideal para passagens estreitas. O BT-400 tem sonda Ø8mm com articulação 2 vias, mais adequado para cavidades maiores com curvas.',
      },
      {
        question: 'É possível usar o BT-300 em tubulações com fluido?',
        answer: 'Sim. A certificação IP67 permite inspeção em ambientes úmidos e com presença de óleo ou refrigerante, desde que não haja imersão total prolongada.',
      },
    ],
    videos: [
      { title: 'BT-300 — Inspeção de caixa de câmbio automático sem desmontagem', duration: '4 min 55 seg' },
    ],
  },

  'bt-100': {
    id: 'bt-100',
    cable: '1m',
    probe: 'Ø4mm',
    camera: 'HD',
    ip: 'IP67',
    manualUrl: '',
    features: [
      { icon: Camera,    label: 'Micro câmera',     sublabel: 'Câmera HD'      },
      { icon: Plug2,     label: 'Sonda ultra-slim', sublabel: 'Ø4mm'           },
      { icon: Lightbulb, label: 'LED integrado',    sublabel: 'Compacto'       },
      { icon: Video,     label: 'Gravação',          sublabel: 'Foto e vídeo'   },
    ],
    specs: {
      left: [
        {
          title: 'Sistema de Câmera',
          icon: Camera,
          rows: [
            { label: 'Tipo de câmera',    value: 'CMOS HD compacta' },
            { label: 'Diâmetro da sonda', value: 'Ø 4,0 mm',        highlight: 'accent' },
            { label: 'Resolução',         value: '1280 × 720p (HD)', highlight: 'accent' },
            { label: 'Ângulo de visão',   value: '100°' },
            { label: 'Iluminação',        value: '4 micro LEDs' },
            { label: 'Proteção IP',       value: 'IP67',              highlight: 'green'  },
            { label: 'Material da sonda', value: 'Aço inoxidável' },
          ],
        },
        {
          title: 'Monitor e Display',
          icon: Monitor,
          rows: [
            { label: 'Tamanho',        value: '3,5" LCD colorido', highlight: 'accent' },
            { label: 'Resolução',      value: '640 × 480 px' },
            { label: 'Saída de vídeo', value: 'USB' },
            { label: 'Brilho',         value: '350 nits' },
          ],
        },
        {
          title: 'Gravação',
          icon: FileVideo,
          rows: [
            { label: 'Mídia',           value: 'Cartão SD (4 GB incluso)', highlight: 'accent' },
            { label: 'Capacidade máx.', value: '16 GB' },
            { label: 'Formatos',        value: 'AVI + JPEG' },
            { label: 'Captura de foto', value: '✓ Botão dedicado',         highlight: 'green'  },
          ],
        },
      ],
      right: [
        {
          title: 'Cabo e Sonda',
          icon: Plug2,
          rows: [
            { label: 'Comprimento',     value: '1 metro',               highlight: 'accent' },
            { label: 'Tipo de sonda',   value: 'Ultra-slim semi-rígida' },
            { label: 'Rigidez',         value: 'Flexível' },
            { label: 'Raio mín. curva', value: '15 mm' },
          ],
        },
        {
          title: 'Alimentação',
          icon: Battery,
          rows: [
            { label: 'Bateria',      value: 'Li-Ion 2.000 mAh', highlight: 'accent' },
            { label: 'Autonomia',    value: '~1,5 hora de uso',  highlight: 'accent' },
            { label: 'Carregamento', value: 'Micro USB 5V/1A' },
          ],
        },
        {
          title: 'Condições de Operação',
          icon: Thermometer,
          rows: [
            { label: 'Temperatura',      value: '-10°C a +50°C' },
            { label: 'Umidade relativa', value: '≤ 85%' },
            { label: 'Peso total (kit)', value: '0,5 kg' },
            { label: 'Case compacto',    value: '✓ Incluso', highlight: 'green' },
            { label: 'Garantia',         value: '12 meses',  highlight: 'green' },
          ],
        },
      ],
    },
    accessories: [
      { model: 'BT100-FLEX', probeDiameter: 'Ø 4,0 mm', rigidity: 'Sonda extra-flexível', cableDiameter: '3 mm', cameraType: 'Frontal', coating: 'Aço inox', length: '1 m' },
    ],
    accessoriesTip: 'A sonda extra-flexível BT100-FLEX é recomendada para passagens com múltiplas curvas ou ângulos estreitos que exigem maior maleabilidade.',
    applications: [
      'Inspeção de passagens extremamente estreitas',
      'Verificação interna de injetores e bicos',
      'Inspeção de câmaras de turbinas pequenas',
      'Controle de qualidade em peças usinadas',
      'Inspeção de orifícios em moldes e ferramentas',
    ],
    faqs: [
      {
        question: 'O BT-100 com Ø4mm é o menor disponível?',
        answer: 'Sim. O BT-100 possui a menor sonda da Linha M, com Ø4mm, ideal para inspeção em passagens e furos que não comportam sondas maiores.',
      },
      {
        question: 'A câmera HD em sonda Ø4mm tem boa qualidade de imagem?',
        answer: 'Sim. Apesar do tamanho compacto, o sensor CMOS HD entrega imagens com resolução 1280 × 720p. Para espaços muito reduzidos, a qualidade é excelente para identificar trincas, detritos e desgaste.',
      },
      {
        question: 'A bateria dura apenas 1,5 hora — é suficiente para inspeção?',
        answer: 'Para inspeções pontuais e rápidas, sim. Recomendamos carregar completamente antes de usar. O carregador USB-C permite recarga em campo com powerbank ou tomada.',
      },
    ],
    videos: [
      { title: 'BT-100 — Micro inspeção de injetores de combustível', duration: '3 min 40 seg' },
    ],
  },

  'bt-3d': {
    id: 'bt-3d',
    cable: '1m',
    probe: 'Ø8mm',
    camera: '3D Full HD',
    ip: 'IP67',
    manualUrl: '',
    features: [
      { icon: Camera,    label: 'Câmera 3D estéreo',    sublabel: 'Visão tridimensional' },
      { icon: Monitor,   label: 'Medição dimensional',  sublabel: 'Sem contato'          },
      { icon: Lightbulb, label: 'LED de inspeção',      sublabel: 'Ajustável'            },
      { icon: Video,     label: 'Gravação 3D',           sublabel: 'MP4 3D + JPEG'        },
    ],
    specs: {
      left: [
        {
          title: 'Sistema de Câmera 3D',
          icon: Camera,
          rows: [
            { label: 'Tipo de câmera',    value: 'CMOS Dual Estéreo 3D' },
            { label: 'Diâmetro da sonda', value: 'Ø 8,0 mm',              highlight: 'accent' },
            { label: 'Resolução',         value: '1920 × 1080p por canal', highlight: 'accent' },
            { label: 'Modo 3D',           value: 'Estéreo ativo',          highlight: 'accent' },
            { label: 'Ângulo de visão',   value: '120°' },
            { label: 'Iluminação',        value: '6 LEDs ajustáveis' },
            { label: 'Proteção IP',       value: 'IP67',                   highlight: 'green'  },
            { label: 'Material da sonda', value: 'Aço inoxidável' },
          ],
        },
        {
          title: 'Medição Dimensional',
          icon: Monitor,
          rows: [
            { label: 'Tecnologia',           value: 'Fotogrametria estéreo', highlight: 'accent' },
            { label: 'Precisão',             value: '± 0,1 mm',              highlight: 'accent' },
            { label: 'Distância de medição', value: '5 mm a 50 mm' },
            { label: 'Software incluso',     value: '✓ BT Measure Suite',    highlight: 'green'  },
          ],
        },
        {
          title: 'Gravação',
          icon: FileVideo,
          rows: [
            { label: 'Mídia',           value: 'Cartão SD (16 GB incluso)', highlight: 'accent' },
            { label: 'Capacidade máx.', value: '64 GB' },
            { label: 'Formatos',        value: 'MP4 3D + JPEG' },
            { label: 'Captura de foto', value: '✓ Botão dedicado',          highlight: 'green'  },
          ],
        },
      ],
      right: [
        {
          title: 'Cabo e Sonda',
          icon: Plug2,
          rows: [
            { label: 'Comprimento',     value: '1 metro',               highlight: 'accent' },
            { label: 'Tipo de sonda',   value: 'Semi-rígida articulável' },
            { label: 'Articulação',     value: '2 vias ±90°' },
            { label: 'Raio mín. curva', value: '30 mm' },
          ],
        },
        {
          title: 'Alimentação',
          icon: Battery,
          rows: [
            { label: 'Bateria',      value: 'Li-Ion 5.000 mAh',    highlight: 'accent' },
            { label: 'Autonomia',    value: '~4 horas de uso',      highlight: 'accent' },
            { label: 'Carregamento', value: 'USB-C 5V/3A' },
          ],
        },
        {
          title: 'Condições de Operação',
          icon: Thermometer,
          rows: [
            { label: 'Temperatura',      value: '-10°C a +60°C' },
            { label: 'Umidade relativa', value: '≤ 85%' },
            { label: 'Peso total (kit)', value: '1,5 kg' },
            { label: 'Maleta rígida',    value: '✓ Inclusa', highlight: 'green' },
            { label: 'Garantia',         value: '12 meses',  highlight: 'green' },
          ],
        },
      ],
    },
    accessories: [
      { model: 'BT3D-CALIB', probeDiameter: 'Ø 8,0 mm', rigidity: 'Placa de calibração 3D',     cableDiameter: '—', cameraType: '—', coating: 'Cerâmica', length: 'Universal' },
      { model: 'BT3D-SOFT',  probeDiameter: '—',         rigidity: 'Licença software adicional', cableDiameter: '—', cameraType: '—', coating: '—',         length: 'Anual'     },
    ],
    accessoriesTip: 'A placa de calibração BT3D-CALIB deve ser utilizada antes de cada sessão de medição dimensional para garantir a precisão de ± 0,1 mm.',
    applications: [
      'Medição dimensional de defeitos em pás de turbina',
      'Quantificação de desgaste em câmaras de combustão',
      'Inspeção de trincas com medição de profundidade',
      'Controle dimensional em peças usinadas por CNC',
      'Inspeção de componentes aeroespaciais críticos',
      'Verificação de desgaste em matrizes e moldes',
    ],
    faqs: [
      {
        question: 'O BT-3D realmente mede dimensões sem contato físico?',
        answer: 'Sim. A tecnologia de fotogrametria estéreo permite calcular distâncias, comprimentos e profundidades a partir das imagens 3D capturadas, sem necessidade de tocar na superfície inspecionada.',
      },
      {
        question: 'Qual a precisão das medições do BT-3D?',
        answer: 'O sistema garante precisão de ± 0,1 mm para objetos entre 5 mm e 50 mm de distância da câmera. Para medições críticas, recomendamos calibrar o sistema com a placa BT3D-CALIB antes do uso.',
      },
      {
        question: 'O software BT Measure Suite funciona em qualquer computador?',
        answer: 'Sim. O software é compatível com Windows 10/11 (64-bit) e macOS 12+. Permite visualização 3D, medição interativa e exportação de relatórios em PDF com as dimensões marcadas.',
      },
    ],
    videos: [
      { title: 'BT-3D — Medição dimensional de pá de turbina ao vivo', duration: '7 min 30 seg' },
    ],
  },

  'bt-8000': {
    id: 'bt-8000',
    cable: '100m',
    probe: 'Ø60mm',
    camera: 'Full HD',
    ip: 'IP68',
    manualUrl: '',
    features: [
      { icon: Camera,    label: 'Câmera Full HD',     sublabel: '1080p'           },
      { icon: Droplets,  label: 'Submersível IP68',   sublabel: 'Poços e lagos'   },
      { icon: Lightbulb, label: 'LED 6000K',           sublabel: '8 LEDs brancos' },
      { icon: Video,     label: 'Gravação HD',         sublabel: 'MP4 + JPEG'     },
    ],
    specs: {
      left: [
        {
          title: 'Sistema de Câmera',
          icon: Camera,
          rows: [
            { label: 'Tipo de câmera',     value: 'CMOS Full HD' },
            { label: 'Diâmetro da câmera', value: 'Ø 60,0 mm',             highlight: 'accent' },
            { label: 'Resolução',          value: '1920 × 1080p (Full HD)', highlight: 'accent' },
            { label: 'Ângulo de visão',    value: '130° (180° com espelho)' },
            { label: 'Iluminação',         value: '8 LEDs 6000K ajustáveis' },
            { label: 'Pan-tilt',           value: '±90° vertical',           highlight: 'accent' },
            { label: 'Proteção IP',        value: 'IP68 — 100m de imersão',  highlight: 'green'  },
            { label: 'Material do corpo',  value: 'Alumínio anodizado' },
          ],
        },
        {
          title: 'Monitor e Display',
          icon: Monitor,
          rows: [
            { label: 'Tamanho',        value: '7" IPS LCD colorido', highlight: 'accent' },
            { label: 'Resolução',      value: '1280 × 720 px' },
            { label: 'Saída de vídeo', value: 'HDMI + USB' },
            { label: 'Brilho',         value: '800 nits' },
          ],
        },
        {
          title: 'Gravação',
          icon: FileVideo,
          rows: [
            { label: 'Mídia',           value: 'Cartão SD (32 GB incluso)', highlight: 'accent' },
            { label: 'Capacidade máx.', value: '128 GB' },
            { label: 'Formatos',        value: 'MP4 + JPEG' },
            { label: 'Captura de foto', value: '✓ Botão dedicado',          highlight: 'green'  },
          ],
        },
      ],
      right: [
        {
          title: 'Cabo e Sistema',
          icon: Plug2,
          rows: [
            { label: 'Comprimento',       value: '100 metros',                   highlight: 'accent' },
            { label: 'Tipo de cabo',      value: 'Cabo de aço com fibra óptica' },
            { label: 'Carretel',          value: '✓ Carretel motorizado',        highlight: 'green'  },
            { label: 'Profundidade máx.', value: "100 metros de lâmina d'água",  highlight: 'accent' },
          ],
        },
        {
          title: 'Alimentação',
          icon: Battery,
          rows: [
            { label: 'Alimentação',    value: '110/220V via unidade de controle', highlight: 'accent' },
            { label: 'Autonomia',      value: 'Uso contínuo (rede elétrica)' },
            { label: 'Backup bateria', value: 'Li-Ion 10.000 mAh' },
          ],
        },
        {
          title: 'Condições de Operação',
          icon: Thermometer,
          rows: [
            { label: 'Temperatura da água',          value: '0°C a +40°C' },
            { label: 'Temperatura de armazenamento', value: '-20°C a +60°C' },
            { label: 'Peso da câmera',               value: '1,8 kg' },
            { label: 'Peso total (kit)',              value: '12 kg' },
            { label: 'Garantia',                     value: '12 meses', highlight: 'green' },
          ],
        },
      ],
    },
    accessories: [
      { model: 'BT8000-50',  probeDiameter: 'Ø 60,0 mm', rigidity: 'Câmera de poço padrão',   cableDiameter: '10 mm', cameraType: 'Frontal + Pan', coating: 'Alumínio', length: '50 m'  },
      { model: 'BT8000-100', probeDiameter: 'Ø 60,0 mm', rigidity: 'Câmera de poço avançada', cableDiameter: '10 mm', cameraType: 'Frontal + Pan', coating: 'Alumínio', length: '100 m' },
    ],
    accessoriesTip: 'O modelo BT8000-50 atende inspeções de até 50m. Para poços mais profundos, utilize o BT8000-100 com cabo de 100m.',
    applications: [
      'Inspeção de poços artesianos e semiartesianos',
      'Verificação de integridade de revestimentos de poços',
      "Inspeção de reservatórios e caixas d'água subterrâneas",
      'Monitoramento de estruturas aquáticas',
      'Inspeção de dutos submersos e emissários',
    ],
    faqs: [
      {
        question: 'O BT-8000 pode ser usado em poços com lama ou água turva?',
        answer: 'Sim. Os 8 LEDs de 6000K proporcionam iluminação intensa. Em água com turbidez média, a câmera Full HD ainda consegue capturar imagens úteis para inspeção do revestimento.',
      },
      {
        question: 'A câmera tem rotação para ver as paredes laterais do poço?',
        answer: 'Sim. O pan-tilt de ±90° permite visualização lateral das paredes do poço, identificando fissuras, incrustações e danos no revestimento ao longo de todo o comprimento.',
      },
      {
        question: 'Como é feita a descida e subida da câmera?',
        answer: 'O carretel motorizado incluso controla a descida e subida da câmera de forma segura e controlada. O operador regula a velocidade pelo painel de controle enquanto visualiza a imagem em tempo real no monitor.',
      },
    ],
    videos: [
      { title: 'BT-8000 — Inspeção de poço artesiano de 80m',           duration: '8 min 12 seg' },
      { title: 'BT-8000 — Verificação de revestimento e bomba submersa', duration: '5 min 45 seg' },
    ],
  },

  'bt-3000': {
    id: 'bt-3000',
    cable: '5m',
    probe: 'Ø30mm',
    camera: 'Full HD',
    ip: 'IP65',
    manualUrl: '',
    features: [
      { icon: Camera,    label: 'Câmera Pan-Tilt',    sublabel: '360° de visão'  },
      { icon: Plug2,     label: 'Haste telescópica',  sublabel: 'Até 5m'         },
      { icon: Lightbulb, label: 'LED ajustável',       sublabel: '6 LEDs brancos' },
      { icon: Video,     label: 'Gravação',             sublabel: 'MP4 + JPEG'    },
    ],
    specs: {
      left: [
        {
          title: 'Sistema de Câmera',
          icon: Camera,
          rows: [
            { label: 'Tipo de câmera',    value: 'CMOS Full HD Pan-Tilt' },
            { label: 'Diâmetro da cabeça', value: 'Ø 30,0 mm',             highlight: 'accent' },
            { label: 'Resolução',          value: '1920 × 1080p (Full HD)', highlight: 'accent' },
            { label: 'Pan',                value: '360° contínuo',          highlight: 'accent' },
            { label: 'Tilt',               value: '±90°',                   highlight: 'accent' },
            { label: 'Iluminação',         value: '6 LEDs ajustáveis' },
            { label: 'Proteção IP',        value: 'IP65',                   highlight: 'green'  },
            { label: 'Material da haste',  value: 'Fibra de carbono' },
          ],
        },
        {
          title: 'Monitor e Display',
          icon: Monitor,
          rows: [
            { label: 'Tamanho',        value: '5" IPS LCD colorido', highlight: 'accent' },
            { label: 'Resolução',      value: '1280 × 720 px' },
            { label: 'Saída de vídeo', value: 'HDMI + USB' },
            { label: 'Brilho',         value: '700 nits' },
          ],
        },
        {
          title: 'Gravação',
          icon: FileVideo,
          rows: [
            { label: 'Mídia',           value: 'Cartão SD (16 GB incluso)', highlight: 'accent' },
            { label: 'Capacidade máx.', value: '64 GB' },
            { label: 'Formatos',        value: 'MP4 + JPEG' },
            { label: 'Captura de foto', value: '✓ Botão dedicado',          highlight: 'green'  },
          ],
        },
      ],
      right: [
        {
          title: 'Haste Telescópica',
          icon: Plug2,
          rows: [
            { label: 'Comprimento mín.', value: '1,2 metros' },
            { label: 'Comprimento máx.', value: '5 metros',              highlight: 'accent' },
            { label: 'Seções',           value: '4 seções telescópicas' },
            { label: 'Material',         value: 'Fibra de carbono',       highlight: 'accent' },
            { label: 'Peso da haste',    value: '0,9 kg' },
          ],
        },
        {
          title: 'Alimentação',
          icon: Battery,
          rows: [
            { label: 'Bateria',      value: 'Li-Ion 5.000 mAh',    highlight: 'accent' },
            { label: 'Autonomia',    value: '~3 horas de uso',      highlight: 'accent' },
            { label: 'Carregamento', value: 'USB-C 5V/3A' },
          ],
        },
        {
          title: 'Condições de Operação',
          icon: Thermometer,
          rows: [
            { label: 'Temperatura',        value: '-10°C a +55°C' },
            { label: 'Umidade relativa',   value: '≤ 90%' },
            { label: 'Altura máx. segura', value: 'Até 5m de extensão' },
            { label: 'Peso total (kit)',    value: '2,8 kg' },
            { label: 'Maleta rígida',       value: '✓ Inclusa', highlight: 'green' },
            { label: 'Garantia',            value: '12 meses',  highlight: 'green' },
          ],
        },
      ],
    },
    accessories: [
      { model: 'BT3000-EXT2',   probeDiameter: 'Ø 30,0 mm', rigidity: 'Seção telescópica extra', cableDiameter: '—', cameraType: '—',       coating: 'Fibra carbono', length: '+2 m'     },
      { model: 'BT3000-MIRROR', probeDiameter: 'Ø 30,0 mm', rigidity: 'Espelho angled 45°',       cableDiameter: '—', cameraType: 'Lateral', coating: 'Inox',          length: 'Universal' },
    ],
    accessoriesTip: 'A seção telescópica extra BT3000-EXT2 aumenta o alcance em mais 2m, chegando a 7m. O espelho angled auxilia na inspeção de superfícies acima da câmera.',
    applications: [
      'Inspeção de telhados e estruturas elevadas',
      'Vistoria de forros, vigas e estruturas de concreto',
      'Inspeção de torres de transmissão e postes',
      'Verificação de calhas e rufos em altura',
      'Inspeção de ductos de ventilação em forro',
    ],
    faqs: [
      {
        question: 'A haste telescópica é segura para uso em 5 metros de altura?',
        answer: 'Sim. A haste de fibra de carbono é leve e resistente. Em 5m de extensão máxima, a câmera de Ø30mm e 0,9 kg pode ser operada com segurança no solo. Recomendamos apoio adicional acima de 3,5m em ambientes com vento.',
      },
      {
        question: 'O operador precisa subir para inspecionar o telhado?',
        answer: 'Não. A câmera Pan-Tilt com 360° de pan e ±90° de tilt permite inspecionar toda a superfície do telhado ou estrutura enquanto o operador permanece no solo, eliminando o risco de trabalho em altura.',
      },
      {
        question: 'A câmera funciona em condições de chuva leve?',
        answer: 'Sim. A certificação IP65 protege contra jatos de água em qualquer direção, ideal para inspeções em condições de chuva leve ou ambientes com umidade intensa. Não deve ser submersa.',
      },
    ],
    videos: [
      { title: 'BT-3000 — Inspeção de telhado industrial sem trabalho em altura', duration: '6 min 08 seg' },
    ],
  },

  'bt-1000': {
    id: 'bt-1000',
    cable: '50m',
    probe: 'Ø8mm',
    camera: '720p',
    ip: 'IP68',
    features: [
      { icon: Camera,      label: 'Câmera HD',            sublabel: 'Resolução 720p integrada'     },
      { icon: Plug2,       label: 'Cabo 50m',             sublabel: 'Cabo push reforçado em fibra' },
      { icon: Lightbulb,   label: '6 LEDs brancos',       sublabel: 'Iluminação frontal ajustável' },
      { icon: FileVideo,   label: 'Gravação SD',          sublabel: 'Foto e vídeo em cartão SD'    },
    ],
    manualUrl: '',
    specs: {
      left: [
        {
          title: 'Câmera',
          icon: Camera,
          rows: [
            { label: 'Resolução',     value: '720p HD'         },
            { label: 'Sensor',        value: '1/4" CMOS'       },
            { label: 'Ângulo visual', value: '60°'             },
            { label: 'LEDs',          value: '6 LEDs brancos'  },
          ],
        },
        {
          title: 'Sonda',
          icon: Plug2,
          rows: [
            { label: 'Diâmetro',    value: 'Ø8mm'               },
            { label: 'Comprimento', value: '50m'                },
            { label: 'Material',    value: 'Aço inox + fibra'   },
            { label: 'Rigidez',     value: 'Semi-rígido push'   },
          ],
        },
      ],
      right: [
        {
          title: 'Sistema',
          icon: Monitor,
          rows: [
            { label: 'Tela',         value: '5" LCD IPS'        },
            { label: 'Bateria',      value: '5.200 mAh Li-Ion'  },
            { label: 'Autonomia',    value: 'Até 6 horas'        },
            { label: 'Armazenamento',value: 'Cartão SD até 32 GB'},
          ],
        },
        {
          title: 'Proteção',
          icon: Droplets,
          rows: [
            { label: 'Certificação', value: 'IP68', highlight: 'accent' },
            { label: 'Temperatura',  value: '-10 °C a +60 °C'          },
            { label: 'Peso',         value: '1,2 kg (completo)'         },
          ],
        },
      ],
    },
    accessories: [
      { model: 'BT-1000-S30', probeDiameter: 'Ø8mm', rigidity: 'Semi-rígido', cableDiameter: 'Ø10mm', cameraType: 'HD frontal', coating: 'Aço inox', length: '30m' },
      { model: 'BT-1000-S50', probeDiameter: 'Ø8mm', rigidity: 'Semi-rígido', cableDiameter: 'Ø10mm', cameraType: 'HD frontal', coating: 'Aço inox', length: '50m' },
    ],
    accessoriesTip: 'Os acessórios BT-1000 são compatíveis entre si e com o monitor padrão BT.',
    applications: [
      'Inspeção de tubulações industriais de médio porte (Ø50mm a Ø300mm)',
      'Dutos de ventilação e climatização predial',
      'Redes de esgoto industrial e sanitário',
      'Inspeção de poços e canaletas de drenagem',
      'Verificação de tubulações antes e após manutenção',
    ],
    faqs: [
      {
        question: 'O BT-1000 navega em curvas acentuadas?',
        answer: 'O cabo semi-rígido permite navegação em curvas de até 90°. Para curvas mais apertadas, recomendamos o BT-H3 com sonda de Ø6mm.',
      },
      {
        question: 'Qual o diâmetro mínimo de tubulação?',
        answer: 'O BT-1000 com sonda de Ø8mm é indicado para tubulações a partir de Ø50mm de diâmetro interno.',
      },
      {
        question: 'A câmera suporta imersão total?',
        answer: 'Sim. A cabeça da câmera possui certificação IP68 e suporta imersão de até 10 m de profundidade por tempo prolongado.',
      },
    ],
    videos: [
      { title: 'BT-1000 — Inspeção de dutos industriais com 50m de cabo', duration: '4 min 22 seg' },
    ],
  },

  'bt-1001': {
    id: 'bt-1001',
    cable: '50m',
    probe: 'Ø6mm',
    camera: '1080p',
    ip: 'IP68',
    features: [
      { icon: Camera,      label: 'Câmera Full HD',       sublabel: 'Resolução 1080p integrada'    },
      { icon: Plug2,       label: 'Sonda Slim Ø6mm',      sublabel: 'Passa em tubulações estreitas'},
      { icon: Lightbulb,   label: '4 LEDs de alta potência', sublabel: 'Iluminação uniforme 360°' },
      { icon: FileVideo,   label: 'Gravação Full HD',     sublabel: 'Foto e vídeo em Full HD'      },
    ],
    manualUrl: '',
    specs: {
      left: [
        {
          title: 'Câmera',
          icon: Camera,
          rows: [
            { label: 'Resolução',     value: '1080p Full HD', highlight: 'green' },
            { label: 'Sensor',        value: '1/4" CMOS'                        },
            { label: 'Ângulo visual', value: '70°'                               },
            { label: 'LEDs',          value: '4 LEDs alta potência'              },
          ],
        },
        {
          title: 'Sonda',
          icon: Plug2,
          rows: [
            { label: 'Diâmetro',    value: 'Ø6mm'              },
            { label: 'Comprimento', value: '50m'               },
            { label: 'Material',    value: 'Aço inox + fibra'  },
            { label: 'Rigidez',     value: 'Semi-rígido push'  },
          ],
        },
      ],
      right: [
        {
          title: 'Sistema',
          icon: Monitor,
          rows: [
            { label: 'Tela',          value: '5" LCD IPS Full HD' },
            { label: 'Bateria',       value: '6.000 mAh Li-Ion'   },
            { label: 'Autonomia',     value: 'Até 7 horas'         },
            { label: 'Armazenamento', value: 'Cartão SD até 64 GB' },
          ],
        },
        {
          title: 'Proteção',
          icon: Droplets,
          rows: [
            { label: 'Certificação', value: 'IP68', highlight: 'accent' },
            { label: 'Temperatura',  value: '-10 °C a +60 °C'          },
            { label: 'Peso',         value: '1,4 kg (completo)'         },
          ],
        },
      ],
    },
    accessories: [
      { model: 'BT-1001-S30', probeDiameter: 'Ø6mm', rigidity: 'Semi-rígido', cableDiameter: 'Ø8mm', cameraType: 'Full HD frontal', coating: 'Aço inox', length: '30m' },
      { model: 'BT-1001-S50', probeDiameter: 'Ø6mm', rigidity: 'Semi-rígido', cableDiameter: 'Ø8mm', cameraType: 'Full HD frontal', coating: 'Aço inox', length: '50m' },
    ],
    accessoriesTip: 'Acessórios BT-1001 compatíveis com monitor padrão da linha BT.',
    applications: [
      'Inspeção de tubulações de pequeno e médio diâmetro (Ø30mm a Ø200mm)',
      'Redes de esgoto predial e industrial',
      'Tubulações de ar condicionado e ventilação',
      'Dutos de combustível e hidráulica',
      'Inspeção em passagens apertadas e cotovelos',
    ],
    faqs: [
      {
        question: 'Qual a diferença entre o BT-1001 e o BT-1000?',
        answer: 'O BT-1001 possui câmera Full HD 1080p (melhor resolução) e sonda mais slim de Ø6mm, ideal para tubulações menores. O BT-1000 tem sonda de Ø8mm e é mais robusto para tubulações maiores.',
      },
      {
        question: 'Consigo usar a sonda do BT-1001 em curvas de 90°?',
        answer: 'Sim. A sonda semi-rígida de Ø6mm navega com facilidade em curvas de até 90°. Para curvas menores, o uso de lubrificante é recomendado.',
      },
      {
        question: 'O arquivo de vídeo grava em Full HD?',
        answer: 'Sim. O sistema grava em 1080p Full HD diretamente no cartão SD, sem compressão adicional. O formato de saída é .MP4 compatível com todos os editores.',
      },
    ],
    videos: [
      { title: 'BT-1001 — Câmera slim 1080p para tubulações estreitas', duration: '3 min 55 seg' },
    ],
  },

  'bt-h3': {
    id: 'bt-h3',
    cable: '30m',
    probe: 'Ø6mm',
    camera: '1080p',
    ip: 'IP68',
    features: [
      { icon: Camera,      label: 'Câmera Full HD',        sublabel: 'Resolução 1080p nítida'       },
      { icon: Plug2,       label: 'Sonda Ø6mm',            sublabel: 'Passagem slim para dutos finos'},
      { icon: Lightbulb,   label: 'LEDs de alta eficiência', sublabel: 'Imagem clara mesmo no escuro'},
      { icon: FileVideo,   label: 'Gravação integrada',    sublabel: 'Foto e vídeo HD em SD card'   },
    ],
    manualUrl: '',
    specs: {
      left: [
        {
          title: 'Câmera',
          icon: Camera,
          rows: [
            { label: 'Resolução',     value: '1080p Full HD', highlight: 'green' },
            { label: 'Sensor',        value: '1/4" CMOS'                         },
            { label: 'Ângulo visual', value: '70°'                                },
            { label: 'Foco',          value: 'Fixo (10–200mm)'                   },
          ],
        },
        {
          title: 'Sonda',
          icon: Plug2,
          rows: [
            { label: 'Diâmetro',    value: 'Ø6mm'             },
            { label: 'Comprimento', value: '30m'              },
            { label: 'Material',    value: 'Aço inox/fibra'   },
            { label: 'Flexibilidade', value: 'Semi-rígido'    },
          ],
        },
      ],
      right: [
        {
          title: 'Sistema',
          icon: Monitor,
          rows: [
            { label: 'Tela',          value: '4,3" LCD IPS'      },
            { label: 'Bateria',       value: '4.500 mAh Li-Ion'  },
            { label: 'Autonomia',     value: 'Até 5 horas'        },
            { label: 'Armazenamento', value: 'Cartão SD até 32 GB'},
          ],
        },
        {
          title: 'Proteção',
          icon: Droplets,
          rows: [
            { label: 'Certificação', value: 'IP68', highlight: 'accent' },
            { label: 'Temperatura',  value: '-10 °C a +60 °C'          },
            { label: 'Peso',         value: '1,1 kg (completo)'         },
          ],
        },
      ],
    },
    accessories: [
      { model: 'BT-H3-S15', probeDiameter: 'Ø6mm', rigidity: 'Semi-rígido', cableDiameter: 'Ø8mm', cameraType: 'Full HD frontal', coating: 'Aço inox', length: '15m' },
      { model: 'BT-H3-S30', probeDiameter: 'Ø6mm', rigidity: 'Semi-rígido', cableDiameter: 'Ø8mm', cameraType: 'Full HD frontal', coating: 'Aço inox', length: '30m' },
    ],
    accessoriesTip: 'O BT-H3 é compatível com os acessórios da linha BT de Ø6mm.',
    applications: [
      'Inspeção de tubulações de pequeno diâmetro (Ø30mm a Ø150mm)',
      'Dutos de aquecimento e refrigeração predial',
      'Tubulações hidráulicas e pneumáticas',
      'Inspeção de sifões e desvios em redes de esgoto',
      'Passagens estreitas em estruturas de concreto',
    ],
    faqs: [
      {
        question: 'O BT-H3 é adequado para inspeção de redes de esgoto predial?',
        answer: 'Sim. A sonda de Ø6mm e a classificação IP68 tornam o BT-H3 ideal para inspeção de redes de esgoto predial, incluindo ramais de 40mm e 50mm.',
      },
      {
        question: 'Posso gravar laudos em vídeo com o BT-H3?',
        answer: 'Sim. A gravação de vídeo Full HD e fotos permite documentar a inspeção completa para geração de laudos técnicos.',
      },
      {
        question: 'Qual a diferença do BT-H3 para o BT-1001?',
        answer: 'Ambos têm Ø6mm e Full HD. O BT-H3 tem cabo de 30m e tela menor (4,3"), sendo mais compacto e portátil. O BT-1001 tem 50m de cabo e tela 5" para inspeções mais longas.',
      },
    ],
    videos: [
      { title: 'BT-H3 — Boroscópio slim para tubulações residenciais e prediais', duration: '4 min 10 seg' },
    ],
  },

  'bt-4000': {
    id: 'bt-4000',
    cable: '150m',
    probe: 'Ø10mm',
    camera: '720p',
    ip: 'IP68',
    features: [
      { icon: Plug2,       label: 'Cabo 150m',              sublabel: 'Maior alcance da linha T'     },
      { icon: Camera,      label: 'Câmera HD robusta',      sublabel: 'Resolução 720p para longa distância'},
      { icon: Lightbulb,   label: '8 LEDs de alta potência', sublabel: 'Iluminação para grande profundidade'},
      { icon: FileVideo,   label: 'Gravação HD',            sublabel: 'Vídeo e foto em cartão SD'   },
    ],
    manualUrl: '',
    specs: {
      left: [
        {
          title: 'Câmera',
          icon: Camera,
          rows: [
            { label: 'Resolução',     value: '720p HD'            },
            { label: 'Sensor',        value: '1/3" CMOS'          },
            { label: 'Ângulo visual', value: '55°'                 },
            { label: 'LEDs',          value: '8 LEDs alta potência'},
          ],
        },
        {
          title: 'Sonda',
          icon: Plug2,
          rows: [
            { label: 'Diâmetro',    value: 'Ø10mm', highlight: 'accent' },
            { label: 'Comprimento', value: '150m', highlight: 'green'   },
            { label: 'Material',    value: 'Aço inox reforçado'         },
            { label: 'Rigidez',     value: 'Semi-rígido push'           },
          ],
        },
      ],
      right: [
        {
          title: 'Sistema',
          icon: Monitor,
          rows: [
            { label: 'Tela',          value: '7" LCD IPS'          },
            { label: 'Bateria',       value: '8.000 mAh + externa'  },
            { label: 'Autonomia',     value: 'Até 8 horas'           },
            { label: 'Armazenamento', value: 'Cartão SD até 128 GB'  },
          ],
        },
        {
          title: 'Proteção',
          icon: Droplets,
          rows: [
            { label: 'Certificação', value: 'IP68', highlight: 'accent' },
            { label: 'Temperatura',  value: '-10 °C a +70 °C'          },
            { label: 'Peso',         value: '2,8 kg (completo)'         },
          ],
        },
      ],
    },
    accessories: [
      { model: 'BT-4000-S100', probeDiameter: 'Ø10mm', rigidity: 'Semi-rígido', cableDiameter: 'Ø12mm', cameraType: 'HD frontal', coating: 'Aço inox reforçado', length: '100m' },
      { model: 'BT-4000-S150', probeDiameter: 'Ø10mm', rigidity: 'Semi-rígido', cableDiameter: 'Ø12mm', cameraType: 'HD frontal', coating: 'Aço inox reforçado', length: '150m' },
    ],
    accessoriesTip: 'Para inspeções acima de 100m, recomendamos o uso do carretel motorizado opcional BT-4000-CR.',
    applications: [
      'Inspeção de tubulações industriais de grande porte (acima de Ø100mm)',
      'Dutos de esgoto municipal e coletores principais',
      'Tubulações de óleo, gás e derivados em plataformas',
      'Inspeção de galões e dutos subterrâneos de longa extensão',
      'Manutenção preditiva em plantas petroquímicas',
      'Inspeção de tubulações de resfriamento em usinas',
    ],
    faqs: [
      {
        question: 'O BT-4000 consegue inspecionar 150m de uma única vez?',
        answer: 'Sim. O cabo push de 150m permite inspeção contínua sem necessidade de emenda. A tela de 7" e os 8 LEDs de alta potência garantem imagem clara em toda a extensão.',
      },
      {
        question: 'Como é feita a contagem de distância durante a inspeção?',
        answer: 'O BT-4000 possui contador de metragem digital integrado na tela, exibindo em tempo real o comprimento do cabo inserido na tubulação com precisão de ±0,5m.',
      },
      {
        question: 'A bateria dura para inspecionar 150m?',
        answer: 'A bateria de 8.000 mAh oferece até 8 horas de operação. Para trabalhos mais longos, o pack de bateria externa opcional estende a autonomia para até 12 horas.',
      },
    ],
    videos: [
      { title: 'BT-4000 — Inspeção de tubulação de 150m em planta industrial', duration: '7 min 44 seg' },
    ],
  },
};

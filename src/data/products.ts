import { Product } from '@/contexts/QuoteCartContext';
import productSK3208 from '@/assets/product-sk3208.png';
import productSK3210 from '@/assets/product-sk3210.png';
import productSK3328 from '@/assets/product-sk3328.png';
import productSK3408 from '@/assets/product-sk3408.png';
import productSK3608 from '@/assets/product-sk3608.png';
import productSK3610 from '@/assets/product-sk3610.png';
import productSK3808 from '@/assets/product-sk3808.png';
import productSK3828 from '@/assets/product-sk3828.png';
import productTrolley from '@/assets/product-trolley-73mm.png';
import productFB20PCamera from '@/assets/product-fb20p-camera.png';
import productFB20PTablet from '@/assets/product-fb20p-tablet.png';
import productFB20PSystem from '@/assets/product-fb20p-system.png';
import productPSeries from '@/assets/product-p-series.png';
import productKSeries from '@/assets/product-k-series.png';
import productLASeries from '@/assets/product-la-series.png';
import productHJSeries from '@/assets/product-hj-series.png';
import productYSeries from '@/assets/product-y-series.png';
import productDZSeries from '@/assets/product-dz-series.png';
import productKSeries3D from '@/assets/product-k-series-3d.png';
import productKSeriesEX from '@/assets/product-k-series-ex.png';
import productKSeriesHT from '@/assets/product-k-series-ht.png';
import productKSeriesThermal from '@/assets/product-k-series-thermal.png';
import productKSeriesUV from '@/assets/product-k-series-uv.png';

export const products: Product[] = [
  // Linha T - Boroscópios para Tubulações
  {
    id: 'sk3208',
    name: 'SK3208 Endoscópio para Tubulações',
    category: 'Linha T - Tubulações',
    image: productSK3208,
    description: 'Endoscópio profissional para inspeção de tubulações industriais. Sistema completo com câmera de alta definição e cabo resistente.',
    specs: {
      'Modelo': 'SK3208',
      'Aplicação': 'Tubulações industriais',
      'Linha': 'T - Tubulações'
    }
  },
  {
    id: 'sk3210',
    name: 'SK3210 Endoscópio para Tubulações',
    category: 'Linha T - Tubulações',
    image: productSK3210,
    description: 'Endoscópio avançado para inspeção de tubulações com recursos aprimorados de imagem e maior alcance.',
    specs: {
      'Modelo': 'SK3210',
      'Aplicação': 'Tubulações industriais',
      'Linha': 'T - Tubulações'
    }
  },
  {
    id: 'sk3328',
    name: 'SK3328 Endoscópio para Tubulações',
    category: 'Linha T - Tubulações',
    image: productSK3328,
    description: 'Sistema de inspeção para tubulações de médio porte. Ideal para manutenção preventiva e diagnóstico.',
    specs: {
      'Modelo': 'SK3328',
      'Aplicação': 'Tubulações industriais',
      'Linha': 'T - Tubulações'
    }
  },
  {
    id: 'sk3408',
    name: 'SK3408 Endoscópio para Tubulações',
    category: 'Linha T - Tubulações',
    image: productSK3408,
    description: 'Endoscópio robusto para inspeção de tubulações em ambientes industriais exigentes.',
    specs: {
      'Modelo': 'SK3408',
      'Aplicação': 'Tubulações industriais',
      'Linha': 'T - Tubulações'
    }
  },
  {
    id: 'sk3608',
    name: 'SK3608 Endoscópio para Tubulações',
    category: 'Linha T - Tubulações',
    image: productSK3608,
    description: 'Sistema profissional de inspeção com câmera de alta resolução para tubulações.',
    specs: {
      'Modelo': 'SK3608',
      'Aplicação': 'Tubulações industriais',
      'Linha': 'T - Tubulações'
    }
  },
  {
    id: 'sk3610',
    name: 'SK3610 Endoscópio para Tubulações',
    category: 'Linha T - Tubulações',
    image: productSK3610,
    description: 'Endoscópio versátil para diferentes tipos de tubulações industriais.',
    specs: {
      'Modelo': 'SK3610',
      'Aplicação': 'Tubulações industriais',
      'Linha': 'T - Tubulações'
    }
  },
  {
    id: 'sk3808',
    name: 'SK3808 Endoscópio para Tubulações',
    category: 'Linha T - Tubulações',
    image: productSK3808,
    description: 'Sistema avançado de inspeção para tubulações de grande porte.',
    specs: {
      'Modelo': 'SK3808',
      'Aplicação': 'Tubulações industriais',
      'Linha': 'T - Tubulações'
    }
  },
  {
    id: 'sk3828',
    name: 'SK3828 Endoscópio para Tubulações',
    category: 'Linha T - Tubulações',
    image: productSK3828,
    description: 'Endoscópio de alta performance para inspeções complexas em tubulações.',
    specs: {
      'Modelo': 'SK3828',
      'Aplicação': 'Tubulações industriais',
      'Linha': 'T - Tubulações'
    }
  },
  // Linha E - Especiais
  {
    id: 'trolley-73mm',
    name: 'Sistema Carrinho 73mm',
    category: 'Linha E - Especiais',
    image: productTrolley,
    description: 'Sistema de carrinho 73mm para transporte e operação de equipamentos de inspeção.',
    specs: {
      'Modelo': 'Carrinho 73mm',
      'Aplicação': 'Suporte e transporte',
      'Linha': 'E - Especiais'
    }
  },
  {
    id: 'y-series',
    name: 'Série Y Endoscópio Industrial Inteligente',
    category: 'Linha E - Especiais',
    image: productYSeries,
    description: 'Endoscópio industrial inteligente com detecção automática de defeitos por IA. Sistema avançado de análise de imagem.',
    specs: {
      'Modelo': 'Série Y',
      'Função': 'Detecção automática de defeitos',
      'Tecnologia': 'Inteligência Artificial',
      'Linha': 'E - Especiais'
    }
  },
  {
    id: 'dz-series',
    name: 'Série DZ Endoscópio Medição 3D',
    category: 'Linha E - Especiais',
    image: productDZSeries,
    description: 'Endoscópio com medição 3D avançada e mapa de nuvem de pontos. Ideal para análise dimensional precisa.',
    specs: {
      'Modelo': 'Série DZ',
      'Função': 'Medição 3D',
      'Tecnologia': 'Mapa de nuvem de pontos',
      'Linha': 'E - Especiais'
    }
  },
  {
    id: 'k-series-3d',
    name: 'Série K Endoscópio Função 3D',
    category: 'Linha E - Especiais',
    image: productKSeries3D,
    description: 'Série K com função de medição tridimensional para análise dimensional em campo.',
    specs: {
      'Modelo': 'Série K 3D',
      'Função': 'Medição tridimensional',
      'Linha': 'E - Especiais'
    }
  },
  {
    id: 'k-series-ex',
    name: 'Série K EX (Área Classificada)',
    category: 'Linha E - Especiais',
    image: productKSeriesEX,
    description: 'Série K com certificação ATEX/IECEx para operação em áreas classificadas à prova de explosão.',
    specs: {
      'Modelo': 'Série K EX',
      'Certificação': 'ATEX/IECEx',
      'Aplicação': 'Áreas classificadas',
      'Linha': 'E - Especiais'
    }
  },
  {
    id: 'k-series-ht',
    name: 'Série K Alta Temperatura',
    category: 'Linha E - Especiais',
    image: productKSeriesHT,
    description: 'Série K para operação em temperaturas extremas, de -20°C a 300°C.',
    specs: {
      'Modelo': 'Série K AT',
      'Temperatura': '-20°C a 300°C',
      'Aplicação': 'Ambientes extremos',
      'Linha': 'E - Especiais'
    }
  },
  {
    id: 'k-series-thermal',
    name: 'Série K Termografia',
    category: 'Linha E - Especiais',
    image: productKSeriesThermal,
    description: 'Série K com imagem térmica infravermelha para detecção de pontos quentes e anomalias térmicas.',
    specs: {
      'Modelo': 'Série K Térmica',
      'Função': 'Termografia infravermelha',
      'Aplicação': 'Análise térmica',
      'Linha': 'E - Especiais'
    }
  },
  {
    id: 'k-series-uv',
    name: 'Série K Luz Ultravioleta',
    category: 'Linha E - Especiais',
    image: productKSeriesUV,
    description: 'Série K com luz UV 365nm para detecção de defeitos, trincas e vazamentos invisíveis a olho nu.',
    specs: {
      'Modelo': 'Série K UV',
      'Luz UV': '365nm',
      'Aplicação': 'Detecção de defeitos',
      'Linha': 'E - Especiais'
    }
  },
  // Linha R - Robôs
  {
    id: 'fb20p-camera',
    name: 'FB20P Cabeça de Câmera',
    category: 'Linha R - Robôs',
    image: productFB20PCamera,
    description: 'Cabeça de câmera HD com iluminação LED integrada para robôs de inspeção. Câmera frontal e traseira para navegação precisa.',
    specs: {
      'Modelo': 'FB20P',
      'Tipo': 'Cabeça de Câmera',
      'Linha': 'R - Robôs'
    }
  },
  {
    id: 'fb20p-tablet',
    name: 'FB20P Controlador Tablet',
    category: 'Linha R - Robôs',
    image: productFB20PTablet,
    description: 'Controlador tablet com robô de inspeção. Sistema completo com câmera elevatória e rodas off-road para tubulações.',
    specs: {
      'Modelo': 'FB20P',
      'Tipo': 'Controlador + Robô',
      'Linha': 'R - Robôs'
    }
  },
  {
    id: 'fb20p-system',
    name: 'FB20P Sistema Completo',
    category: 'Linha R - Robôs',
    image: productFB20PSystem,
    description: 'Sistema completo FB20P com robô, carretel de cabo, rodas intercambiáveis (75mm a 230mm) para diferentes diâmetros de tubulação.',
    specs: {
      'Modelo': 'FB20P',
      'Tipo': 'Sistema Completo',
      'Linha': 'R - Robôs'
    }
  },
  // Linha M - Máquinas
  {
    id: 'p-series',
    name: 'Série P Endoscópio Industrial FHD Touch',
    category: 'Linha M - Máquinas',
    image: productPSeries,
    description: 'Endoscópio industrial com tela touch de 6" FHD 1080P. Ideal para inspeção de máquinas e equipamentos industriais.',
    specs: {
      'Modelo': 'Série P',
      'Tela': '6" Touch FHD 1080P',
      'Linha': 'M - Máquinas'
    }
  },
  {
    id: 'k-series',
    name: 'Série K Vídeo Endoscópio',
    category: 'Linha M - Máquinas',
    image: productKSeries,
    description: 'Vídeo endoscópio com tela de 5" HD, conectividade WiFi e display de temperatura em tempo real.',
    specs: {
      'Modelo': 'Série K',
      'Tela': '5" HD',
      'WiFi': 'Sim',
      'Display Temperatura': 'Sim',
      'Linha': 'M - Máquinas'
    }
  },
  {
    id: 'la-series',
    name: 'Série LA Endoscópio Industrial Portátil',
    category: 'Linha M - Máquinas',
    image: productLASeries,
    description: 'Endoscópio industrial portátil com tela de 5" IPS HD, WiFi e saída HDMI para visualização externa.',
    specs: {
      'Modelo': 'Série LA',
      'Tela': '5" IPS HD',
      'WiFi': 'Sim',
      'HDMI': 'Sim',
      'Linha': 'M - Máquinas'
    }
  },
  {
    id: 'hj-series',
    name: 'Série HJ Endoscópio Tipo Split',
    category: 'Linha M - Máquinas',
    image: productHJSeries,
    description: 'Endoscópio tipo split com tela destacável de 8", joystick 360° elétrico, câmera megapixel HD e sondas de 0.85-8mm.',
    specs: {
      'Modelo': 'Série HJ',
      'Tela': '8" HD Touch Destacável',
      'Joystick': '360° Elétrico',
      'Sondas': '0.85-8mm',
      'Linha': 'M - Máquinas'
    }
  }
];

export const categories = [
  'Todos',
  'Linha T - Tubulações',
  'Linha P - Poços',
  'Linha R - Robôs',
  'Linha M - Máquinas',
  'Linha E - Especiais',
  'Linha TC - Telescópicos'
];

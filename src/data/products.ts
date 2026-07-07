export interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
  specs?: Record<string, string>;
  seoTitle?: string;
  seoDescription?: string;
}
import productSK3208 from '@/assets/product-sk3208.webp';
import productSK3210 from '@/assets/product-sk3210.webp';
import productSK3328 from '@/assets/product-sk3328.webp';
import productSK3408 from '@/assets/product-sk3408.webp';
import productSK3608 from '@/assets/product-sk3608.webp';
import productSK3610 from '@/assets/product-sk3610.webp';
import productSK3808 from '@/assets/product-sk3808.webp';
import productSK3828 from '@/assets/product-sk3828.webp';
import productTrolley from '@/assets/product-trolley-73mm.webp';
import productFB20PCamera from '@/assets/product-fb20p-camera.webp';
import productFB20PTablet from '@/assets/product-fb20p-tablet.webp';
import productFB20PSystem from '@/assets/product-fb20p-system.webp';
import productPSeries from '@/assets/product-p-series.webp';
import productKSeries from '@/assets/product-k-series.webp';
import productLASeries from '@/assets/product-la-series.webp';
import productHJSeries from '@/assets/product-hj-series.webp';
import productYSeries from '@/assets/product-y-series.webp';
import productDZSeries from '@/assets/product-dz-series.webp';
import productKSeries3D from '@/assets/product-k-series-3d.webp';
import productKSeriesEX from '@/assets/product-k-series-ex.webp';
import productKSeriesHT from '@/assets/product-k-series-ht.webp';
import productKSeriesThermal from '@/assets/product-k-series-thermal.webp';
import productKSeriesUV from '@/assets/product-k-series-uv.webp';

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
  // Novos produtos Linha T
  {
    id: 'bt-1000',
    name: 'BT-1000 Endoscópio para Dutos',
    category: 'Linha T - Tubulações',
    image: productSK3610,
    description: 'Endoscópio robusto para inspeção de tubulações industriais de médio porte. Câmera HD com cabo de 50m e sonda de Ø8mm resistente a impactos.',
    specs: { 'Sonda': 'Ø8mm', 'Cabo': '50m', 'Câmera': 'HD 720p', 'Proteção': 'IP68' }
  },
  {
    id: 'bt-1001',
    name: 'BT-1001 Endoscópio Slim 1080p',
    category: 'Linha T - Tubulações',
    image: productSK3208,
    description: 'Endoscópio slim com sonda de Ø6mm para tubulações de menor diâmetro. Câmera Full HD 1080p com gravação integrada em cartão SD.',
    specs: { 'Sonda': 'Ø6mm', 'Cabo': '50m', 'Câmera': 'Full HD 1080p', 'Proteção': 'IP68' }
  },
  {
    id: 'bt-h3',
    name: 'BT-H3 Boroscópio Full HD',
    category: 'Linha T - Tubulações',
    image: productSK3208,
    description: 'Boroscópio profissional com sonda slim de Ø6mm e câmera Full HD. Ideal para inspeção em tubulações de pequeno diâmetro e passagens apertadas.',
    specs: { 'Sonda': 'Ø6mm', 'Cabo': '30m', 'Câmera': 'Full HD 1080p', 'Proteção': 'IP68' }
  },
  {
    id: 'bt-4000',
    name: 'BT-4000 Endoscópio de Longa Extensão',
    category: 'Linha T - Tubulações',
    image: productSK3828,
    description: 'Endoscópio de longa extensão para inspeção em tubulações de grande porte. Cabo reforçado de 150m com câmera robusta e sonda de Ø10mm.',
    specs: { 'Sonda': 'Ø10mm', 'Cabo': '150m', 'Câmera': 'HD 720p', 'Proteção': 'IP68' }
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
  // Linha R - novos robôs
  {
    id: 'bt-robo-lite',
    name: 'BT-Robo Lite',
    category: 'Linha R - Robôs',
    image: productFB20PCamera,
    description: 'Robô de inspeção compacto para tubulações a partir de Ø100mm. Câmera HD com visão 360°.',
    specs: { 'Diâmetro mín.': 'Ø100mm', 'Cabo': '80m', 'Câmera': 'HD', 'Articulação': '360°' }
  },
  {
    id: 'bt-robo-fx',
    name: 'BT-Robo FX',
    category: 'Linha R - Robôs',
    image: productFB20PTablet,
    description: 'Robô de inspeção versátil com tração 6x6, câmera Full HD e articulação de 360°.',
    specs: { 'Diâmetro mín.': 'Ø150mm', 'Cabo': '120m', 'Câmera': 'Full HD', 'Articulação': '360°' }
  },
  {
    id: 'bt-robo-pro',
    name: 'BT-Robo Pro',
    category: 'Linha R - Robôs',
    image: productFB20PSystem,
    description: 'Robô profissional de alto desempenho para tubulações de grande porte, IP68 com relatório automático.',
    specs: { 'Diâmetro mín.': 'Ø200mm', 'Cabo': '200m', 'Câmera': '4K', 'Articulação': '360°' }
  },
  // Linha M - Máquinas
  {
    id: 'bt-5000',
    name: 'BT-5000 Videoscópio Industrial',
    category: 'Linha M - Máquinas',
    image: productPSeries,
    description: 'Videoscópio profissional com câmera Full HD 1080p e articulação de 4 vias para inspeção de motores, turbinas e compressores industriais.',
    specs: { 'Sonda': 'Ø6mm', 'Cabo': '1,5m', 'Câmera': '1080p', 'Proteção': 'IP67' }
  },
  {
    id: 'bt-400',
    name: 'BT-400 Boroscópio para Motores',
    category: 'Linha M - Máquinas',
    image: productKSeries,
    description: 'Boroscópio robusto para inspeção de cilindros, válvulas e câmaras de combustão. Câmera HD com sonda de Ø8mm.',
    specs: { 'Sonda': 'Ø8mm', 'Cabo': '1m', 'Câmera': 'HD', 'Proteção': 'IP67' }
  },
  {
    id: 'bt-300',
    name: 'BT-300 Endoscópio Compacto',
    category: 'Linha M - Máquinas',
    image: productLASeries,
    description: 'Endoscópio compacto e versátil para manutenção preditiva de máquinas. Sonda de Ø6mm com câmera HD integrada.',
    specs: { 'Sonda': 'Ø6mm', 'Cabo': '1m', 'Câmera': 'HD', 'Proteção': 'IP67' }
  },
  {
    id: 'bt-100',
    name: 'BT-100 Micro Boroscópio',
    category: 'Linha M - Máquinas',
    image: productHJSeries,
    description: 'Micro boroscópio com sonda ultra-slim de Ø4mm para inspeção em passagens extremamente estreitas.',
    specs: { 'Sonda': 'Ø4mm', 'Cabo': '1m', 'Câmera': 'HD', 'Proteção': 'IP67' }
  },
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
  },
  // Linha E - novos
  {
    id: 'bt-3d',
    name: 'BT-3D Videoscópio 3D Estéreo',
    category: 'Linha E - Especiais',
    image: productKSeries3D,
    description: 'Videoscópio com câmera 3D estéreo para medição dimensional sem contato. Tecnologia exclusiva de visão tridimensional para inspeções críticas.',
    specs: { 'Sonda': 'Ø8mm', 'Cabo': '1m', 'Câmera': '3D Full HD', 'Proteção': 'IP67' }
  },
  // Linha P - Poços
  {
    id: 'bt-8000',
    name: 'BT-8000 Câmera para Poços',
    category: 'Linha P - Poços',
    image: productFB20PSystem,
    description: 'Câmera submersível de alto desempenho para inspeção de poços artesianos, reservatórios e ambientes subaquáticos. IP68 com cabo de 100m.',
    specs: { 'Câmera': 'Ø60mm', 'Cabo': '100m', 'Resolução': 'Full HD', 'Proteção': 'IP68' }
  },
  // Linha TC - Telescópicos
  {
    id: 'bt-3000',
    name: 'BT-3000 Câmera Telescópica',
    category: 'Linha TC - Telescópicos',
    image: productLASeries,
    description: 'Câmera telescópica com haste extensível de até 5m para inspeção em altura, tetos, estruturas elevadas e locais de difícil alcance.',
    specs: { 'Câmera': 'Ø30mm', 'Haste': '5m', 'Resolução': 'Full HD', 'Proteção': 'IP65' }
  },
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

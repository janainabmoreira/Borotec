export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  content: string;
  faqs?: { q: string; a: string }[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 'o-que-e-boroscopio-industrial',
    title: 'O que é um Boroscópio Industrial: Guia Completo + FAQ',
    excerpt: 'Descubra o que é um boroscópio industrial, a diferença entre boroscópio, endoscópio e videoscópio, quais setores utilizam, como escolher o modelo certo e respostas para as 12 dúvidas mais frequentes do mercado.',
    category: 'Guia Técnico',
    date: '2026-05-07',
    readTime: '12 min',
    image: 'https://images.unsplash.com/photo-1581092795360-fd1f3ce52ebc?w=1200&h=630&fit=crop',
    faqs: [
      {
        q: 'O que é um boroscópio industrial?',
        a: 'Um boroscópio industrial é um equipamento de inspeção visual remota com sonda, câmera e LEDs integrados que permite visualizar o interior de máquinas, tubulações e estruturas inacessíveis sem necessidade de desmontagem. Os modelos modernos gravam em Full HD e possuem articulação 360° por joystick.',
      },
      {
        q: 'Qual a diferença entre boroscópio, endoscópio e videoscópio?',
        a: 'Os três termos são frequentemente usados como sinônimos. Boroscópio é o termo mais amplo. Endoscópio industrial refere-se a modelos com sonda flexível longa para tubulações. Videoscópio é o padrão mais avançado — câmera HD, tela integrada, articulação elétrica e gravação. Na prática, todos fazem inspeção visual interna sem desmontagem.',
      },
      {
        q: 'O que é articulação 360° em boroscópios e por que ela importa?',
        a: 'A articulação 360° permite que a câmera na ponta da sonda gire em qualquer direção por meio de um joystick elétrico. Isso é essencial para inspecionar curvas, bifurcações e toda a superfície interna de componentes — algo impossível com sondas rígidas ou de articulação limitada.',
      },
      {
        q: 'Para que setores o boroscópio industrial é indicado?',
        a: 'Petroquímica, geração de energia, siderurgia, saneamento, aeronáutico e manutenção industrial em geral. Qualquer operação que precise inspecionar turbinas, caldeiras, compressores, tubulações, soldas ou motores internamente sem desmontagem é uma aplicação para boroscópio.',
      },
      {
        q: 'Boroscópio serve para inspecionar turbinas a gás?',
        a: 'Sim. A inspeção de turbinas a gás é uma das aplicações mais críticas do boroscópio industrial. O videoscópio articulado com sonda de 6 mm e câmera Full HD permite visualizar palhetas, câmara de combustão e componentes internos sem remoção do motor. Para temperaturas extremas, existem modelos certificados para operação até 300°C.',
      },
      {
        q: 'É possível inspecionar tubulações subterrâneas com boroscópio?',
        a: 'Sim, com os equipamentos corretos. Para tubulações de pequeno diâmetro, endoscópios com cabo longo são suficientes. Para redes de esgoto e adutoras de 75 mm a 230 mm, robôs de inspeção com câmera elevável e rodas intercambiáveis são a solução ideal, operando com carretel de cabo de até 120 m.',
      },
      {
        q: 'Boroscópio pode ser usado em manutenção preditiva?',
        a: 'Sim, é uma das ferramentas fundamentais de manutenção preditiva. A inspeção visual periódica por boroscópio detecta corrosão, trincas, desgaste e obstruções antes que causem falhas. Isso reduz paradas não programadas, que custam em média 3 a 5 vezes mais que a manutenção preventiva.',
      },
      {
        q: 'É difícil operar um boroscópio industrial?',
        a: 'Os modelos modernos foram projetados para facilidade de operação. A interface é por joystick — similar a um controle — e a tela integrada exibe a imagem em tempo real. Com treinamento básico, qualquer técnico de manutenção consegue operar o equipamento em poucos minutos.',
      },
      {
        q: 'O boroscópio funciona em ambientes escuros ou sem iluminação?',
        a: 'Sim. Os boroscópios industriais possuem LEDs de alta potência na ponta da sonda, com intensidade ajustável. Isso garante imagens claras e nítidas mesmo em tubulações e câmaras totalmente sem luz externa.',
      },
      {
        q: 'Como documentar e guardar as imagens da inspeção com boroscópio?',
        a: 'Os videoscópios modernos possuem gravação integrada de vídeo e foto em cartão SD, sem depender de computador. Alguns modelos oferecem saída HDMI e WiFi para transferência imediata. As imagens são usadas para laudos técnicos, relatórios de conformidade e comparação entre inspeções periódicas.',
      },
      {
        q: 'O que é boroscópio com medição 3D?',
        a: 'Boroscópios com medição 3D utilizam estereoscopia ou luz estruturada para calcular dimensões reais de defeitos — comprimento, profundidade e área — diretamente na tela, sem software externo. São usados quando a norma exige medição quantitativa de defeitos como trincas em turbinas ou corrosão em vasos de pressão.',
      },
      {
        q: 'O que é boroscópio ATEX e quando ele é obrigatório?',
        a: 'Boroscópios ATEX (ou IECEx) são certificados para operação segura em atmosferas explosivas — ambientes com gases inflamáveis, vapores ou poeiras combustíveis. Em refinarias, plataformas offshore, terminais de GLP e outras áreas classificadas pela NR-10 e NR-20, o uso de equipamentos ATEX é obrigatório por lei.',
      },
    ],
    content: `
A inspeção visual interna de máquinas, turbinas, tubulações e estruturas metálicas é um dos pilares da manutenção preditiva moderna. O **boroscópio industrial** tornou possível ver o que está dentro — sem desmontar nenhuma peça — e hoje é equipamento indispensável em plantas petroquímicas, siderúrgicas, de energia e de saneamento em todo o Brasil.

Neste guia respondemos as 12 dúvidas mais frequentes do mercado, com base nos produtos da BOROTEC Industrial e na realidade das operações industriais brasileiras.

## O que é um boroscópio industrial?

O **boroscópio industrial** é um equipamento de inspeção visual remota composto por sonda flexível ou rígida com câmera e iluminação LED integradas, conectada a um monitor ou controlador que exibe as imagens em tempo real.

Ele permite que o inspetor ou técnico de manutenção veja o interior de tubulações, motores, turbinas, trocadores de calor, caldeiras, soldas e outros componentes inacessíveis — **sem necessidade de desmontagem**.

Os modelos modernos gravam vídeo e foto em cartão SD, possuem sondas articuladas com joystick elétrico para navegação em 360°, e oferecem resolução Full HD 1080p com LEDs ajustáveis para iluminação em ambientes completamente escuros.

## Qual a diferença entre boroscópio, endoscópio e videoscópio?

Os três termos descrevem equipamentos de inspeção visual remota e são frequentemente usados como sinônimos no mercado brasileiro:

- **Boroscópio**: termo mais amplo, abrange modelos ópticos (rígidos) e digitais com câmera integrada
- **Endoscópio industrial**: sonda flexível longa, geralmente usada em tubulações e cavidades de difícil acesso
- **Videoscópio**: modelo com câmera HD, tela colorida integrada, articulação elétrica da ponta por joystick e recursos de gravação — o padrão mais avançado do segmento

Na prática, quando um inspetor busca "boroscópio industrial" ou "videoscópio articulado", está procurando o mesmo tipo de solução. A escolha correta depende da aplicação específica.

## Para que setores o boroscópio é indicado?

O boroscópio é utilizado em qualquer setor com componentes internos que precisam ser inspecionados sem desmontagem:

- **Petroquímica e refino**: válvulas, trocadores de calor, vasos de pressão e linhas de processo
- **Geração de energia**: turbinas a gás, caldeiras, compressores e geradores
- **Siderurgia e metalurgia**: soldas, estruturas metálicas e equipamentos de laminação
- **Saneamento básico**: redes de esgoto e adutoras inspecionadas com robôs de câmera
- **Automotivo e aeronáutico**: diagnóstico de motores, câmaras de combustão e estruturas tubulares
- **Manutenção predial**: dutos de ar-condicionado, instalações hidráulicas e estruturas ocultas

## Tipos de boroscópio disponíveis

| Tipo | Diâmetro da sonda | Aplicação principal |
|---|---|---|
| Endoscópio para tubulações | 8–25 mm | Tubulações industriais e sanitárias |
| Videoscópio portátil (Linha M) | 2–8 mm | Inspeção de máquinas e motores |
| Videoscópio tipo split (HJ) | 0,85–8 mm | Precisão em componentes pequenos |
| Robô de inspeção (FB20P) | Tubos 75–230 mm | Tubulações subterrâneas de grande porte |
| Boroscópio ATEX (Série K EX) | 6 mm | Áreas classificadas com risco de explosão |
| Boroscópio alta temperatura (Série K HT) | 6 mm | Ambientes de até 300°C |
| Videoscópio com medição 3D (Série DZ) | 6 mm | Medição dimensional de defeitos |
| Boroscópio termográfico (Série K Thermal) | 6 mm | Detecção de pontos quentes |

## Como escolher o boroscópio ideal

Quatro variáveis definem a escolha correta:

**1. Diâmetro da sonda**
De 0,85 mm (injetores e componentes de precisão) a sondas de 25 mm para tubulações industriais. Robôs cobrem dutos de 75 mm a 230 mm.

**2. Comprimento do cabo**
De 1 m (máquinas próximas) até 120 m (tubulações longas). Cabos acima de 5 m geralmente requerem suporte de carretel.

**3. Articulação da ponta**
Rígidos para percursos lineares. Videoscópios com joystick 360° para curvas, bifurcações e inspeção completa de superfícies internas.

**4. Ambiente de operação**
IP67/IP68 para ambientes úmidos. Certificação ATEX/IECEx para áreas classificadas. Modelos de alta temperatura para ambientes acima de 100°C.

## Perguntas Frequentes sobre Boroscópios (FAQ)

### O que é um boroscópio industrial?

Um boroscópio industrial é um equipamento de inspeção visual remota com sonda, câmera e LEDs integrados que permite visualizar o interior de máquinas, tubulações e estruturas inacessíveis sem necessidade de desmontagem. Os modelos modernos gravam em Full HD e possuem articulação 360° por joystick.

### Qual a diferença entre boroscópio, endoscópio e videoscópio?

Os três termos são frequentemente usados como sinônimos. Boroscópio é o termo mais amplo. Endoscópio industrial refere-se a modelos com sonda flexível longa para tubulações. Videoscópio é o padrão mais avançado — câmera HD, tela integrada, articulação elétrica e gravação. Na prática, todos realizam inspeção visual interna sem desmontagem.

### O que é articulação 360° em boroscópios e por que ela importa?

A articulação 360° permite que a câmera na ponta da sonda gire em qualquer direção por meio de um joystick elétrico. Isso é essencial para inspecionar curvas, bifurcações e toda a superfície interna de componentes — algo impossível com sondas rígidas ou de articulação limitada.

### Para que setores o boroscópio industrial é indicado?

Petroquímica, geração de energia, siderurgia, saneamento, aeronáutico e manutenção industrial em geral. Qualquer operação que precise inspecionar turbinas, caldeiras, compressores, tubulações, soldas ou motores internamente sem desmontagem é uma aplicação para boroscópio.

### Boroscópio serve para inspecionar turbinas a gás?

Sim. A inspeção de turbinas a gás é uma das aplicações mais críticas do boroscópio industrial. O videoscópio articulado com sonda de 6 mm e câmera Full HD permite visualizar palhetas, câmara de combustão e componentes internos sem remoção do motor. Para temperaturas extremas, existem modelos certificados para operação até 300°C.

### É possível inspecionar tubulações subterrâneas com boroscópio?

Sim, com os equipamentos corretos. Para tubulações de pequeno diâmetro, endoscópios com cabo longo são suficientes. Para redes de esgoto e adutoras de 75 mm a 230 mm de diâmetro, robôs de inspeção com câmera elevável e rodas intercambiáveis são a solução ideal, operando com carretel de cabo de até 120 m.

### Boroscópio pode ser usado em manutenção preditiva?

Sim, é uma das ferramentas fundamentais de manutenção preditiva. A inspeção visual periódica por boroscópio detecta corrosão, trincas, desgaste e obstruções antes que causem falhas. Isso reduz paradas não programadas, que custam em média 3 a 5 vezes mais que a manutenção preventiva.

### É difícil operar um boroscópio industrial?

Os modelos modernos foram projetados para facilidade de operação. A interface é por joystick — similar a um controle — e a tela integrada exibe a imagem em tempo real. Com treinamento básico, qualquer técnico de manutenção consegue operar o equipamento em poucos minutos.

### O boroscópio funciona em ambientes escuros ou sem iluminação?

Sim. Os boroscópios industriais possuem LEDs de alta potência na ponta da sonda, com intensidade ajustável. Isso garante imagens claras e nítidas mesmo em tubulações e câmaras totalmente sem luz externa.

### Como documentar e guardar as imagens da inspeção com boroscópio?

Os videoscópios modernos possuem gravação integrada de vídeo e foto em cartão SD, sem depender de computador. Alguns modelos oferecem saída HDMI e WiFi para transferência imediata. As imagens são usadas para laudos técnicos, relatórios de conformidade e comparação entre inspeções periódicas.

### O que é boroscópio com medição 3D?

Boroscópios com medição 3D utilizam estereoscopia ou luz estruturada para calcular dimensões reais de defeitos — comprimento, profundidade e área — diretamente na tela, sem software externo. São usados quando a norma exige medição quantitativa, como trincas em turbinas ou corrosão em vasos de pressão.

### O que é boroscópio ATEX e quando ele é obrigatório?

Boroscópios ATEX (ou IECEx) são certificados para operação segura em atmosferas explosivas — ambientes com gases inflamáveis, vapores ou poeiras combustíveis. Em refinarias, plataformas offshore, terminais de GLP e outras áreas classificadas pela NR-10 e NR-20, o uso de equipamentos ATEX é obrigatório por lei.
    `.trim(),
  },
  {
    id: 'importancia-inspecao-tubulacoes',
    title: 'A Importância da Inspeção de Tubulações na Indústria',
    excerpt: 'Descubra como a inspeção regular de tubulações pode prevenir acidentes, reduzir custos de manutenção e aumentar a vida útil dos equipamentos industriais.',
    category: 'Manutenção',
    date: '2024-01-15',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&h=630&fit=crop',
    content: `
A inspeção regular de tubulações é um dos pilares da manutenção industrial moderna. Sistemas de tubulação transportam fluidos críticos — vapor, óleo, gás e produtos químicos — sob pressão e temperatura elevadas, tornando qualquer falha potencialmente catastrófica.

## Por que inspecionar regularmente?

Tubulações degradam com o tempo por corrosão interna, erosão, fadiga térmica e deposição de incrustações. Sem inspeção periódica, esses processos evoluem silenciosamente até causar vazamentos, rupturas ou paradas de produção não planejadas.

Os custos de uma falha não prevista são sempre maiores do que os da manutenção preventiva: reparo emergencial, parada de linha, multas ambientais e, no pior cenário, acidentes com pessoal.

## Tecnologias disponíveis

Os **endoscópios e videoscópios industriais** permitem inspecionar internamente tubulações sem necessidade de desmontagem. A câmera avança pelo interior da tubulação e transmite imagem em tempo real ao operador, que pode identificar:

- Corrosão e oxidação das paredes
- Incrustações e obstruções
- Trincas e deformações estruturais
- Juntas e soldas comprometidas

## Frequência recomendada

A norma NR-13 (Vasos de Pressão e Tubulações) determina prazos máximos de inspeção conforme o nível de risco e os materiais envolvidos. De maneira geral, recomenda-se:

- **Tubulações de processo:** inspeção anual para sistemas críticos
- **Utilidades industriais:** a cada 2 anos para água e vapor de baixa pressão
- **Sistemas legados:** inspeção imediata ao identificar anomalias operacionais

## Benefícios comprovados

Empresas que adotam programas de inspeção preventiva reportam redução de até 40% nos custos de manutenção corretiva e aumento significativo da vida útil das tubulações. O retorno sobre o investimento em equipamentos de inspeção visual é tipicamente inferior a 12 meses.

A BOROTEC Industrial oferece linha completa de endoscópios e videoscópios para inspeção de tubulações industriais de todos os diâmetros. Entre em contato para conhecer a solução ideal para sua planta.
    `.trim(),
  },
  {
    id: 'como-escolher-boroscopio',
    title: 'Como Escolher o Boroscópio Ideal para sua Aplicação',
    excerpt: 'Guia completo para ajudar você a selecionar o equipamento de inspeção visual correto, considerando diâmetro, comprimento e recursos necessários.',
    category: 'Guia de Compra',
    date: '2024-01-10',
    readTime: '8 min',
    image: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=1200&h=630&fit=crop',
    content: `
Escolher o boroscópio certo é fundamental para garantir eficiência na inspeção e durabilidade do equipamento. Com tantas opções disponíveis no mercado, é fácil se perder nas especificações técnicas. Este guia resume os critérios mais importantes para a seleção correta.

## 1. Diâmetro da sonda

O diâmetro da sonda determina em quais tubulações e cavidades o equipamento pode operar. As categorias mais comuns são:

- **Até 3 mm:** inspeção de motores, injetores e componentes de alta precisão
- **4 a 8 mm:** uso geral em turbinas, compressores e tubulações de pequeno porte
- **8 a 25 mm:** tubulações industriais de médio e grande porte
- **Acima de 25 mm:** sistemas de esgoto, dutos de HVAC e poços

## 2. Comprimento do cabo

O comprimento do cabo flexível define o alcance do equipamento. Avalie sempre a distância máxima a ser percorrida e adicione uma margem de segurança de 20%.

Cabos mais longos — acima de 5 metros — geralmente requerem estrutura de carrinho ou sistema de robô para operação confortável.

## 3. Articulação da ponta

Boroscópios rígidos são adequados para percursos lineares. Para tubulações curvas ou cavidades com obstruções, é imprescindível a articulação da ponta, preferencialmente com joystick elétrico de 360°.

## 4. Resolução da câmera

Para inspeção de precisão — identificação de trincas finas, medição de defeitos — priorize câmeras FHD (1080p) ou superiores. Para inspeção de rotina, câmeras HD são suficientes.

## 5. Certificações especiais

Para operação em ambientes com risco de explosão (refinarias, petroquímicas), exija certificação **ATEX** ou **IECEx**. A BOROTEC oferece a Série K EX, desenvolvida especificamente para áreas classificadas.

Para ambientes de alta temperatura, verifique a faixa de operação do equipamento — a Série K HT opera de -20°C a 300°C.

## 6. Conectividade e armazenamento

Recursos como WiFi, saída HDMI e cartão SD facilitam o compartilhamento de imagens para laudos técnicos. Avalie se o equipamento permite gravar vídeo além de fotos.

## Resumo: perguntas antes de comprar

1. Qual o menor diâmetro de acesso na minha aplicação?
2. Qual a distância máxima de inspeção?
3. Existem curvas no percurso?
4. O ambiente é classificado (ATEX)?
5. Preciso de medição dimensional?

A equipe técnica da BOROTEC pode auxiliar na seleção do equipamento mais adequado à sua necessidade. Consulte-nos antes de decidir.
    `.trim(),
  },
  {
    id: 'tecnologia-3d-inspecao',
    title: 'Tecnologia de Medição 3D em Inspeções Industriais',
    excerpt: 'Conheça os avanços da tecnologia de medição tridimensional e como ela está revolucionando a análise de defeitos em componentes industriais.',
    category: 'Tecnologia',
    date: '2024-01-05',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=630&fit=crop',
    content: `
A medição tridimensional em inspeção visual remota representa um salto qualitativo enorme em relação à inspeção convencional. Enquanto o videoscópio tradicional fornece imagem bidimensional, os sistemas 3D permitem quantificar defeitos com precisão — sem necessidade de desmontagem ou ferramentas adicionais.

## Como funciona a medição 3D em videoscópios

Os sistemas de medição 3D em endoscópios utilizam duas câmeras estereoscópicas ou projeção de luz estruturada para calcular profundidade e distâncias em tempo real. O processador do equipamento gera um mapa tridimensional da superfície inspecionada.

Com esses dados, o inspetor pode medir:

- **Profundidade de corrosão** e perda de espessura
- **Comprimento e largura de trincas**
- **Área de defeitos** superficiais
- **Distâncias** entre pontos de referência

## Aplicações principais

### Inspeção de pás de turbinas

Turbinas a gás e a vapor têm pás de geometria complexa sujeitas a erosão e trincas por fadiga. A medição 3D permite quantificar a perda de material e decidir se a pá ainda está dentro da tolerância operacional ou precisa de substituição.

### Avaliação de corrosão em vasos de pressão

Em vez de remover o equipamento de operação para inspeção de espessura por ultrassom, os videoscópios 3D permitem estimar a perda de material internamente, de forma muito mais rápida.

### Controle de qualidade em soldas

Soldas com porosidade ou falta de fusão podem ser medidas em 3D para determinar se atendem às normas aplicáveis (ASME, AWS).

## Série DZ: medição 3D com nuvem de pontos

A BOROTEC oferece a Série DZ, videoscópio com medição 3D avançada por mapa de nuvem de pontos. O sistema gera uma representação completa da superfície inspecionada, exportável para análise em software CAD.

A precisão de medição da Série DZ é de ±0,1 mm em condições ideais — suficiente para a maioria das aplicações de controle de qualidade industrial.

## Quando vale o investimento em 3D?

A medição 3D é recomendada quando há necessidade de documentar e quantificar defeitos para laudos técnicos, programas de integridade estrutural (RBI) ou para decidir entre reparo e substituição de componentes.

Para inspeção de rotina sem necessidade de medição, videoscópios convencionais atendem com menor custo.
    `.trim(),
  },
  {
    id: 'manutencao-preventiva-robos',
    title: 'Robôs de Inspeção: O Futuro da Manutenção Preventiva',
    excerpt: 'Como os robôs de inspeção estão transformando a manutenção de tubulações de grande porte e ambientes de difícil acesso.',
    category: 'Inovação',
    date: '2023-12-28',
    readTime: '7 min',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=630&fit=crop',
    content: `
A robótica de inspeção deixou de ser tecnologia futurista para se tornar realidade operacional em indústrias de processo, saneamento e infraestrutura. Robôs autopropelidos podem percorrer tubulações de grande diâmetro com câmeras de alta definição, sensores de distância e sistemas de gravação integrados — sem expor operadores a ambientes confinados e insalubres.

## Vantagens dos robôs sobre a inspeção convencional

**Segurança:** eliminam a necessidade de entrada em espaço confinado para inspeção, reduzindo drasticamente o risco ocupacional.

**Alcance:** percorrem centenas de metros de tubulação em uma única operação, incluindo trechos submersos ou com fluxo contínuo.

**Documentação:** geram relatórios automáticos com geolocalização dos defeitos identificados, facilitando o planejamento de manutenção.

**Custo-benefício:** a inspeção com robô de uma rede de esgotos ou de um oleoduto é até 10 vezes mais barata do que a inspeção manual com esvaziamento.

## Sistema FB20P: robô para tubulações industriais

O FB20P da BOROTEC é um robô de inspeção para tubulações de 75mm a 230mm de diâmetro. O sistema inclui:

- **Câmera frontal e traseira** para navegação precisa
- **Câmera elevatória** para inspeção das paredes laterais da tubulação
- **Rodas intercambiáveis** para diferentes diâmetros
- **Carretel de cabo** integrado com comprimento de até 150m
- **Controlador tablet** com interface intuitiva e gravação em HD

As rodas off-road garantem tração mesmo em superfícies irregulares e com presença de sedimento.

## Aplicações industriais

- **Saneamento:** inspeção de coletores de esgoto e ramais de ligação
- **Petroquímica:** inspeção de dutos de processo sem interrupção de operação
- **Geração de energia:** inspeção de condensadores, trocadores de calor e cooling towers
- **Mineração:** avaliação de minerodutos e sistemas de bombeamento

## Tendências: IA aplicada à inspeção robotizada

Os robôs de inspeção mais modernos incorporam algoritmos de inteligência artificial para detecção automática de anomalias — corrosão, trincas, infiltrações — diretamente durante a inspeção, sem necessidade de revisão posterior das imagens.

A Série Y da BOROTEC já conta com IA embarcada para detecção automática de defeitos, reduzindo o tempo de análise pós-inspeção em até 70%.
    `.trim(),
  },
  {
    id: 'certificacoes-atex-iecex',
    title: 'Certificações ATEX e IECEx: Segurança em Áreas Classificadas',
    excerpt: 'Entenda a importância das certificações de segurança para equipamentos de inspeção em ambientes com risco de explosão.',
    category: 'Segurança',
    date: '2023-12-20',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&h=630&fit=crop',
    content: `
Áreas classificadas são ambientes onde há risco de formação de atmosfera explosiva — mistura de ar com gases, vapores ou poeiras inflamáveis — em quantidade e concentração capazes de causar explosão na presença de uma fonte de ignição.

Refinarias, plataformas de petróleo, plantas petroquímicas, silos de grão e instalações de gás natural são exemplos típicos. Nenhum equipamento elétrico pode ser utilizado nessas áreas sem a devida certificação.

## O que são ATEX e IECEx?

**ATEX** (ATmosphères EXplosibles) é a diretiva europeia que regula equipamentos para uso em atmosferas potencialmente explosivas. Todo equipamento para uso na Europa em área classificada deve ter marcação ATEX.

**IECEx** é o sistema de certificação internacional baseado nas normas IEC 60079, com reconhecimento mútuo entre os países signatários. No Brasil, a norma equivalente é a ABNT NBR IEC 60079.

## Categorias e zonas

A classificação das zonas determina qual categoria de equipamento é permitida:

| Zona | Descrição | Categoria ATEX |
|------|-----------|----------------|
| Zona 0 | Atmosfera explosiva permanente | Cat. 1G |
| Zona 1 | Atmosfera explosiva provável | Cat. 2G |
| Zona 2 | Atmosfera explosiva improvável | Cat. 3G |

Para gases e vapores usam-se as letras G; para poeiras combustíveis, D.

## Por que a certificação importa?

Um equipamento não certificado introduzido em área classificada representa risco de ignição por centelha elétrica, superfície quente ou descarga eletrostática. As consequências — explosões, incêndios e mortes — justificam a exigência regulatória.

Além do risco à segurança, usar equipamento não certificado em área classificada é infração grave à NR-10 (Segurança em Instalações Elétricas) e pode gerar responsabilidade civil e criminal.

## Série K EX: boroscópio certificado ATEX/IECEx

A BOROTEC disponibiliza a Série K EX, videoscópio certificado para operação em áreas classificadas Zona 1 e Zona 2. O equipamento permite inspeção visual completa de componentes em refinarias, plantas petroquímicas e plataformas sem comprometer a segurança da instalação.

Ao especificar equipamentos de inspeção, sempre exija o certificado original e verifique se a categoria e o grupo de explosão são compatíveis com sua instalação.
    `.trim(),
  },
  {
    id: 'termografia-industrial',
    title: 'Termografia Industrial: Detectando Problemas Invisíveis',
    excerpt: 'Aprenda como a tecnologia de imagem térmica pode identificar falhas elétricas, mecânicas e estruturais antes que causem danos.',
    category: 'Tecnologia',
    date: '2023-12-15',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=630&fit=crop',
    content: `
A termografia industrial utiliza câmeras infravermelhas para capturar a distribuição de temperatura em equipamentos e instalações. Como praticamente toda falha mecânica ou elétrica gera calor antes de causar uma avaria visível, a termografia é uma das técnicas mais eficazes de manutenção preditiva.

## Como a termografia identifica falhas

Componentes elétricos com conexões frouxas, isolamento deteriorado ou sobrecarga produzem temperatura acima do normal. Rolamentos com lubrificação deficiente ou desgaste excessivo esquentam antes de travar. Tubulações com incrustação interna mostram gradientes de temperatura anômalos.

A câmera térmica torna esses padrões visíveis, permitindo intervenção preventiva antes da falha.

## Principais aplicações

### Instalações elétricas

A termografia é a técnica padrão para inspeção preventiva de:

- Painéis e quadros de distribuição
- Transformadores e chaves de alta tensão
- Barramentos e conexões
- Motores elétricos

Uma conexão elétrica com resistência aumentada pode mostrar temperatura 20°C acima das adjacentes — sinal de que a falha é iminente.

### Equipamentos rotativos

Rolamentos aquecidos indicam falta de lubrificação ou desalinhamento. Identificar o problema antes da falha evita paradas de emergência e danos secundários ao eixo.

### Envoltórias e isolamento térmico

Perda de isolamento em fornos, autoclaves e tubulações quentes é facilmente detectada por termografia, orientando reparos pontuais que reduzem perdas energéticas.

## Série K Termografia: inspeção visual e térmica integradas

A BOROTEC oferece a Série K Termografia, que combina câmera de inspeção visual convencional com câmera infravermelha na mesma sonda. Isso permite inspecionar internamente componentes com acesso restrito — como motores fechados, caixas de engrenagens e tubulações — e obter simultaneamente a imagem visual e o mapa térmico.

A integração de imagem visual e térmica em um único equipamento reduz o tempo de inspeção e facilita a correlação dos dados para o laudo técnico.

## Frequência de inspeção termográfica

Para instalações críticas, recomenda-se inspeção termográfica semestral. Para instalações comuns, anual é suficiente. Após reformas elétricas ou substituição de equipamentos, realize sempre uma inspeção de comissionamento.
    `.trim(),
  },
];

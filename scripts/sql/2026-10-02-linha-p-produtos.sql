-- Linha P – cadastro de BT-8200, BT-8300, BT-8400 e BT-8500 + filtros por especificação no BT-8000.
-- Produtos novos: só insere (se o id já existir, nada é sobrescrito). Imagem: placeholder do site.
begin;

-- camera-inspecao-poco-artesiano-visao-dupla-bt-8200
insert into products (id, name, description, category, image_url, cable, probe, camera, ip, active, seo_title, seo_description, spec_labels, created_at)
values (
  'camera-inspecao-poco-artesiano-visao-dupla-bt-8200',
  'Câmera para Inspeção de Poço Artesiano com Visão Dupla até 200m — BT-8200',
  'Câmera para inspeção de poço artesiano com visão dupla: câmera frontal para baixo e câmera lateral com giro de 360° e foco manual.
Cabo de 100 a 200 m com contador de metragem, vedação até 300 m, monitor IPS de 8" com para-sol no próprio carretel e gravação em USB.',
  'Linha P - Poços e Subaquático', '/placeholder.svg',
  'Ø 45 mm', 'Frontal + lateral 360°', '100 m a 200 m', 'Até 300 m (30 bar)', true,
  'Câmera para Poço Artesiano Visão Dupla BT-8200 | Borotec',
  'Câmera para poço artesiano BT-8200 com visão dupla, frontal e lateral com giro 360°. Cabo até 200m, vedação 300m e monitor 8". Solicite orçamento!',
  '{"probe": "Câmera", "cable": "Cabeça", "camera": "Cabo", "ip": "Vedação"}'::jsonb,
  now() + interval '0 second'
)
on conflict (id) do nothing;

insert into product_details (product_id, specs_description, specs_left, specs_right, faqs)
values (
  'camera-inspecao-poco-artesiano-visao-dupla-bt-8200',
  'O BT-8200 é a câmera para inspeção de poço artesiano para quem precisa de um equipamento completo e fácil de transportar. A cabeça de 45 mm tem duas câmeras: a frontal mostra o caminho e as obstruções à frente, e a lateral gira 360° para examinar o revestimento, os filtros e as juntas em toda a volta do poço. O foco manual da câmera lateral garante imagens nítidas mesmo em detalhes como trincas e incrustações. O monitor de 8" com para-sol fica montado no próprio carretel, o contador digital mostra a profundidade exata de cada ponto, e o teclado sem fio permite anotar dados direto no vídeo, para entregar o laudo ao cliente.',
  '[{"title": "Câmera", "icon_name": "Camera", "rows": [{"label": "Tipo", "value": "AHD com visão dupla (frontal e lateral)"}, {"label": "Diâmetro da cabeça", "value": "45 mm"}, {"label": "Giro", "value": "360° (câmera lateral)"}, {"label": "Foco", "value": "Manual (câmera lateral)"}, {"label": "Vedação", "value": "À prova d''água até 300 m (30 bar)", "filter": true, "filter_value": "Até 300 m"}]}, {"title": "Cabo e Carretel", "icon_name": "Wrench", "rows": [{"label": "Comprimento", "value": "100 m a 200 m", "filter": true}, {"label": "Diâmetro do cabo", "value": "8 mm"}, {"label": "Contador de metragem", "value": "Digital"}]}, {"title": "Alimentação", "icon_name": "Battery", "rows": [{"label": "Bateria", "value": "Íon-lítio, 10500 mAh"}]}]'::jsonb,
  '[{"title": "Monitor e Controle", "icon_name": "Monitor", "rows": [{"label": "Monitor", "value": "IPS HD de 8\" com para-sol, montado no carretel"}, {"label": "Controle", "value": "Caixa DVR"}, {"label": "Teclado", "value": "Sem fio, para anotações no vídeo"}]}, {"title": "Gravação e Armazenamento", "icon_name": "Video", "rows": [{"label": "Armazenamento", "value": "Dispositivo USB"}]}]'::jsonb,
  '[{"question": "Qual a vantagem da visão dupla?", "answer": "A câmera frontal mostra obstruções e o fundo do poço, e a lateral gira 360° para examinar as paredes, os filtros e as juntas do revestimento. Com as duas, você faz a inspeção completa em uma única descida."}, {"question": "O BT-8200 serve para poços com mais de 200 m?", "answer": "O cabo vai até 200 m. Para poços mais profundos, veja o BT-8300 (até 300 m) e o BT-8500 (até 500 m)."}]'::jsonb
)
on conflict (product_id) do nothing;

-- camera-inspecao-poco-profundo-bt-8300
insert into products (id, name, description, category, image_url, cable, probe, camera, ip, active, seo_title, seo_description, spec_labels, created_at)
values (
  'camera-inspecao-poco-profundo-bt-8300',
  'Câmera para Inspeção de Poço Profundo com Visão Dupla até 300m — BT-8300',
  'Câmera para inspeção de poço profundo com visão dupla: câmera frontal e câmera lateral com giro de 360°, cabo de 200 a 300 m e vedação até 300 m.
Monitor IPS de 13" com para-sol em maleta, contador de metragem, caixa DVR, teclado sem fio e gravação em USB.',
  'Linha P - Poços e Subaquático', '/placeholder.svg',
  'Ø 45 mm', 'Frontal + lateral 360°', '200 m a 300 m', 'Até 300 m (30 bar)', true,
  'Câmera para Poço Profundo até 300m BT-8300 | Borotec',
  'Câmera para poço profundo BT-8300: visão frontal e lateral com giro 360°, cabo de 200 a 300m e monitor de 13". Gravação em USB. Peça orçamento!',
  '{"probe": "Câmera", "cable": "Cabeça", "camera": "Cabo", "ip": "Vedação"}'::jsonb,
  now() + interval '1 second'
)
on conflict (id) do nothing;

insert into product_details (product_id, specs_description, specs_left, specs_right, faqs)
values (
  'camera-inspecao-poco-profundo-bt-8300',
  'O BT-8300 é a câmera para inspeção de poço profundo, com cabo de 200 a 300 m e cabeça vedada até 300 m de profundidade. A cabeça de 45 mm combina uma câmera frontal, que mostra o caminho e o fundo do poço, com uma câmera lateral de giro 360° e foco manual, que examina revestimento, filtros e juntas em toda a volta. O monitor de 13" com para-sol, em maleta de transporte, facilita a análise ao ar livre e a apresentação ao cliente. O contador digital mostra a profundidade exata de cada ponto, e o teclado sem fio permite anotar dados no vídeo durante a inspeção.',
  '[{"title": "Câmera", "icon_name": "Camera", "rows": [{"label": "Tipo", "value": "AHD com visão dupla (frontal e lateral)"}, {"label": "Diâmetro da cabeça", "value": "45 mm"}, {"label": "Giro", "value": "360° (câmera lateral)"}, {"label": "Foco", "value": "Manual (câmera lateral)"}, {"label": "Vedação", "value": "À prova d''água até 300 m (30 bar)", "filter": true, "filter_value": "Até 300 m"}]}, {"title": "Cabo e Carretel", "icon_name": "Wrench", "rows": [{"label": "Comprimento", "value": "200 m a 300 m", "filter": true}, {"label": "Diâmetro do cabo", "value": "8 mm"}, {"label": "Contador de metragem", "value": "Digital"}]}, {"title": "Alimentação", "icon_name": "Battery", "rows": [{"label": "Bateria", "value": "Íon-lítio, 8800 mAh"}]}]'::jsonb,
  '[{"title": "Monitor e Controle", "icon_name": "Monitor", "rows": [{"label": "Monitor", "value": "IPS HD de 13\" com para-sol, em maleta"}, {"label": "Controle", "value": "Caixa DVR"}, {"label": "Teclado", "value": "Sem fio, para anotações no vídeo"}]}, {"title": "Gravação e Armazenamento", "icon_name": "Video", "rows": [{"label": "Armazenamento", "value": "Dispositivo USB"}]}]'::jsonb,
  '[{"question": "Qual a diferença entre o BT-8300 e o BT-8200?", "answer": "O alcance e o monitor. O BT-8300 tem cabo de 200 a 300 m e monitor de 13\" em maleta. O BT-8200 tem cabo de 100 a 200 m e monitor de 8\" montado no carretel."}, {"question": "A câmera aguenta a pressão de um poço profundo?", "answer": "Sim. A cabeça é vedada até 300 m de profundidade (30 bar)."}]'::jsonb
)
on conflict (product_id) do nothing;

-- camera-inspecao-poco-guincho-eletrico-bt-8400
insert into products (id, name, description, category, image_url, cable, probe, camera, ip, active, seo_title, seo_description, spec_labels, created_at)
values (
  'camera-inspecao-poco-guincho-eletrico-bt-8400',
  'Câmera para Inspeção de Poço com Guincho Elétrico até 200m — BT-8400',
  'Câmera para inspeção de poço com guincho elétrico, que desce e sobe o cabo sem esforço manual, e cabeça com visão dupla e giro de 360°.
Cabo de 100 a 200 m, vedação até 300 m, monitor de 13" com para-sol, DVR com dois joysticks e opção de câmera pan tilt de 50 mm.',
  'Linha P - Poços e Subaquático', '/placeholder.svg',
  'Frontal + lateral 360°', 'Elétrico', '100 m a 200 m', 'Até 300 m (30 bar)', true,
  'Câmera para Poço com Guincho Elétrico BT-8400 | Borotec',
  'Câmera para poço BT-8400 com guincho elétrico: desce e sobe o cabo sem esforço, visão dupla com giro 360° e vedação 300m. Solicite orçamento!',
  '{"probe": "Guincho", "cable": "Câmera", "camera": "Cabo", "ip": "Vedação"}'::jsonb,
  now() + interval '2 second'
)
on conflict (id) do nothing;

insert into product_details (product_id, specs_description, specs_left, specs_right, faqs)
values (
  'camera-inspecao-poco-guincho-eletrico-bt-8400',
  'O BT-8400 é a câmera para inspeção de poço com guincho elétrico, indicada para empresas que fazem muitas inspeções e querem mais produtividade e menos esforço da equipe. O guincho motorizado desce e recolhe o cabo de forma controlada, alimentado em AC 110 a 230 V ou DC 24 V, o que permite trabalhar tanto na tomada quanto na bateria do veículo. A cabeça de 45 mm tem câmera frontal e câmera lateral com giro de 360° e foco manual, vedada até 300 m. O monitor de 13" com para-sol e a caixa DVR com dois joysticks dão controle total da inspeção, e o teclado sem fio permite anotar dados direto no vídeo. Como opcional, o BT-8400 pode receber a câmera pan tilt de 50 mm.',
  '[{"title": "Câmera", "icon_name": "Camera", "rows": [{"label": "Tipo", "value": "AHD com visão dupla (frontal e lateral)"}, {"label": "Diâmetro da cabeça", "value": "45 mm"}, {"label": "Giro", "value": "360° (câmera lateral)"}, {"label": "Foco", "value": "Manual (câmera lateral)"}, {"label": "Vedação", "value": "À prova d''água até 300 m (30 bar)", "filter": true, "filter_value": "Até 300 m"}, {"label": "Câmera opcional", "value": "Pan tilt de 50 mm"}]}, {"title": "Cabo e Carretel", "icon_name": "Wrench", "rows": [{"label": "Comprimento", "value": "100 m a 200 m", "filter": true}, {"label": "Diâmetro do cabo", "value": "8 mm"}, {"label": "Contador de metragem", "value": "Digital"}, {"label": "Guincho", "value": "Elétrico (motorizado)"}]}, {"title": "Alimentação", "icon_name": "Battery", "rows": [{"label": "Guincho", "value": "AC 110 a 230 V ou DC 24 V"}, {"label": "Bateria do sistema", "value": "Íon-lítio, 8800 mAh"}]}]'::jsonb,
  '[{"title": "Monitor e Controle", "icon_name": "Monitor", "rows": [{"label": "Monitor", "value": "IPS HD de 13\" com para-sol"}, {"label": "Controle", "value": "Caixa DVR com dois joysticks"}, {"label": "Teclado", "value": "Sem fio, para anotações no vídeo"}]}, {"title": "Gravação e Armazenamento", "icon_name": "Video", "rows": [{"label": "Armazenamento", "value": "Dispositivo USB"}]}]'::jsonb,
  '[{"question": "Por que escolher uma câmera com guincho elétrico?", "answer": "Em poços profundos, descer e subir centenas de metros de cabo na manivela cansa a equipe e alonga a inspeção. O guincho elétrico faz esse trabalho com controle de velocidade, o que aumenta a produtividade em quem faz várias inspeções por semana."}, {"question": "Posso usar o BT-8400 em campo, longe da tomada?", "answer": "Sim. O guincho funciona em AC 110 a 230 V ou em DC 24 V."}]'::jsonb
)
on conflict (product_id) do nothing;

-- camera-inspecao-poco-tubular-profundo-bt-8500
insert into products (id, name, description, category, image_url, cable, probe, camera, ip, active, seo_title, seo_description, spec_labels, created_at)
values (
  'camera-inspecao-poco-tubular-profundo-bt-8500',
  'Câmera para Inspeção de Poço Tubular Profundo até 500m — BT-8500',
  'Câmera para inspeção de poço tubular profundo até 500 m, com guincho motorizado de enrolamento automático, visão dupla e giro de 360°.
Vedação até 500 m, bússola, sensor de temperatura, Wi-Fi, monitor de 13" com para-sol e gravação em USB.',
  'Linha P - Poços e Subaquático', '/placeholder.svg',
  'Até 500 m (50 bar)', '200 m a 500 m', 'Frontal + lateral 360°', 'Bússola, temperatura e Wi-Fi', true,
  'Câmera para Poço Tubular Profundo 500m BT-8500 | Borotec',
  'Câmera para poço tubular profundo BT-8500: até 500m, guincho com enrolamento automático, bússola, temperatura e Wi-Fi. Solicite orçamento!',
  '{"probe": "Cabo", "cable": "Vedação", "camera": "Câmera", "ip": "Extras"}'::jsonb,
  now() + interval '3 second'
)
on conflict (id) do nothing;

insert into product_details (product_id, specs_description, specs_left, specs_right, faqs)
values (
  'camera-inspecao-poco-tubular-profundo-bt-8500',
  'O BT-8500 é o modelo topo da Linha P, desenvolvido para inspeção de poços tubulares profundos de até 500 m. O guincho motorizado com enrolamento automático organiza o cabo na descida e na subida, o que dá segurança e velocidade em grandes profundidades. A cabeça de 45 mm, vedada até 500 m, tem câmera frontal e câmera lateral com giro de 360° e foco manual. A bússola mostra a orientação da câmera, e o sensor de temperatura registra as condições do poço durante a inspeção, dados úteis para hidrogeólogos e laudos técnicos. Com Wi-Fi, monitor de 13" com para-sol e teclado sem fio para anotações no vídeo, é a solução para saneamento, mineração e empresas de perfuração de poços profundos.',
  '[{"title": "Câmera", "icon_name": "Camera", "rows": [{"label": "Tipo", "value": "AHD com visão dupla (frontal e lateral)"}, {"label": "Diâmetro da cabeça", "value": "45 mm"}, {"label": "Giro", "value": "360° (câmera lateral)"}, {"label": "Foco", "value": "Manual (câmera lateral)"}, {"label": "Vedação", "value": "À prova d''água até 500 m (50 bar)", "filter": true, "filter_value": "Até 500 m"}]}, {"title": "Sensores", "icon_name": "Thermometer", "rows": [{"label": "Bússola", "value": "Sim"}, {"label": "Temperatura", "value": "Sim"}]}, {"title": "Cabo e Carretel", "icon_name": "Wrench", "rows": [{"label": "Comprimento", "value": "200 m a 500 m", "filter": true}, {"label": "Diâmetro do cabo", "value": "8 mm"}, {"label": "Contador de metragem", "value": "Digital"}, {"label": "Guincho", "value": "Motorizado, com enrolamento automático do cabo"}]}, {"title": "Alimentação", "icon_name": "Battery", "rows": [{"label": "Guincho", "value": "AC 110 a 230 V"}, {"label": "Bateria do sistema", "value": "Íon-lítio, 4400 mAh"}]}]'::jsonb,
  '[{"title": "Monitor e Controle", "icon_name": "Monitor", "rows": [{"label": "Monitor", "value": "IPS HD de 13\" com para-sol"}, {"label": "Teclado", "value": "Sem fio, para anotações no vídeo"}]}, {"title": "Conectividade", "icon_name": "Waves", "rows": [{"label": "Wi-Fi", "value": "Sim"}]}, {"title": "Gravação e Armazenamento", "icon_name": "Video", "rows": [{"label": "Armazenamento", "value": "Dispositivo USB"}]}]'::jsonb,
  '[{"question": "Até que profundidade o BT-8500 inspeciona?", "answer": "O cabo pode ter de 200 a 500 m, e a cabeça da câmera é vedada até 500 m de profundidade (50 bar)."}, {"question": "Para que servem a bússola e o sensor de temperatura?", "answer": "A bússola mostra a orientação da câmera lateral, o que ajuda a localizar com precisão a posição de trincas e entradas de água. O sensor de temperatura registra a condição do poço ao longo da descida, informação útil para laudos e estudos hidrogeológicos."}]'::jsonb
)
on conflict (product_id) do nothing;

-- camera-de-inspecao-de-poco-artesiano-ate-200m-borotec-bt-8000 (BT-8000): só aplica se as specs não mudaram desde 02/10/2026
update product_details set
  specs_left = '[{"rows": [{"label": "Tipo de Câmera", "value": " Pan/Tilt com foco manual"}, {"label": "Dimensões", "value": "Ø50mm x 154mm"}, {"label": "Rotação (Pan)", "value": "360° contínua/infinita (slip ring)"}, {"label": "Inclinação (Tilt)", "value": "±180°"}, {"label": "Sensor", "value": "CMOS 1/3\", 1.3MP"}, {"label": "Iluminação", "value": "6 LEDs brancos com brilho ajustável"}, {"label": "Material do corpo", "value": "Aço inoxidável 304"}, {"label": "Vedação", "value": "IP68 até 10 bar (opera submersa até ~100m de profundidade)", "filter": true, "filter_value": "Até 100 m"}, {"label": "Temperatura de operação", "value": "5°C a 50°C"}, {"label": "Recursos extras", "value": "Reset de foco e reset de rotação com um toque"}], "title": "Câmera", "icon_name": "Camera"}, {"rows": [{"label": "Diâmetro do cabo", "value": "Flexível com eixo de cobre, Ø6,8mm, conector especial para câmera"}, {"label": "Comprimento", "value": "100m / 150m / 200m", "filter": true, "filter_value": "100 m a 200 m"}, {"label": "Contador de profundidade", "value": "Exibido na tela em tempo real"}, {"label": "Unidades de medida", "value": "Metros ou pés (alternável)"}, {"label": "Carretel", "value": "Com rodas, alça, barra extensora e manivela manua"}, {"label": "Centralizador (skid)", "value": "Ø85mm / 220mm"}], "title": "Cabo e Contador de Metragem", "icon_name": "Wrench"}, {"rows": [{"label": "Bateria", "value": "11,1V / 8800mAh"}, {"label": "Autonomia", "value": "8 a 10 horas de uso contínuo"}, {"label": "Tempo de recarga", "value": "6 horas"}, {"label": "Carregador", "value": "Bivolt automático (100–240V)"}, {"label": "Saída do carregador", "value": "12,5V / 2A"}, {"label": "Potência máxima", "value": "20W"}, {"label": "Indicador de carga", "value": "LED vermelho (carregando) / verde (completo)"}], "title": "Bateria e Energia", "icon_name": "Battery"}]'::jsonb,
  specs_right = '[{"rows": [{"label": "Tipo de Tela", "value": "LCD IPS "}, {"label": "Tamanho da Tela", "value": "13 polegadas"}, {"label": "Resolução da Tela", "value": "1280x720 (HD)"}, {"label": "Proporção", "value": "16:9"}, {"label": "Para-sol", "value": "Integrado"}, {"label": "Idiomas do menu", "value": "9 (Inglês, Espanhol, Francês, Alemão, Italiano, Polonês, Chinês, Coreano, Russo)"}], "title": "Monitor", "icon_name": "Monitor"}, {"rows": [{"label": "Formato de Vídeo", "value": "MP4 (compressão H.264/H.265"}, {"label": "Formato de Foto", "value": "JPEG"}, {"label": "Captura de foto", "value": "Disponível mesmo durante a gravação"}, {"label": "Áudio", "value": "Microfone embutido + entrada para microfone externo"}, {"label": "Sinal de vídeo", "value": "AHD PAL/NTSC (compatível com CVBS)"}, {"label": "Saída de vídeo", "value": "Para monitor externo"}, {"label": "Armazenamento", "value": "Pen drive / HD USB"}, {"label": "Pen drive incluso", "value": "32GB"}, {"label": "Tempo de clipe", "value": "1 / 5 / 10 / 15 / 30 / 60 minutos"}, {"label": "Qualidade de vídeo", "value": "5 níveis ajustáveis"}, {"label": "Qualidade de foto", "value": "Alta / Média / Baixa"}, {"label": "Modo de gravação", "value": "Manual ou Automático"}, {"label": "Sobrescrita", "value": "ON / OFF"}, {"label": "Inserção de texto na tela", "value": "Via teclado sem fio (nome do cliente, local, data)"}, {"label": "Controles", "value": "Painel do DVR, controle remoto e teclado sem fio"}], "title": "Armazenamento e Gravação (DVR)", "icon_name": "Video"}, {"rows": [{"label": "Cabeça de câmera", "value": "1"}, {"label": "Carretel com cabo", "value": "1"}, {"label": "Unidade de controle DVR", "value": "1"}, {"label": "Cabo de vídeo (6 pinos)", "value": "1"}, {"label": "Cabo do contador de metragem (8 pinos)", "value": "1"}, {"label": "Centralizador da câmera (skid)", "value": "1"}, {"label": "Cabo de teste (1m)", "value": "1"}, {"label": "Pen drive USB 32GB", "value": "1"}, {"label": "Carregador bivolt", "value": "1"}, {"label": "Anéis de vedação", "value": "2"}, {"label": "Fone de ouvido", "value": "1"}, {"label": "Manual do usuário", "value": "1"}, {"label": "Bolsa de ferramentas", "value": "1"}], "title": "Conteúdo da Embalagem", "icon_name": "Package"}]'::jsonb
where product_id = 'camera-de-inspecao-de-poco-artesiano-ate-200m-borotec-bt-8000'
  and specs_left = '[{"rows": [{"label": "Tipo de Câmera", "value": " Pan/Tilt com foco manual"}, {"label": "Dimensões", "value": "Ø50mm x 154mm"}, {"label": "Rotação (Pan)", "value": "360° contínua/infinita (slip ring)"}, {"label": "Inclinação (Tilt)", "value": "±180°"}, {"label": "Sensor", "value": "CMOS 1/3\", 1.3MP"}, {"label": "Iluminação", "value": "6 LEDs brancos com brilho ajustável"}, {"label": "Material do corpo", "value": "Aço inoxidável 304"}, {"label": "Vedação", "value": "IP68 até 10 bar (opera submersa até ~100m de profundidade)"}, {"label": "Temperatura de operação", "value": "5°C a 50°C"}, {"label": "Recursos extras", "value": "Reset de foco e reset de rotação com um toque"}], "title": "Câmera", "icon_name": "Camera"}, {"rows": [{"label": "Diâmetro do cabo", "value": "Flexível com eixo de cobre, Ø6,8mm, conector especial para câmera"}, {"label": "Comprimentos disponíveis", "value": "100m / 150m / 200m"}, {"label": "Contador de profundidade", "value": "Exibido na tela em tempo real"}, {"label": "Unidades de medida", "value": "Metros ou pés (alternável)"}, {"label": "Carretel", "value": "Com rodas, alça, barra extensora e manivela manua"}, {"label": "Centralizador (skid)", "value": "Ø85mm / 220mm"}], "title": "Cabo e Contador de Metragem", "icon_name": "Wrench"}, {"rows": [{"label": "Bateria", "value": "11,1V / 8800mAh"}, {"label": "Autonomia", "value": "8 a 10 horas de uso contínuo"}, {"label": "Tempo de recarga", "value": "6 horas"}, {"label": "Carregador", "value": "Bivolt automático (100–240V)"}, {"label": "Saída do carregador", "value": "12,5V / 2A"}, {"label": "Potência máxima", "value": "20W"}, {"label": "Indicador de carga", "value": "LED vermelho (carregando) / verde (completo)"}], "title": "Bateria e Energia", "icon_name": "Battery"}]'::jsonb
  and specs_right = '[{"rows": [{"label": "Tipo de Tela", "value": "LCD IPS "}, {"label": "Tamanho da Tela", "value": "13 polegadas"}, {"label": "Resolução da Tela", "value": "1280x720 (HD)"}, {"label": "Proporção", "value": "16:9"}, {"label": "Para-sol", "value": "Integrado"}, {"label": "Idiomas do menu", "value": "9 (Inglês, Espanhol, Francês, Alemão, Italiano, Polonês, Chinês, Coreano, Russo)"}], "title": "Monitor", "icon_name": "Monitor"}, {"rows": [{"label": "Formato de Vídeo", "value": "MP4 (compressão H.264/H.265"}, {"label": "Formato de Foto", "value": "JPEG"}, {"label": "Captura de foto", "value": "Disponível mesmo durante a gravação"}, {"label": "Áudio", "value": "Microfone embutido + entrada para microfone externo"}, {"label": "Sinal de vídeo", "value": "AHD PAL/NTSC (compatível com CVBS)"}, {"label": "Saída de vídeo", "value": "Para monitor externo"}, {"label": "Armazenamento", "value": "Pen drive / HD USB"}, {"label": "Pen drive incluso", "value": "32GB"}, {"label": "Tempo de clipe", "value": "1 / 5 / 10 / 15 / 30 / 60 minutos"}, {"label": "Qualidade de vídeo", "value": "5 níveis ajustáveis"}, {"label": "Qualidade de foto", "value": "Alta / Média / Baixa"}, {"label": "Modo de gravação", "value": "Manual ou Automático"}, {"label": "Sobrescrita", "value": "ON / OFF"}, {"label": "Inserção de texto na tela", "value": "Via teclado sem fio (nome do cliente, local, data)"}, {"label": "Controles", "value": "Painel do DVR, controle remoto e teclado sem fio"}], "title": "Armazenamento e Gravação (DVR)", "icon_name": "Video"}, {"rows": [{"label": "Cabeça de câmera", "value": "1"}, {"label": "Carretel com cabo", "value": "1"}, {"label": "Unidade de controle DVR", "value": "1"}, {"label": "Cabo de vídeo (6 pinos)", "value": "1"}, {"label": "Cabo do contador de metragem (8 pinos)", "value": "1"}, {"label": "Centralizador da câmera (skid)", "value": "1"}, {"label": "Cabo de teste (1m)", "value": "1"}, {"label": "Pen drive USB 32GB", "value": "1"}, {"label": "Carregador bivolt", "value": "1"}, {"label": "Anéis de vedação", "value": "2"}, {"label": "Fone de ouvido", "value": "1"}, {"label": "Manual do usuário", "value": "1"}, {"label": "Bolsa de ferramentas", "value": "1"}], "title": "Conteúdo da Embalagem", "icon_name": "Package"}]'::jsonb;

commit;

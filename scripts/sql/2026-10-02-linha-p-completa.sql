-- Linha P completa (documento cadastro-linha-p-completo.md): BT-8100 a BT-8500.
-- Insere BT-8100 e o novo BT-8200 (pan tilt); atualiza BT-8300 (duas versões), BT-8400 e BT-8500;
-- desativa o BT-8200 antigo (visão dupla), que passa a ser a versão Compacta do BT-8300;
-- atualiza os textos da Linha P (o nome continua "Poços e Subaquático"). BT-8000 não é alterado.
begin;

-- BT-8100 (novo): camera-subaquatica-poco-reservatorio-bt-8100
insert into products (id, name, description, category, image_url, cable, probe, camera, ip, active, seo_title, seo_description, spec_labels, created_at)
values (
  'camera-subaquatica-poco-reservatorio-bt-8100',
  'Câmera Subaquática para Inspeção de Poço e Reservatório até 100m — BT-8100',
  'Câmera subaquática para inspeção de poço e reservatório com cabeça de 55 mm, vedação até 100 m e cabo de 50 a 200 m com contador de metragem.
Monitor IPS de 10" com para-sol, caixa DVR, teclado sem fio e gravação em USB. Opção de câmera de 29 mm para poços e tubos estreitos.',
  'Linha P - Poços e Subaquático', '/placeholder.svg',
  'Até 100 m (10 bar)', 'Ø 55 mm (opcional 29 mm)', '50 m a 200 m', 'IPS 10"', true,
  'Câmera Subaquática para Poço até 100m BT-8100 | Borotec',
  'Câmera subaquática BT-8100 para poços e reservatórios: cabeça de 55mm, vedação 100m, cabo até 200m e monitor de 10". Opção de câmera 29mm. Peça orçamento!',
  '{"probe": "Câmera", "cable": "Vedação", "camera": "Cabo", "ip": "Monitor"}'::jsonb,
  now() + interval '0 second'
)
on conflict (id) do nothing;

insert into product_details (product_id, specs_description, specs_left, specs_right, faqs)
values (
  'camera-subaquatica-poco-reservatorio-bt-8100',
  'O BT-8100 é a câmera subaquática da Borotec para inspeção de poços rasos, reservatórios, tanques e caixas d''água. A cabeça de 55 mm, vedada até 100 m de profundidade, mostra revestimento, obstruções e o fundo do poço com imagem nítida, e o contador digital informa a metragem exata de cada ponto. O monitor IPS de 10" com para-sol facilita a visualização ao ar livre, e o teclado sem fio permite anotar dados direto no vídeo, gravado em dispositivo USB. Para poços e tubulações estreitas, o BT-8100 pode receber como opcional uma câmera de 29 mm, com carretel de 30 a 50 m ou de 60 a 200 m.

### Qual modelo escolher

| Modelo | Vedação | Cabo | Câmera | Indicado para |
|---|---|---|---|---|
| BT-8100 | 100 m | 50 a 200 m | Ø 55 mm, frontal (opcional Ø 29 mm) | Poços rasos, reservatórios e tanques |
| [BT-8200](/linha-p/camera-inspecao-poco-artesiano-giro-bt-8200) | 100 m | 30 a 200 m | Ø 50 mm, pan tilt Full HD | Examinar as paredes com giro horizontal e vertical |
| [BT-8300](/linha-p/camera-inspecao-poco-profundo-bt-8300) | 300 m | 100 a 300 m | Ø 45 mm, frontal + lateral com giro 360° | Poços profundos até 300 m |
| [BT-8400](/linha-p/camera-inspecao-poco-guincho-eletrico-bt-8400) | 300 m | 100 a 200 m | Ø 45 mm, frontal + lateral com giro 360° | Muitas inspeções, com guincho elétrico |
| [BT-8500](/linha-p/camera-inspecao-poco-tubular-profundo-bt-8500) | 500 m | 200 a 500 m | Ø 45 mm, frontal + lateral com giro 360° | Poços tubulares profundos até 500 m |',
  '[{"title": "Câmera", "icon_name": "Camera", "rows": [{"label": "Tipo", "value": "AHD"}, {"label": "Diâmetro da cabeça", "value": "55 mm"}, {"label": "Vedação", "value": "À prova d''água até 100 m (10 bar)", "filter": true, "filter_value": "Até 100 m"}, {"label": "Câmera opcional", "value": "29 mm, com carretel de 30 a 50 m ou de 60 a 200 m"}]}, {"title": "Cabo e Carretel", "icon_name": "Wrench", "rows": [{"label": "Comprimento", "value": "50 m a 200 m", "filter": true}, {"label": "Diâmetro do cabo", "value": "6,5 mm"}, {"label": "Contador de metragem", "value": "Digital"}]}, {"title": "Alimentação", "icon_name": "Battery", "rows": [{"label": "Bateria", "value": "Íon-lítio, 8800 mAh"}]}]'::jsonb,
  '[{"title": "Monitor e Controle", "icon_name": "Monitor", "rows": [{"label": "Monitor", "value": "IPS HD de 10\" com para-sol"}, {"label": "Controle", "value": "Caixa DVR"}, {"label": "Teclado", "value": "Sem fio, para anotações no vídeo"}]}, {"title": "Gravação e Armazenamento", "icon_name": "Video", "rows": [{"label": "Armazenamento", "value": "Dispositivo USB"}]}]'::jsonb,
  '[{"question": "O BT-8100 serve para poços estreitos?", "answer": "Sim, com a câmera opcional de 29 mm, que passa em poços e tubos de menor diâmetro. Ela pode vir com carretel de 30 a 50 m ou de 60 a 200 m."}, {"question": "Até que profundidade o BT-8100 pode ser usado?", "answer": "A câmera é vedada até 100 m de profundidade (10 bar). Para colunas d''água maiores, veja o BT-8300 (300 m) e o BT-8500 (500 m)."}]'::jsonb
)
on conflict (product_id) do nothing;

-- BT-8200 (novo): camera-inspecao-poco-artesiano-giro-bt-8200
insert into products (id, name, description, category, image_url, cable, probe, camera, ip, active, seo_title, seo_description, spec_labels, created_at)
values (
  'camera-inspecao-poco-artesiano-giro-bt-8200',
  'Câmera para Inspeção de Poço Artesiano com Giro — BT-8200',
  'Câmera para inspeção de poço artesiano Full HD, com cabeça giratória (pan tilt) de 50 mm, foco manual e vedação até 100 m de profundidade.
Carretel de 30 a 200 m com contador de metragem, monitor IPS de 13" com para-sol, DVR com dois joysticks e gravação em USB.',
  'Linha P - Poços e Subaquático', '/placeholder.svg',
  'Ø 50 mm', 'Full HD pan tilt', 'Até 100 m (10 bar)', '30 m a 200 m', true,
  'Câmera para Poço Artesiano com Giro BT-8200 | Borotec',
  'Câmera para poço artesiano BT-8200 com giro pan tilt, Full HD e foco manual. Vedação 100m, carretel até 200m e monitor 13". Solicite orçamento!',
  '{"probe": "Câmera", "cable": "Cabeça", "camera": "Vedação", "ip": "Cabo"}'::jsonb,
  now() + interval '1 second'
)
on conflict (id) do nothing;

insert into product_details (product_id, specs_description, specs_left, specs_right, faqs)
values (
  'camera-inspecao-poco-artesiano-giro-bt-8200',
  'O BT-8200 é a câmera para inspeção de poço artesiano para quem precisa examinar as paredes do poço em detalhe. A cabeça Full HD de 50 mm gira nos eixos horizontal e vertical (pan tilt), controlada por joystick, para examinar revestimento, filtros e conexões sem retirar a câmera do local. Com foco manual e vedação até 100 m de profundidade, entrega imagens nítidas em ambientes submersos, também em reservatórios e tubulações de grande diâmetro. O contador digital mostra a metragem exata de cada defeito, e o teclado sem fio permite anotar informações direto no vídeo, o que agiliza a elaboração de laudos.

### Qual modelo escolher

| Modelo | Vedação | Cabo | Câmera | Indicado para |
|---|---|---|---|---|
| [BT-8100](/linha-p/camera-subaquatica-poco-reservatorio-bt-8100) | 100 m | 50 a 200 m | Ø 55 mm, frontal (opcional Ø 29 mm) | Poços rasos, reservatórios e tanques |
| BT-8200 | 100 m | 30 a 200 m | Ø 50 mm, pan tilt Full HD | Examinar as paredes com giro horizontal e vertical |
| [BT-8300](/linha-p/camera-inspecao-poco-profundo-bt-8300) | 300 m | 100 a 300 m | Ø 45 mm, frontal + lateral com giro 360° | Poços profundos até 300 m |
| [BT-8400](/linha-p/camera-inspecao-poco-guincho-eletrico-bt-8400) | 300 m | 100 a 200 m | Ø 45 mm, frontal + lateral com giro 360° | Muitas inspeções, com guincho elétrico |
| [BT-8500](/linha-p/camera-inspecao-poco-tubular-profundo-bt-8500) | 500 m | 200 a 500 m | Ø 45 mm, frontal + lateral com giro 360° | Poços tubulares profundos até 500 m |',
  '[{"title": "Câmera", "icon_name": "Camera", "rows": [{"label": "Resolução", "value": "Full HD"}, {"label": "Diâmetro da cabeça", "value": "50 mm"}, {"label": "Movimento", "value": "Pan tilt (giro horizontal e vertical)"}, {"label": "Foco", "value": "Manual"}, {"label": "Vedação", "value": "À prova d''água até 100 m (10 bar)", "filter": true, "filter_value": "Até 100 m"}]}, {"title": "Cabo e Carretel", "icon_name": "Wrench", "rows": [{"label": "Comprimento", "value": "30 m a 200 m", "filter": true}, {"label": "Diâmetro do cabo", "value": "5 mm (padrão)"}, {"label": "Carretel opcional 100 a 140 m", "value": "Cabo de 6,5 mm"}, {"label": "Carretel opcional 150 a 200 m", "value": "Cabo de 8 mm"}, {"label": "Contador de metragem", "value": "Digital"}]}, {"title": "Alimentação", "icon_name": "Battery", "rows": [{"label": "Bateria", "value": "Íon-lítio, 8800 mAh"}]}]'::jsonb,
  '[{"title": "Monitor e Controle", "icon_name": "Monitor", "rows": [{"label": "Monitor", "value": "IPS HD de 13\" com para-sol"}, {"label": "Controle", "value": "Caixa DVR com dois joysticks"}, {"label": "Teclado", "value": "Sem fio, para anotações no vídeo"}]}, {"title": "Gravação e Armazenamento", "icon_name": "Video", "rows": [{"label": "Armazenamento", "value": "Dispositivo USB"}]}]'::jsonb,
  '[{"question": "O que é a função pan tilt?", "answer": "É o giro da cabeça da câmera nos eixos horizontal e vertical, controlado por joystick. Assim o operador examina as paredes do poço sem retirar e reposicionar a câmera."}, {"question": "Até que profundidade o BT-8200 pode ser usado?", "answer": "A câmera é vedada até 100 m de profundidade (10 bar). O carretel pode ter até 200 m de cabo, conforme a configuração."}]'::jsonb
)
on conflict (product_id) do nothing;

-- BT-8300 (atualizado para duas versões; mesmo endereço)
update products set
  name = 'Câmera para Inspeção de Poço Profundo com Visão Dupla até 300m — BT-8300',
  description = 'Câmera para inspeção de poço profundo com visão dupla: câmera frontal e câmera lateral com giro de 360° e foco manual, vedação até 300 m.
Disponível em duas versões: monitor de 8" no carretel, com cabo de 100 a 200 m, ou monitor de 13" em maleta, com cabo de 200 a 300 m.',
  cable = 'Até 300 m (30 bar)', probe = 'Frontal + lateral 360°', camera = '100 m a 300 m', ip = '8" ou 13"',
  seo_title = 'Câmera para Poço Profundo até 300m BT-8300 | Borotec',
  seo_description = 'Câmera para poço profundo BT-8300: visão frontal e lateral com giro 360°, vedação 300m e cabo até 300m. Monitor de 8" ou 13". Peça orçamento!',
  spec_labels = '{"probe": "Câmera", "cable": "Vedação", "camera": "Cabo", "ip": "Monitor"}'::jsonb,
  active = true,
  updated_at = now()
where id = 'camera-inspecao-poco-profundo-bt-8300';

update product_details set
  specs_description = 'O BT-8300 é a câmera para inspeção de poço profundo, com cabeça vedada até 300 m de profundidade. A cabeça de 45 mm combina uma câmera frontal, que mostra o caminho e o fundo do poço, com uma câmera lateral de giro 360° e foco manual, que examina revestimento, filtros e juntas em toda a volta. O BT-8300 vem em duas versões: a compacta, com monitor de 8" montado no próprio carretel e cabo de 100 a 200 m, e a versão com monitor de 13" em maleta e cabo de 200 a 300 m, para poços mais profundos. Nas duas, o contador digital mostra a profundidade exata de cada ponto, e o teclado sem fio permite anotar dados no vídeo durante a inspeção.

### Versões do BT-8300

| | BT-8300 Compacta | BT-8300 13" |
|---|---|---|
| Monitor | IPS HD de 8" com para-sol, montado no carretel | IPS HD de 13" com para-sol, em maleta |
| Cabo | 100 m a 200 m | 200 m a 300 m |
| Bateria | Íon-lítio, 10500 mAh | Íon-lítio, 8800 mAh |
| Indicada para | Poços até 200 m, transporte mais simples | Poços de 200 a 300 m, análise em tela maior |

### Qual modelo escolher

| Modelo | Vedação | Cabo | Câmera | Indicado para |
|---|---|---|---|---|
| [BT-8100](/linha-p/camera-subaquatica-poco-reservatorio-bt-8100) | 100 m | 50 a 200 m | Ø 55 mm, frontal (opcional Ø 29 mm) | Poços rasos, reservatórios e tanques |
| [BT-8200](/linha-p/camera-inspecao-poco-artesiano-giro-bt-8200) | 100 m | 30 a 200 m | Ø 50 mm, pan tilt Full HD | Examinar as paredes com giro horizontal e vertical |
| BT-8300 | 300 m | 100 a 300 m | Ø 45 mm, frontal + lateral com giro 360° | Poços profundos até 300 m |
| [BT-8400](/linha-p/camera-inspecao-poco-guincho-eletrico-bt-8400) | 300 m | 100 a 200 m | Ø 45 mm, frontal + lateral com giro 360° | Muitas inspeções, com guincho elétrico |
| [BT-8500](/linha-p/camera-inspecao-poco-tubular-profundo-bt-8500) | 500 m | 200 a 500 m | Ø 45 mm, frontal + lateral com giro 360° | Poços tubulares profundos até 500 m |',
  specs_left = '[{"title": "Câmera", "icon_name": "Camera", "rows": [{"label": "Tipo", "value": "AHD com visão dupla (frontal e lateral)"}, {"label": "Diâmetro da cabeça", "value": "45 mm"}, {"label": "Giro", "value": "360° (câmera lateral)"}, {"label": "Foco", "value": "Manual (câmera lateral)"}, {"label": "Vedação", "value": "À prova d''água até 300 m (30 bar)", "filter": true, "filter_value": "Até 300 m"}]}, {"title": "Cabo e Carretel", "icon_name": "Wrench", "rows": [{"label": "Comprimento", "value": "100 m a 200 m (Compacta) / 200 m a 300 m (13\")", "filter": true, "filter_value": "100 m a 300 m"}, {"label": "Diâmetro do cabo", "value": "8 mm"}, {"label": "Contador de metragem", "value": "Digital"}]}, {"title": "Alimentação", "icon_name": "Battery", "rows": [{"label": "Bateria", "value": "10500 mAh (Compacta) / 8800 mAh (13\")"}]}]'::jsonb,
  specs_right = '[{"title": "Monitor e Controle", "icon_name": "Monitor", "rows": [{"label": "Monitor", "value": "8\" no carretel (Compacta) / 13\" em maleta (13\")"}, {"label": "Controle", "value": "Caixa DVR"}, {"label": "Teclado", "value": "Sem fio, para anotações no vídeo"}]}, {"title": "Gravação e Armazenamento", "icon_name": "Video", "rows": [{"label": "Armazenamento", "value": "Dispositivo USB"}]}]'::jsonb,
  faqs = '[{"question": "Qual a diferença entre as duas versões do BT-8300?", "answer": "A câmera é a mesma. A versão Compacta tem monitor de 8\" no carretel e cabo de 100 a 200 m. A versão 13\" tem monitor maior, em maleta, e cabo de 200 a 300 m, para poços mais profundos."}, {"question": "Qual a vantagem da visão dupla?", "answer": "A câmera frontal mostra obstruções e o fundo do poço, e a lateral gira 360° para examinar paredes, filtros e juntas. Com as duas, a inspeção completa é feita em uma única descida."}]'::jsonb
where product_id = 'camera-inspecao-poco-profundo-bt-8300';

-- BT-8400: introdução com a tabela de modelos e FAQ revisado (acessórios e specs não mudam)
update product_details set
  specs_description = 'O BT-8400 é a câmera para inspeção de poço com guincho elétrico, indicada para empresas que fazem muitas inspeções e querem mais produtividade e menos esforço da equipe. O guincho motorizado desce e recolhe o cabo de forma controlada, alimentado em AC 110 a 230 V ou DC 24 V, o que permite trabalhar tanto na tomada quanto na bateria do veículo. A cabeça de 45 mm tem câmera frontal e câmera lateral com giro de 360° e foco manual, vedada até 300 m. O monitor de 13" com para-sol e a caixa DVR com dois joysticks dão controle total da inspeção, e o teclado sem fio permite anotar dados direto no vídeo. Como opcional, o BT-8400 pode receber a câmera pan tilt de 50 mm.

### Qual modelo escolher

| Modelo | Vedação | Cabo | Câmera | Indicado para |
|---|---|---|---|---|
| [BT-8100](/linha-p/camera-subaquatica-poco-reservatorio-bt-8100) | 100 m | 50 a 200 m | Ø 55 mm, frontal (opcional Ø 29 mm) | Poços rasos, reservatórios e tanques |
| [BT-8200](/linha-p/camera-inspecao-poco-artesiano-giro-bt-8200) | 100 m | 30 a 200 m | Ø 50 mm, pan tilt Full HD | Examinar as paredes com giro horizontal e vertical |
| [BT-8300](/linha-p/camera-inspecao-poco-profundo-bt-8300) | 300 m | 100 a 300 m | Ø 45 mm, frontal + lateral com giro 360° | Poços profundos até 300 m |
| BT-8400 | 300 m | 100 a 200 m | Ø 45 mm, frontal + lateral com giro 360° | Muitas inspeções, com guincho elétrico |
| [BT-8500](/linha-p/camera-inspecao-poco-tubular-profundo-bt-8500) | 500 m | 200 a 500 m | Ø 45 mm, frontal + lateral com giro 360° | Poços tubulares profundos até 500 m |',
  faqs = '[{"question": "Por que escolher uma câmera com guincho elétrico?", "answer": "Em poços profundos, descer e subir centenas de metros de cabo na manivela cansa a equipe e alonga a inspeção. O guincho elétrico faz esse trabalho com controle, o que aumenta a produtividade de quem faz várias inspeções por semana."}, {"question": "Posso usar o BT-8400 em campo, longe da tomada?", "answer": "Sim. O guincho funciona em AC 110 a 230 V ou em DC 24 V."}]'::jsonb
where product_id = 'camera-inspecao-poco-guincho-eletrico-bt-8400';

-- BT-8500: introdução com a tabela de modelos e FAQ revisado (specs não mudam)
update product_details set
  specs_description = 'O BT-8500 é o modelo topo da Linha P, desenvolvido para inspeção de poços tubulares profundos de até 500 m. O guincho motorizado com enrolamento automático organiza o cabo na descida e na subida, o que dá segurança e velocidade em grandes profundidades. A cabeça de 45 mm, vedada até 500 m, tem câmera frontal e câmera lateral com giro de 360° e foco manual. A bússola mostra a orientação da câmera, e o sensor de temperatura registra as condições do poço durante a inspeção, dados úteis para hidrogeólogos e laudos técnicos. Com Wi-Fi, monitor de 13" com para-sol e teclado sem fio para anotações no vídeo, é a solução para saneamento, mineração e empresas de perfuração de poços profundos.

### Qual modelo escolher

| Modelo | Vedação | Cabo | Câmera | Indicado para |
|---|---|---|---|---|
| [BT-8100](/linha-p/camera-subaquatica-poco-reservatorio-bt-8100) | 100 m | 50 a 200 m | Ø 55 mm, frontal (opcional Ø 29 mm) | Poços rasos, reservatórios e tanques |
| [BT-8200](/linha-p/camera-inspecao-poco-artesiano-giro-bt-8200) | 100 m | 30 a 200 m | Ø 50 mm, pan tilt Full HD | Examinar as paredes com giro horizontal e vertical |
| [BT-8300](/linha-p/camera-inspecao-poco-profundo-bt-8300) | 300 m | 100 a 300 m | Ø 45 mm, frontal + lateral com giro 360° | Poços profundos até 300 m |
| [BT-8400](/linha-p/camera-inspecao-poco-guincho-eletrico-bt-8400) | 300 m | 100 a 200 m | Ø 45 mm, frontal + lateral com giro 360° | Muitas inspeções, com guincho elétrico |
| BT-8500 | 500 m | 200 a 500 m | Ø 45 mm, frontal + lateral com giro 360° | Poços tubulares profundos até 500 m |',
  faqs = '[{"question": "Até que profundidade o BT-8500 inspeciona?", "answer": "O cabo pode ter de 200 a 500 m, e a cabeça da câmera é vedada até 500 m de profundidade (50 bar)."}, {"question": "Para que servem a bússola e o sensor de temperatura?", "answer": "A bússola mostra a orientação da câmera lateral, o que ajuda a localizar a posição de trincas e entradas de água. O sensor de temperatura registra a condição do poço ao longo da descida, informação útil para laudos e estudos hidrogeológicos."}]'::jsonb
where product_id = 'camera-inspecao-poco-tubular-profundo-bt-8500';

-- BT-8200 antigo (visão dupla, monitor 8"): agora é a versão Compacta do BT-8300
update products set active = false, updated_at = now() where id = 'camera-inspecao-poco-artesiano-visao-dupla-bt-8200';

-- Textos da Linha P (nome e categoria não mudam)
update product_lines set
  seo_title = 'Câmera para Inspeção de Poço Artesiano e Profundo | Borotec',
  seo_description = 'Câmeras para inspeção de poço artesiano e tubular profundo de 100 a 500m. Visão frontal e lateral, giro 360° e gravação em vídeo. Solicite orçamento!',
  card_description = 'Câmeras para inspeção de poços artesianos e tubulares profundos, de 100 a 500 m, com visão frontal e lateral, giro 360° e gravação em vídeo.',
  menu_description = 'Ideal para poços artesianos, poços profundos, reservatórios e inspeções subaquáticas.',
  hero_description = 'Câmeras para inspeção de poço artesiano, poço tubular profundo e reservatórios, com vedação de 100 a 500 m de profundidade. A Linha P da Borotec reúne cinco modelos, do BT-8100, para poços rasos e reservatórios, ao BT-8500, para poços de até 500 m com guincho motorizado. Com elas, você vê revestimento, filtros, juntas e obstruções e localiza cada problema pela profundidade exata, mostrada no contador de metragem. Os modelos têm câmera frontal ou visão dupla com giro de 360°, monitor com para-sol e gravação em vídeo com anotações para laudos técnicos.',
  updated_at = now()
where id = 'linha-p';

commit;

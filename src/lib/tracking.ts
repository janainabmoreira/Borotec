// Evento form_submit no dataLayer — chamar SÓ depois do envio confirmado.
//
// `legacyEvent` (Formulario_contato, Formulario_orcamento_produto) é o nome
// antigo, disparado junto enquanto algum acionador do GTM (provavelmente o do
// generate_lead) depender dele. Remover quando o GTM tiver migrado para
// form_submit.
export function pushFormSubmit(formName: string, legacyEvent?: string) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: 'form_submit', form_name: formName, page_path: window.location.pathname });
  if (legacyEvent) window.dataLayer.push({ event: legacyEvent });
}

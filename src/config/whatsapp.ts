export const WHATSAPP_NUMBER = '5511932876195';

export const WHATSAPP_MESSAGES = {
  default: 'Olá! Vim pelo site e gostaria de mais informações.',
  hero: 'Olá! Gostaria de mais informações sobre os produtos da BOROTEC.',
  cta: 'Olá! Gostaria de solicitar um orçamento para equipamentos BOROTEC.',
  contact: 'Olá, BOROTEC Industrial! Gostaria de mais informações sobre seus produtos.',
};

export const getWhatsAppUrl = (message = WHATSAPP_MESSAGES.default) =>
  `whatsapp://send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}`;

export const getWhatsAppProductUrl = (productName: string) =>
  `whatsapp://send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(
    `Olá, BOROTEC Industrial! Gostaria de solicitar informações sobre o produto: ${productName}.`
  )}`;

export const getWhatsAppCartUrl = (itemNames: string) =>
  `whatsapp://send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(
    `Olá, BOROTEC Industrial! Gostaria de solicitar um orçamento para os seguintes itens: ${itemNames}.`
  )}`;

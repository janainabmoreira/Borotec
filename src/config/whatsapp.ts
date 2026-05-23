export const WHATSAPP_NUMBER = '5511932876195';

export const WHATSAPP_MESSAGES = {
  default: 'Olá! Vim pelo site e gostaria de mais informações.',
  hero: 'Olá! Gostaria de mais informações sobre os produtos da BOROTEC.',
  cta: 'Olá! Gostaria de solicitar um orçamento para equipamentos BOROTEC.',
  contact: 'Olá, BOROTEC Industrial! Gostaria de mais informações sobre seus produtos.',
};

export const getWhatsAppUrl = (_message?: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}`;

export const getWhatsAppProductUrl = (_productName: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}`;

export const getWhatsAppCartUrl = (_itemNames: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}`;

import whatsappIcon from '@/assets/whatsapp-icon.png';

const WHATSAPP_NUMBER = '5511932876195';
const WHATSAPP_MESSAGE = 'Olá! Gostaria de mais informações sobre os produtos da BOROTEC.';

const WhatsAppFloatingButton = () => {
  const handleClick = () => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
    
    // Google Ads - Conversão WhatsApp (dispara antes de abrir)
    if (typeof (window as any).gtag_report_whatsapp === 'function') {
      (window as any).gtag_report_whatsapp(url);
    } else {
      window.open(url, '_blank');
    }
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 w-16 h-16 md:w-20 md:h-20 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-whatsapp-pulse"
      aria-label="Falar no WhatsApp"
    >
      <img 
        src={whatsappIcon} 
        alt="WhatsApp" 
        className="w-full h-full object-contain"
      />
    </button>
  );
};

export default WhatsAppFloatingButton;

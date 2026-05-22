import whatsappIcon from '@/assets/whatsapp-icon.webp';

const WhatsAppFloatingButton = () => {
  const handleClick = () => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'Botao_Whatsapp_flutuante' });
  };

  return (
    <button
      onClick={handleClick}
      className="whatsapp-btn whatsapp-flutuante fixed bottom-5 right-5 z-50 w-14 h-14 md:w-16 md:h-16 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-whatsapp-pulse focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
      aria-label="Falar no WhatsApp"
      title="Falar no WhatsApp"
    >
      <img
        src={whatsappIcon}
        alt="WhatsApp"
        className="w-full h-full object-contain"
        loading="lazy"
      />
    </button>
  );
};

export default WhatsAppFloatingButton;

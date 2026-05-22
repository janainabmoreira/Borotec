import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { X, MessageCircle, Trash2 } from 'lucide-react';
import { useQuoteCart } from '@/contexts/QuoteCartContext';
import { getWhatsAppCartUrl } from '@/config/whatsapp';

interface QuoteCartSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const QuoteCartSheet = ({ open, onOpenChange }: QuoteCartSheetProps) => {
  const { items, removeItem, clearCart } = useQuoteCart();

  const handleWhatsAppQuote = () => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'Botao_whatsapp_carrinho' });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md bg-card">
        <SheetHeader>
          <SheetTitle className="font-heading text-xl text-foreground">
            Carrinho de Orçamento
          </SheetTitle>
        </SheetHeader>

        <div className="mt-8 flex flex-col h-[calc(100vh-200px)]">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
                <MessageCircle className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                Seu carrinho está vazio
              </h3>
              <p className="font-body text-sm text-muted-foreground">
                Adicione produtos para solicitar um orçamento via WhatsApp.
              </p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 bg-secondary rounded-lg"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md bg-muted"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-heading font-semibold text-sm text-foreground truncate">
                        {item.name}
                      </h4>
                      <p className="font-body text-xs text-muted-foreground mt-1">
                        {item.category}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-border space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-body text-sm text-muted-foreground">
                    {items.length} {items.length === 1 ? 'item' : 'itens'} selecionados
                  </span>
                  <button
                    onClick={clearCart}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Limpar
                  </button>
                </div>

                <Button variant="whatsapp" size="lg" asChild>
                  <a
                    href={getWhatsAppCartUrl(items.map(i => i.name).join(', '))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full whatsapp-btn whatsapp-carrinho"
                    onClick={handleWhatsAppQuote}
                    aria-label="Solicitar cotação via WhatsApp"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Solicitar Cotação via WhatsApp
                  </a>
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default QuoteCartSheet;

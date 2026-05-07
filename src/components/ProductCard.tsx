import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus, Check, Eye } from 'lucide-react';
import { Product, useQuoteCart } from '@/contexts/QuoteCartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem, removeItem, isInCart } = useQuoteCart();
  const inCart = isInCart(product.id);

  const handleToggleCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inCart) {
      removeItem(product.id);
    } else {
      addItem(product);
    }
  };

  return (
    <div className="group relative bg-card rounded-xl overflow-hidden shadow-card card-hover border border-border">
      {/* Image container */}
      <Link to={`/produtos/${product.id}`}>
        <div className="aspect-[4/3] overflow-hidden bg-secondary relative">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          {/* Overlay on hover - hidden on mobile */}
          <div className="absolute inset-0 bg-charcoal/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex items-center justify-center">
            <div className="w-14 h-14 bg-cyan/20 rounded-full flex items-center justify-center border border-cyan/50">
              <Eye className="w-6 h-6 text-cyan" />
            </div>
          </div>
        </div>
      </Link>
      
      <div className="p-4">
        <span className="inline-block px-2 py-0.5 bg-cyan/10 text-cyan font-body text-[10px] md:text-xs font-medium rounded-full mb-2 border border-cyan/20 truncate max-w-full">
          {product.category}
        </span>
        
        <Link to={`/produtos/${product.id}`}>
          <h3 className="font-heading font-bold text-sm md:text-base text-foreground mb-2 line-clamp-2 group-hover:text-accent transition-colors min-h-[2.5rem]">
            {product.name}
          </h3>
        </Link>
        
        <p className="font-body text-xs text-foreground/60 line-clamp-2 mb-3 hidden sm:block">
          {product.description}
        </p>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1 text-xs h-8" asChild>
            <Link to={`/produtos/${product.id}`}>
              Ver Detalhes
            </Link>
          </Button>
          
          <Button
            variant={inCart ? "secondary" : "cta"}
            size="sm"
            onClick={handleToggleCart}
            className="px-3 h-8"
          >
            {inCart ? (
              <Check className="w-4 h-4" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Cart indicator */}
      {inCart && (
        <div className="absolute top-2 right-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center shadow-lg">
          <Check className="w-3 h-3 text-accent-foreground" />
        </div>
      )}
    </div>
  );
};

export default ProductCard;

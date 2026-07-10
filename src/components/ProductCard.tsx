import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import type { Product } from '@/data/products';
import { getProductPath } from '@/lib/productLines';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const productPath = getProductPath(product.category, product.id);
  return (
    <div className="group relative bg-card rounded-xl overflow-hidden shadow-card card-hover border border-border">
      <Link to={productPath}>
        <div className="aspect-square sm:aspect-[4/3] overflow-hidden bg-secondary relative">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
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

        <Link to={productPath}>
          <h3 className="font-heading font-bold text-sm md:text-base text-foreground mb-2 line-clamp-2 group-hover:text-accent transition-colors min-h-[2.5rem]">
            {product.name}
          </h3>
        </Link>

        <p className="font-body text-xs text-foreground/60 line-clamp-2 mb-3 hidden sm:block">
          {product.description}
        </p>

        <Button variant="cta" size="sm" className="w-full text-xs h-8" asChild>
          <Link to={productPath}>
            Ver Detalhes
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;

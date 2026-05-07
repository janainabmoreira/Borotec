import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { products } from '@/data/products';
import { useQuoteCart } from '@/contexts/QuoteCartContext';
import { ArrowLeft, Plus, Check, MessageCircle, FileText, ChevronRight } from 'lucide-react';

import productEndoscope from '@/assets/product-endoscope.jpg';
import productVideoscope from '@/assets/product-videoscope.jpg';
import productLightSource from '@/assets/product-light-source.jpg';

const getProductImage = (productId: string) => {
  if (productId.includes('robo') || productId.includes('robot')) {
    return productVideoscope;
  }
  if (productId.includes('tubulacao') || productId.includes('tube') || productId.includes('push')) {
    return productEndoscope;
  }
  return productLightSource;
};

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addItem, removeItem, isInCart } = useQuoteCart();
  
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-2xl font-bold text-primary-foreground mb-4">Produto não encontrado</h1>
          <Button variant="cta" asChild>
            <Link to="/produtos">Voltar aos Produtos</Link>
          </Button>
        </div>
      </div>
    );
  }

  const inCart = isInCart(product.id);
  const productImage = product.image || getProductImage(product.id);

  const handleToggleCart = () => {
    if (inCart) {
      removeItem(product.id);
    } else {
      addItem({ ...product, image: productImage });
    }
  };

  const handleWhatsAppDirect = () => {
    const message = encodeURIComponent(
      `Olá, BOROTEC Industrial! Gostaria de solicitar informações sobre o produto: ${product.name}.`
    );
    const whatsappNumber = '5511932876195';
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-charcoal">
      <Header />
      
      <main className="pt-20">
        {/* Breadcrumb */}
        <div className="bg-charcoal border-b border-primary-foreground/10">
          <div className="container-wide mx-auto px-4 md:px-8 py-4">
            <nav className="flex items-center gap-2 text-sm text-primary-foreground/50">
              <Link to="/" className="hover:text-cyan transition-colors">Início</Link>
              <ChevronRight className="w-4 h-4" />
              <Link to="/produtos" className="hover:text-cyan transition-colors">Produtos</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-cyan font-medium truncate">{product.name}</span>
            </nav>
          </div>
        </div>

        {/* Product Details */}
        <section className="section-padding relative overflow-hidden">
          {/* Background elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

          <div className="relative container-wide mx-auto">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-primary-foreground/50 hover:text-cyan transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-body text-sm">Voltar</span>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Product Images */}
              <div className="space-y-4">
                <div className="aspect-square bg-navy-dark/50 rounded-2xl overflow-hidden border border-primary-foreground/10">
                  <img
                    src={productImage}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="grid grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="aspect-square bg-navy-dark/50 rounded-lg overflow-hidden border-2 border-transparent hover:border-cyan transition-colors cursor-pointer">
                      <img
                        src={productImage}
                        alt={`${product.name} - Imagem ${i}`}
                        className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div>
                <span className="inline-block px-3 py-1 bg-cyan/10 text-cyan font-heading font-semibold text-sm rounded-full mb-4 border border-cyan/20">
                  {product.category}
                </span>
                
                <h1 className="font-heading text-3xl md:text-4xl font-black text-primary-foreground mb-6">
                  {product.name}
                </h1>
                
                <p className="font-body text-lg text-primary-foreground/60 leading-relaxed mb-8">
                  {product.description}
                </p>

                {/* Specs Table */}
                {product.specs && (
                  <div className="mb-8">
                    <h3 className="font-heading font-bold text-lg text-primary-foreground mb-4">
                      Especificações Técnicas
                    </h3>
                    <div className="bg-navy-dark/50 rounded-xl overflow-hidden border border-primary-foreground/10">
                      <table className="w-full">
                        <tbody>
                          {Object.entries(product.specs).map(([key, value], index) => (
                            <tr key={key} className={index % 2 === 0 ? 'bg-primary-foreground/5' : ''}>
                              <td className="px-6 py-4 font-body font-medium text-primary-foreground">
                                {key}
                              </td>
                              <td className="px-6 py-4 font-body text-primary-foreground/60">
                                {value}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Documents */}
                <div className="mb-8 p-4 bg-navy-dark/50 rounded-xl flex items-center gap-4 border border-primary-foreground/10">
                  <div className="w-12 h-12 bg-cyan/10 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-cyan" />
                  </div>
                  <div>
                    <p className="font-heading font-medium text-primary-foreground">Manual do Produto</p>
                    <p className="font-body text-sm text-primary-foreground/50">Disponível mediante solicitação</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-4">
                  <Button
                    variant={inCart ? "secondary" : "cta"}
                    size="xl"
                    className="w-full"
                    onClick={handleToggleCart}
                  >
                    {inCart ? (
                      <>
                        <Check className="w-5 h-5 mr-2" />
                        Adicionado ao Orçamento
                      </>
                    ) : (
                      <>
                        <Plus className="w-5 h-5 mr-2" />
                        Adicionar ao Orçamento
                      </>
                    )}
                  </Button>
                  
                  <Button
                    variant="heroOutline"
                    size="lg"
                    className="w-full"
                    onClick={handleWhatsAppDirect}
                    aria-label="Solicitar WhatsApp Produto"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Solicitar Informações via WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;

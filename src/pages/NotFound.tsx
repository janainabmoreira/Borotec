import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>Página não encontrada | BOROTEC Industrial</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <div className="min-h-screen bg-charcoal flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <p className="text-8xl font-heading font-black text-cyan mb-4">404</p>
            <h1 className="text-2xl font-heading font-bold text-primary-foreground mb-3">
              Página não encontrada
            </h1>
            <p className="text-primary-foreground/60 font-body mb-8">
              O endereço <span className="text-cyan font-medium">{location.pathname}</span> não existe ou foi removido.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-cyan text-charcoal font-semibold rounded-xl hover:bg-cyan/90 transition-colors text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar ao início
              </Link>
              <Link
                to="/produtos"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-primary-foreground/10 text-primary-foreground border border-primary-foreground/20 rounded-xl hover:bg-primary-foreground/20 transition-colors text-sm"
              >
                <Search className="w-4 h-4" />
                Ver produtos
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default NotFound;

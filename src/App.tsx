import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { useGclidCapture } from "@/hooks/useGclidCapture";
import { usePageView } from "@/hooks/usePageView";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import Index from "./pages/Index";
import ProductDetail from "./pages/ProductDetail";
import Categories from "./pages/Categories";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";
import AdminProductForm from "./pages/AdminProductForm";
import AdminBlogForm from "./pages/AdminBlogForm";
import LineTubulacoes from "./pages/LineTubulacoes";
import LineRobo from "./pages/LineRobo";
import LineMaquinas from "./pages/LineMaquinas";
import LineEspeciais from "./pages/LineEspeciais";
import LinePocos from "./pages/LinePocos";
import LineTelescopia from "./pages/LineTelescopia";
import { supabase } from "@/lib/supabase";

const queryClient = new QueryClient();

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

const GTMRouteTracker = () => {
  const location = useLocation();
  useGclidCapture();
  usePageView();

  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "virtualPageView",
      page: location.pathname + location.search,
    });
  }, [location]);

  if (location.pathname.startsWith('/admin')) return null;

  return <WhatsAppFloatingButton />;
};

type AuthStatus = 'loading' | 'auth' | 'unauth';

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const [status, setStatus] = useState<AuthStatus>('loading');

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setStatus(data.session ? 'auth' : 'unauth');
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setStatus(session ? 'auth' : 'unauth');
    });
    return () => subscription.unsubscribe();
  }, []);

  if (status === 'loading') return null;
  if (status === 'unauth') return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <GTMRouteTracker />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/boroscopios" element={<Categories />} />
            <Route path="/categorias" element={<Navigate to="/boroscopios" replace />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:postId" element={<BlogPost />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/contato" element={<Contact />} />
            <Route path="/privacidade" element={<PrivacyPolicy />} />
            <Route path="/busca" element={<Search />} />

            {/* Linhas de produtos */}
            <Route path="/linha-t" element={<LineTubulacoes />} />
            <Route path="/linha-t/:productId" element={<ProductDetail />} />
            <Route path="/tubulacoes" element={<Navigate to="/linha-t" replace />} />
            <Route path="/tubulacoes/:productId" element={<ProductDetail />} />
            <Route path="/linha-r" element={<LineRobo />} />
            <Route path="/linha-r/:productId" element={<ProductDetail />} />
            <Route path="/linha-m" element={<LineMaquinas />} />
            <Route path="/linha-m/:productId" element={<ProductDetail />} />
            <Route path="/linha-e" element={<LineEspeciais />} />
            <Route path="/linha-e/:productId" element={<ProductDetail />} />
            <Route path="/linha-p" element={<LinePocos />} />
            <Route path="/linha-p/:productId" element={<ProductDetail />} />
            <Route path="/linha-tc" element={<LineTelescopia />} />
            <Route path="/linha-tc/:productId" element={<ProductDetail />} />

            {/* Produto genérico */}
            <Route path="/produtos/:productId" element={<ProductDetail />} />

            {/* Admin */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/produtos/novo" element={<RequireAuth><AdminProductForm /></RequireAuth>} />
            <Route path="/admin/produtos/:productId/editar" element={<RequireAuth><AdminProductForm /></RequireAuth>} />
            <Route path="/admin/blog/novo" element={<RequireAuth><AdminBlogForm /></RequireAuth>} />
            <Route path="/admin/blog/:postId/editar" element={<RequireAuth><AdminBlogForm /></RequireAuth>} />
            <Route path="/admin" element={<RequireAuth><Admin /></RequireAuth>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;

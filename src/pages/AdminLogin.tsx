import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Loader2, LogIn, Eye, EyeOff } from 'lucide-react';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setError('E-mail ou senha incorretos.');
      setLoading(false);
      return;
    }

    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <span className="font-heading text-2xl font-black text-primary-foreground">
            BORO<span className="text-accent">TEC</span>
          </span>
          <p className="text-primary-foreground/50 text-sm mt-1">Painel Administrativo</p>
        </div>

        <div className="bg-navy-dark/60 border border-primary-foreground/10 rounded-2xl p-8">
          <h1 className="font-heading text-xl font-bold text-primary-foreground mb-6">
            Entrar
          </h1>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-primary-foreground/70 mb-1.5">
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@borotec.com.br"
                className="w-full h-11 px-3 rounded-lg bg-charcoal border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/30 text-sm focus:outline-none focus:border-cyan transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-foreground/70 mb-1.5">
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full h-11 px-3 pr-10 rounded-lg bg-charcoal border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/30 text-sm focus:outline-none focus:border-cyan transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-foreground/40 hover:text-primary-foreground"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white font-semibold rounded-lg text-sm transition-colors disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogIn className="w-4 h-4" />}
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

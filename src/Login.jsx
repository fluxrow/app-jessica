import React, { useState } from 'react';
import { Activity, Mail, Lock, LogIn, Chrome, ArrowRight, Loader2, Dumbbell } from 'lucide-react';
import { supabase } from './supabase';

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Função para fazer login (Mock ou Real)
  const handleLogin = async (e, provider = 'email') => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const hasRealKeys = supabase.supabaseUrl !== 'https://dummy.supabase.co';
      
      if (hasRealKeys) {
        // Supabase Real
        if (provider === 'google') {
          const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: { redirectTo: window.location.origin }
          });
          if (error) throw error;
        } else {
          const { error } = await supabase.auth.signInWithPassword({ email, password });
          if (error) throw error;
          onLoginSuccess();
        }
      } else {
        // Mock Login (Simula entrada quando não tem chaves do Supabase ainda)
        setTimeout(() => {
          onLoginSuccess();
        }, 1000);
      }
    } catch (err) {
      setError("Erro ao entrar. Verifica as tuas credenciais.");
      console.error(err);
    } finally {
      const hasRealKeys = supabase.supabaseUrl !== 'https://dummy.supabase.co';
      if (hasRealKeys) {
         setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-center items-center p-6 relative overflow-hidden">
      
      {/* Background Decorativo */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-50 animate-blob"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-rose-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-50 animate-blob animation-delay-2000"></div>

      <div className="w-full max-w-sm relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        {/* Logo / Ícone */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-tr from-rose-500 to-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-indigo-500/30 mb-6 transform -rotate-6 hover:rotate-0 transition-transform duration-300">
            <Dumbbell size={40} className="text-white" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-center">Treino da Jess</h1>
          <p className="text-slate-400 mt-2 font-medium">A tua evolução num só lugar.</p>
        </div>

        {/* Formulário */}
        <div className="bg-slate-800/50 backdrop-blur-xl p-8 rounded-[2rem] border border-slate-700 shadow-2xl">
          
          <button 
            onClick={(e) => handleLogin(e, 'google')}
            disabled={loading}
            className="w-full bg-white hover:bg-slate-100 text-slate-800 font-bold py-3.5 px-4 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 mb-6"
          >
            <Chrome size={20} className="text-rose-500" />
            Continuar com Google
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1 bg-slate-700"></div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">ou entra com email</span>
            <div className="h-px flex-1 bg-slate-700"></div>
          </div>

          <form onSubmit={(e) => handleLogin(e, 'email')} className="space-y-4">
            <div>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input 
                  type="email" 
                  required
                  placeholder="O teu email..." 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-700 text-white placeholder-slate-500 rounded-xl pl-11 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
            
            <div>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input 
                  type="password" 
                  required
                  placeholder="Palavra-passe..." 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-700 text-white placeholder-slate-500 rounded-xl pl-11 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {error && <p className="text-rose-400 text-xs font-bold text-center mt-2">{error}</p>}

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl mt-6 flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all active:scale-95 disabled:opacity-70"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : (
                <>
                  Entrar <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

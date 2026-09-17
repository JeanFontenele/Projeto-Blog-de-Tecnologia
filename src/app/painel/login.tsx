//FORMULÁRIO DE LOGIN PARA PAINEL
'use server';

import { validarLogin } from '@/lib/conexaoMongoDB/validarLogin';
import Link from 'next/link';
import { Montserrat } from "next/font/google";

const MontserratFont = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});




export async function Login() {
  return (
    <div className="w-full max-w-md p-4">
      <form action={validarLogin} className="w-full bg-cyber-surface border border-cyber-border p-6 rounded shadow-lg space-y-4">
        <h2 className="text-xl font-bold text-cyber-text-main border-l-4 border-cyber-cyan pl-3">Acesso ao Painel</h2>

        <div>
          <label className="block text-sm font-semibold mb-1 text-cyber-text-muted">Usuário</label>
          <input
            type="text"
            name="username"
            required
            className="w-full p-2 bg-cyber-bg border border-cyber-border rounded text-cyber-surface focus:border-cyber-cyan focus:outline-none transition-colors"
            placeholder="Digite seu usuário"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1 text-cyber-text-muted">Senha</label>
          <input
            type="password"
            name="password"
            required
            className="w-full p-2 bg-cyber-bg border border-cyber-border rounded text-cyber-surface focus:border-cyber-cyan focus:outline-none transition-colors"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-cyber-cyan text-black font-bold py-2 rounded hover:bg-cyber-cyan-hover transition-colors cursor-pointer"
        >
          Entrar
        </button>

        <p className="mt-4 text-sm text-center text-cyber-text-muted">
          Não tem conta?{' '}
          <Link href="/painel?view=cadastrar" className="text-cyber-cyan font-semibold hover:underline">
            Cadastrar-se
          </Link>
        </p>
      </form>
    </div>
  );
}
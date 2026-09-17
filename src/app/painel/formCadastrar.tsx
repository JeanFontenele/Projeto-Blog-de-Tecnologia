//PAGINA DE CADASTRO DE NOVO USUÁRIO
import Link from 'next/link';
import { cadastrarUsuario } from '@/lib/conexaoMongoDB/validarLogin';

export async function FormCadastrar() {
  return (
    <div className="w-full max-w-md p-4">
      <form action={cadastrarUsuario} className="w-full bg-cyber-surface border border-cyber-border p-6 rounded shadow-lg space-y-4">
        <h2 className="text-xl font-bold text-cyber-text-main border-l-4 border-cyber-cyan pl-3">Cadastrar novo usuário</h2>

        <div>
          <label className="block text-sm font-semibold mb-1 text-cyber-text-muted">Nome usuário</label>
          <input
            type="text"
            name="newuser"
            required
            className="w-full p-2 bg-cyber-bg border border-cyber-border rounded text-cyber-text-main focus:border-cyber-cyan focus:outline-none transition-colors"
            placeholder="Digite seu usuário"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1 text-cyber-text-muted">Cadastrar senha</label>
          <input
            type="password"
            name="password"
            required
            className="w-full p-2 bg-cyber-bg border border-cyber-border rounded text-cyber-text-main focus:border-cyber-cyan focus:outline-none transition-colors"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-cyber-cyan text-black font-bold py-2 rounded hover:bg-cyber-cyan-hover transition-colors cursor-pointer"
        >
          Cadastrar
        </button>

        <p className="mt-4 text-sm text-center text-cyber-text-muted">
          Já tem uma conta?{' '}
          <Link href="/painel" className="text-cyber-cyan font-semibold hover:underline">
            Voltar ao Login
          </Link>
        </p>
      </form>
    </div>
  );
}
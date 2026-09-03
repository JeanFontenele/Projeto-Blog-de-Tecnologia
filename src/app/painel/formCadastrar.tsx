import Link from 'next/link';
import { cadastrarUsuario } from '@/lib/conexaoMongoDB/validarLogin';

export async function FormCadastrar() {
  
  return (
    <div>
      {/* Seu formulário de cadastro de usuário */}
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <form action={cadastrarUsuario} className="max-w-md w-full bg-white p-6 rounded shadow-md space-y-4">
              <h2 className="text-xl font-bold text-gray-800">Cadastrar novo usuário</h2>
      
              <div>
                <label className="block text-sm font-semibold mb-1">Nome usuário</label>
                <input
                  type="text"
                  name="newuser"
                  required
                  className="w-full p-2 border rounded"
                  placeholder="Digite seu usuário"
                />
              </div>
      
              <div>
                <label className="block text-sm font-semibold mb-1">Cadastrar senha</label>
                <input
                  type="password"
                  name="password"
                  required
                  className="w-full p-2 border rounded"
                  placeholder="••••••••"
                />
              </div>
      
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700"
              >
                Entrar
              </button>
            </form>

            <p className="mt-4 text-sm text-center">
              Já tem uma conta?{' '}
              <Link href="/painel" className="text-blue-600 font-semibold underline">
                Voltar ao Login
              </Link>
            </p>
      </div>
    </div>
  );
}
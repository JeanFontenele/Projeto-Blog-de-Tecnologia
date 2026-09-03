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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form action={validarLogin} className="max-w-md w-full bg-white p-6 rounded shadow-md space-y-4">
        <h2 className="text-xl font-bold text-gray-800">Acesso ao Painel</h2>

        <div>
          <label className="block text-sm font-semibold mb-1">Usuário</label>
          <input
            type="text"
            name="username"
            required
            className="w-full p-2 border rounded"
            placeholder="Digite seu usuário"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Senha</label>
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
        Não tem conta?{' '}
        <Link href="/painel?view=cadastrar" className="text-blue-600 font-semibold underline">
          Cadastrar-se
        </Link>
      </p>
    </div>
  );
}
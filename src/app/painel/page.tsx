//PAGINA DE ACESSO AO PAINEL PARA ADICIONAR AS NOTICIAS
import { cookies } from 'next/headers';
import { Login } from '@/app/painel/login';
import { PainelAdicionaNoticias } from '@/app/painel/formNoticia';
import { FormCadastrar } from '@/app/painel/formCadastrar'; 
import { Montserrat } from "next/font/google";

const MontserratFont = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Painel({ searchParams }: PageProps) {
  // 1. Verifica se o usuário possui o cookie de autenticação no servidor
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get('auth_token')?.value;

  // 2. Lê os parâmetros de busca da URL (ex: /painel?view=cadastrar)
  const params = await searchParams;
  const view = params.view;

  // ESTADO 1: Usuário autenticado -> Renderiza o Painel de Notícias
  if (isAuthenticated) {
    const name = params.Login;
    return (
      <main className={`${MontserratFont.className} min-h-screen bg-cyber-bg py-8`}>
        <h3 className="container text-[18px] font-bold mb-6 text-cyber-text-main">Bem vindo ao Painel {name}</h3>
        <PainelAdicionaNoticias />
      </main>
    );
  }

  // ESTADO 2: Usuário clicou em Cadastrar -> Renderiza o Formulário de Cadastro
  if (view === 'cadastrar') {
    return (
      <main className={`${MontserratFont.className} min-h-screen bg-cyber-bg flex items-center justify-center`}>
        <FormCadastrar />
      </main>
    );
  }

  // ESTADO 3 (Padrão): Usuário não autenticado -> Renderiza o Login
  return (
    <main className={`${MontserratFont.className} min-h-screen bg-cyber-bg flex items-center justify-center`}>
      <Login />
    </main>
  );
}


//PAGINA DE PESQUISA DE NOTICIAS DE ACORDO COM PALAVRAS CHAVE
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import { Montserrat } from "next/font/google";
import { Metadata } from "next";

const MontserratFont = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

interface PesquisaProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

export const metadata: Metadata = {
  title: 'Pesquisa - Portal de Noticias',
  description: 'Resultados da busca no portal'
}

export default async function Pesquisa({
  searchParams,
}: PesquisaProps) {
  const params = await searchParams;
  const termo = params.q || "";
  
  return (
    <div className={MontserratFont.className}>
      <main className="min-h-screen bg-cyber-bg py-12 px-4">
        <div className="w-full max-w-screen-xl mx-auto">
          <div className="container">
            <h2 className="text-2xl font-bold text-cyber-text-main mb-8 border-l-4 border-cyber-cyan pl-4">
              Resultados da Pesquisa
            </h2>
            
            <div className="bg-cyber-surface p-8 rounded-[5px] shadow-sm border border-cyber-border">
              <p className="text-cyber-text-muted text-lg">
                Você pesquisou por: <span className="font-bold text-cyber-neon">"{termo}"</span>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
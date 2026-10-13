//PAGINA DE PESQUISA DE NOTICIAS DE ACORDO COM PALAVRAS CHAVE
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import { Montserrat } from "next/font/google";
import { Metadata } from "next";
import { GET } from "@/lib/pesquisaNoticiaApi";
import Link from "next/link";
import { ReactNode } from "react";
import Image from "next/image";

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
  const resultadoPesquisa:any = await GET(termo);
  console.log(resultadoPesquisa[0].category)
  
  return (
    <div className={MontserratFont.className}>
      <main className="min-h-screen bg-cyber-bg py-12 px-4">
        <div className="w-full max-w-screen-xl mx-auto">
          <div className="container">
            <h2 className="text-2xl font-bold text-cyber-surface mb-8 border-l-4 border-cyber-cyan pl-4">
              Resultados da Pesquisa
            </h2> 
            
            <div className="bg-cyber-surface p-8 rounded-[5px] shadow-sm border border-cyber-border">
              <p className="text-cyber-text-muted text-lg">
                Você pesquisou por: <span className="font-bold text-cyber-neon">"{termo}"</span>
              </p>
            </div>

            <br />
            <div className="lg:col-span-2 space-y-6">
              {resultadoPesquisa.map((item:any,indice:any) => {
                  //const post = noticiasTecnologia[indice] || posts[indice]; // Fallback para posts    
                  const slug = resultadoPesquisa.slug;
                  
                  return (
                      <div key={indice}>
                          <Link href={`/noticias/${item.slug}`}>
                          <div className={"h-[250px] bg-cyber-surface rounded-[5px] overflow-hidden shadow-sm hover:shadow-md hover:border-cyber-cyan transition-all border border-cyber-border group flex"}>

                              <div className="relative w-1/3 h-full bg-cyber-surface-elevated">
                                <Image
                                    src={resultadoPesquisa[indice].image}
                                    alt={resultadoPesquisa[indice].title}
                                    layout="fill"
                                    objectFit="cover"
                                    className="group-hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                              
                              <div className="w-2/3 p-5 flex flex-col justify-center">
                                <span className="text-white text-xs font-bold uppercase">{resultadoPesquisa[indice].category}</span>
                                <h3 className="font-bold text-cyber-text-main text-lg mt-2 leading-tight line-clamp-3 group-hover:text-cyber-cyan-hover transition-colors">
                                    {resultadoPesquisa[indice].title}
                                </h3>
                                <p className="text-cyber-text-muted text-sm mt-3 line-clamp-2">{resultadoPesquisa[indice].excerpt}</p>
                                <p className="text-cyber-text-muted/70 text-xs mt-auto pt-2">{resultadoPesquisa[indice].date}</p>
                              </div>
                          </div>
                          </Link>
                      </div>
                  );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
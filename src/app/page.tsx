//PAGINA DA HOME DO PORTAL DE NOTICIAS
import ClickParaRota from "@/components/common/clickParaRota";
import { getAllPosts } from "@/lib/getMdxApi";
import Image from "next/image";


export default async function Home(){
  
  const posts = await getAllPosts();
  let slug:string = posts[1].postsDefinitivos[0];
  console.log(posts[1].postsDefinitivos[0]);
  //Estilizar o texto da noticia que vem do arquivo mdx para ter titulos e outras estilizações nos textos.
  //Preciso pegar o que está vindo da api de informações das noticias para montar as demais seções com as noticias correspondentes. Fazer uso da estrutura de repetição para montar os cards de noticias ou usar o metodo map().
  


  return(
    <div>
      {/*SEÇÃO DESTAQUE*/}
      <div className="secao-destaque min-h-screen w-full flex items-center justify-center bg-gray-100 p-4">
        {/* Box Principal com 1100px de largura máxima e bordas de 5px (rounded-[5px]) */}
        <section 
          className="w-full max-w-[900px] h-[500px] rounded-[5px] overflow-hidden shadow-lg group"
        >
          <ClickParaRota slug = {slug}>
            <div className="relative w-full h-full">
              {/* Imagem de Fundo (Simulada via div. No Next.js substitua por <Image />) */}
              <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
              >
                <Image //Continuar ajuste para os itens da noticia ser exibidos aqui na home sem o slug na url, e ao clicar na noticia o slug é ativado e é pego para renderizar a pagina noticia single.
                  src={posts[1].postsDefinitivos[1].image}
                  alt="Imagem de destaque da notícia"
                  layout="fill"
                  objectFit="cover"
                />
              </div>

              {/* Máscara de gradiente e Container do Texto posicionado por cima */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-8 md:p-12">
                
                {/* Categoria da Notícia */}
                <span className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-3">
                  {posts[1].postsDefinitivos[1].category}
                </span>
                
                {/* Título da Notícia */}
                <h2 className="text-white text-2xl md:text-4xl font-bold font-sans leading-tight max-w-3xl hover:underline">
                  {posts[1].postsDefinitivos[1].title}
                </h2>
                
                {/* Metadados / Linha de apoio */}
                <p className="text-gray-300 text-sm mt-4">
                  {posts[1].postsDefinitivos[1].escrito}
                </p>
                <p className="text-gray-300 text-sm mt-4">
                  {posts[1].postsDefinitivos[1].excerpt}
                </p>
              </div>
            </div>
          </ClickParaRota>
        </section>
      </div>

      {/*SEÇÃO ULTIMAS PUBLICAÇÕES*/}
      <section className="w-full mx-auto py-12 px-4 mb-20">
        <div className="container">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 border-l-4 border-[#0AACDC] pl-4">Últimas Publicações</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Coluna da Esquerda: Grade com 6 cards (2 por linha no desktop) */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((item) => {
                const titulo = `Título da notícia tecnológica para o card número ${item}`;
                return (
                  <div 
                    key={item} 
                    className="card-ultima-publicacao max-h-[700px] h-[450px] bg-white rounded-[5px] overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-200 cursor-pointer group"
                  >
                  <div className="h-40 bg-gray-200 overflow-hidden">
                    <div 
                      className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80')` }}
                    />
                  </div>
                  <div className="p-4">
                    <span className="text-[#0AACDC] text-[10px] font-bold uppercase">Novidades</span>
                    <h3 className="font-bold text-base mt-1 line-clamp-2 group-hover:text-[#0AACDC] transition-colors">
                      {titulo}
                    </h3>
                    <p className="text-gray-400 text-[11px] mt-3">03 de Junho, 2026</p>
                  </div>
                </div>
                );
              })}
            </div>

            {/* Coluna da Direita: Card que preenche a altura */}
            <div className="mais-lidas lg:col-span-1">
              <div className="h-full min-h-[400px] relative rounded-[5px] overflow-hidden shadow-lg group cursor-pointer">
                <div className="text-center p-[40px] bg-[#3F51B5]">
                  <h4 className="text-white uppercase">As mais lidas</h4>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                  <span className="bg-[#0AACDC] text-white text-[10px] font-bold px-2 py-1 rounded-sm w-fit mb-4">ESPECIAL</span>
                  <h3 className="text-white text-xl font-bold leading-tight">
                    O Guia definitivo para o desenvolvimento web em 2026
                  </h3>
                  <p className="text-gray-300 text-sm mt-4">Descubra as tecnologias que estão moldando o futuro da internet.</p>
                  <div className="h-1 w-full bg-[#0AACDC] mt-6 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*SEÇÃO NOVIDADES*/}
      <section className="w-full mx-auto py-12 px-4 mb-20">
        <div className="container">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 border-l-4 border-[#0AACDC] pl-4">Novidades</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Coluna da Esquerda: Grade com 6 cards (2 por linha no desktop) */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="max-h-[700px] h-[450px] bg-white rounded-[5px] overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-200 cursor-pointer group">
                  <div className="h-40 bg-gray-200 overflow-hidden">
                    <div 
                      className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80')` }}
                    />
                  </div>
                  <div className="p-4">
                    <span className="text-[#0AACDC] text-[10px] font-bold uppercase">Novidades</span>
                    <h3 className="font-bold text-base mt-1 line-clamp-2 group-hover:text-[#0AACDC] transition-colors">
                      Título da notícia tecnológica para o card número {item}
                    </h3>
                    <p className="text-gray-400 text-[11px] mt-3">03 de Junho, 2026</p>
                  </div>
                </div>
              ))}

              {[0, 1].map((i) => (
                <div key={i} className="h-[200px] bg-white rounded-[5px] overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-200 cursor-pointer group">
                  
                  {i === 0 ? (
                    <div 
                      className="relative z-0 w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80')` }}
                    >
                      <div className="absolute top-0 left-0 w-full h-full z-10 bg-[rgba(0,0,0,0.5)]">
                        <div className="z-20 text-white max-w-[300px] pl-[7%] pt-[20px]">
                          <h5 className="text-[#FFD430] font-bold">Arquitetura</h5>
                          <p>Veja as obras premiadas do famoso arquiteto Oscar Niemeyer que estão em exposição no Museu da Arquitetura Moderna em Milão.</p>
                        </div>
                      </div>  
                    </div>
                  ) : (
                    <div 
                      className="relative z-0 w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80')` }}
                    >
                      <div className="absolute top-0 left-0 w-full h-full z-10 bg-[rgba(0,0,0,0.5)]">
                        <div className="z-20 text-white max-w-[300px] pl-[7%] pt-[20px]">
                          <h5 className="text-[#40BE65] font-bold">Natureza</h5>
                          <p>Veja como os lagos congelados ficam ano após ano nesse incrível time lapse gravado durante 45 anos em uma expedição à Antartica.</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Coluna da Direita: Card que preenche a altura */}
            <div className="lg:col-span-1">
              <div className="h-full min-h-[400px] relative rounded-[5px] overflow-hidden shadow-lg group cursor-pointer">
                <div 
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                  style={{ backgroundImage: `url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                  <span className="bg-[#0AACDC] text-white text-[10px] font-bold px-2 py-1 rounded-sm w-fit mb-4">ESPECIAL</span>
                  <h3 className="text-white text-xl font-bold leading-tight">
                    O Guia definitivo para o desenvolvimento web em 2026
                  </h3>
                  <p className="text-gray-300 text-sm mt-4">Descubra as tecnologias que estão moldando o futuro da internet.</p>
                  <div className="h-1 w-full bg-[#0AACDC] mt-6 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> 
    </div>
  )

}
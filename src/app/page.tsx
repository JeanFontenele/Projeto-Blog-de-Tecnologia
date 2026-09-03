//PAGINA DA HOME DO PORTAL DE NOTICIAS
import DestaqueCarrossel from "@/components/common/destaqueCarrossel";
import { getAllPosts } from "@/lib/getMdxApi";
import Image from "next/image";
import Link from "next/link";
import { Montserrat } from "next/font/google";

const MontserratFont = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});



export default async function Home(){
  
  const posts = await getAllPosts();
  //let slug:string = posts[1].slug;
  let noticiasGames:any[] = []; 
  let noticiasTecnologia:any[] = [];
  let noticiasDestaque:any[] = [];
  console.log(posts);
  
  organizaNoticiasPorTema();
  function organizaNoticiasPorTema(){
    for (let i = 0; i < posts.length; i++) {
      if(i <= 3){
        noticiasDestaque.push(posts[i]);
      }
      if(posts[i].tema === "games"){
        noticiasGames.push(posts[i])
      }
      if(posts[i].tema === "tecnologia"){
        noticiasTecnologia.push(posts[i])
      }
    }  
  }
  //console.log(noticiasGames)
  //console.log(noticiasTecnologia)
  //console.log(noticiasDestaque)





  return(
    <div className={MontserratFont.className}>
      
      {/*SEÇÃO DESTAQUE*/}
      <section>
        <DestaqueCarrossel noticiaDestaque={noticiasDestaque}/>
      </section>      
      
      {/*SEÇÃO ULTIMAS PUBLICAÇÕES*/}
      <section className="w-full mx-auto py-12 px-4 mb-20">
        <div className="container">
          <h2 className="text-2xl font-bold text-[#0F172A] mb-8 border-l-4 border-[#38BDF8] pl-4">Últimas Publicações</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Coluna da Esquerda: Grade com 6 cards de noticias */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[0, 1, 2, 3].map((item) => {
                const titulo = noticiasGames[item].metadata.title;
                const slugCard:string = noticiasGames[item].slug;
                //console.log(slugCard)
                return (
                  <div 
                    key={item} 
                    className="card-ultima-publicacao max-h-[700px] h-[450px] bg-white rounded-[5px] overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-200 cursor-pointer group"
                  >
                    <Link href={`/noticias/${slugCard}`}>
                    <div className="h-70 bg-gray-200 overflow-hidden">
                      <div 
                        className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                        style={{ backgroundImage: `url(${noticiasGames[item].metadata.image})`, backgroundSize: 'cover', backgroundPosition: 'center'}}
                      />
                    </div>
                    <div className="p-4">
                      <span className="text-[#2563EB] text-[10px] font-bold uppercase">{noticiasGames[item].tema}</span>
                      <h3 className="font-bold text-base mt-1 line-clamp-2 text-[#0F172A]">
                        {titulo}
                      </h3>
                      <p className="text-[11px] text-[#0F172A] mt-3">{noticiasGames[item].formatoData}</p>
                    </div>
                    </Link>
                  </div>
                );
              })}
            </div>

            {/* Coluna da Direita: Reviews */}
            <div className="reviews lg:col-span-1">
              <div className="h-full min-h-[400px] rounded-[5px] overflow-hidden shadow-lg">
                <div className="text-center p-4 bg-[#2563EB]">
                  <h4 className="text-white uppercase font-bold">REVIEWS</h4>
                </div>

                <div className="p-6 space-y-5">
                  {posts.slice(0, 4).map((item,index) => {
                    return(
                      <Link href={`/noticias/${item.slug}`} key={index}>
                      <div key={index} className="box-reviews flex-shrink-0 group cursor-pointer mt-[35px] flex gap-4 items-center">
                        <div className="relative w-1/3 h-28 w-32">
                          <Image 
                            src={posts[index].metadata.image}
                            alt="Imagem de destaque da notícia"
                            layout="fill"
                            objectFit="cover"
                            className="group-hover:scale-105 transition-transform rounded-md"
                          />
                        </div>
                        <div className="w-2/3">
                          <span className="font-semibold text-sm text-[#0F172A] leading-tight group-hover:text-[#38BDF8] transition-colors">{posts[index].metadata.excerpt}</span>
                        </div>
                      </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="w-[1300px] h-[2px] m-auto bg-[#0F172A]" />

      {/*SEÇÃO ARTIGOS*/}        
      <section className="secao-artigos pt-[50px] pb-[90px]">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-[#0F172A] mb-8 border-l-4 border-[#38BDF8] pl-4">Artigos</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Coluna da Esquerda com 4 cards horizontais */}
            <div className="lg:col-span-2 space-y-6">
              {[0, 1, 2, 3].map((indice) => {
                const post = noticiasTecnologia[indice] || posts[indice]; // Fallback para posts
                const verificaUltimoCard = (valor:number) => {
                  return valor != indice ? "mb-[20px]" : "";
                }
                
                return (
                  <div key={indice} className={`${verificaUltimoCard(3)}`}>
                    <Link href={`/noticias/${post.slug}`}>
                      <div className={"h-[250px] bg-white rounded-[5px] overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-200 cursor-pointer group flex"}>
                        <div className="relative w-1/3 h-full">
                          <Image
                            src={post.metadata.image}
                            alt={post.metadata.title}
                            layout="fill"
                            objectFit="cover"
                            className="group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="w-2/3 p-5 flex flex-col justify-center">
                          <span className="text-[#2563EB] text-xs font-bold uppercase">{post.tema}</span>
                          <h3 className="font-bold text-lg mt-2 leading-tight line-clamp-3 group-hover:text-[#38BDF8] transition-colors">
                            {post.metadata.title}
                          </h3>
                          <p className="text-gray-500 text-sm mt-3 line-clamp-2">{post.metadata.excerpt}</p>
                          <p className="text-gray-400 text-xs mt-auto pt-2">{post.formatoData}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>

            {/* Coluna da Direita com "As mais lidas" */}
            <div className="lg:col-span-1">
              <div className="h-full rounded-[5px] overflow-hidden bg-white shadow-sm border border-gray-200">
                <div className="text-center p-4 bg-[#2563EB]">
                  <h4 className="text-white uppercase font-bold">As mais lidas</h4>
                </div>

                <div className="p-6 space-y-5">
                  {posts.slice(0, 7).map((item, index) => (
                    <Link href={`/noticias/${item.slug}`} key={index}>
                      <div className="flex items-center gap-4 group cursor-pointer mt-5">
                        <div className="relative h-28 w-32 flex-shrink-0 rounded-md overflow-hidden">
                          <Image 
                          src={item.metadata.image} 
                          alt={item.metadata.title} 
                          layout="fill" 
                          objectFit="cover" 
                          className="group-hover:scale-105 transition-transform" 
                          />
                        </div>
                        <h5 className="font-semibold text-sm text-[#0F172A] leading-tight group-hover:text-[#38BDF8] transition-colors">
                          {item.metadata.title}
                        </h5>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="w-[1300px] h-[2px] m-auto bg-[#0F172A]" />

      {/*SEÇÃO TECNOLOGIA*/}
      <section className="w-full mx-auto py-12 px-4 pt-[90px] mb-20">
        <div className="container">
          <h2 className="text-2xl font-bold text-[#0F172A] mb-8 border-l-4 border-[#38BDF8] pl-4">Tecnologia</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Coluna da Esquerda: Grade com 4 cards (2 por linha no desktop) */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[0,1,2,3].map((item) => (
                <div key={item} className="max-h-[700px] h-[450px] bg-white rounded-[5px] overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-200 cursor-pointer group">
                  <div className="h-70 bg-gray-200 overflow-hidden">
                    <div 
                      className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                      style={{ backgroundImage: `url(${noticiasTecnologia[item].metadata.image})` }}
                    />
                  </div>
                  <div className="p-4">
                    <span className="text-[#2563EB] text-[10px] font-bold uppercase">Novidades</span>
                    <h3 className="font-bold text-base mt-1 line-clamp-2 group-hover:text-[#38BDF8] transition-colors">
                      {noticiasTecnologia[item].metadata.title}
                    </h3>
                    <p className="text-gray-400 text-[11px] mt-3">{noticiasTecnologia[item].formatoData}</p>
                  </div>
                </div>
              ))}
              {/* TODO: Os cards abaixo são estáticos. Considere torná-los dinâmicos e aplicar a paleta de cores. */}
              {/*CARDS DE PRÉVIAS*/}
              <h2 className="md:col-span-2 text-2xl font-bold text-gray-800 mt-8 border-l-4 border-[#0AACDC] pl-4">PREVIEWS</h2>
              {[0, 1].map((i) => (
                <div key={i} className="h-[200px] bg-white rounded-[5px] overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-200 cursor-pointer group">
                  
                  {i === 0 ? (
                    <div 
                      className="relative z-0 w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                      style={{ backgroundImage: `url('https://images.pexels.com/photos/15063057/pexels-photo-15063057.jpeg?_gl=1*fc7idn*_ga*ODA3MDM2NzM4LjE3ODY0NzEyMzY.*_ga_8JE65Q40S6*czE3ODY0NzEyMzYkbzEkZzEkdDE3ODY0NzE3NjkkajU5JGwwJGgw')` }}
                    >
                      <div className="absolute top-0 left-0 w-full h-full z-10 bg-[rgba(0,0,0,0.5)]">
                        <div className="z-20 text-white max-w-[300px] pl-[7%] pt-[20px]">
                          <h5 className="text-[#FFD430] font-bold">Novidades</h5>
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        </div>
                      </div>  
                    </div>
                  ) : (
                    <div 
                      className="relative z-0 w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                      style={{ backgroundImage: `url('https://images.pexels.com/photos/15063057/pexels-photo-15063057.jpeg?_gl=1*fc7idn*_ga*ODA3MDM2NzM4LjE3ODY0NzEyMzY.*_ga_8JE65Q40S6*czE3ODY0NzEyMzYkbzEkZzEkdDE3ODY0NzE3NjkkajU5JGwwJGgw')` }}
                    >
                      <div className="absolute top-0 left-0 w-full h-full z-10 bg-[rgba(0,0,0,0.5)]">
                        <div className="z-20 text-white max-w-[300px] pl-[7%] pt-[20px]">
                          <h5 className="text-[#40BE65] font-bold">Novidade</h5>
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
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
                  style={{ backgroundImage: `url('https://images.pexels.com/photos/15063057/pexels-photo-15063057.jpeg?_gl=1*fc7idn*_ga*ODA3MDM2NzM4LjE3ODY0NzEyMzY.*_ga_8JE65Q40S6*czE3ODY0NzEyMzYkbzEkZzEkdDE3ODY0NzE3NjkkajU5JGwwJGgw')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                  <span className="bg-[#38BDF8] text-white text-[10px] font-bold px-2 py-1 rounded-sm w-fit mb-4">ESPECIAL</span>
                  <h3 className="text-white text-xl font-bold leading-tight">
                    Quem ganhará o proximo The game awards 
                  </h3>
                  <p className="text-gray-300 text-sm mt-4">Descubra os games que estão concorrendo.</p>
                  <div className="h-1 w-full bg-[#38BDF8] mt-6 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> 
    </div>
  )

}
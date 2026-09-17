//PAGINA DA NOTICIA SINGLE CLICADA
import { getPostBySlug } from "@/lib/getMdxApi";
import { notFound } from "next/navigation";
import Image from "next/image";
import RenderizaNoticia from "@/components/common/RenderizaNoticia";
import { Montserrat } from "next/font/google";

const MontserratFont = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});


export default async function PaginaSingle({ params }: { params: { slug: string } }) {
    // Decodifica o slug para obter o título original (aproximado)
    const {slug} = await params;
    const titulo = decodeURIComponent(slug)
    .replace(/-/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
    
    const post = await getPostBySlug(slug);
    //console.log(post)
    if (!post) {
        notFound();
    }
    //const { metadata, content } = post;  
    //console.log(post)
  



    return (
        <div className={MontserratFont.className}>
            <div className="py-12 px-4 bg-cyber-bg2 containerPai-noticias-slug">
                <div className="container">
                    <div className="container-noticias-slug flex">
                        {/* Coluna da Esquerda (Conteúdo Noticia) */}
                        <div className="w-[75%] bg-cyber-surface border border-cyber-border p-[40px] mr-[20px] rounded-[10px]">
                            <article>
                                {/* Categoria e Título */}
                                <div className="mb-6">
                                    <span className="text-cyber-cyan font-bold uppercase tracking-wider">{post.metadata.category}</span>
                                    <h1 className="text-3xl md:text-4xl font-bold text-cyber-text-main mt-2">{post.metadata.title}</h1>
                                    <p className="text-cyber-text-muted mt-3">{post.metadata.escrito}</p>
                                </div>
                                    
                                {/* Imagem da Notícia */}
                                <div className="relative w-full h-96 rounded-lg overflow-hidden mb-8 shadow-xl border border-cyber-border">
                                    <Image
                                        src={post.metadata.image}
                                        alt="Imagem de destaque da notícia"
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                </div>

                                {/* Conteúdo do Texto */}
                                <div>
                                    <RenderizaNoticia conteudo={post.content}/>
                                </div>
                            </article>
                        </div>

                        {/* Coluna da Direita (Mais Lidas) */}
                        <aside className="w-[25%]">
                            <div className="h-full">
                                {/* Card "Mais Lidas" com estilo similar ao da home */}
                                <div className="h-full rounded-[5px] overflow-hidden bg-cyber-surface border border-cyber-border">
                                    <div className="text-center p-4 bg-cyber-surface-elevated border-b border-cyber-cyan">  
                                        <h4 className="text-cyber-neon uppercase font-bold tracking-wider">As mais lidas</h4>
                                    </div>
                                    <div className="p-[30px] space-y-4 bg-cyber-surface h-full">
                                        {[
                                            { title: "Como a computação quântica impactará a segurança de dados", img: "https://images.pexels.com/photos/35229318/pexels-photo-35229318.jpeg?_gl=1*q5a9g4*_ga*ODA3MDM2NzM4LjE3ODY0NzEyMzY.*_ga_8JE65Q40S6*czE3ODY0NzEyMzYkbzEkZzEkdDE3ODY0NzI2NzckajU5JGwwJGgw" },
                                            { title: "O futuro das interfaces: além das telas", img: "https://images.pexels.com/photos/35229318/pexels-photo-35229318.jpeg?_gl=1*q5a9g4*_ga*ODA3MDM2NzM4LjE3ODY0NzEyMzY.*_ga_8JE65Q40S6*czE3ODY0NzEyMzYkbzEkZzEkdDE3ODY0NzI2NzckajU5JGwwJGgw" },
                                            { title: "5G e a Internet das Coisas (IoT): Uma nova era de conectividade", img: "https://images.pexels.com/photos/35229318/pexels-photo-35229318.jpeg?_gl=1*q5a9g4*_ga*ODA3MDM2NzM4LjE3ODY0NzEyMzY.*_ga_8JE65Q40S6*czE3ODY0NzEyMzYkbzEkZzEkdDE3ODY0NzI2NzckajU5JGwwJGgw" },
                                            { title: "Realidade Aumentada no e-commerce: a próxima fronteira", img: "https://images.pexels.com/photos/35229318/pexels-photo-35229318.jpeg?_gl=1*q5a9g4*_ga*ODA3MDM2NzM4LjE3ODY0NzEyMzY.*_ga_8JE65Q40S6*czE3ODY0NzEyMzYkbzEkZzEkdDE3ODY0NzI2NzckajU5JGwwJGgw" }
                                        ].map((item, index) => (
                                            <div key={index}>
                                                <div className="flex group cursor-pointer mt-[10px] mb-[40px] w-[100%]">
                                                    <div className="relative w-1/2 h-30 rounded-md overflow-hidden bg-cyber-surface-elevated">
                                                        <Image
                                                            src={item.img}
                                                            alt={item.title}
                                                            layout="fill"
                                                            objectFit="cover"
                                                            className="group-hover:scale-105 transition-transform"
                                                        />
                                                    </div>
                                                    <div className="w-1/2 pl-5">
                                                        <h5 className="font-bold text-sm text-cyber-text-main leading-tight group-hover:text-cyber-cyan-hover transition-colors">
                                                            {item.title}
                                                        </h5>
                                                    </div>
                                                </div>   
                                                <div className="w-full h-[1px] bg-cyber-border mb-10"></div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </div>
    );
}
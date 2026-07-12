//PAGINA DA NOTICIA SINGLE CLICADA
import { getPostBySlug } from "@/lib/getMdxApi";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import Image from "next/image";
import rehypeRaw from "rehype-raw";

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

    const { metadata, content } = post;    



    return (
        <div className="py-12 px-4 bg-[#F3F4F6] containerPai-noticias-slug">
            <div className="container">
                <div className="container-noticias-slug grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

                    {/* Coluna da Esquerda (Conteúdo Noticia) */}
                    <div className="lg:col-span-2 bg-[#FFFFFF] p-[40px] rounded-[10px]">
                        <article>
                            {/* Categoria e Título */}
                            <div className="mb-6">
                                <span className="text-blue-500 font-bold uppercase tracking-wider">{metadata.category}</span>
                                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">{metadata.title}</h1>
                                <p className="text-gray-500 mt-3">{metadata.escrito}</p>
                            </div>

                            {/* Imagem da Notícia */}
                            <div className="relative w-full h-96 rounded-lg overflow-hidden mb-8 shadow-lg">
                                <Image
                                    src={metadata.image}
                                    alt="Imagem de destaque da notícia"
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>

                            {/* Conteúdo do Texto */}
                            <div className="prose prose-lg max-w-none prose-headings:font-black prose-h2:text-3xl prose-h2:text-gray-900 prose-p:text-gray-700">
                                <MDXRemote source={content} />
                            </div>
                        </article>
                    </div>

                    {/* Coluna da Direita (Mais Lidas) */}
                    <aside className="lg:col-span-1">
                        <div className="h-full">
                            {/* Card "Mais Lidas" com estilo similar ao da home */}
                            <div className="h-full rounded-[5px] overflow-hidden">
                                <div className="text-center p-4 bg-[#3F51B5]">
                                    <h4 className="text-white uppercase font-bold">As mais lidas</h4>
                                </div>
                                <div className="p-[30px] space-y-4 bg-[#FFFFFF] h-full">
                                    {[
                                        { title: "Como a computação quântica impactará a segurança de dados", img: "https://upload.wikimedia.org/wikipedia/pt/thumb/b/be/The_Last_of_Us_capa.png/330px-The_Last_of_Us_capa.png" },
                                        { title: "O futuro das interfaces: além das telas", img: "https://upload.wikimedia.org/wikipedia/pt/thumb/b/be/The_Last_of_Us_capa.png/330px-The_Last_of_Us_capa.png" },
                                        { title: "5G e a Internet das Coisas (IoT): Uma nova era de conectividade", img: "https://images.unsplash.com/photo-1526666923127-b2970f64b422?w=200" },
                                        { title: "Realidade Aumentada no e-commerce: a próxima fronteira", img: "https://upload.wikimedia.org/wikipedia/pt/thumb/b/be/The_Last_of_Us_capa.png/330px-The_Last_of_Us_capa.png" }
                                    ].map((item, index) => (
                                        <div key={index} className="flex items-center gap-4 group cursor-pointer mt-[10px] mb-[40px] w-[100%]">
                                            <div className="relative w-30 h-30 flex-shrink-0 rounded-md overflow-hidden">
                                                <Image
                                                    src={item.img}
                                                    alt={item.title}
                                                    layout="fill"
                                                    objectFit="cover"
                                                    className="group-hover:scale-105 transition-transform"
                                                />
                                            </div>
                                            <div className="">
                                                <h5 className="font-semibold text-sm text-gray-800 leading-tight group-hover:text-[#0AACDC] transition-colors">
                                                    {item.title}
                                                </h5>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
//PAGINA DE NOTICIAS LISTADAS
import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "@/lib/getMdxApi";

const secaoNoticias = {
    padding: '40px 0'
}

export default async function paginaNoticias(){

    const posts:any[] = await getAllPosts();
    //const tamanhoArr:number = posts.length;
    //console.log(posts)
    

    return(

        <div>
            <section style={secaoNoticias} className="max-w-[1100px] m-auto">
                <div className="lg:col-span-2 space-y-6">
                    {[0,1,2,3,4,5,6,7].map((indice) => {
                        //const post = noticiasTecnologia[indice] || posts[indice]; // Fallback para posts
                        
                        
                        let slug:string = posts[indice].nomeArquivo;    
                        
                        return (
                            <div key={indice}>
                                <Link href={`/noticias/${slug}`}>
                                <div className={"h-[250px] bg-cyber-surface rounded-[5px] overflow-hidden shadow-sm hover:shadow-md hover:border-cyber-cyan transition-all border border-cyber-border cursor-pointer group flex"}>
                                    <div className="relative w-1/3 h-full bg-cyber-surface-elevated">
                                    <Image
                                        src={posts[indice].metadata.image}
                                        alt={posts[indice].metadata.title}
                                        layout="fill"
                                        objectFit="cover"
                                        className="group-hover:scale-105 transition-transform duration-300"
                                    />
                                    </div>
                                    <div className="w-2/3 p-5 flex flex-col justify-center">
                                    <span className="text-cyber-cyan text-xs font-bold uppercase">{posts[indice].tema}</span>
                                    <h3 className="font-bold text-cyber-text-main text-lg mt-2 leading-tight line-clamp-3 group-hover:text-cyber-cyan-hover transition-colors">
                                        {posts[indice].metadata.title}
                                    </h3>
                                    <p className="text-cyber-text-muted text-sm mt-3 line-clamp-2">{posts[indice].metadata.excerpt}</p>
                                    <p className="text-cyber-text-muted/70 text-xs mt-auto pt-2">{posts[indice].formatoData}</p>
                                    </div>
                                </div>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </section>
        </div>

    )

}
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
    console.log(posts)
    

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
                                <div className={"h-[250px] bg-white rounded-[5px] overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-200 cursor-pointer group flex"}>
                                    <div className="relative w-1/3 h-full">
                                    <Image
                                        src={posts[indice].metadata.image}
                                        alt={posts[indice].metadata.title}
                                        layout="fill"
                                        objectFit="cover"
                                        className="group-hover:scale-105 transition-transform duration-300"
                                    />
                                    </div>
                                    <div className="w-2/3 p-5 flex flex-col justify-center">
                                    <span className="text-[#2563EB] text-xs font-bold uppercase">{posts[indice].tema}</span>
                                    <h3 className="font-bold text-[#0F172A] text-lg mt-2 leading-tight line-clamp-3 group-hover:text-[#38BDF8] transition-colors">
                                        {posts[indice].metadata.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm mt-3 line-clamp-2">{posts[indice].metadata.excerpt}</p>
                                    <p className="text-gray-400 text-xs mt-auto pt-2">{posts[indice].formatoData}</p>
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
'use client'
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";


const bulletPai = {
    left: '50%',
    transform: 'translateX(-50%)'
}
const bulletsCarrossel = {
    width: '27px',
    height: '4px',
    backgroundColor: 'white',
    margin: '0 7px'
}


export default function DestaqueCarrossel({noticiaDestaque}:{noticiaDestaque:any[]}){
    const [index, setIndex] = useState(0);

    //console.log(noticiaDestaque)
    //console.log(noticiaDestaque[index].nomeArquivo)
    
    useEffect(() => {
        // Garante que o timer não rode se o array estiver vazio
        if (!noticiaDestaque || noticiaDestaque.length === 0) return;

        const interval = setInterval(() => {
            setIndex(prevIndex => (prevIndex + 1) % noticiaDestaque.length);
        }, 4000);

        return () => clearInterval(interval); // Limpa o intervalo quando o componente é desmontado
    }, [noticiaDestaque.length,index]); 
    
    if (!noticiaDestaque || noticiaDestaque.length === 0) return null;

    // Função para tratar o clique na bullet
    const irParaSlide = (i:number) => {
        setIndex(i); // O CSS com translateX se encarrega da animação suave
    };

    const fundo_img = {
        backgroundImage: `url(${noticiaDestaque[index].metadata.image})`,
        backgroundSize: 'cover',
    }
    



    return(
        <div>
            <div style={fundo_img} className="secao-destaque min-h-screen w-full flex items-center justify-center p-4">
                <div className="layer"></div>
                <section 
                className="slide-img w-full max-w-[900px] h-[570px] rounded-[5px] overflow-hidden shadow-lg group"
                >
            
                    <div className="relative w-full h-full"
                    >
                        {/* Imagem de Fundo */}
                        <section className="w-full flex justify-center items-center py-5">
                            {/* .carrosselContainer */}
                            <div 
                            className="relative w-full h-[570px] rounded-lg overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.15)]"
                            >
                                {/* .carrosselTrilho - O trilho desliza de acordo com o índice calculado no estado */}
                                <div className="flex w-full h-full transition-transform duration-600 ease-in-out"
                                    style={{ transform: `translateX(-${index * 100}%)` }}
                                >
                                    {noticiaDestaque.map((post) => (
                                        /* .carrosselSlide */
                                    <div key={post.id || post.slug} className="min-w-full h-full relative">
                                        {/* .carrosselImagem */}
                                        <Image 
                                            src={post.metadata.image} 
                                            alt={post.metadata.title} 
                                            fill
                                            priority={index === 0}
                                            className="object-cover block" 
                                        />
                                    </div>
                                    ))}
                                </div>
                            </div>
                            {/* Máscara de gradiente e Container do Texto posicionado por cima */}
                            <div className="absolute bottom-0 left-0 right-0 pl-[30px] pr-[30px] pb-[70px] bg-gradient-to-t from-black/85 via-black/40 to-transparent text-white">

                                {/* Categoria da Notícia */}
                                <span className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-3">
                                    {noticiaDestaque[index].metadata.category}
                                </span>
                                
                                {/* Título da Notícia */}
                                <h2 className="text-white text-2xl md:text-4xl font-bold font-sans leading-tight max-w-3xl hover:underline">
                                    <Link href={`/noticias/${noticiaDestaque[index].nomeArquivo}`}>
                                        {noticiaDestaque[index].metadata.title}
                                    </Link>
                                </h2>
                                
                                {/* Metadados / Linha de apoio */}
                                <p className="text-gray-300 text-sm mt-4">
                                    {noticiaDestaque[index].metadata.escrito}
                                </p>
                                <p className="text-gray-300 text-sm mt-4">
                                    {noticiaDestaque[index].metadata.excerpt}
                                </p>
                            </div>

                            <div style={bulletPai} className="bullets flex absolute bottom-5 text-center">
                                {noticiaDestaque.map((_, i) => (
                                    <span key={i} 
                                    onClick={() => irParaSlide(i)} 
                                    style={{...bulletsCarrossel, backgroundColor: i === index ? '#0AACDC' : 'white'}} 
                                    className={`cursor-pointer ${
                                        index === i 
                                        ? 'w-8 bg-blue-500' // Bullet ativa esticada e azul
                                        : 'w-3 bg-white/60 hover:bg-white' // Bullet inativa menor e translúcida
                                    }`}></span>
                                ))}
                            </div>
                        </section>
                    </div>
            
                </section>
            </div>
        </div>
    )
}
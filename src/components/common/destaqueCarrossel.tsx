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
    const imagensCarrossel = noticiaDestaque.map((item) => item.metadata.image);
    console.log(noticiaDestaque)
    //console.log(noticiaDestaque[index].nomeArquivo)
    


    useEffect(() => {
        const interval = setInterval(() => {
            setIndex(prevIndex => (prevIndex + 1) % imagensCarrossel.length);
        }, 2000);

        return () => clearInterval(interval); // Limpa o intervalo quando o componente é desmontado
    }, []); // Array de dependências vazio para executar o efeito apenas uma vez

    return(
        <div className="relative w-full h-full">
            <div 
            className="box-carrossel w-full h-full bg-cover bg-center transition-all duration-1000 ease-in-out"
            >
                {/*continuar criação de slide carrossel*/}
                <Image 
                    src={imagensCarrossel[index]}
                    alt="Imagem de destaque da notícia"
                    layout="fill"
                    objectFit="cover"
                    className="transition-opacity duration-1000 ease-in-out"
                    key={index} // Adicionado para forçar a re-renderização da imagem
                />
            </div>
            {/* Máscara de gradiente e Container do Texto posicionado por cima */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-8 md:p-12">

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
                {imagensCarrossel.map((_, i) => (
                    <span key={i} style={{...bulletsCarrossel, backgroundColor: i === index ? '#0AACDC' : 'white'}}></span>
                ))}
            </div>
        </div>
    )

}
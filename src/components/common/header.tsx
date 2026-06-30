'use client'

import Link from "next/link";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useRouter } from "next/navigation";



export default function Header(){

    const [termo, setTermo] = useState("");
    const router = useRouter();

    function resultadoPesquisa():void{
        //Essa função pega o que foi digitado na input de pesquisa do formulário e 
        const termoPesquisa = termo.trim();

        if (!termo) return;

        router.push(`/pesquisa?q=${encodeURIComponent(termo)}`);
    }
    

    return(
        <div>
            <header className="cabecalho bg-[#0AACDC] text-white p-8">
                <div className="max-w-screen-xl mx-auto">
                    <div className="flex justify-between">
                        <div>
                            <Link href="/">
                                Logo
                            </Link>
                        </div>

                        <nav>
                            <ul className="flex gap-6">
                                <li>
                                    <Link href="/">Noticias</Link>
                                </li>

                                <li>
                                    <Link href="/dicas">Dicas</Link>
                                </li>

                                <li>
                                    <Link href="/promocoes">Promoções</Link>
                                </li>
                            </ul>
                        </nav>

                        <div>
                            <form method="post" className="relative">
                                <input 
                                    type="text" 
                                    name="busca" 
                                    placeholder="Buscar..." 
                                    value={termo}
                                    onChange={(e) => setTermo(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                            resultadoPesquisa();
                                        }
                                    }}
                                    className="h-10 pl-12 bg-white text-black rounded-xs"
                                />
                                <CiSearch className="absolute top-1 left-2 text-black text-[30px]"/>
                            </form>
                        </div>
                    </div>  
                </div>      
            </header>
        </div>
    )

}
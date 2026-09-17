'use client'

import Link from "next/link";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { Montserrat } from "next/font/google";

const MontserratFont = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

/*  
    div da logo
    <div style={{backgroundImage: `url(/logo.jpeg)`, backgroundSize: 'cover', backgroundPosition: 'center',width:'170px',height:'71px',backgroundRepeat: 'no-repeat'}} className=""></div>
*/

export default function Header(){

    const [termo, setTermo] = useState("");
    const router = useRouter();

    function resultadoPesquisa():void{
        //Essa função pega o que foi digitado na input de pesquisa do formulário e formata para adicionar na url.
        const termoPesquisa = termo.trim();

        if (!termo) return;

        router.push(`/pesquisa?q=${encodeURIComponent(termo)}`);
    }
    

    return(
        <div className={MontserratFont.className}>
            <header className="cabecalho bg-cyber-header border-b border-cyber-border text-cyber-text-main p-3">
                <div className="max-w-[1200px] mx-auto">
                    <div className="flex justify-between items-center">
                        <div className="logo">
                            <Link className="logo-link font-bold text-xl tracking-wider text-cyber-neon hover:text-cyber-cyan transition-colors" href="/">
                                LOGO
                            </Link>
                        </div>

                        <nav>
                            <ul className="flex gap-6">
                                <li className="relative group">
                                    <Link href="/noticias" className="text-[17px] font-medium transition-colors text-cyber-text-main group-hover:text-cyber-cyan after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:h-[3px] after:w-full after:bg-cyber-cyan after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">
                                        Noticias
                                    </Link>
                                </li>

                                <li className="relative group">
                                    <Link href="/dicas" className="text-[17px] font-medium transition-colors text-cyber-text-main group-hover:text-cyber-cyan after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:h-[3px] after:w-full after:bg-cyber-cyan after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">
                                        Dicas
                                    </Link>
                                </li>

                                <li className="relative group">
                                    <Link href="/promocoes" className="text-[17px] font-medium transition-colors text-cyber-text-main group-hover:text-cyber-cyan after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:h-[3px] after:w-full after:bg-cyber-cyan after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">
                                        Promoções
                                    </Link>
                                </li>
                            </ul>
                        </nav>

                        <div className="busca">
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
                                    className="h-10 pl-12 pr-4 bg-cyber-surface text-cyber-text-main placeholder-cyber-text-muted border border-cyber-border focus:border-cyber-cyan focus:outline-none rounded-sm transition-colors"
                                />
                                <CiSearch className="absolute top-1.5 left-3 text-cyber-cyan text-[26px]"/>
                            </form>
                        </div>
                    </div>  
                </div>      
            </header>
        </div>
    )

}
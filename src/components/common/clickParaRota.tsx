'use client'

import { useRouter } from "next/navigation";
import React from "react";

interface slugProps { 
    slug: string;
    children: React.ReactNode;
}

export default function ClickParaRota({slug, children}:slugProps){

    const router = useRouter();
    console.log(slug)
    const clickNaNoticia = () => {
        router.push(`/noticias/${slug}`);
    };

    return(
        <div onClick={clickNaNoticia} className="cursor-pointer w-full h-full">
            {children}
        </div>
    )

}
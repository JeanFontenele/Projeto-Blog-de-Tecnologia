import Image from "next/image";


interface RenderProps {
  conteudo: any;
}

export default function RenderizaNoticia({ conteudo }: RenderProps) {
  if (!conteudo) return null;
  //console.log(conteudo)

  // CASO 1: Se o conteúdo for um ARRAY de blocos (Recomendado)
  if (Array.isArray(conteudo)) {
    return (
      <div className="space-y-4">
        {conteudo.map((bloco, index) => {
          switch (bloco.type) {
            case 'titulo':
            case 'h1':
              return (
                <h1 key={index} className="text-3xl font-bold text-[#0F172A] mt-6 mb-2">
                  {bloco.value}
                </h1>
              );
            case 'paragrafo':
            case 'p':
              return (
                <p key={index} className="text-[#0F172A] leading-relaxed">
                  {bloco.value}
                </p>
              );
            case 'subtitulo':
            case 'h2':
              return (
                <h2 key={index} className="text-2xl font-bold text-[#0F172A] mt-6 mb-2">
                  {bloco.value}
                </h2>
              );  
            case 'subtitulo2':
            case 'h3':
              return (
                <h3 key={index} className="text-xl font-bold text-[#0F172A] mt-6 mb-2">
                  {bloco.value}
                </h3>
              );  
            case 'lista':
            case 'ul':
              return (
                <ul key={index} className="list-disc list-inside space-y-1 text-[#0F172A] pl-2">
                  {bloco.itens?.map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              );
            case 'imagem':
            case 'Image':
              return (
                <div key={index} className="my-6 flex justify-center">
                    <Image 
                        src={bloco.value}
                        alt="Imagem de destaque da notícia"
                        width={400}
                        height={300}
                        className="w-full max-w-[600px] h-auto rounded-md object-cover shadow-sm"
                    />
                </div>
              );    
            default:
              return null;
          }
        })}
      </div>
    );
  }
}
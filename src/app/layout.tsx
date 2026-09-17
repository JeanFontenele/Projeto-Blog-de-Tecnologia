//É aqui no layout que é renderizado as paginas do projeto, que vem dos componentes. Aqui é a parte central onde irá ser renderizado os componentes, semelhante ao Reactjs comum.
import "./globals.css";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  /* Aqui no children que renderiza os componentes, se colocar algo fora do children, será renderizado globalmente seja qual for a página que estiver. Pode ser usado pra fazer a header e a footer. */


  return (
    <html
      lang="en"
      className={`antialiased`}
    >
      <body className={`min-h-full flex flex-col bg-cyber-bg text-cyber-text-main`} cz-shortcut-listen="true">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}


//TODO: criar logica para mecanismo de pesquisa pela url para mostrar na tela. 
// Criar logica que ao clicar na box da noticia renderiza a pagina single. 
// Criar logica para pegar a noticia do arquivo ".mdx" para renderizar a noticia de forma dinamica.   

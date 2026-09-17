//PAGINA DO PAINEL PARA ADICIONAR AS NOTICIAS
'use server';

import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';
import { FormularioConteudoNoticia } from '@/components/common/formConteudoNoticia';
import { fazerLogout } from '@/app/painel/actions/logout';
import { Montserrat } from "next/font/google";

const MontserratFont = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

export async function PainelAdicionaNoticias() {
    
    const conteudoArr: any[] = [];
    console.log()

    async function criarNoticia(formData: FormData) {
        'use server';
        const metadados = {
            title: formData.get('title') as string,
            escrito: formData.get('escrito') as string,
            date: formData.get('date') as string,
            category: formData.get('category') as string,
            tema: formData.get('tema') as string,
            excerpt: formData.get('excerpt') as string,
            image: formData.get('image') as string,
        };

        const contentRaw = formData.get('content') as string;

        // Validação simples
        if (!metadados.title || !metadados.date || !metadados.category || !metadados.tema || !contentRaw) {
            // Em um app real, você retornaria um estado de erro mais detalhado.
            console.error("Dados do formulário incompletos.");
            return;
        }

        let content: any[];
        try {
            // Tenta fazer o parse do JSON do conteúdo
            content = contentRaw ? JSON.parse(contentRaw) : [];
        } catch (error) {
            console.error("Erro ao fazer o parse do conteúdo JSON:", error);
            // Adicione um retorno de erro para o usuário aqui
            return;
        }

        const noticiaCompleta = {
            metadados,
            content
        };
        //console.log(noticiaCompleta)


        // Criando o slug a partir do título
        const slug = metadados.title
            .toLowerCase()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Remove acentos
            .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais exceto espaço e hífen
            .trim()
            .replace(/\s+/g, '-'); // Substitui espaços por hífens

        const nomeArquivo = `${slug}_${metadados.category.toLowerCase()}.json`;
        const filePath = path.join(process.cwd(), 'content/noticias', nomeArquivo);

        try {
            await fs.writeFile(filePath, JSON.stringify(noticiaCompleta, null, 4));
            //console.log(`Notícia salva em: ${filePath}`);
            // Limpa o cache das páginas que listam notícias para que a nova apareça
            revalidatePath('/noticias');
            revalidatePath('/');
        } catch (error) {
            console.error("Erro ao salvar o arquivo da notícia:", error);
        }
    }





    return(
        <div className={MontserratFont.className}>
            <div className="container mx-auto p-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-cyber-surface border-l-4 border-cyber-cyan pl-3">Painel de Adição de Notícias</h2>

                    {/* Formulário com a Server Action de Logout */}
                    <form action={fazerLogout}>
                    <button
                        type="submit"
                        className="bg-red-600/90 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition-colors text-sm flex items-center gap-2 cursor-pointer"
                    >
                        Sair da Sessão
                    </button>
                    </form>
                </div>

                <form action={criarNoticia} className="space-y-6 bg-cyber-surface border border-cyber-border p-8 rounded-lg shadow-lg">
                    {/* Metadados */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-cyber-text-muted mb-1">Título</label>
                            <input type="text" name="title" id="title" required className="block w-full rounded-md bg-cyber-bg border border-cyber-border text-cyber-surface focus:border-cyber-cyan focus:outline-none sm:text-sm p-2 transition-colors" />
                        </div>
                        <div>
                            <label htmlFor="escrito" className="block text-sm font-medium text-cyber-text-muted mb-1">Escrito por</label>
                            <input type="text" name="escrito" id="escrito" className="block w-full rounded-md bg-cyber-bg border border-cyber-border text-cyber-surface focus:border-cyber-cyan focus:outline-none sm:text-sm p-2 transition-colors" />
                        </div>
                        <div>
                            <label htmlFor="date" className="block text-sm font-medium text-cyber-text-muted mb-1">Data (DD/MM/AAAA)</label>
                            <input type="text" name="date" id="date" required placeholder="ex: 26/05/2026" className="block w-full rounded-md bg-cyber-bg border border-cyber-border text-cyber-surface placeholder-cyber-text-muted/50 focus:border-cyber-cyan focus:outline-none sm:text-sm p-2 transition-colors" />
                        </div>
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-cyber-text-muted mb-1">Categoria</label>
                            <input type="text" name="category" id="category" required className="block w-full rounded-md bg-cyber-bg border border-cyber-border text-cyber-surface focus:border-cyber-cyan focus:outline-none sm:text-sm p-2 transition-colors" />
                        </div>
                        <div>
                            <label htmlFor="tema" className="block text-sm font-medium text-cyber-text-muted mb-1">Tema</label>
                            <input type="text" name="tema" id="tema" required className="block w-full rounded-md bg-cyber-bg border border-cyber-border text-cyber-surface focus:border-cyber-cyan focus:outline-none sm:text-sm p-2 transition-colors" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="image" className="block text-sm font-medium text-cyber-text-muted mb-1">URL da Imagem de Capa</label>
                        <input type="url" name="image" id="image" className="block w-full rounded-md bg-cyber-bg border border-cyber-border text-cyber-surface focus:border-cyber-cyan focus:outline-none sm:text-sm p-2 transition-colors" />
                    </div>
                    <div>
                        <label htmlFor="excerpt" className="block text-sm font-medium text-cyber-text-muted mb-1">Resumo (Excerpt)</label>
                        <textarea name="excerpt" id="excerpt" rows={3} className="block w-full rounded-md bg-cyber-bg border border-cyber-border text-cyber-surface focus:border-cyber-cyan focus:outline-none sm:text-sm p-2 transition-colors"></textarea>
                    </div>

                    <div className="conteudo-noticia">
                        <FormularioConteudoNoticia />
                    </div>

                    <button type="submit" className="inline-flex justify-center py-2.5 px-6 border border-transparent text-sm font-bold rounded-md text-black bg-cyber-cyan hover:bg-cyber-cyan-hover focus:outline-none transition-colors cursor-pointer">
                        Salvar Notícia
                    </button>
                </form>
            </div>
        </div>
    )
}

/*
Conteudo da noticia
<div>
    <label htmlFor="content" className="block text-sm font-medium text-gray-700">Conteúdo (em formato JSON)</label>
    <textarea name="content" id="content" rows={15} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm font-mono p-2" placeholder='[{"type": "paragrafo", "value": "Seu texto aqui."}]'></textarea>
    <p className="mt-2 text-xs text-gray-500">Insira o conteúdo como um array de objetos JSON.</p>
</div>

*/
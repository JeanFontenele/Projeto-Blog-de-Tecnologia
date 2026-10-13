import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { formatDate } from '@/lib/ajustandoDataApi';
import { organizaNoticiasPorData } from '@/lib/ajustandoDataApi';
import { MDXRemote } from 'next-mdx-remote/rsc';

const postsDirectory = path.join(process.cwd(), 'content/noticias');


// Função para buscar a notícia específica pelo slug
export async function getPostBySlug(slug: string) {
  try {
    const realSlug = slug.replace(/\.json$/, '');
    //console.log(realSlug)
    const fullPath = path.join(postsDirectory, `${realSlug}.json`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const dados = JSON.parse(fileContents);
    //console.log(dados)
    // gray-matter separa o 'data' (frontmatter) do 'content' (texto)
    //const { data, content } = matter(fileContents);
    const data = dados.metadados;
    const content = dados.content;
    //console.log(content)
    return {
      slug: realSlug,
      metadata: data,
      content: content,
    };
  } catch (error) {
    return null; // Caso o arquivo não exista
  }
}


// --- NOVA FUNÇÃO: BUSCA TODAS AS NOTÍCIAS PARA A HOME ---
export async function getAllPosts() {
  // 1. Lê todos os arquivos dentro da pasta content/noticias
  const fileNames = fs.readdirSync(postsDirectory);
  
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.json')) // Garante que só vai ler arquivos mdx
    .map((fileName) => {
      // O slug será o nome do arquivo sem a extensão .mdx
      const slug = fileName.replace(/\.json$/, '');
      
      // Lê o conteúdo do arquivo
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const dados = JSON.parse(fileContents);
      //console.log(dados)
      const [nomeSlug, tema] = slug.split("_");

      // Extrai os metadados do topo do arquivo
      const data = dados.metadados;
      const content = dados.content;
    
      //console.log(data)
      const formatoData = formatDate(data.date)

      // Retorna o objeto formatado igual ao que viria de um banco de dados
      return {
        tema: tema,
        slug: nomeSlug,
        nomeArquivo: slug,
        metadata: data,
        content: content,
        formatoData: formatoData,
      };
    });
    const noticiasDecrescentes = organizaNoticiasPorData(allPostsData);
    //console.log(noticiasDecrescentes)

  // 2. Ordena as notícias da mais recente para a mais antiga (opcional, baseado na data)
  // Se suas datas forem strings complexas, você pode adicionar um campo 'timestamp' no MDX para ordenar melhor.
  return noticiasDecrescentes;
}
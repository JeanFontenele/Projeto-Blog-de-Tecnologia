import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { formatDate } from '@/lib/ajustandoDataApi';
import { MDXRemote } from 'next-mdx-remote/rsc';

const postsDirectory = path.join(process.cwd(), 'content/noticias');


// Função para buscar a notícia específica pelo slug
export async function getPostBySlug(slug: string) {
  try {
    const realSlug = slug.replace(/\.mdx$/, '');
    //console.log(realSlug)
    const fullPath = path.join(postsDirectory, `${realSlug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    //console.log(fileContents)
    // gray-matter separa o 'data' (frontmatter) do 'content' (texto)
    const { data, content } = matter(fileContents);

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
    .filter((fileName) => fileName.endsWith('.mdx')) // Garante que só vai ler arquivos mdx
    .map((fileName) => {
      // O slug será o nome do arquivo sem a extensão .mdx
      const slug = fileName.replace(/\.mdx$/, '');
      
      // Lê o conteúdo do arquivo
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      
      const [nomeSlug, tema] = slug.split("_");

      // Extrai os metadados do topo do arquivo (Frontmatter)
      const { data, content } = matter(fileContents);
      //console.log(data)
      const formatoData = formatDate(data.date)
      console.log(formatoData)

      // Retorna o objeto formatado igual ao que viria de um banco de dados
      return {
        tema: tema,
        slug: nomeSlug,
        nomeArquivo: slug,
        metadata: data,
        content: content,
      };
    });

    //console.log(allPostsData);
  // 2. Ordena as notícias da mais recente para a mais antiga (opcional, baseado na data)
  // Se suas datas forem strings complexas, você pode adicionar um campo 'timestamp' no MDX para ordenar melhor.
  return allPostsData;
}
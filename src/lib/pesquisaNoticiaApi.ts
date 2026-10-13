// Essa API simplesmente lê o arquivo search-index.json já pronto da memória e roda o Fuse.js para pegar as noticias e montar a lista.
import { NextResponse } from 'next/server';
import Fuse from 'fuse.js';
import searchIndex from '../../public/search-index.json';

// Configuração do Fuse.js (Busca difusa / tolerante a erros)
const fuseOptions = {
  includeScore: true,
  threshold: 0.4, // Quanto menor, mais precisa a busca. 0.4 permite pequenos erros de digitação.
  keys: [
    { name: 'title', weight: 0.5 },       // Dá mais peso ao título
    { name: 'date', weight: 0.5 },
    { name: 'category', weight: 0.2 },
    { name: 'excerpt', weight: 0.1 }
  ]
};

const fuse = new Fuse(searchIndex, fuseOptions);
//console.log(fuse)
export async function GET(request:string) {
  //const { searchParams } = new URL(request.url);
  const query = request || "";
  //console.log(query)

  if (!query) {
    return NextResponse.json([]);
  }

  // O Fuse.js faz a busca tolerante a erros de digitação (ex: "tecnlogia" -> "tecnologia")
  const results = fuse.search(query);
  //console.log(results)

  // Mapeia para retornar apenas os objetos das notícias encontradas
  const noticiasEncontradas = results.map((result) => result.item);
  //console.log(noticiasEncontradas);

  return noticiasEncontradas;
}
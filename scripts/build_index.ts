// Esse arquivo tem uma função que lerá as noticias dos arquivos json, ela vai rodar no Node.js, ler a pasta content/noticias e criar o arquivo public/search-index.json contendo apenas o essencial para a busca.
import fs from 'fs';
import path from 'path';
//import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content/noticias');
const outputPath = path.join(process.cwd(), 'public/search-index.json');

function generateSearchIndex() {
  try {
    // Garante que a pasta public exista
    if (!fs.existsSync(contentDirectory)) {
      console.log('Pasta de conteúdos não encontrada.');
      return;
    }

    const files = fs.readdirSync(contentDirectory);

    const indexData = files
      .filter((file) => file.endsWith('.json'))
      .map((file) => {
        const slug = file.replace(/\.json$/, '');
        const filePath = path.join(contentDirectory, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const dados = JSON.parse(fileContent);
        //console.log(dados);
        // Extrai o frontmatter do MDX
        const data = dados.metadados;

        return {
          slug,
          title: data.title || '',
          date: data.date || '',
          category: data.category || '',
          excerpt: data.excerpt || '',
          image: data.image || ''
        };
      });

    // Salva o JSON compilado dentro da pasta /public
    fs.writeFileSync(outputPath, JSON.stringify(indexData, null, 2));
    console.log(`✅ Índice de busca gerado com sucesso! (${indexData.length} notícias)`);
  } catch (error) {
    console.error('❌ Erro ao gerar índice de busca:', error);
  }
}

generateSearchIndex();
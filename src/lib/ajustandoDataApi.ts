// --- NOVA FUNÇÃO: FORMATA A DATA ---
export function formatDate(dateString: string): string {
  // Verifica se a string de data é válida e está no formato esperado "DD/MM/AAAA"
  if (!dateString || !/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) {
    return dateString; // Retorna a string original se o formato for inválido
  }

  const [day, month, year] = dateString.split('/');

  const monthNames = [
    "janeiro", "fevereiro", "março", "abril", "maio", "junho",
    "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
  ];

  const monthIndex = parseInt(month, 10) - 1;

  // Validação para o caso de um mês inválido (ex: 13)
  if (monthIndex < 0 || monthIndex >= 12) {
    return dateString;
  }

  return `${parseInt(day, 10)} de ${monthNames[monthIndex]} de ${year}`;
}




export function organizaNoticiasPorData(posts: any[]): any[] {
  //Vai organizar as noticias num novo array por data no sentido decrescente
  // Cria uma cópia do array para não modificar o original
  const postsOrdenados = [...posts];
  //console.log(postsOrdenados)

  postsOrdenados.sort((a, b) => {
    // Função para converter "DD/MM/AAAA" para um objeto Date
    const stringParaData = (dateString: string): Date => {
      const [day, month, year] = dateString.split('/').map(Number);
      return new Date(year, month - 1, day);
    };
    //console.log(b)

    const dataA = stringParaData(a.metadata.date);
    const dataB = stringParaData(b.metadata.date);

    // Compara as datas em ordem decrescente (da mais nova para a mais antiga)
    return dataB.getTime() - dataA.getTime();
  });

  return postsOrdenados;
}
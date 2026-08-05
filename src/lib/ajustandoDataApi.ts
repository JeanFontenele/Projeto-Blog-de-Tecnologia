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
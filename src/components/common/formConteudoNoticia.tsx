//COMPONENTE PARA CRIAR OS TIPOS DE INPUT PARA CADASTRAR NOTICIA
'use client';

import { useState } from 'react';

// Interface para cada bloco de conteúdo
export interface BlocoConteudo {
  id: string;
  type: 'titulo' | 'subtitulo' | 'subtitulo2' | 'paragrafo' | 'lista' | 'imagem';
  value: string;
}

interface FormularioProps {
  onChangeConteudo: any[];
}

export function FormularioConteudoNoticia({onChangeConteudo}:FormularioProps) {

  const [tipoSelecionado, setTipoSelecionado] = useState<BlocoConteudo['type']>('paragrafo');
  const [blocos, setBlocos] = useState<BlocoConteudo[]>([]);

  // Função auxiliar para atualizar o estado local e notificar o componente Pai
  const notificarPai = (novosBlocos: BlocoConteudo[]) => {
    setBlocos(novosBlocos);
    onChangeConteudo = novosBlocos; // Envia o novo array de objetos para o pai
  };

  console.log(blocos)

  // Adiciona um novo campo ao array de blocos
  const adicionarCampo = () => {
    const novosBlocos: BlocoConteudo[] = [
      ...blocos,
      { 
        id: crypto.randomUUID(), 
        type: tipoSelecionado, 
        value: '' 
      },
    ]
    notificarPai(novosBlocos);
  };

  // Atualiza o valor de um campo específico
  const atualizarValorBloco = (id: string, novoValor: string) => {
    const novosBlocos = blocos.map((bloco) =>
      bloco.id === id ? { ...bloco, value: novoValor } : bloco
    );
    notificarPai(novosBlocos);
  };
  
  // Remove um campo da lista
  const removerCampo = (id: string) => {
    const novosBlocos = blocos.filter((bloco) => bloco.id !== id);
    notificarPai(novosBlocos);
  };





  return (
    <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Montar Conteúdo da Notícia</h2>

      {/* Controles para Adicionar Novo Campo */}
      <div className="flex gap-3 mb-6">
        <select
          value={tipoSelecionado}
          onChange={(e) => setTipoSelecionado(e.target.value as BlocoConteudo['type'])}
          className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
        >
          <option value="titulo">Título (H1)</option>
          <option value="subtitulo">Subtítulo (H2)</option>
          <option value="subtitulo2">Subtítulo secundário (H3)</option>
          <option value="paragrafo">Parágrafo</option>
          <option value="lista">Lista (itens separados por vírgula)</option>
          <option value="imagem">Imagem (URL)</option>
        </select>

        <button
          type="button"
          onClick={adicionarCampo}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md transition-colors"
        >
          + Adicionar Campo
        </button>
      </div>

      {/* Lista Dinâmica de Campos Adicionados */}
      <div className="space-y-4">
        {blocos.map((bloco, index) => (
          <div key={bloco.id} className="p-4 border border-gray-200 rounded-md bg-gray-50 relative">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                #{index + 1} - {bloco.type}
              </span>
              <button
                type="button"
                onClick={() => removerCampo(bloco.id)}
                className="text-red-500 hover:text-red-700 text-xs font-semibold"
              >
                Remover
              </button>
            </div>

            {/* Renderização condicional do tipo de Input */}
            {bloco.type === 'paragrafo' ? (
              <textarea
                rows={3}
                placeholder="Digite o texto do parágrafo..."
                value={bloco.value}
                onChange={(e) => atualizarValorBloco(bloco.id, e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md text-gray-800"
              />
            ) : bloco.type === 'lista' ? (
              <textarea
                rows={2}
                placeholder="Digite os itens separados por vírgula (ex: Item 1, Item 2, Item 3)"
                value={bloco.value}
                onChange={(e) => atualizarValorBloco(bloco.id, e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md text-gray-800"
              />
            ) : (
              <input
                type="text"
                placeholder={
                  bloco.type === 'imagem'
                    ? 'Cole a URL da imagem (ex: /imagens/noticia1.jpg)'
                    : `Digite o ${bloco.type}...`
                }
                value={bloco.value}
                onChange={(e) => atualizarValorBloco(bloco.id, e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md text-gray-800"
              />
            )}
          </div>
        ))}
      </div>

      {/* Exemplo de visualização do JSON gerado */}
      {blocos.length > 0 && (
        <div className="mt-8 p-4 bg-slate-900 text-slate-100 rounded-md">
          <p className="text-xs font-mono text-slate-400 mb-2">// Estrutura de saída JSON:</p>
          <pre className="text-xs font-mono overflow-x-auto">
            {JSON.stringify(
              blocos.map((b) => ({
                type: b.type,
                value: b.type === 'lista' ? b.value.split(',').map((i) => i.trim()) : b.value,
              })),
              null,
              2
            )}
          </pre>
        </div>
      )}
    </div>
  );
}
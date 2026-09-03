//COMPONENTE PARA CRIAR OS TIPOS DE INPUT PARA CADASTRAR NOTICIA
'use client';

import { useState } from 'react';

export interface BlocoConteudo {
  id: string;
  type: string;
  value: string;
}

export function FormularioConteudoNoticia() {
  const [tipoSelecionado, setTipoSelecionado] = useState('paragrafo');
  const [blocos, setBlocos] = useState<BlocoConteudo[]>([]);
  
  const adicionarCampo = () => {
    setBlocos([
      ...blocos,
      { id: crypto.randomUUID(), type: tipoSelecionado, value: '' },
    ]);
  };

  const atualizarValor = (id: string, valor: string) => {
    setBlocos(blocos.map((b) => (b.id === id ? { ...b, value: valor } : b)));
  };

  const removerCampo = (id: string) => {
    setBlocos(blocos.filter((b) => b.id !== id));
  };




  
  return (
    <div className="p-4 bg-white rounded-lg border my-4">
      {/* ⚠️ CAMPO OCULTO: Transmite os blocos no FormData da submissão do pai */}
      <input
        type="hidden"
        name="content"
        value={JSON.stringify(
          blocos.map((b) => ({
            type: b.type,
            value: b.type === 'lista' ? b.value.split(',').map((i) => i.trim()) : b.value,
          }))
        )}
      />

      <div className="flex gap-2 mb-4">
        <select
          value={tipoSelecionado}
          onChange={(e) => setTipoSelecionado(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="titulo">Título (H1)</option>
          <option value="subtitulo">Subtitulo (H2)</option>
          <option value="subtitulo2">Subtitulo2 (H3)</option>
          <option value="paragrafo">Parágrafo</option>
          <option value="imagem">Imagem (URL)</option>
          <option value="lista">Lista</option>
        </select>
        <button
          type="button"
          onClick={adicionarCampo}
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          + Adicionar Bloco
        </button>
      </div>

      {blocos.map((bloco) => (
        <div key={bloco.id} className="mb-3 p-2 bg-gray-50 border rounded">
          <span className="text-xs font-bold uppercase text-blue-600">{bloco.type}</span>
          <input
            type="text"
            value={bloco.value}
            onChange={(e) => atualizarValor(bloco.id, e.target.value)}
            className="w-full p-2 border rounded mt-1"
            placeholder={`Conteúdo do ${bloco.type}`}
          />
          <button
            type="button"
            onClick={() => removerCampo(bloco.id)}
            className="text-red-500 text-xs mt-1"
          >
            Remover
          </button>
        </div>
      ))}
    </div>
  );
}
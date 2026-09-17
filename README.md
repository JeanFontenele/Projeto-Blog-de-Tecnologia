This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


VERSÃO DE REPOSITÓRIO
------------------------------------------------------------------------------------

# 🚀 Arquitetura do Projeto — Portal de Tecnologia & Notícias

Este projeto foi desenvolvido utilizando **Next.js (App Router)** com uma arquitetura moderna, escalável e focada em **SEO (Search Engine Optimization)**, **Performance (Core Web Vitals)** e **Separação de Responsabilidades (SoC)**.

---

## 🏛️ Visão Geral da Arquitetura

A estrutura adota o padrão **Feature-Based Routing (Roteamento Baseado em Recursos)** combinado com o modelo de renderização híbrida do Next.js. A aplicação é dividida em três camadas principais:

1. **Camada de Roteamento e Páginas (`src/app`):** Define a hierarquia de URLs, gerencia os *layouts* e realiza o consumo de dados diretamente no servidor (Server Components).
2. **Camada de Componentes (`src/components`):** Reúne a interface visual dividida por contexto (componentes globais, blocos de publicidade e elementos para tutoriais/código).
3. **Camada de Dados e Integração (`src/lib`):** Centraliza a lógica de comunicação com APIs externas, banco de dados e manipuladores de conteúdo.

---

## 📂 Estrutura de Pastas e Responsabilidades

```text
meu-portal-tech/
├── public/              # Arquivos estáticos públicos (Favicon, imagens de marca, robots.txt, sitemap.xml)
├── src/
│   ├── app/             # Camada de Aplicação e Roteamento (App Router)
│   │   ├── layout.tsx   # Layout raiz (SEO global, fontes, scripts do Google Adsense)
│   │   ├── page.tsx     # Home Page (Destaques, notícias recentes e chamadas)
│   │   ├── noticias/    # Domínio de Notícias (Conteúdo datado/dinâmico)
│   │   │   ├── page.tsx          # Feed/Listagem de notícias
│   │   │   └── [slug]/page.tsx   # Página de artigo individual (Renderização Estática/SSG)
│   │   ├── tutoriais/   # Domínio de Tutoriais (Conteúdo Evergreen)
│   │   │   ├── page.tsx          # Índice de guias e tutoriais
│   │   │   └── [slug]/page.tsx   # Página do tutorial individual com syntax highlight
│   │   └── api/         # Endpoints internos/BFF (Backend-For-Frontend), se necessário
│   │
│   ├── components/      # Componentes de Interface Reutilizáveis
│   │   ├── common/      # Elementos genéricos de UI (Header, Footer, Cards, Botões)
│   │   ├── ads/         # Componentes dedicados à inserção de Anúncios (Google AdSense)
│   │   └── tutorial/    # Componentes para tutoriais (Blocos de código, caixas de aviso)
│   │
│   ├── lib/             # Lógica de Negócio e Serviços
│   │   └── api.js       # Funções de busca/fetch de dados (Headless CMS, DB ou APIs)
│   │
│   ├── styles/          # Estilos globais e tokens de design (Tailwind CSS)
│   └── types/           # Definições de tipos (TypeScript)
│
├── .env.local           # Variáveis de ambiente (Chaves de API, AdSense IDs)
└── next.config.js       # Configurações do ecossistema Next.js

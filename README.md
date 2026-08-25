# Simulador Falcon

Site e simulador de crédito da Falcon, desenvolvido com React, TypeScript, Vite e Tailwind CSS.

## Desenvolvimento local

```sh
npm install
npm run dev
```

Crie um arquivo `.env.local` usando `.env.example` como referência para apontar o frontend ao Worker da Meta Conversions API.

## Validação

```sh
npm run lint
npm run build
npx tsc -p cloudflare/falcon-conversions-api/tsconfig.json
```

## Publicação

O frontend é publicado automaticamente no GitHub Pages pelo workflow `.github/workflows/deploy.yml`. O Worker da Conversions API possui instruções próprias em `cloudflare/falcon-conversions-api/README.md`.

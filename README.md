# Jiu Jitsu Unicamp - Protótipo

Protótipo do site da equipe de Jiu Jitsu da Unicamp, desenvolvido com React, Vite e Tailwind CSS.

## 🚀 Como rodar localmente

### Pré-requisitos
- Node.js (v20+ recomendado)
- npm

### Passos
1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
3. Acesse `http://localhost:5173`

## 🐳 Como rodar com Docker

O projeto possui configuração pronta para Docker (Nginx servindo o build estático).

### Build da Imagem
```bash
docker build -t jiujitsu-unicamp .
```

### Rodar o Container
```bash
docker run -p 8080:80 jiujitsu-unicamp
```
O site estará disponível em `http://localhost:8080`.

## 📂 Estrutura de Pastas (Refatorada)

- `src/layouts`: Componentes de layout (ex: Header, Footer, Wrapper).
- `src/data`: Dados estáticos da aplicação.
- `src/pages`: Páginas principais (Rotas).
- `src/components`: Componentes reutilizáveis.

<div align="center">
  <h1>Puzz-Multigames</h1>
  <p><strong>Hub de Jogos Moderno e Offline (PWA)</strong></p>
</div>

<div align="center">
Bem-vindo ao <strong>Puzz-Multigames</strong>, um hub de jogos clássicos totalmente refeito para a web moderna. Divirta-se com jogos envolventes, jogue offline e experimente uma nova interface <em>Dark Neon</em>. ✨🎮
</div>
<br/>

## 🖥️ Tecnologias Utilizadas

Este projeto foi construído utilizando tecnologias modernas de front-end:

- **[React 18](https://reactjs.org/)**: Biblioteca JavaScript para construção de interfaces de usuário reativas.
- **[TypeScript](https://www.typescriptlang.org/)**: Superset tipado de JavaScript para maior segurança e escalabilidade.
- **[Vite](https://vitejs.dev/)**: Ferramenta de build super-rápida e ambiente de desenvolvimento.
- **[Tailwind CSS](https://tailwindcss.com/)**: Framework CSS utility-first para criação da interface Dark Neon e Glassmorphism.
- **[LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)**: Para persistência dos dados dos jogos e recordes diretamente no navegador.

## 🧩 Jogos Disponíveis (7 + Minigame Especial)

Atualmente, o Puzz-Multigames conta com uma coleção variada de jogos, cada um com sua própria identidade visual neon:

- **Pokémon Hunter (Minigame)**: Um minigame exclusivo da tela inicial! Capture Pokémons da 1ª geração que correm pela tela adivinhando seus nomes. 🏃‍♂️💨
- **Wordle (PT-BR)**: O famoso jogo de adivinhação de palavras, agora com um dicionário completo de português brasileiro de 5 letras.
- **Quebra-cabeça (Slide Puzzle)**: Deslize as peças para montar a imagem. Agora com uma **galeria de temas** (Natureza, Cyberpunk, Espaço, Gatos) e suporte a URLs customizadas. 🧩
- **2048**: Combine blocos para alcançar o mágico 2048 em uma interface ultra-moderna. 🔢
- **Jogo da Memória (Memory Match)**: Encontre os pares e evite as bombas! 🃏
- **Cobrinha (Snake Arcade)**: O clássico jogo da cobrinha em uma versão arcade moderna com efeitos neon. 🐍
- **Neon Racer**: Um jogo de corrida retrô onde você desvia de obstáculos em alta velocidade. 🏎️
- **Jogo da Velha (Tic-Tac-Toe)**: Desafie a máquina ou um amigo no clássico 3x3.

## ✨ Funcionalidades

- **Identidade Visual "Electric Blue & Gold"**: Uma paleta de cores refinada substituindo o roxo padrão por tons vibrantes de azul e amarelo, proporcionando uma experiência premium.
- **100% em Português (PT-BR)**: Interface, mensagens e dicionários totalmente localizados para o Brasil.
- **Minigame Integrado (PokeAPI)**: Integração em tempo real com a PokeAPI para o minigame de captura na Home.
- **Progressive Web App (PWA)**: Pode ser instalado no celular ou desktop e funciona **totalmente offline**.
- **Design System Moderno**: Efeitos em *glassmorphism*, micro-animações e sombras neon imersivas.
- **Persistência de Recordes**: Seus recordes e pontuações máximas são salvos automaticamente via `localStorage`.
- **Controles Adaptáveis**: Suporte total para Mouse, Teclado (setas e WASD) e gestos de Toque (*swipe*).

## 🛠️ Como rodar o projeto

Siga os passos abaixo para rodar o projeto localmente:

### Pré-requisitos

- [Node.js](https://nodejs.org/en/) (v16+)
- Um gerenciador de pacotes (NPM ou Yarn)

### 1. Clonar o repositório

```sh
git clone https://github.com/SantWRL/Puzz-Multigames.git
cd Puzz-Multigames
cd Puzz-Multigames
```

### 2. Instalar dependências

```sh
npm install
# ou
yarn install
```

### 3. Executar em modo de desenvolvimento

```sh
npm run dev
# ou
yarn dev
```

O projeto estará rodando no endereço `http://localhost:5173`. Abra no seu navegador para ver o app!

### 4. Build para Produção

Para gerar a versão otimizada de produção:

```sh
npm run build
# ou
yarn build
```

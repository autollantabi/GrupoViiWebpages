import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: "Raleway", sans-serif;
    font-optical-sizing: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.6;
    color: #333;
  }

  /* Scroll personalizado global */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.lightGray || '#f1f1f1'};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary || '#79c3d2'};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.accent || theme.colors.primary || '#79c3d2'};
  }

  /* Para Firefox */
  * {
    scrollbar-width: thin;
    scrollbar-color: ${({ theme }) => `${theme.colors.primary || '#79c3d2'} ${theme.colors.lightGray || '#f1f1f1'}`};
  }

  /* Estilos para enlaces */
  a {
    color: inherit;
    text-decoration: none;
  }

  /* Estilos para botones */
  button {
    border: none;
    background: none;
    cursor: pointer;
    font-family: inherit;
  }

  /* Estilos para inputs */
  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
  }

  /* Estilos para imágenes */
  img {
    max-width: 100%;
    height: auto;
  }

  /* Estilos para listas */
  ul, ol {
    list-style: none;
  }

  /* Estilos para headings */
  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.2;
  }

  /* Estilos para párrafos */
  p {
    margin-bottom: 1rem;
  }

  /* Estilos para el foco */
  :focus {
    /* outline: 2px solid ${({ theme }) => theme.colors.primary || '#79c3d2'}; */
    outline-offset: 2px;
  }

  /* Estilos para selección de texto */
  ::selection {
    background-color: ${({ theme }) => theme.colors.primary || '#79c3d2'};
    color: white;
  }

  /* Estilos para scroll suave */
  html {
    scroll-behavior: smooth;
  }

  /* Estilos para elementos con scroll */
  .scrollable {
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: ${({ theme }) => `${theme.colors.primary || '#79c3d2'} ${theme.colors.lightGray || '#f1f1f1'}`};
  }

  .scrollable::-webkit-scrollbar {
    width: 8px;
  }

  .scrollable::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.lightGray || '#f1f1f1'};
    border-radius: 4px;
  }

  .scrollable::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary || '#79c3d2'};
    border-radius: 4px;
  }

  .scrollable::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.accent || theme.colors.primary || '#79c3d2'};
  }
`;

export default GlobalStyle;
import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  :root {
    --site-color: royalblue;
    --divider-color: rgba(0, 0, 0, 0.4);
  }

  html {
    font: 100%/1.5 system-ui;
    scroll-behavior: smooth;
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
  }
  
  a:hover {
    color: var(--site-color);
    text-decoration-color: currentcolor;
    text-decoration-thickness: 2px;
  }

  h1,
  p {
    margin-bottom: 1.5rem;
  }

  code {
    font-family: 'Menlo';
  }
`

export default GlobalStyles

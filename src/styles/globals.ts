import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html, body, #__next {
    height: 100vh;
    margin: 0;
    background-color: #f2f2f2;
    color: #333;
  }

  * {
    box-sizing: border-box;
  }

  input,
  select {
    padding: 0.25rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    height: 2rem;
    background-color: #fff;
    color: #333;
  }

  button {
    height: 2rem;
  }
`;

export default GlobalStyle;

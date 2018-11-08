import { createGlobalStyle } from 'styled-components';
import Roboto from 'roboto-fontface/fonts/roboto/Roboto-Regular.woff';

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Roboto';
    src: ${Roboto}
  }  

* {
    box-sizing: border-box;
  }  

  body {
    margin: 0;
    padding: 0;
    background-color: #E5E5E5;
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    line-height: 16px;
  }
`;

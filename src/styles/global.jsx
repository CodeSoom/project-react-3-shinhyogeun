import React from 'react';
import { Global, css } from '@emotion/react';

const GlobalStyle = () => (
  <Global
    styles={css`
      @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@1,800&display=swap');

      * {
        color: black;
      }
      
      body{
        background-color: whitesmoke;
        min-width: 1000px;
        margin:0;
        padding:0 0 100px 0;
      }

    `}
  />
);

export default GlobalStyle;

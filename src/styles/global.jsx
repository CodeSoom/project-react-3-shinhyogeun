import React from 'react';
import { Global, css } from '@emotion/react';

const GlobalStyle = () => (
  <Global
    styles={css`
      @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@1,800&display=swap');
      
      * {
        background-color: whitesmoke;
      }
    `}
  />
);

export default GlobalStyle;

import React from 'react';

import { useSelector } from 'react-redux';

import styled from '@emotion/styled';

import { get } from '../services/utils';

const BluredBackground = styled.div`
   & {
     position : fixed;
     top: 0;
     left: 0;
     right: 0;
     bottom: 0;
     background-image: linear-gradient(rgba(0, 0, 0, 0.63), rgba(0, 0, 0, 0.623)), url("${({ url }) => url}");
     background-position: center;
     background-repeat: no-repeat;
     background-size: cover;
     background-color: #6C8AA3;
     z-index: -1; 
   }

   &:before {
     content: "";
     position: absolute;
     width: 100%;
     height: 100%;
     backdrop-filter: blur(30px);
   }
 `;

export default function BackgroundContainer() {
  const { url } = useSelector(get('player'));

  return (<BluredBackground url={url} />);
}

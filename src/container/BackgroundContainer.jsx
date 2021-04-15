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
     background-color: rgba(0, 0, 0, 0.95);
     z-index: -1; 
   }
   & div {
    position : fixed;
    top: -50px;
    left: -50px;
    right: -50px;
    bottom: -50px;
    background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("${({ url }) => url}");
    background-position: center;
    background-size: cover;
    transform: scale(1.3);
    filter: blur(25px);
   }
 `;

export default function BackgroundContainer() {
  const { url } = useSelector(get('player'));

  return (
    <BluredBackground url={url}>
      <div />
    </BluredBackground>
  );
}

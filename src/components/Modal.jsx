import React from 'react';
import styled from '@emotion/styled';

const ModalOverlay = styled.div(({ visible }) => ({
  boxSizing: 'border-box',
  display: `${visible ? 'block' : 'none'}`,
  position: 'fixed',
  top: '0',
  left: '0',
  bottom: '0',
  right: '0',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: '999',
}));

const ModalWrapper = styled.div(({ visible }) => ({
  boxSizing: 'border-box',
  display: `${visible ? 'block' : 'none'}`,
  position: 'fixed',
  top: '0',
  right: '0',
  bottom: '0',
  left: '0',
  zIndex: '1000',
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  overflow: 'auto',
  outline: '0',
}));

const ModalInner = styled.div(() => ({
  boxSizing: 'border-box',
  position: 'relative',
  boxShadow: '0 0 6px 0 rgba(0, 0, 0, 0.5)',
  backgroundColor: 'black',
  borderRadius: '10px',
  border: '1px solid red',
  width: '360px',
  padding: '5px',
  maxWidth: '480px',
  top: '50%',
  transform: 'translateY(-50%)',
  margin: '0 auto',
}));

export default function Modal({ visible, children }) {
  return (
    <>
      <ModalOverlay visible={visible} />
      <ModalWrapper tabIndex="-1" visible={visible}>
        <ModalInner tabIndex="0" className="modal-inner">
          {children}
        </ModalInner>
      </ModalWrapper>
    </>
  );
}

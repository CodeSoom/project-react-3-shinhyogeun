import React from 'react';

import { useSelector } from 'react-redux';
import styled from '@emotion/styled';

import { get } from '../services/utils';

const AddedModal = styled.div({
  position: 'fixed',
  bottom: '120px',
  width: '100%',
  minWidth: '1000px',
  display: 'flex',
  justifyContent: 'center',
  '& div': {
    color: 'black',
    padding: '5px 12px',
    backgroundColor: 'rgba(256, 256, 256, 0.8)',
    borderRadius: '10px',
  },
});

export default function AddedModalContainer() {
  const { visible, musicAlreadyIn } = useSelector(get('modalInfo'));

  if (visible) {
    return (
      <AddedModal>
        <div>
          {musicAlreadyIn ? '이미 추가된 음악입니다.' : '음악이 플레이리스트에 추가되었습니다.'}
        </div>
      </AddedModal>
    );
  }
  return <div />;
}

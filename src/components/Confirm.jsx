import React from 'react';

import styled from '@emotion/styled';

const Check = styled.div({
  color: 'black',
});

export default function Confirm({ onClickConfirm, onClickNotConfirm }) {
  return (
    <Check>
      <p>삭제하시겠습니까?</p>
      <div>
        <button
          type="button"
          onClick={onClickConfirm}
        >
          확인
        </button>
        <button
          type="button"
          onClick={onClickNotConfirm}
        >
          취소
        </button>
      </div>
    </Check>
  );
}

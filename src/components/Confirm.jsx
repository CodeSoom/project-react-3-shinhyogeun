import React from 'react';

export default function Confirm({ onClickConfirm, onClickNotConfirm }) {
  return (
    <div>
      삭제하시겠습니까?
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
  );
}

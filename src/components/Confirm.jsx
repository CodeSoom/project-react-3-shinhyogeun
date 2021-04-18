import React from 'react';

import styled from '@emotion/styled';
import Button from '../styles/Button';

const Check = styled.div({
  fontFamily: 'Montserrat, sans-serif',
  '& > div:nth-of-type(1)': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& p': {
      marginRight: '5px',
    },
  },
  '& > div:nth-of-type(2)': {
    display: 'flex',
    justifyContent: 'space-evenly',
    '& > div:nth-of-type(1) > div': {
      margin: '0',
      padding: '3px 10px',
      ':hover': {
        cursor: 'pointer',
        color: '#03D944',
      },
    },
    '& > div:nth-of-type(2) > div': {
      margin: '0',
      padding: '3px 10px',
      ':hover': {
        cursor: 'pointer',
        color: 'red',
      },
    },
  },
  '& img': {
    width: '80px',
    height: '80px',
    borderRadius: '5px',
    margin: '5px',
  },
  '& > p': {
    margin: '0 10px',
    padding: '10px',
    textAlign: 'center',
  },
  '& div': {
    visibility: 'visible',
  },
});

export default function Confirm({ deletedVideo, onClickConfirm, onClickNotConfirm }) {
  const { url, title } = deletedVideo || {};

  return (
    <Check>
      <div>
        <img src={url} alt="thumbnail" />
        <p>{title}</p>
      </div>
      <p>정말로 삭제하시겠습니까?</p>
      <div>
        <Button
          type="button"
          onClick={onClickConfirm}
        >
          <div>Yes</div>
        </Button>
        <Button
          type="button"
          onClick={onClickNotConfirm}
        >
          <div>No</div>
        </Button>
      </div>
    </Check>
  );
}

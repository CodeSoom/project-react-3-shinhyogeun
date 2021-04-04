import React, { useCallback } from 'react';

import styled from '@emotion/styled';

const Item = styled.li({
  fontFamily: 'Montserrat, sans-serif',
  width: '700px',
  display: 'flex',
  alignItems: 'center',
  padding: '10px',
  border: '2px solid darkturquoise',
  borderRadius: '30px',
  margin: '15px 0 0 0',
  '&:hover': {
    '& > :nth-of-type(2)': {
      display: 'flex',
    },
    cursor: 'pointer',
  },
  '& img': {
    width: '100px',
    height: '100px',
    border: '2px solid black',
    borderRadius: '20px',
  },
  '& > div:nth-of-type(1)': {
    width: '370px',
    marginLeft: '10px',
  },

  '& p': {
    fontSize: '17px',
    backgroundColor: 'transparent',
  },
});

const PlayButton = styled.div({
  width: '100px',
  height: '40px',
  display: 'none',
  justifyContent: 'center',
  alignItems: 'center',
  border: '2px solid black',
  borderRadius: '10px',
  boxShadow: '0px 5px 5px black',
  marginLeft: '100px',
  '& div': {
    marginLeft: '5px',
  },
});

export default function Song({ resultToken, music, onListenClick }) {
  const {
    id: { videoId },
    snippet: {
      title,
      thumbnails: {
        high: { url },
      },
    },
  } = music;

  const handleClick = useCallback(() => {
    onListenClick({
      resultToken, videoId, title, url,
    });
  }, [resultToken, onListenClick, videoId, title, url]);

  return (
    <Item onClick={handleClick}>
      <img src={url} alt="thumbnails" />
      <div>
        <p>{title}</p>
      </div>
      <PlayButton className="play-btn">
        <i className="fas fa-play" />
        <div>Play</div>
      </PlayButton>
    </Item>
  );
}

import React, { useCallback } from 'react';

import styled from '@emotion/styled';

const Item = styled.li({
  fontFamily: 'Montserrat, sans-serif',
  position: 'relative',
  width: '220px',
  height: '272px',
  padding: '10px',
  margin: '15px 0 0 0',
  '&:hover': {
    '& > :nth-of-type(2)': {
      visibility: 'visible',
    },
    '& > img': {
      filter: 'blur(2px)',
    },
    cursor: 'pointer',
  },
  '& img': {
    width: '220px',
    height: '220px',
    objectFit: 'cover',
    borderRadius: '4px',
  },
  '& > div:nth-of-type(1)': {
    width: '220px',
  },

  '& p': {
    fontSize: '12px',
    backgroundColor: 'transparent',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: '2',
    WebkitBoxOrient: 'vertical',
    wordWrap: 'break-word',
    lineHeight: '1.2em',
    height: '2.4em',
  },
});

const PlayButton = styled.div({
  fontSize: '20px',
  visibility: 'hidden',
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
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
      </PlayButton>
    </Item>
  );
}

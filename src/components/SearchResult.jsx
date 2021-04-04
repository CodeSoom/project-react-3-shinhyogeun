import React from 'react';

import styled from '@emotion/styled';

import Song from './Song';

import List from '../styles/List';

const SeeMore = styled.button({
  border: 'none',
  marginTop: '30px',
  fontFamily: 'Montserrat, sans-serif',
  fontSize: '30px',
  '&:hover': {
    cursor: 'pointer',
  },
});

export default function SearchResult({ musics, onMoreClick, onListenClick }) {
  return (
    <>
      <List>
        <div>
          {musics?.map((music) => (
            <Song
              resultToken
              key={String(music.id.videoId)}
              music={music}
              onListenClick={onListenClick}
            />
          ))}
        </div>
        <SeeMore type="button" onClick={onMoreClick}>See More</SeeMore>
      </List>
    </>
  );
}

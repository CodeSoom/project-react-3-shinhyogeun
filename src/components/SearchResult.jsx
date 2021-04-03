import React from 'react';

import styled from '@emotion/styled';

import Song from './Song';

const List = styled.ul({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  listStyle: 'none',
  padding: '0',
});

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

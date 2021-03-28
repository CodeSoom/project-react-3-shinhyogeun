import React from 'react';

import Song from './Song';

export default function SearchResult({ musics, onMoreClick, onListenClick }) {
  return (
    <>
      <ul>
        {musics?.map((music) => (
          <Song
            key={String(music.id.videoId)}
            music={music}
            onListenClick={onListenClick}
          />
        ))}
      </ul>
      <button type="button" onClick={onMoreClick}>See More</button>
    </>
  );
}

import React from 'react';

import Song from './Song';

export default function SearchResult({ onClick, musics }) {
  return (
    <>
      <ul>
        {musics?.map((music, index) => (
          <Song key={String(index)} music={music} />
        ))}
      </ul>
      <button type="button" onClick={onClick}>See More</button>
    </>
  );
}

import YouTube from '@u-wave/react-youtube';

import React from 'react';

import { useSelector } from 'react-redux';

import SearchFormContainer from './container/SearchFormContainer';

export default function App() {
  const { musics } = useSelector((state) => ({
    musics: state.musics,
  }));
  return (
    <>
      <h1>My PlayList</h1>
      <SearchFormContainer />
      <ul>
        {musics?.map(({ id: { videoId } }, index) => (
          <li key={String(index)}><YouTube video={videoId} /></li>
        ))}
      </ul>
    </>
  );
}

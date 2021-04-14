import React, { useCallback, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import SearchResult from '../components/SearchResult';

import {
  listenMusic,
  searchMoreMusic,
  searchMusic,
} from '../redux/slice';

import { get } from '../services/utils';

export default function SearchResultContainer({ keyword }) {
  const dispatch = useDispatch();

  const musics = useSelector(get('musics'));
  const nextPageToken = useSelector(get('nextPageToken'));

  useEffect(() => {
    dispatch(searchMusic(keyword));
  }, [keyword]);

  const handleMoreClick = useCallback(() => {
    dispatch(searchMoreMusic(keyword, nextPageToken));
  }, [dispatch, keyword, nextPageToken]);

  const handleListenClick = useCallback(({
    resultToken, videoId, title, url,
  }) => {
    dispatch(listenMusic({
      resultToken, videoId, title, url,
    }));
  }, [dispatch]);

  return (
    <SearchResult
      onMoreClick={handleMoreClick}
      onListenClick={handleListenClick}
      musics={musics}
      nextPageToken={nextPageToken}
    />
  );
}

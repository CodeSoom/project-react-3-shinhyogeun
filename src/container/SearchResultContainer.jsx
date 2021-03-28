import React, { useCallback, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import SearchResult from '../components/SearchResult';

import { searchMoreMusic, searchMusic, setPalyer } from '../redux/slice';

import { get } from '../services/utils';

export default function SearchResultContainer({ keyword }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchMusic(keyword));
  }, [keyword]);

  const musics = useSelector(get('musics'));
  const nextPageToken = useSelector(get('nextPageToken'));

  const handleMoreClick = useCallback(() => {
    dispatch(searchMoreMusic(keyword, nextPageToken));
  }, [dispatch, keyword, nextPageToken]);

  const handleListenClick = useCallback(({ videoId, title, url }) => {
    dispatch(setPalyer({ videoId, title, url }));
  }, [dispatch]);

  return (
    <SearchResult
      onMoreClick={handleMoreClick}
      onListenClick={handleListenClick}
      musics={musics}
    />
  );
}

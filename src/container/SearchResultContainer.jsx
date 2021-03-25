import React, { useCallback, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import SearchResult from '../components/SearchResult';

import { searchMusic } from '../redux/slice';

import { get } from '../services/utils';

export default function SearchResultContainer({ keyword }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchMusic(keyword));
  }, []);

  const musics = useSelector(get('musics'));
  const nextPageToken = useSelector(get('nextPageToken'));

  const handleClick = useCallback(() => {
    dispatch(searchMusic(keyword, nextPageToken));
  }, [dispatch, keyword, nextPageToken]);

  return <SearchResult onClick={handleClick} musics={musics} />;
}

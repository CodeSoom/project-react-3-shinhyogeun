import React, { useCallback, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import SearchResult from '../components/SearchResult';

import { searchMoreMusic, searchMusic } from '../redux/slice';

import { get } from '../services/utils';

export default function SearchResultContainer({ keyword }) {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('찾아!');
    dispatch(searchMusic(keyword));
  }, [keyword]);

  const musics = useSelector(get('musics'));
  const nextPageToken = useSelector(get('nextPageToken'));

  const handleClick = useCallback(() => {
    dispatch(searchMoreMusic(keyword, nextPageToken));
  }, [dispatch, keyword, nextPageToken]);

  return <SearchResult onClick={handleClick} musics={musics} />;
}

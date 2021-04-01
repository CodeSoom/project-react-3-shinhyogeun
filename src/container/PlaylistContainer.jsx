import React, { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Playlist from '../components/Playlist';

import { setPalyer } from '../redux/slice';

import { get } from '../services/utils';

export default function PlaylistContainer() {
  const dispatch = useDispatch();

  const playlist = useSelector(get('playlist'));

  const handleClick = useCallback((music) => {
    dispatch(setPalyer(music));
  }, [dispatch, setPalyer]);

  return (<Playlist playlist={playlist} onClick={handleClick} />);
}

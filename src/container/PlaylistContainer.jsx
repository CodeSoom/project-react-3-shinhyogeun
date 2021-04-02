import React, { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Playlist from '../components/Playlist';

import { setPalyer, deleteMusic } from '../redux/slice';

import { get } from '../services/utils';

export default function PlaylistContainer() {
  const dispatch = useDispatch();

  const playlist = useSelector(get('playlist'));

  const handleClickListen = useCallback((music) => {
    dispatch(setPalyer(music));
  }, [dispatch, setPalyer]);

  const handleClickDelete = useCallback((music) => {
    dispatch(deleteMusic(music));
  }, [dispatch, setPalyer]);

  return (
    <Playlist
      playlist={playlist}
      onClickListen={handleClickListen}
      onClickDelete={handleClickDelete}
    />
  );
}
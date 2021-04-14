import React, { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Playlist from '../components/Playlist';

import { listenMusic, deletePlaylistMusic } from '../redux/slice';

import { get } from '../services/utils';

export default function PlaylistContainer() {
  const dispatch = useDispatch();

  const playlist = useSelector(get('playlist'));

  const handleClickListen = useCallback((paused, music) => {
    const resultToken = 0;
    dispatch(listenMusic(paused, { resultToken, ...music }));
  }, [dispatch, listenMusic]);

  const handleClickDelete = useCallback((music) => {
    dispatch(deletePlaylistMusic(music));
  }, [dispatch, deletePlaylistMusic]);

  return (
    <Playlist
      playlist={playlist}
      onClickListen={handleClickListen}
      onClickDelete={handleClickDelete}
    />
  );
}

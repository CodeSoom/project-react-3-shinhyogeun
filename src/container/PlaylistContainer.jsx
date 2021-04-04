import React, { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Playlist from '../components/Playlist';

import { setPalyer, deletePlaylistMusic } from '../redux/slice';

import { get } from '../services/utils';

export default function PlaylistContainer() {
  const dispatch = useDispatch();

  const playlist = useSelector(get('playlist'));

  const handleClickListen = useCallback((music) => {
    dispatch(setPalyer({ resultToken: 0, ...music }));
  }, [dispatch, setPalyer]);

  const handleClickDelete = useCallback((music) => {
    dispatch(deletePlaylistMusic(music));
  }, [dispatch, setPalyer]);

  return (
    <Playlist
      playlist={playlist}
      onClickListen={handleClickListen}
      onClickDelete={handleClickDelete}
    />
  );
}

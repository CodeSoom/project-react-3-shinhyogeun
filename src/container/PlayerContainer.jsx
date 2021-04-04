import React, { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Player from '../components/Player';

import { addPlaylistMusic, setNextMusic, setPreviousMusic } from '../redux/slice';

import { get } from '../services/utils';

export default function PlayerContainer() {
  const dispatch = useDispatch();

  const music = useSelector(get('player'));

  const handleClickNext = useCallback(() => {
    dispatch(setNextMusic(music));
  }, [music, dispatch, setNextMusic]);

  const handleClickPrevious = useCallback(() => {
    dispatch(setPreviousMusic(music));
  }, [music, dispatch, setPreviousMusic]);

  const handleClickAddPlaylistMusic = useCallback(() => {
    dispatch(addPlaylistMusic(music));
  }, [music]);

  if (!music?.videoId) {
    return (<></>);
  }

  return (
    <Player
      music={music}
      onClickNext={handleClickNext}
      onClickPrevious={handleClickPrevious}
      onClickAddPlaylistMusic={handleClickAddPlaylistMusic}
    />
  );
}

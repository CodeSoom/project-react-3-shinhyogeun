import React, { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Player from '../components/Player';

import {
  addPlaylistMusic,
  setNextMusic,
  setPreviousMusic,
  changePlayStyle,
  toggleMute,
  changeVolume,
} from '../redux/slice';

import { get } from '../services/utils';

export default function PlayerContainer() {
  const dispatch = useDispatch();

  const music = useSelector(get('player'));
  const playerInfo = useSelector(get('playerInfo'));

  const handleClickNext = useCallback(() => {
    dispatch(setNextMusic(music));
  }, [music, dispatch, setNextMusic]);

  const handleClickPrevious = useCallback(() => {
    dispatch(setPreviousMusic(music));
  }, [music, dispatch, setPreviousMusic]);

  const handleClickAddPlaylistMusic = useCallback(() => {
    dispatch(addPlaylistMusic(music));
  }, [music]);

  const handleClickPlayStyle = useCallback(() => {
    dispatch(changePlayStyle());
  }, [dispatch]);

  const handleClickMute = useCallback(() => {
    dispatch(toggleMute());
  }, [dispatch]);

  const handleClickVolume = useCallback((volume) => {
    dispatch(changeVolume(volume));
  }, [dispatch]);

  if (!music?.videoId) {
    return (<></>);
  }

  return (
    <Player
      music={music}
      playerInfo={playerInfo}
      onClickNext={handleClickNext}
      onClickPrevious={handleClickPrevious}
      onClickAddPlaylistMusic={handleClickAddPlaylistMusic}
      onClickMute={handleClickMute}
      onClickVolume={handleClickVolume}
      onClickPlayStyle={handleClickPlayStyle}
    />
  );
}

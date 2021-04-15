import React, { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import styled from '@emotion/styled';

import Player from '../components/Player';

import {
  addPlaylistMusic,
  setNextMusic,
  setPreviousMusic,
  changePlayStyle,
  toggleMute,
  changeSuffle,
  changeVolume,
  togglePaused,
} from '../redux/slice';

import { get } from '../services/utils';

const EmptyPlayer = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'gray',
  position: 'fixed',
  bottom: '0',
  left: '0',
  width: '100%',
  height: '90px',
  minWidth: '1000px',
  borderTop: '1px solid teal',
  '& > div': {
    fontSize: '30px',
    fontFamily: 'Montserrat, sans-serif',
    fontStyle: 'italic',
    color: 'white',
    backgroundColor: 'transparent',
  },
});

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

  const handleClickSuffle = useCallback(() => {
    dispatch(changeSuffle());
  }, [dispatch]);

  const handleTogglePaused = useCallback((paused) => {
    dispatch(togglePaused(paused));
  }, [dispatch]);

  if (!music?.videoId) {
    return ((
      <EmptyPlayer>
        <div>My Playlist</div>
      </EmptyPlayer>
    ));
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
      onClickSuffle={handleClickSuffle}
      onClickPaused={handleTogglePaused}
    />
  );
}

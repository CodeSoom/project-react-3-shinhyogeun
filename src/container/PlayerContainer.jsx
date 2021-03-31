import React, { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Player from '../components/Player';
import { setPalyer } from '../redux/slice';

import { get, getNextMusic, getPreviousMusic } from '../services/utils';

export default function PlayerContainer() {
  const dispatch = useDispatch();

  const music = useSelector(get('player'));
  const musics = useSelector(get('musics'));

  const handleClickNext = useCallback(() => {
    const nextMusic = getNextMusic(musics, music);

    dispatch(setPalyer(nextMusic));
  }, [musics, music]);

  const handleClickPrevious = useCallback(() => {
    const previousMusic = getPreviousMusic(musics, music);

    dispatch(setPalyer(previousMusic));
  }, [musics, music]);

  if (!music?.videoId) {
    return (<></>);
  }

  return (
    <Player
      music={music}
      onClickNext={handleClickNext}
      onClickPrevious={handleClickPrevious}
    />
  );
}

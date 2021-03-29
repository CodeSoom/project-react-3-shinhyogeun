import React, { useCallback, useState, useRef } from 'react';

import Youtube from '@u-wave/react-youtube';

import { translateTime } from '../services/utils';

export default function Player({ music }) {
  const { videoId, title, url } = music;

  const [paused, setPaused] = useState(false);
  const [endTime, setEndTime] = useState(100);
  const [currentTime, setCurrentTime] = useState(0);

  const player = useRef(null);
  const timeTrash = useRef(null);
  const handleClick = useCallback(() => {
    setPaused(!paused);
  }, [paused]);

  const handleChange = useCallback((e) => {
    setCurrentTime(e.target.value);
    player.current.playerInstance?.seekTo(Number(e.target.value));
  }, [setCurrentTime]);

  const handleEndPlay = useCallback((e) => {
    setEndTime(e.target.getDuration());
    clearInterval(timeTrash.current);
  }, [timeTrash]);

  const handlePlaying = useCallback((e) => {
    setCurrentTime(e.target.getCurrentTime());
    setEndTime(e.target.getDuration());
    clearInterval(timeTrash.current);
    timeTrash.current = setInterval(() => {
      setCurrentTime(e.target.getCurrentTime());
    }, 1000);
  }, [timeTrash]);

  return (
    <>
      <h3>
        지금 듣는 곡은
        {title}
      </h3>
      <img src={url} alt="thumbnail" />
      <Youtube
        autoplay
        ref={player}
        onEnd={handleEndPlay}
        onPlaying={handlePlaying}
        startSeconds={Number(currentTime)}
        video={videoId}
        paused={paused}
      />
      <button
        type="button"
        onClick={handleClick}
      >
        {paused ? 'PLAY' : 'STOP'}
      </button>
      <div>{translateTime(Number(currentTime))}</div>
      <div>{translateTime(Number(endTime))}</div>
      <input
        type="range"
        min="0"
        max={endTime}
        value={currentTime}
        onChange={handleChange}
      />
    </>
  );
}

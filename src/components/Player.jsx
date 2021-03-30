import React, {
  useCallback,
  useState,
  useRef,
  useEffect,
} from 'react';

import Youtube from '@u-wave/react-youtube';

import { translateTime } from '../services/utils';

const Player = React.memo(({ music }) => {
  const { videoId, title, url } = music;

  const [state, setState] = useState({
    paused: false,
    start: true,
    endTime: 100,
    currentTime: 0,
  });

  const player = useRef(null);
  const timeTrash = useRef(null);
  const {
    paused, start, endTime, currentTime,
  } = state;

  useEffect(() => {
    setState({
      paused: false,
      start: true,
      endTime: 100,
      currentTime: 0,
    });
  }, [music.videoId]);

  const handleClick = useCallback(() => {
    setState({
      ...state,
      paused: !paused,
    });
  }, [paused, state]);

  const handleChange = useCallback((e) => {
    setState({
      ...state,
      currentTime: e.target.value,
    });

    player.current.playerInstance?.seekTo(Number(e.target.value));
  }, [setState, state]);

  const handleEndPlay = useCallback((e) => {
    setState({
      ...state,
      endTime: e.target.getDuration(),
    });

    clearInterval(timeTrash.current);
  }, [timeTrash, state]);

  const handleStateChange = useCallback((e) => {
    if (start) {
      e.target.seekTo(0);
      setState({
        ...state,
        start: false,
        currentTime: 0,
      });
    }
  }, [state]);

  const handlePlaying = useCallback((e) => {
    clearInterval(timeTrash.current);
    setState((preveState) => ({
      ...preveState,
      endTime: e.target.getDuration(),
    }));
    timeTrash.current = setInterval(() => {
      setState((preveState) => ({
        ...preveState,
        currentTime: e.target.getCurrentTime(),
        endTime: e.target.getDuration(),
      }));
    }, 1000, start);

    return timeTrash;
  }, [timeTrash, start]);

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
        onStateChange={handleStateChange}
        onPlaying={handlePlaying}
        onEnd={handleEndPlay}
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
});

export default Player;

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
  const initialState = {
    paused: false,
    highLight: false,
    start: true,
    endTime: 0,
    currentTime: 0,
  };

  const [state, setState] = useState(initialState);

  const player = useRef(null);
  const timeTrash = useRef(null);
  const {
    paused, highLight, start, endTime, currentTime,
  } = state;

  useEffect(() => {
    setState(initialState);
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

  const handleClickHighLight = useCallback(() => {
    player.current.playerInstance?.seekTo(60);
  }, [player]);

  const handleEndPlay = useCallback(() => {
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
      currentTime: e.target.getCurrentTime(),
      highLight: !(e.target.getDuration() > 300),
    }));
    timeTrash.current = setInterval(() => {
      setState((preveState) => ({
        ...preveState,
        currentTime: e.target.getCurrentTime(),
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
        video={videoId}
        paused={paused}
        onStateChange={handleStateChange}
        onPlaying={handlePlaying}
        onEnd={handleEndPlay}
      />
      <button
        type="button"
        onClick={handleClick}
      >
        {paused ? 'PLAY' : 'STOP'}
      </button>
      {highLight ? (
        <button
          type="button"
          onClick={handleClickHighLight}
        >
          하이라이트 듣기
        </button>
      )
        : null}
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

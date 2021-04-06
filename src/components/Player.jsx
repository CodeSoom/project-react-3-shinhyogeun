import React, {
  useCallback,
  useState,
  useRef,
  useEffect,
} from 'react';

import Youtube from '@u-wave/react-youtube';

import { isSameTime, translateTime } from '../services/utils';

const playStyles = ['순환 반복', '한곡 반복', '한곡 듣기'];

const Player = React.memo(({
  music,
  playerInfo,
  onClickNext,
  onClickPrevious,
  onClickAddPlaylistMusic,
  onClickMute,
  onClickVolume,
  onClickPlayStyle,
  onClickSuffle,
}) => {
  const { videoId, title, url } = music;
  const {
    playStyle,
    isMute,
    volume,
    isSuffle,
  } = playerInfo;

  const player = useRef(null);
  const timeTrash = useRef(null);

  const initialState = {
    paused: false,
    highLight: false,
    click: false,
    start: true,
    endTime: 0,
    currentTime: 0,
  };

  const [state, setState] = useState(initialState);
  const {
    paused,
    highLight,
    click,
    start,
    endTime,
    currentTime,
  } = state;

  useEffect(() => {
    setState(initialState);
  }, [music.videoId]);

  const playNextSong = useCallback(() => {
    if (playStyle === 0) {
      return onClickNext();
    }

    if (playStyle === 1) {
      player.current.playerInstance?.seekTo(0);
      return setState({ ...state, currentTime: 0 });
    }

    return 0;
  }, [player, state, playStyle]);

  const handleClick = useCallback(() => {
    setState({
      ...state,
      paused: !paused,
    });
  }, [paused, state]);

  const handleClickHighLight = useCallback(() => {
    player.current.playerInstance?.seekTo(60);
  }, [player]);

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

  const handleChange = useCallback((e) => {
    setState({
      ...state,
      currentTime: e.target.value,
    });

    player.current.playerInstance?.seekTo(Number(e.target.value));
  }, [setState, state]);

  const handleEndPlay = useCallback(() => {
    clearInterval(timeTrash.current);
    if (!click) {
      playNextSong();
    }
  }, [timeTrash, state]);

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

  const handleMouseDown = useCallback(() => {
    setState({ ...state, click: true });
  }, [state, click]);

  const handleMouseUp = useCallback(() => {
    if (isSameTime(currentTime, endTime)) {
      playNextSong();
    }

    setState({ ...state, click: false });
  }, [state, click]);

  const handleClickVolume = useCallback((e) => {
    onClickVolume(Number(e.target.value));
  }, [onClickVolume]);

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
        muted={isMute}
        volume={volume}
        onStateChange={handleStateChange}
        onPlaying={handlePlaying}
        onEnd={handleEndPlay}
      />
      <button type="button" onClick={onClickPrevious}>이전 노래</button>
      <button
        type="button"
        onClick={handleClick}
      >
        {paused ? 'PLAY' : 'STOP'}
      </button>
      <button type="button" onClick={onClickNext}>다음 노래</button>
      {highLight ? (
        <button
          type="button"
          onClick={handleClickHighLight}
        >
          하이라이트 듣기
        </button>
      )
        : null}
      <button
        type="button"
        onClick={onClickAddPlaylistMusic}
      >
        플레이 리스트에 추가
      </button>
      <div>{translateTime(Number(currentTime))}</div>
      <div>{translateTime(Number(endTime))}</div>
      <input
        type="range"
        min="0"
        max={endTime}
        value={currentTime}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onChange={handleChange}
      />
      <button
        type="button"
        onClick={onClickMute}
      >
        {isMute ? '음소거 해제' : '음소거'}
      </button>
      <input
        type="range"
        value={volume}
        min={0}
        max={1}
        step={0.01}
        onChange={handleClickVolume}
      />
      <button
        type="button"
        onClick={onClickPlayStyle}
      >
        {playStyles[Number(playStyle)]}
      </button>
      <button
        type="button"
        onClick={onClickSuffle}
      >
        {isSuffle ? '셔플멈추기' : '셔플하기'}
      </button>
    </>
  );
});

export default Player;

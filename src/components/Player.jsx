import React, {
  useCallback,
  useState,
  useRef,
  useEffect,
} from 'react';

import Youtube from '@u-wave/react-youtube';

import styled from '@emotion/styled';

import { isSameTime, translateTime } from '../services/utils';

const playStyles = [
  <i className="fas fa-sync" style={{ color: 'green' }} />,
  <i className="fas fa-sync" style={{ color: 'green' }}> 1</i>,
  <i className="fas fa-sync" />,
];

const Container = styled.div({
  color: 'white',
  width: '100%',
  display: 'flex',
  position: 'fixed',
  bottom: '0',
  minWidth: '1000px',
  backgroundColor: 'rgba(0, 0, 0, 0.95)',
  '& img': {
    width: '80px',
    height: '80px',
    borderRadius: '7px',
  },
});

const MusicProfile = styled.div({
  width: '30%',
  fontSize: '13px',
  backgroundColor: 'transparent',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  '& > button': {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
  },
  '& button:focus': {
    outline: 'none',
  },
  '& > img': {
    backgroundColor: 'transparent',
    padding: '5px',
  },
  '& > div': {
    backgroundColor: 'transparent',
    color: 'white',
  },
});

const Control = styled.div({
  width: '40%',
  backgroundColor: 'transparent',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '5px',
  '& button': {
    backgroundColor: 'transparent',
    border: 'none',
    margin: '0 20px',
  },
  '& button:focus': {
    outline: 'none',
  },
  '& i': {
    fontSize: '20px',
    color: 'white',
    backgroundColor: 'transparent',
  },
  '& button:nth-of-type(3) > i': {
    fontSize: '45px',
  },
  '& i:hover': {
    cursor: 'pointer',
  },
});

const Sound = styled.div({
  width: '30%',
  position: 'relative',
  backgroundColor: 'transparent',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '& button:nth-of-type(1)': {
    fontFamily: 'Montserrat, sans-serif',
  },
  '& button': {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    marginRight: '5px',
  },
  '& button:focus': {
    outline: 'none',
  },
  '& i': {
    fontSize: '20px',
    color: 'white',
    backgroundColor: 'transparent',
  },
  '& i:hover': {
    cursor: 'pointer',
  },
});

const Buttons = styled.div({
  backgroundColor: 'transparent',
  display: 'flex',
});

const ProgressBar = styled.div({
  height: '30px',
  backgroundColor: 'transparent',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  '& input': {
    width: '400px',
  },
});

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
  onClickPaused,
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
    onClickPaused(false);

    return () => setState(initialState);
  }, [music]);

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
    onClickPaused();
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
    clearInterval(timeTrash.current);
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
    <Container>
      <MusicProfile>
        <img src={url} alt="thumbnail" />
        <div>
          <p>{title}</p>
        </div>
        <button
          type="button"
          onClick={onClickAddPlaylistMusic}
        >
          <i className="fas fa-plus" />
        </button>
      </MusicProfile>
      <Control>
        <Buttons>
          <button
            type="button"
            onClick={onClickSuffle}
          >
            {isSuffle ? <i className="fas fa-random" style={{ color: 'green' }} /> : <i className="fas fa-random" />}
          </button>
          <button type="button" onClick={onClickPrevious}>
            <i className="fas fa-step-backward" />
          </button>
          <button
            type="button"
            onClick={handleClick}
          >
            {paused ? <i className="far fa-play-circle" /> : <i className="far fa-pause-circle" />}
          </button>
          <button type="button" onClick={onClickNext}>
            <i className="fas fa-step-forward" />
          </button>
          <button
            type="button"
            onClick={onClickPlayStyle}
          >
            {playStyles[Number(playStyle)]}
          </button>
          <Youtube
            style={{
              position: 'fixed',
              left: '10000px',
              visibility: 'hidden',
            }}
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
        </Buttons>
        <ProgressBar>
          <p>{translateTime(Number(currentTime))}</p>
          <input
            type="range"
            min="0"
            max={endTime}
            value={currentTime}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onChange={handleChange}
          />
          <p>{translateTime(Number(endTime))}</p>
        </ProgressBar>
      </Control>
      <Sound>
        {highLight ? (
          <button
            type="button"
            onClick={handleClickHighLight}
          >
            HIGH
            <br />
            LIGHT
          </button>
        )
          : null}
        <button
          type="button"
          onClick={onClickMute}
        >
          {isMute ? <i className="fas fa-volume-mute" /> : <i className="fas fa-volume-up" />}
        </button>
        <input
          type="range"
          value={volume}
          min={0}
          max={1}
          step={0.01}
          onChange={handleClickVolume}
        />
      </Sound>
    </Container>
  );
});

export default Player;

import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import Player from '../Player';

import music from '../../../fixtures/music';
import playerInfo from '../../../fixtures/playerInfo';

describe('Player', () => {
  const handleClickNext = jest.fn();
  const handleClickPrevious = jest.fn();
  const handleClickAddPlaylistMusic = jest.fn();
  const handleClickMute = jest.fn();
  const handleClickVolume = jest.fn();
  const handleClickPlayStyle = jest.fn();
  const handleClickSuffle = jest.fn();

  function renderPlayer() {
    return render(
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
      />,
    );
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('지금 듣는 곡을 보여준다.', () => {
    const { queryByText, container } = renderPlayer();

    expect(queryByText(`${music.title}`)).toBeInTheDocument();
    expect(container.querySelectorAll('button')[3]).toBeInTheDocument();
    expect(container.innerHTML).toContain('<img src=');
  });

  it('STOP을 누르면 PLAY로 변경된다.', () => {
    const { container } = renderPlayer();

    expect(container.querySelectorAll('i')[3]).toBeInTheDocument();
    fireEvent.click(container.querySelectorAll('button')[3]);
    expect(container.querySelectorAll('i')[3]).toBeInTheDocument();
  });

  it('음소거 버튼을 누르면 음소거 해제로 변경된다.', () => {
    const { container } = renderPlayer();

    expect(container.querySelectorAll('i')[6]).toBeInTheDocument();
    fireEvent.click(container.querySelectorAll('button')[6]);
    expect(handleClickMute).toBeCalled();
  });

  it('다음 노래 버튼를 누르면 handleClickNext가 실행된다.', () => {
    const { container } = renderPlayer();

    expect(container.querySelectorAll('button')[4]).toBeInTheDocument();
    fireEvent.click(container.querySelectorAll('button')[4]);
    expect(handleClickNext).toBeCalled();
  });

  it('이전 노래 버튼을 누르면 handleClickPrevious가 실행된다.', () => {
    const { container } = renderPlayer();

    expect(container.querySelectorAll('button')[2]).toBeInTheDocument();
    fireEvent.click(container.querySelectorAll('button')[2]);
    expect(handleClickPrevious).toBeCalled();
  });

  it('플레이 리스트에 추가 버튼를 누르면 handleClickAddPlaylistMusic가 실행된다.', () => {
    const { container } = renderPlayer();

    expect(container.querySelectorAll('button')[0]).toBeInTheDocument();
    fireEvent.click(container.querySelectorAll('button')[0]);
    expect(handleClickAddPlaylistMusic).toBeCalled();
  });

  it('재생시간 input의 range를 바꾸면 이동한다.', () => {
    const { queryByDisplayValue, queryAllByText } = renderPlayer();
    fireEvent.change(queryByDisplayValue('0'), {
      target: {
        value: 0,
      },
    });

    expect(queryAllByText('0:00')[0]).toBeInTheDocument();
  });

  it('음량 input의 range를 바꾸면 handleClickVolume이 실행된다.', () => {
    const { queryByDisplayValue } = renderPlayer();
    fireEvent.change(queryByDisplayValue('1'), {
      target: {
        value: 0.5,
      },
    });

    expect(handleClickVolume).toBeCalled();
  });

  it('playStyle(한곡반복 등)버튼을 클릭하면 handleClickPlayStyle이 실행된다.', () => {
    const { container } = renderPlayer();
    fireEvent.click(container.querySelectorAll('button')[5]);

    expect(handleClickPlayStyle).toBeCalled();
  });

  it('셔플 버튼을 클릭하면 handleClickSuffle이 실행된다.', () => {
    const { container } = renderPlayer();
    fireEvent.click(container.querySelectorAll('button')[1]);

    expect(handleClickSuffle).toBeCalled();
  });
});

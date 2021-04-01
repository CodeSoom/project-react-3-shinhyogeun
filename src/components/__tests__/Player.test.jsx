import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import Player from '../Player';

import music from '../../../fixtures/music';

describe('Player', () => {
  const handleClickNext = jest.fn();
  const handleClickPrevious = jest.fn();
  const handleClickAddPlaylistMusic = jest.fn();

  function renderPlayer() {
    return render(
      <Player
        music={music}
        onClickNext={handleClickNext}
        onClickPrevious={handleClickPrevious}
        onClickAddPlaylistMusic={handleClickAddPlaylistMusic}
      />,
    );
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('지금 듣는 곡을 보여준다.', () => {
    const { queryByText, container } = renderPlayer();

    expect(queryByText(`지금 듣는 곡은${music.title}`)).toBeInTheDocument();
    expect(queryByText('STOP')).toBeInTheDocument();
    expect(container.innerHTML).toContain('<img src=');
  });

  it('STOP을 누르면 PLAY로 변경된다.', () => {
    const { queryByText } = renderPlayer();

    expect(queryByText('STOP')).toBeInTheDocument();
    fireEvent.click(queryByText('STOP'));
    expect(queryByText('PLAY')).toBeInTheDocument();
  });

  it('음소거 버튼을 누르면 음소거 해제로 변경된다.', () => {
    const { queryByText } = renderPlayer();

    expect(queryByText('음소거')).toBeInTheDocument();
    fireEvent.click(queryByText('음소거'));
    expect(queryByText('음소거 해제')).toBeInTheDocument();
  });

  it('다음 노래 버튼를 누르면 handleClickNext가 실행된다.', () => {
    const { queryByText } = renderPlayer();

    expect(queryByText('다음 노래')).toBeInTheDocument();
    fireEvent.click(queryByText('다음 노래'));
    expect(handleClickNext).toBeCalled();
  });

  it('이전 노래 버튼을 누르면 handleClickPrevious가 실행된다.', () => {
    const { queryByText } = renderPlayer();

    expect(queryByText('이전 노래')).toBeInTheDocument();
    fireEvent.click(queryByText('이전 노래'));
    expect(handleClickPrevious).toBeCalled();
  });

  it('플레이 리스트에 추가 버튼를 누르면 handleClickAddPlaylistMusic가 실행된다.', () => {
    const { queryByText } = renderPlayer();

    expect(queryByText('플레이 리스트에 추가')).toBeInTheDocument();
    fireEvent.click(queryByText('플레이 리스트에 추가'));
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

  it('음량 input의 range를 바꾸면 이동한다.', () => {
    const { queryByDisplayValue } = renderPlayer();
    fireEvent.change(queryByDisplayValue('1'), {
      target: {
        value: 0.5,
      },
    });

    expect(queryByDisplayValue('0.5')).toBeInTheDocument();
  });
});

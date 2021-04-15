import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import Playlist from '../Playlist';

import musics from '../../../fixtures/musics';
import music from '../../../fixtures/music';

import { filterMusicInfo } from '../../services/utils';

describe('Playlist', () => {
  const playlist = musics.items.map((item) => filterMusicInfo(item));
  const player = { resultToken: 0, ...music };
  const handleClickListen = jest.fn();
  const handleClickDelete = jest.fn();

  function renderPlaylist() {
    return render((
      <Playlist
        playlist={playlist}
        player={player}
        onClickListen={handleClickListen}
        onClickDelete={handleClickDelete}
      />
    ));
  }

  beforeEach(() => jest.clearAllMocks());
  it('화면에 playlist 노래들을 보여준다.', () => {
    const { queryByText } = renderPlaylist();

    expect(queryByText('🎵 D E A N (딘) [PLAYLIST] [노래 모음] 🎵')).toBeInTheDocument();
    expect(queryByText('D E A N (딘) [PLAYLIST] [노래 모음]')).toBeInTheDocument();
  });

  it('듣기를 누르면 handleClickListen함수가 실행된다.', () => {
    const { container } = renderPlaylist();

    fireEvent.click(container.querySelector('li'));

    expect(handleClickListen).toBeCalled();
  });

  it('삭제를 누르고 확인을 누르면 handleClickDelete함수가 실행된다.', () => {
    const { container, queryByText } = renderPlaylist();

    fireEvent.click(container.querySelectorAll('i')[1]);
    fireEvent.click(queryByText('확인'));

    expect(handleClickDelete).toBeCalled();
  });

  it('삭제를 누르고 취소를 누르면 handleClickDelete가 실행되지 않는다.', () => {
    const { container, queryByText } = renderPlaylist();

    fireEvent.click(container.querySelectorAll('i')[1]);
    fireEvent.click(queryByText('취소'));

    expect(handleClickDelete).not.toBeCalled();
  });
});

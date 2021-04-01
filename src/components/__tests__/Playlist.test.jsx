import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import Playlist from '../Playlist';

import musics from '../../../fixtures/musics';

import { filterMusicInfo } from '../../services/utils';

describe('Playlist', () => {
  const playlist = musics.items.map((music) => filterMusicInfo(music));
  const handleClick = jest.fn();

  function renderPlaylist() {
    return render(<Playlist playlist={playlist} onClick={handleClick} />);
  }

  it('화면에 playlist 노래들을 보여준다.', () => {
    const { queryByText } = renderPlaylist();

    expect(queryByText('🎵 D E A N (딘) [PLAYLIST] [노래 모음] 🎵')).toBeInTheDocument();
    expect(queryByText('D E A N (딘) [PLAYLIST] [노래 모음]')).toBeInTheDocument();
  });

  it('듣기를 누르면 handleClick함수가 실행된다.', () => {
    const { queryAllByText } = renderPlaylist();

    fireEvent.click(queryAllByText('듣기')[0]);

    expect(handleClick).toBeCalled();
  });
});

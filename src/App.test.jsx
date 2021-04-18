import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { MemoryRouter } from 'react-router-dom';

import { render } from '@testing-library/react';

import App from './App';

import musics from '../fixtures/musics';

import { filterMusicInfo } from './services/utils';
import { saveItem } from './services/storage';

jest.mock('react-redux');

describe('App', () => {
  const dispatch = jest.fn();

  useDispatch.mockImplementation(() => dispatch);
  useSelector.mockImplementation((selector) => selector({
    input: '아름다운 노래들',
    nextPageToken: 'NEXT_PAGE_TOKEN',
    playlist: [],
    musics: musics.items,
    player: {},
    modalInfo: {
      visible: false,
      musicAlreadyIn: false,
    },
  }));

  function renderApp({ path }) {
    return render(
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>,
    );
  }

  beforeEach(() => {
    jest.clearAllMocks();
    saveItem('PLAYLIST', []);
  });

  describe('playlistPage', () => {
    it('제목을 보여준다.', () => {
      const { queryAllByText } = renderApp({ path: '/' });

      expect(queryAllByText('My Playlist')[0]).toBeInTheDocument();
    });

    context('playlist에 노래가 있을 때', () => {
      const playlist = musics.items.map((item) => filterMusicInfo(item));

      it('playlist 목록의 길이만큼 dispatch가 실행된다.', () => {
        saveItem('PLAYLIST', playlist);

        renderApp({ path: '/' });

        expect(dispatch).toBeCalledTimes(playlist.length);
      });
    });

    context('playlist에 노래가 없을 때', () => {
      it('dispatch가 실행되지 않는다.', () => {
        renderApp({ path: '/' });

        expect(dispatch).not.toBeCalled();
      });
    });
  });

  it('검색 결과를 보여준다.', () => {
    const { queryByText } = renderApp({ path: '/result?searchQuery=아름다운 노래들' });

    expect(queryByText('D E A N (딘) [PLAYLIST] [노래 모음]')).toBeInTheDocument();
    expect(queryByText('🎵 D E A N (딘) [PLAYLIST] [노래 모음] 🎵')).toBeInTheDocument();
  });
});

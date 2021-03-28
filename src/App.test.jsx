import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { MemoryRouter } from 'react-router-dom';

import { render } from '@testing-library/react';

import App from './App';

import musics from '../fixtures/musics';

jest.mock('react-redux');

describe('App', () => {
  const dispatch = jest.fn();

  useDispatch.mockImplementation(() => dispatch);
  useSelector.mockImplementation((selector) => selector({
    input: '아름다운 노래들',
    nextPageToken: 'NEXT_PAGE_TOKEN',
    musics: musics.items,
    player: {},
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
  });

  it('제목을 보여준다.', () => {
    const { queryByText } = renderApp({ path: '/' });

    expect(queryByText('My Playlist')).toBeInTheDocument();
  });

  it('검색 결과를 보여준다.', () => {
    const { queryByText } = renderApp({ path: '/result?searchQuery=아름다운 노래들' });

    expect(queryByText('D E A N (딘) [PLAYLIST] [노래 모음]')).toBeInTheDocument();
    expect(queryByText('🎵 D E A N (딘) [PLAYLIST] [노래 모음] 🎵')).toBeInTheDocument();
  });
});

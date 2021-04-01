import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { render } from '@testing-library/react';

import PlaylistPage from '../PlaylistPage';

import musics from '../../../fixtures/musics';

import { filterMusicInfo } from '../../services/utils';

jest.mock('react-redux');
describe('PlaylistContainer', () => {
  const dispatch = jest.fn();

  useDispatch.mockImplementation(() => dispatch);
  useSelector.mockImplementation((selector) => selector({
    playlist: musics.items.map((music) => filterMusicInfo(music)),
  }));

  beforeEach(() => jest.clearAllMocks());

  it('playlist목록을 보여준다.', () => {
    const { queryByText } = render(<PlaylistPage />);

    expect(queryByText('🎵 D E A N (딘) [PLAYLIST] [노래 모음] 🎵')).toBeInTheDocument();
    expect(queryByText('D E A N (딘) [PLAYLIST] [노래 모음]')).toBeInTheDocument();
  });
});

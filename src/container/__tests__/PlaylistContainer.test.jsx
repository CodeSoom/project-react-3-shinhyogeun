import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { fireEvent, render } from '@testing-library/react';

import PlaylistContainer from '../PlaylistContainer';

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
    const { queryByText } = render(<PlaylistContainer />);

    expect(queryByText('🎵 D E A N (딘) [PLAYLIST] [노래 모음] 🎵')).toBeInTheDocument();
    expect(queryByText('D E A N (딘) [PLAYLIST] [노래 모음]')).toBeInTheDocument();
  });

  it('듣기 버튼을 누르면 dispatch가 실행된다.', () => {
    const { container } = render(<PlaylistContainer />);

    fireEvent.click(container.querySelector('li'));

    expect(dispatch).toBeCalled();
  });

  it('삭제 버튼을 누르면 dispatch가 실행된다.', () => {
    const { container, queryByText } = render(<PlaylistContainer />);

    fireEvent.click(container.querySelectorAll('i')[1]);
    fireEvent.click(queryByText('확인'));

    expect(dispatch).toBeCalled();
  });
});

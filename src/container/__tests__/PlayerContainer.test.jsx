import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { fireEvent, render } from '@testing-library/react';

import given from 'given2';

import PlayerContainer from '../PlayerContainer';

import music from '../../../fixtures/music';
import musics from '../../../fixtures/musics';
import playerInfo from '../../../fixtures/playerInfo';

describe('PlayerContainer', () => {
  const dispatch = jest.fn();

  useDispatch.mockImplementation(() => dispatch);
  useSelector.mockImplementation((selector) => selector({
    player: given.music,
    playerInfo,
    musics: musics.items,
  }));

  beforeEach(() => jest.clearAllMocks());

  function renderPlayerContainer() {
    return render(<PlayerContainer />);
  }

  context('재생할 노래가 없을 경우', () => {
    given('music', () => ({}));

    it('My Playlist 제목을 보여준다.', () => {
      const { queryByText } = renderPlayerContainer();
      expect(queryByText('My Playlist')).toBeInTheDocument();
    });
  });

  context('재생할 노래가 있을 경우', () => {
    given('music', () => (music));

    it('player를 그린다.', () => {
      const { queryByText, container } = renderPlayerContainer();

      expect(queryByText(`${music.title}`)).toBeInTheDocument();
      expect(container.querySelectorAll('i')[2]).toBeInTheDocument();
      expect(container.innerHTML).toContain('<img src=');
    });

    it('다음 노래버튼을 누르면 dispatch가 실행된다.', () => {
      const { container } = renderPlayerContainer();

      fireEvent.click(container.querySelectorAll('button')[3]);

      expect(dispatch).toBeCalled();
    });

    it('이전 노래버튼을 누르면 dispatch가 실행된다.', () => {
      const { container } = renderPlayerContainer();

      fireEvent.click(container.querySelectorAll('button')[1]);

      expect(dispatch).toBeCalled();
    });

    it('플레이리스트에 추가 버튼을 누르면 dispatch가 실행된다.', () => {
      const { container } = renderPlayerContainer();

      fireEvent.click(container.querySelectorAll('button')[5]);

      expect(dispatch).toBeCalled();
    });

    it('음소거 버튼을 누르면 dispatch가 실행된다.', () => {
      const { container } = renderPlayerContainer();

      fireEvent.click(container.querySelectorAll('button')[6]);

      expect(dispatch).toBeCalled();
    });

    it('음량을 바꾸면 dispatch가 실행된다.', () => {
      const { queryByDisplayValue } = renderPlayerContainer();

      fireEvent.change(queryByDisplayValue('1'), {
        target: {
          value: 0.5,
        },
      });

      expect(dispatch).toBeCalled();
    });

    it('playStyle(한곡 반복 등)버튼을 누르면 dispatch가 실행된다.', () => {
      const { container } = renderPlayerContainer();

      fireEvent.click(container.querySelectorAll('button')[4]);

      expect(dispatch).toBeCalled();
    });

    it('셔플버튼을 누르면 dispatch가 실행된다.', () => {
      const { container } = renderPlayerContainer();

      fireEvent.click(container.querySelectorAll('button')[0]);

      expect(dispatch).toBeCalled();
    });
  });
});

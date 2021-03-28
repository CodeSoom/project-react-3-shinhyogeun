import React from 'react';

import { useSelector } from 'react-redux';

import { render } from '@testing-library/react';

import given from 'given2';

import PlayerContainer from '../PlayerContainer';

import music from '../../../fixtures/music';

describe('PlayerContainer', () => {
  useSelector.mockImplementation((selector) => selector({
    player: given.music,
  }));

  beforeEach(() => jest.clearAllMocks());

  function renderPlayerContainer() {
    return render(<PlayerContainer />);
  }

  context('재생할 노래가 없을 경우', () => {
    given('music', () => ({}));

    it('아무것도 그리지 않는다.', () => {
      const { container } = renderPlayerContainer();
      expect(container.innerHTML).toBe('');
    });
  });

  context('재생할 노래가 있을 경우', () => {
    given('music', () => (music));

    it('player를 그린다.', () => {
      const { queryByText, container } = renderPlayerContainer();

      expect(queryByText(`지금 듣는 곡은${music.title}`)).toBeInTheDocument();
      expect(queryByText('STOP')).toBeInTheDocument();
      expect(container.innerHTML).toContain('<img src=');
    });
  });
});

import React from 'react';

import { render } from '@testing-library/react';

import { useSelector } from 'react-redux';

import music from '../../../fixtures/music';

import PlayerPage from '../PlayerPage';
import playerInfo from '../../../fixtures/playerInfo';

describe('PlayerPage', () => {
  useSelector.mockImplementation((selector) => selector({
    player: music,
    playerInfo,
  }));

  beforeEach(() => jest.clearAllMocks());

  function renderPlayerPage() {
    return render(<PlayerPage />);
  }

  it('player를 보여준다.', () => {
    const { queryByText, container } = renderPlayerPage();

    expect(queryByText(`${music.title}`)).toBeInTheDocument();
    expect(container.querySelectorAll('i')[2]).toBeInTheDocument();
    expect(container.innerHTML).toContain('<img src=');
  });
});

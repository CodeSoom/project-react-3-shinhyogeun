import React from 'react';

import { render } from '@testing-library/react';

import { useSelector } from 'react-redux';

import music from '../../../fixtures/music';

import PlayerPage from '../PlayerPage';

describe('PlayerPage', () => {
  useSelector.mockImplementation((selector) => selector({
    player: music,
  }));

  beforeEach(() => jest.clearAllMocks());

  function renderPlayerPage() {
    return render(<PlayerPage />);
  }

  it('player를 보여준다.', () => {
    const { queryByText, container } = renderPlayerPage();

    expect(queryByText(`지금 듣는 곡은${music.title}`)).toBeInTheDocument();
    expect(queryByText('STOP')).toBeInTheDocument();
    expect(container.innerHTML).toContain('<img src=');
  });
});

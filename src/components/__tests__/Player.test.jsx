import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import Player from '../Player';

import music from '../../../fixtures/music';

describe('Player', () => {
  function renderPlayer() {
    return render(<Player music={music} />);
  }

  it('지금 듣는 곡을 보여준다.', () => {
    const { queryByText, container } = renderPlayer();

    expect(queryByText(`지금 듣는 곡은${music.title}`)).toBeInTheDocument();
    expect(queryByText('STOP')).toBeInTheDocument();
    expect(container.innerHTML).toContain('<img src=');
  });

  it('STOP을 누르면 PLAY로 변경된다.', () => {
    const { queryByText } = renderPlayer();

    expect(queryByText('STOP')).toBeInTheDocument();
    fireEvent.click(queryByText('STOP'));
    expect(queryByText('PLAY')).toBeInTheDocument();
  });
});

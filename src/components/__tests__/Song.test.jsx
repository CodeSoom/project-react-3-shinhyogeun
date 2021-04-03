import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import Song from '../Song';
import musics from '../../../fixtures/musics';

describe('Song', () => {
  const handleClick = jest.fn();

  function renderSong() {
    return render(<Song music={musics.items[0]} onListenClick={handleClick} />);
  }

  beforeEach(() => jest.clearAllMocks());

  it('썸네일을 보여준다.', () => {
    const { container } = renderSong();

    expect(container.innerHTML).toContain('<img src="');
  });

  it('제목을 보여준다.', () => {
    const { queryByText } = renderSong();

    expect(queryByText(/딘/)).toBeInTheDocument();
  });

  it('듣기를 누르면 handleClick이 실행된다.', () => {
    const { container } = renderSong();

    fireEvent.click(container.querySelector('li'));

    expect(handleClick).toBeCalled();
  });
});

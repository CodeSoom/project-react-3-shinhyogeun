import React from 'react';

import { render } from '@testing-library/react';

import Song from '../Song';
import musics from '../../../fixtures/musics';

describe('Song', () => {
  it('썸네일을 보여준다.', () => {
    const { container } = render(<Song item={musics.items[0]} />);

    expect(container.innerHTML).toContain('<img src="');
  });

  it('제목을 보여준다.', () => {
    const { queryByText } = render(<Song item={musics.items[0]} />);

    expect(queryByText(/딘/)).toBeInTheDocument();
  });
});

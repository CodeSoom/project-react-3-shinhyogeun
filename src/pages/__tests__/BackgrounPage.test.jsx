import React from 'react';

import { render } from '@testing-library/react';

import { useSelector } from 'react-redux';

import BackgroundPage from '../BackgroundPage';

import music from '../../../fixtures/music';

describe('BackgroundPage', () => {
  useSelector.mockImplementation((selector) => selector({
    player: music,
  }));
  it('Background를 그린다.', () => {
    const { container } = render(<BackgroundPage />);

    expect(container.querySelector('div')).toBeInTheDocument();
  });
});

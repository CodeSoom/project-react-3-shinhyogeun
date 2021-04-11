import React from 'react';

import { render } from '@testing-library/react';

import { useSelector } from 'react-redux';

import BackgroundContainer from '../BackgroundContainer';

import music from '../../../fixtures/music';

describe('BackgroundPage', () => {
  useSelector.mockImplementation((selector) => selector({
    player: music,
  }));

  it('가져온 player의 정보로 background를 그린다.', () => {
    const { container } = render(<BackgroundContainer />);

    expect(container.querySelector('div')).toBeInTheDocument();
  });
});

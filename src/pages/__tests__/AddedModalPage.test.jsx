import React from 'react';

import { render } from '@testing-library/react';

import { useSelector } from 'react-redux';

import AddedModalPage from '../AddedModalPage';

describe('AddedModalPage', () => {
  useSelector.mockImplementation((selector) => selector({
    modalInfo: {
      visible: true,
      musicAlreadyIn: true,
    },
  }));

  it('모달을 보여준다.', () => {
    const { queryByText } = render(<AddedModalPage />);

    expect(queryByText('이미 추가된 음악입니다.')).toBeInTheDocument();
  });
});

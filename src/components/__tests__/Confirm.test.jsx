import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import Confirm from '../Confirm';

describe('Confirm', () => {
  const handleClickConfirm = jest.fn();
  const handleClickNotConfirm = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  it('확인버튼을 누르면 handleClickConfirm이 실행된다.', () => {
    const { queryByText } = render(<Confirm
      onClickConfirm={handleClickConfirm}
      onClickNotConfirm={handleClickNotConfirm}
    />);

    fireEvent.click(queryByText('확인'));

    expect(handleClickConfirm).toBeCalled();
  });

  it('확인버튼을 누르면 handleClickConfirm이 실행된다.', () => {
    const { queryByText } = render(<Confirm
      onClickConfirm={handleClickConfirm}
      onClickNotConfirm={handleClickNotConfirm}
    />);

    fireEvent.click(queryByText('취소'));

    expect(handleClickNotConfirm).toBeCalled();
  });
});

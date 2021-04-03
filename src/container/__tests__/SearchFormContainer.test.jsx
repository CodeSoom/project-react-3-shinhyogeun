import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { render, fireEvent } from '@testing-library/react';

import SearchFormContainer from '../SearchFormContainer';

jest.mock('react-redux');

describe('SearchFormContainer', () => {
  const dispatch = jest.fn();
  const handleClick = jest.fn();

  useDispatch.mockImplementation(() => dispatch);
  useSelector.mockImplementation((selector) => selector({
    input: 'DEAN',
  }));

  function renderSearchFormContainer() {
    return render(<SearchFormContainer onClick={handleClick} />);
  }

  it('찾아보기 버튼을 누르면 dispatch가 실행된다.', () => {
    const { container } = renderSearchFormContainer();

    fireEvent.click(container.querySelector('button'));

    expect(handleClick).toBeCalled();
  });

  it('입력을 하면 dispatch가 실행된다.', () => {
    const { queryByPlaceholderText } = renderSearchFormContainer();

    fireEvent.change(queryByPlaceholderText('원하는 곡을 입력해보세요.'),
      {
        target: {
          value: 'BTS',
        },
      });
    expect(dispatch).toBeCalled();
  });
});

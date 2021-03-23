import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import SearchForm from '../SearchForm';

describe('searchForm', () => {
  const onChange = jest.fn();
  const onClick = jest.fn();

  function renderSearchForm() {
    return render(<SearchForm onChange={onChange} onClick={onClick} />);
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('input과 button을 그린다.', () => {
    const { queryByPlaceholderText, queryByText } = renderSearchForm();

    expect(queryByPlaceholderText('원하는 곡을 입력해보세요.')).toBeInTheDocument();
    expect(queryByText('찾아보기')).toBeInTheDocument();
  });

  it('input을 입력하면 onChange함수가 실행된다.', () => {
    const { queryByPlaceholderText } = renderSearchForm();

    fireEvent.change(queryByPlaceholderText('원하는 곡을 입력해보세요.'), {
      target: {
        value: 'DEAN',
      },
    });

    expect(onChange).toBeCalled();
  });

  it('찾아보기 버튼을 클릭하면 onClick함수가 실행된다.', () => {
    const { queryByText } = renderSearchForm();

    fireEvent.click(queryByText('찾아보기'));

    expect(onClick).toBeCalled();
  });
});

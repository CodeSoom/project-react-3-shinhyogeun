import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { render, fireEvent } from '@testing-library/react';

import SearchResultContainer from '../SearchResultContainer';

import musics from '../../../fixtures/musics';

jest.mock('react-redux');
describe('SearchResultContainer', () => {
  const dispatch = jest.fn();

  useDispatch.mockImplementation(() => dispatch);
  useSelector.mockImplementation((selector) => selector({
    nextPageToken: 'NEXT_PAGE_TOKEN',
    musics: musics.items,
  }));

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('컴포넌트가 생성될 때 검색을 한다.', () => {
    render(<SearchResultContainer keyword="BTS" />);

    expect(dispatch).toBeCalled();
  });

  it('더보기 버튼을 누르면 dispatch가 실행된다.', () => {
    const { queryByText } = render(<SearchResultContainer keyword="BTS" />);

    fireEvent.click(queryByText('See More'));

    expect(dispatch).toBeCalled();
  });

  it('듣기 버튼을 누르면 dispatch가 실행된다.', () => {
    const { queryAllByText } = render(<SearchResultContainer keyword="BTS" />);

    fireEvent.click(queryAllByText('듣기')[0]);

    expect(dispatch).toBeCalled();
  });
});

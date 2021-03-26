import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import { useSelector } from 'react-redux';

import { MemoryRouter } from 'react-router-dom';

import SearchFormPage from '../SearchFormPage';

const mockPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory() {
    return { push: mockPush };
  },
}));

jest.mock('react-redux');

describe('SearchFormPage', () => {
  useSelector.mockImplementation((selector) => selector({
    input: '딘',
  }));

  function renderSearchFormPage() {
    return render(
      <MemoryRouter>
        <SearchFormPage />
      </MemoryRouter>,
    );
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('찾아보기 버튼을 클릭하면 push가 실행된다.', () => {
    const { queryByText } = renderSearchFormPage();

    fireEvent.click(queryByText('찾아보기'));

    expect(mockPush).toBeCalled();
  });
});

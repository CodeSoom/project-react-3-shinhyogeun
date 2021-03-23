import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { render } from '@testing-library/react';

import App from './App';

jest.mock('react-redux');

test('App', () => {
  const dispatch = jest.fn();

  useDispatch.mockImplementation(() => dispatch);
  useSelector.mockImplementation((selector) => selector({
    input: '새로운 노래',
  }));

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const { queryByText } = render(<App />);

  expect(queryByText('My PlayList')).toBeInTheDocument();
});

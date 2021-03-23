import React from 'react';
import { render } from '@testing-library/react';

import App from './App';

test('App', () => {
  const { queryByText } = render(<App />);

  expect(queryByText('My PlayList')).toBeInTheDocument();
});

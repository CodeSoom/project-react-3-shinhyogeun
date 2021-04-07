import React from 'react';

import { render } from '@testing-library/react';

import Modal from '../Modal';

describe('Modal', () => {
  it('내용을 보여준다.', () => {
    const { queryByText } = render(<Modal visible>삭제하시겠습니까?</Modal>);

    expect(queryByText('삭제하시겠습니까?')).toBeInTheDocument();
  });
});

import React from 'react';

import { render } from '@testing-library/react';

import { useSelector } from 'react-redux';

import given from 'given2';

import AddedModalContainer from '../AddedModalContainer';

describe('AddedModalContainer', () => {
  useSelector.mockImplementation((selector) => selector({
    modalInfo: {
      visible: given.visible,
      musicAlreadyIn: given.musicAlreadyIn,
    },
  }));

  beforeEach(() => {
    jest.clearAllMocks();
  });

  context('visible이 false인 경우', () => {
    given('visible', () => (false));
    given('musicAlreadyIn', () => true);

    it('아무것도 보여주지 않는다.', () => {
      const { container } = render(<AddedModalContainer />);

      expect(container.innerText).toBeUndefined();
    });
  });

  context('visible이 true인 경우', () => {
    given('visible', () => (true));

    context('musicAlreadyIn이 true인 경우', () => {
      given('musicAlreadyIn', () => true);

      it('이미 추가된 음악이라는 것을 보여준다.', () => {
        const { queryByText } = render(<AddedModalContainer />);

        expect(queryByText('이미 추가된 음악입니다.')).toBeInTheDocument();
      });
    });

    context('musicAlreadyIn이 false인 경우', () => {
      given('musicAlreadyIn', () => false);

      it('이미 추가된 음아이라는 것을 보여준다.', () => {
        const { queryByText } = render(<AddedModalContainer />);

        expect(queryByText('음악이 플레이리스트에 추가되었습니다.')).toBeInTheDocument();
      });
    });
  });
});

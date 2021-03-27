import React from 'react';

import { render } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import SearchResultPage from '../SearchResultPage';

import musics from '../../../fixtures/musics';

jest.mock('react-redux');
describe('SearchResultPage', () => {
  const dispatch = jest.fn();

  useDispatch.mockImplementation(() => dispatch);
  useSelector.mockImplementation((selector) => selector({
    nextPageToken: 'NEXT_PAGE_TOKEN',
    musics: musics.items,
  }));

  function renderSearchResultPage(keyword) {
    return render(
      <MemoryRouter>
        <SearchResultPage params={keyword} />
      </MemoryRouter>,
    );
  }

  context('올바른 검색이 이루어졌을 때', () => {
    it('검색 목록을 보여준다.', () => {
      const { queryByText } = renderSearchResultPage('가장 좋은 JAZZ');

      expect(queryByText('D E A N (딘) [PLAYLIST] [노래 모음]')).toBeInTheDocument();
      expect(queryByText('🎵 D E A N (딘) [PLAYLIST] [노래 모음] 🎵')).toBeInTheDocument();
    });
  });

  context('검색 keyword가 undefined일 경우', () => {
    it('검색 목록을 보여준다.', () => {
      const { queryByText } = renderSearchResultPage();

      expect(queryByText('검색 결과가 없어요!')).toBeInTheDocument();
    });
  });
});

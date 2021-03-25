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

  function renderSearchResultPage() {
    const params = { keyword: '가장 좋은 JAZZ' };

    return render(
      <MemoryRouter>
        <SearchResultPage params={params} />
      </MemoryRouter>,
    );
  }

  it('검색 목록을 보여준다.', () => {
    const { queryByText } = renderSearchResultPage();

    expect(queryByText('D E A N (딘) [PLAYLIST] [노래 모음]')).toBeInTheDocument();
    expect(queryByText('🎵 D E A N (딘) [PLAYLIST] [노래 모음] 🎵')).toBeInTheDocument();
  });
});

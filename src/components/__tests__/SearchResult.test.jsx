import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import SearchResult from '../SearchResult';

import musics from '../../../fixtures/musics';

describe('SearchResult', () => {
  const handleMoreClick = jest.fn();
  const handleListenClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  function renderSearchResult(result = []) {
    return render(<SearchResult
      onMoreClick={handleMoreClick}
      onListenClick={handleListenClick}
      musics={result}
      nextPageToken="NEXT_PAGE_TOKEN"
    />);
  }

  context('검색결과가 있을 때', () => {
    it('음악 목록을 그려준다.', () => {
      const { queryByText } = renderSearchResult(musics.items);

      expect(queryByText('🎵 D E A N (딘) [PLAYLIST] [노래 모음] 🎵')).toBeInTheDocument();
      expect(queryByText('D E A N (딘) [PLAYLIST] [노래 모음]')).toBeInTheDocument();
    });

    it('결과 더보기 버튼을 누르면 handleMoreClick 함수가 실행된다.', () => {
      const { queryByText } = renderSearchResult(musics.items);

      fireEvent.click(queryByText('See More'));

      expect(handleMoreClick).toBeCalled();
    });

    it('듣기을 누르면 handleListenClick 함수가 실행된다.', () => {
      const { container } = renderSearchResult(musics.items);

      fireEvent.click(container.querySelector('li'));

      expect(handleListenClick).toBeCalled();
    });
  });

  context('검색결과가 없을 때', () => {
    it('검색결과가 없다는 표시를 보여준다.', () => {
      const { queryByText } = renderSearchResult();

      expect(queryByText('NOTHING!!!')).toBeInTheDocument();
    });
  });
});

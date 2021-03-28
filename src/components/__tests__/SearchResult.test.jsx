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

  function renderSearchResult() {
    return render(<SearchResult
      onMoreClick={handleMoreClick}
      onListenClick={handleListenClick}
      musics={musics.items}
    />);
  }

  it('음악 목록을 그려준다.', () => {
    const { queryByText } = renderSearchResult();

    expect(queryByText('🎵 D E A N (딘) [PLAYLIST] [노래 모음] 🎵')).toBeInTheDocument();
    expect(queryByText('D E A N (딘) [PLAYLIST] [노래 모음]')).toBeInTheDocument();
  });

  it('결과 더보기 버튼을 누르면 handleMoreClick 함수가 실행된다.', () => {
    const { queryByText } = renderSearchResult();

    fireEvent.click(queryByText('See More'));

    expect(handleMoreClick).toBeCalled();
  });

  it('듣기을 누르면 handleListenClick 함수가 실행된다.', () => {
    const { queryAllByText } = renderSearchResult();

    fireEvent.click(queryAllByText('듣기')[0]);

    expect(handleListenClick).toBeCalled();
  });
});

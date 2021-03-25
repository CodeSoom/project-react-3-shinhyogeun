import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import SearchResult from '../SearchResult';

import musics from '../../../fixtures/musics';

describe('SearchResult', () => {
  const handleClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  function renderSearchResult() {
    return render(<SearchResult onClick={handleClick} musics={musics.items} />);
  }

  it('음악 목록을 그려준다.', () => {
    const { queryByText } = renderSearchResult();

    expect(queryByText('🎵 D E A N (딘) [PLAYLIST] [노래 모음] 🎵')).toBeInTheDocument();
    expect(queryByText('D E A N (딘) [PLAYLIST] [노래 모음]')).toBeInTheDocument();
  });

  it('결과 더보기 버튼을 누르면 handleClick 함수가 실행된다.', () => {
    const { queryByText } = renderSearchResult();

    fireEvent.click(queryByText('See More'));
  });
});

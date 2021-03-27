import React from 'react';

import queryString from 'query-string';

import SearchResultContainer from '../container/SearchResultContainer';

export default function SearchResultPage({ location, params }) {
  const { searchQuery } = queryString.parse(location?.search);

  const keyword = params || searchQuery;

  if (keyword === undefined) {
    return (<h1>검색 결과가 없어요!</h1>);
  }

  return (<SearchResultContainer keyword={keyword} />);
}

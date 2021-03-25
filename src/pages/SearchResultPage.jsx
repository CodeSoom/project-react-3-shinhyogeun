import React from 'react';

import { useParams } from 'react-router-dom';

import SearchResultContainer from '../container/SearchResultContainer';

export default function SearchResultPage({ params }) {
  const { keyword } = params || useParams();

  return (<SearchResultContainer keyword={keyword} />);
}

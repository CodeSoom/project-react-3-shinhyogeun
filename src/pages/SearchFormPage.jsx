import React from 'react';

import { useHistory } from 'react-router-dom';

import SearchFormContainer from '../container/SearchFormContainer';

export default function SearchFormPage() {
  const history = useHistory();

  function handleClick(keyword) {
    history.push(`/result?searchQuery=${keyword}`);
  }

  return (
    <SearchFormContainer onClick={handleClick} />
  );
}

import React from 'react';

import { useHistory } from 'react-router-dom';

import SearchFormContainer from '../container/SearchFormContainer';

export default function SearchFormPage() {
  const history = useHistory();

  function handleClick(keyword) {
    history.push(`/project-react-3-shinhyogeun/search/${keyword}`);
  }

  return (
    <SearchFormContainer onClick={handleClick} />
  );
}

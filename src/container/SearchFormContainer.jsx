import React, { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import SearchForm from '../components/SearchForm';
import { searchMusic, updateInput } from '../redux/slice';

export default function SearchFormContainer() {
  const dispatch = useDispatch();

  const { input } = useSelector((state) => ({
    input: state.input,
  }));

  const handleClick = useCallback(() => {
    dispatch(searchMusic());
  }, [dispatch, searchMusic]);

  const handleChange = useCallback((value) => {
    dispatch(updateInput(value));
  }, [dispatch, updateInput]);

  return (
    <SearchForm
      value={input}
      onClick={handleClick}
      onChange={handleChange}
    />
  );
}

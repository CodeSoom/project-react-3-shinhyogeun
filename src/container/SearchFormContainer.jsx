import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import SearchForm from '../components/SearchForm';
import { searchMusic, updateInput } from '../redux/slice';

export default function SearchFormContainer() {
  const dispatch = useDispatch();

  const { input } = useSelector((state) => ({
    input: state.input,
  }));

  function handleClick() {
    dispatch(searchMusic());
  }

  function handleChange(value) {
    dispatch(updateInput(value));
  }

  return (
    <SearchForm
      value={input}
      onClick={handleClick}
      onChange={handleChange}
    />
  );
}

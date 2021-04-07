import React, { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import SearchForm from '../components/SearchForm';

import { updateInput } from '../redux/slice';

export default function SearchFormContainer({ onClick }) {
  const dispatch = useDispatch();

  const { input } = useSelector((state) => ({
    input: state.input,
  }));

  const handleClick = useCallback((e) => {
    e.preventDefault();
    onClick(input);
  }, [onClick, input]);

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

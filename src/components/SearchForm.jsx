import React from 'react';

export default function SearchForm({ input, onChange, onClick }) {
  function handleChange(event) {
    const { target: { value } } = event;

    onChange(value);
  }

  return (
    <>
      <input
        id="searchInput"
        placeholder="원하는 곡을 입력해보세요."
        type="text"
        onChange={handleChange}
      />
      <button type="button" onClick={onClick}>찾아보기</button>
    </>
  );
}

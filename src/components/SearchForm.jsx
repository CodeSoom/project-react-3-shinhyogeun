import React from 'react';

export default function SearchForm({ onChange, onClick }) {
  return (
    <>
      <input
        id="searchInput"
        placeholder="원하는 곡을 입력해보세요."
        type="text"
        onChange={onChange}
      />
      <button type="button" onClick={onClick}>찾아보기</button>
    </>
  );
}

import React, { useCallback } from 'react';

export default function SearchForm({ input, onChange, onClick }) {
  const handleChange = useCallback((event) => {
    const { target: { value } } = event;

    onChange(value);
  }, []);

  return (
    <>
      <input
        id="searchInput"
        placeholder="원하는 곡을 입력해보세요."
        type="text"
        value={input}
        onChange={handleChange}
      />
      <button type="button" onClick={onClick}>찾아보기</button>
    </>
  );
}

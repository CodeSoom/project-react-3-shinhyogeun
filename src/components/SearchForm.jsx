import React, { useCallback } from 'react';

import styled from '@emotion/styled';

const InputHeader = styled.div({
  width: '400px',
  height: '75px',
  paddingRight: '50px',
  borderTop: '5px solid red',
  borderBottom: '5px solid teal',
});

const InputField = styled.div({
  height: '50px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  border: '4px solid white',
  borderColor: 'white',
  borderRadius: '30px',
  marginTop: '8.5px',
});

const Input = styled.input({
  fontSize: '20px',
  width: '280px',
  height: '35px',
  border: 'none',
  marginLeft: '15px',
  '&:focus': {
    outline: 'none',
  },
});

const SearchButton = styled.button({
  backgroundColor: 'transparent',
  border: 'none',
  '&:focus': {
    borderColor: 'teal',
    outline: 'none',
  },
  '& i:hover': {
    color: 'teal',
    cursor: 'pointer',
  },
});

export default function SearchForm({ input, onChange, onClick }) {
  const handleChange = useCallback((event) => {
    const { target: { value } } = event;

    onChange(value);
  }, []);

  return (
    <InputHeader>
      <InputField>
        <Input
          id="searchInput"
          placeholder="원하는 곡을 입력해보세요."
          type="text"
          value={input}
          onChange={handleChange}
        />
        <SearchButton type="button" onClick={onClick}>
          <i className="fas fa-search fa-2x" />
        </SearchButton>
      </InputField>
    </InputHeader>
  );
}

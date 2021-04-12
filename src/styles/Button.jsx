import styled from '@emotion/styled';

const Button = styled.div({
  width: '100px',
  height: '40px',
  display: 'flex',
  visibility: 'hidden',
  justifyContent: 'center',
  alignItems: 'center',
  border: '1px solid black',
  borderRadius: '3px',
  boxShadow: '0px 2px 2px black',
  marginLeft: '10px',
  '& div': {
    marginLeft: '5px',
  },
});

export default Button;

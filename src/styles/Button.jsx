import styled from '@emotion/styled';

const Button = styled.div({
  width: '100px',
  height: '40px',
  display: 'none',
  justifyContent: 'center',
  alignItems: 'center',
  border: '2px solid black',
  borderRadius: '10px',
  boxShadow: '0px 5px 5px black',
  marginLeft: '100px',
  '& div': {
    marginLeft: '5px',
  },
});

export default Button;

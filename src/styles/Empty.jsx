import styled from '@emotion/styled';

const Empty = styled.div({
  position: 'relative',
  '& > div:nth-of-type(1)': {
    position: 'absolute',
    fontSize: '25px',
    right: '70px',
    top: '-5px',
  },
  '& > div:nth-of-type(2)': {
    position: 'relative',
    textAlign: 'center',
    fontSize: '40px',
    top: '200px',
    color: 'red',
    fontFamily: 'Montserrat, sans-serif',
  },
});

export default Empty;

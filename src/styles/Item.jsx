import styled from '@emotion/styled';

const Item = styled.li({
  fontFamily: 'Montserrat, sans-serif',
  width: '700px',
  display: 'flex',
  alignItems: 'center',
  padding: '10px',
  border: '2px solid darkturquoise',
  borderRadius: '30px',
  margin: '15px 0 0 0',
  '&:hover': {
    cursor: 'pointer',
    '& > div:nth-of-type(2) > div': {
      display: 'flex',
      marginTop: '5px',
      marginBottom: '5px',
    },
  },
  '& img': {
    width: '100px',
    height: '100px',
    border: '2px solid black',
    borderRadius: '20px',
  },
  '& > div:nth-of-type(1)': {
    width: '370px',
    marginLeft: '10px',
  },

  '& p': {
    fontSize: '17px',
    backgroundColor: 'transparent',
  },
});

export default Item;

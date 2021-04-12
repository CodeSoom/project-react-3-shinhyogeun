import styled from '@emotion/styled';

const Item = styled.li({
  fontFamily: 'Montserrat, sans-serif',
  width: '1000px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '10px',
  borderTop: '1px solid #6F6A5F',
  margin: '0',
  '&:hover': {
    cursor: 'pointer',
    backgroundColor: 'rgba( 97, 92, 79, 0.2 )',
    '& > div:nth-of-type(2) > div': {
      visibility: 'visible',
      marginTop: '5px',
      marginBottom: '5px',
    },
  },
  '& img': {
    width: '70px',
    height: '70px',
    borderRadius: '5px',
  },
  '& > div:nth-of-type(1)': {
    width: '600px',
    marginLeft: '20px',
  },
  '& > div:nth-of-type(2)': {
    display: 'flex',
    marginLeft: '20px',
  },
  '& p': {
    fontSize: '17px',
    backgroundColor: 'transparent',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: '1',
    WebkitBoxOrient: 'vertical',
    wordWrap: 'break-word',
  },
});

export default Item;

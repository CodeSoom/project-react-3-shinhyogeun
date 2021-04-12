import React, { useCallback, useState } from 'react';

import styled from '@emotion/styled';

import Button from '../styles/Button';
import List from '../styles/List';
import Item from '../styles/Item';
import Empty from '../styles/Empty';
import Modal from './Modal';
import Confirm from './Confirm';

const Title = styled.div({
  textAlign: 'center',
  fontFamily: 'Montserrat, sans-serif',
  fontSize: '30px',
});

export default function Playlist({ playlist, onClickListen, onClickDelete }) {
  const initialState = { visible: false, deletedVideoId: null };
  const [state, setState] = useState(initialState);

  const { visible, deletedVideoId } = state;

  const handleClickDelete = useCallback((e, videoId) => {
    e.stopPropagation();
    setState({ deletedVideoId: videoId, visible: !visible });
  }, [state, visible]);

  const handleClickConfirm = useCallback(() => {
    onClickDelete(deletedVideoId);
    setState({ ...state, visible: !visible });
  }, [state, visible, deletedVideoId]);

  const handleClickNotConfirm = useCallback(() => {
    setState({ ...state, visible: !visible });
  }, [state, visible]);

  if (playlist.length === 0) {
    return (
      <Empty>
        <div>EMPTY</div>
      </Empty>
    );
  }

  return (
    <div>
      <Title>Playlist</Title>
      <List>
        {playlist?.map(({ videoId, url, title }) => (
          <Item key={videoId} onClick={() => onClickListen({ videoId, url, title })}>
            <img src={url} alt="thumbnail" />
            <div>
              <p>{title}</p>
            </div>
            <div>
              <Button>
                <i className="fas fa-play" />
                <div>Play</div>
              </Button>
              <Button onClickCapture={(e) => handleClickDelete(e, videoId)}>
                <i className="far fa-trash-alt" />
                <div>Delete</div>
              </Button>
            </div>
          </Item>
        ))}
      </List>
      <Modal visible={visible}>
        <Confirm
          onClickConfirm={handleClickConfirm}
          onClickNotConfirm={handleClickNotConfirm}
        />
      </Modal>
    </div>
  );
}

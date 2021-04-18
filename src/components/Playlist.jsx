import React, { useCallback, useState } from 'react';

import styled from '@emotion/styled';

import Button from '../styles/Button';
import List from '../styles/List';
import Item from '../styles/Item';
import Empty from '../styles/Empty';
import Modal from './Modal';
import Confirm from './Confirm';
import { isPlaying } from '../services/utils';

const Title = styled.div({
  textAlign: 'center',
  fontFamily: 'Montserrat, sans-serif',
  fontStyle: 'italic',
  fontSize: '30px',
});

export default function Playlist({
  playlist,
  player,
  onClickListen,
  onClickDelete,
}) {
  const initialState = { visible: false, deletedMusic: null };
  const [state, setState] = useState(initialState);

  const { visible, deletedMusic } = state;

  const handleClickDelete = useCallback((e, music) => {
    e.stopPropagation();
    setState({ deletedMusic: music, visible: !visible });
  }, [state, visible]);

  const handleClickConfirm = useCallback(() => {
    onClickDelete(deletedMusic.videoId);
    setState({ ...state, visible: !visible });
  }, [state, visible, deletedMusic]);

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
              {isPlaying(player, videoId) ? <p style={{ color: '#03D944' }}>{title}</p> : <p>{title}</p>}
            </div>
            <div>
              <Button>
                <i className="fas fa-play" />
                <div>Play</div>
              </Button>
              <Button onClickCapture={(e) => handleClickDelete(e, { videoId, url, title })}>
                <i className="far fa-trash-alt" />
                <div>Delete</div>
              </Button>
            </div>
          </Item>
        ))}
      </List>
      <Modal visible={visible}>
        <Confirm
          deletedVideo={deletedMusic}
          onClickConfirm={handleClickConfirm}
          onClickNotConfirm={handleClickNotConfirm}
        />
      </Modal>
    </div>
  );
}

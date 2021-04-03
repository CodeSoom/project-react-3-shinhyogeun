import React from 'react';

import Button from '../styles/Button';
import List from '../styles/List';
import Item from '../styles/Item';

export default function Playlist({ playlist, onClickListen, onClickDelete }) {
  return (
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
            <Button onClickCapture={() => onClickDelete(videoId)}>
              <i className="far fa-trash-alt" />
              <div>Delete</div>
            </Button>
          </div>
        </Item>
      ))}
    </List>
  );
}

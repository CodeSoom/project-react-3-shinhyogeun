import React from 'react';

export default function Playlist({ playlist, onClickListen, onClickDelete }) {
  return (
    <ul>
      {playlist?.map(({ videoId, url, title }) => (
        <li key={videoId}>
          <div>{title}</div>
          <img src={url} alt="thumbnail" />
          <button
            type="button"
            onClick={() => onClickListen({ videoId, url, title })}
          >
            듣기
          </button>
          <button
            type="button"
            onClick={() => onClickDelete(videoId)}
          >
            삭제하기
          </button>
        </li>
      ))}
    </ul>
  );
}

import React from 'react';

export default function Playlist({ playlist, onClick }) {
  return (
    <ul>
      {playlist?.map(({ videoId, url, title }) => (
        <li key={videoId}>
          <div>{title}</div>
          <img src={url} alt="thumbnail" />
          <button
            type="button"
            onClick={() => onClick({ videoId, url, title })}
          >
            듣기
          </button>
        </li>
      ))}
    </ul>
  );
}

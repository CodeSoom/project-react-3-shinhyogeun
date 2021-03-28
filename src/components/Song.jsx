import React, { useCallback } from 'react';

export default function Song({ music, onListenClick }) {
  const {
    id: { videoId },
    snippet: {
      title,
      thumbnails: {
        high: { url },
      },
    },
  } = music;

  const handleClick = useCallback(() => {
    onListenClick({ videoId, title, url });
  }, [onListenClick, videoId, title, url]);

  return (
    <li>
      <img src={url} alt="thumbnails" />
      <p>{title}</p>
      <button
        type="button"
        onClick={handleClick}
      >
        듣기
      </button>
    </li>
  );
}

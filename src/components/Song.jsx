import React from 'react';

import YouTube from '@u-wave/react-youtube';

export default function Song({ item }) {
  const { id: { videoId }, snippet: { title, thumbnails: { high: { url } } } } = item;
  return (
    <li>
      <img src={url} alt="thumbnails" />
      <p>{title}</p>
      <YouTube video={videoId} />
    </li>
  );
}

import React, { useCallback, useState } from 'react';

import Youtube from '@u-wave/react-youtube';

export default function Player({ music }) {
  const { videoId, title, url } = music;
  const [paused, setPaused] = useState(false);

  const handleClick = useCallback(() => {
    setPaused(!paused);
  }, [paused]);

  return (
    <>
      <h3>
        지금 듣는 곡은
        {title}
      </h3>
      <img src={url} alt="thumbnail" />
      <Youtube
        autoplay
        video={videoId}
        paused={paused}
      />
      <button
        type="button"
        onClick={handleClick}
      >
        {paused ? 'PLAY' : 'STOP'}
      </button>
    </>
  );
}

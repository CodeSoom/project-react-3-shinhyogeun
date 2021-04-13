export function get(key) {
  return (obj) => obj[key];
}

export function filterMusicInfo(music) {
  if (music.snippet) {
    const {
      id: { videoId },
      snippet: {
        title,
        thumbnails: {
          high: { url },
        },
      },
    } = music;

    return ({ videoId, title, url });
  }

  return music;
}

export function isSameTime(currentTime, endTime) {
  return parseInt(Number(currentTime), 10) === parseInt(endTime, 10);
}

export function getPreviousMusic(musics, music) {
  if (!musics[0].snippet) {
    const musicIndex = musics.findIndex(({ videoId }) => music.videoId === videoId);
    const previousMusic = musics[musicIndex ? musicIndex - 1 : musics.length - 1];

    return previousMusic;
  }

  const musicIndex = musics.findIndex(({ id: { videoId } }) => music.videoId === videoId);
  const previousMusic = musics[musicIndex ? musicIndex - 1 : musics.length - 1];

  return filterMusicInfo(previousMusic);
}

export function getNextMusic(musics, music) {
  if (!musics[0]?.snippet) {
    const musicIndex = musics.findIndex(({ videoId }) => music.videoId === videoId);
    const nextMusic = musics[musicIndex === musics.length - 1 ? 0 : musicIndex + 1];

    return nextMusic;
  }

  const musicIndex = musics.findIndex(({ id: { videoId } }) => music.videoId === videoId);
  const nextMusic = musics[musicIndex === musics.length - 1 ? 0 : musicIndex + 1];

  return filterMusicInfo(nextMusic);
}

export function suffle(playlist) {
  const playOrder = [...playlist];

  for (let index = 0; index < playOrder.length; index += 1) {
    const j = Math.floor(Math.random() * (index + 1));
    const x = playOrder[index];
    playOrder[index] = playOrder[j];
    playOrder[j] = x;
  }

  return playOrder;
}

export function check(musics, response) {
  const filteredMusics = musics.map(({ id: { videoId } }) => videoId);
  return ({
    ...response,
    items: response.items.filter(({ id: { videoId } }) => !filteredMusics.includes(videoId)),
  });
}

export function translateTime(seconds) {
  const hour = parseInt(seconds / 3600, 10);
  const min = parseInt((seconds % 3600) / 60, 10);
  const sec = parseInt(seconds % 60, 10);

  const answer = [];

  if (hour) {
    answer.push(`${hour}:`);
  }

  if (min) {
    if (hour) {
      answer.push(`${min < 10 ? `0${min}:` : `${min}:`}`);
    } else {
      answer.push(`${min}:`);
    }
  } else if (hour) {
    answer.push('00:');
  } else {
    answer.push('0:');
  }

  answer.push(`${sec < 10 ? `0${sec}` : `${sec}`}`);
  return answer.join('');
}

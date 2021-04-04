import musics from '../../../fixtures/musics';
import music from '../../../fixtures/music';

import {
  get,
  filterMusicInfo,
  getPreviousMusic,
  getNextMusic,
  translateTime,
} from '../utils';

test('get', () => {
  const state = {
    name: 'BTS',
  };

  const getName = get('name');
  const getAge = get('age');

  expect(getName(state)).toBe('BTS');
  expect(getAge(state)).toBeUndefined();
});

test('filterMusicInfo', () => {
  const filteredMusicInfo = filterMusicInfo(musics.items[0]);

  expect(filteredMusicInfo.title).toBe(music.title);
  expect(filteredMusicInfo.url).toBe(music.url);
  expect(filteredMusicInfo.videoId).toBe(music.videoId);
});

describe('getPreviousMusic', () => {
  context('playlist일 경우', () => {
    const playlist = musics.items.map((item) => filterMusicInfo(item));

    it('이전 노래를 반환한다.', () => {
      const previousMusic = getPreviousMusic(playlist, filterMusicInfo(musics.items[1]));

      expect(previousMusic.title).toBe(musics.items[0].snippet.title);
    });

    it('처음이라면 마지막 노래를 반환한다.', () => {
      const previousMusic = getPreviousMusic(playlist, music);

      expect(previousMusic.title).toBe(musics.items[1].snippet.title);
    });
  });

  context('SearchResult일 경우', () => {
    it('이전 노래를 반환한다.', () => {
      const previousMusic = getPreviousMusic(musics.items, filterMusicInfo(musics.items[1]));

      expect(previousMusic.title).toBe(musics.items[0].snippet.title);
    });

    it('처음이라면 마지막 노래를 반환한다.', () => {
      const previousMusic = getPreviousMusic(musics.items, music);

      expect(previousMusic.title).toBe(musics.items[1].snippet.title);
    });
  });
});

describe('getNextMusic', () => {
  context('playlist일 경우', () => {
    const playlist = musics.items.map((item) => filterMusicInfo(item));

    it('다음 노래를 반환한다.', () => {
      const nextMusic = getNextMusic(playlist, music);

      expect(nextMusic.title).toBe(musics.items[1].snippet.title);
    });

    it('마지막이라면 처음 노래를 반환한다.', () => {
      const nextMusic = getNextMusic(playlist, filterMusicInfo(musics.items[1]));

      expect(nextMusic.title).toBe(musics.items[0].snippet.title);
    });
  });

  context('SearchResult일 경우', () => {
    it('다음 노래를 반환한다.', () => {
      const nextMusic = getNextMusic(musics.items, music);

      expect(nextMusic.title).toBe(musics.items[1].snippet.title);
    });

    it('마지막이라면 처음 노래를 반환한다.', () => {
      const nextMusic = getNextMusic(musics.items, filterMusicInfo(musics.items[1]));

      expect(nextMusic.title).toBe(musics.items[0].snippet.title);
    });
  });
});

test('translateTime', () => {
  expect(translateTime(10)).toBe('0:10');
  expect(translateTime(100)).toBe('1:40');
  expect(translateTime(1020)).toBe('17:00');
  expect(translateTime(7250)).toBe('2:00:50');
  expect(translateTime(7300)).toBe('2:01:40');
  expect(translateTime(10000)).toBe('2:46:40');
});

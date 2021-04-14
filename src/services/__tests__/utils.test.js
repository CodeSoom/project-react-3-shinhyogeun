import musics from '../../../fixtures/musics';
import music from '../../../fixtures/music';

import {
  get,
  filterMusicInfo,
  isSameTime,
  getPreviousMusic,
  getNextMusic,
  check,
  translateTime,
  isNothing,
  isDifferentMusic,
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

test('filterMusicInfo', () => {
  const filteredMusicInfo = filterMusicInfo(music);

  expect(filteredMusicInfo.title).toBe(music.title);
  expect(filteredMusicInfo.url).toBe(music.url);
  expect(filteredMusicInfo.videoId).toBe(music.videoId);
});

test('isSameTime', () => {
  expect(isSameTime('1235', 1235)).toBe(true);
  expect(isSameTime('1235.23', 1235.00932)).toBe(true);
  expect(isSameTime('1233', 1235)).toBe(false);
});

test('isDifferentMusic', () => {
  const playerA = { resultToken: 1, videoId: 'XXX' };
  const playerB = { resultToken: 1, videoId: 'XXX' };
  const playerC = { resultToken: 0, videoId: 'XXX' };
  const playerD = { resultToken: 1, videoId: 'XYZ' };

  expect(isDifferentMusic(playerA, playerB)).toBe(false);
  expect(isDifferentMusic(playerA, playerC)).toBe(true);
  expect(isDifferentMusic(playerA, playerD)).toBe(true);
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

test('check', () => {
  expect(check(musics.items, musics).items).toHaveLength(0);
});

test('isNothing', () => {
  expect(isNothing([], '')).toBeFalsy();
  expect(isNothing([], undefined)).toBeTruthy();
});

test('translateTime', () => {
  expect(translateTime(10)).toBe('0:10');
  expect(translateTime(100)).toBe('1:40');
  expect(translateTime(1020)).toBe('17:00');
  expect(translateTime(7250)).toBe('2:00:50');
  expect(translateTime(7300)).toBe('2:01:40');
  expect(translateTime(10000)).toBe('2:46:40');
});

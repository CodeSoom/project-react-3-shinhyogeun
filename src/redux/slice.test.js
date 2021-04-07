import thunk from 'redux-thunk';

import configureStore from 'redux-mock-store';

import given from 'given2';

import reducer, {
  setPreviousKeyword,
  updateInput,
  setResponse,
  addResponse,
  setPalyer,
  sufflePlaylist,
  changePlayStyle,
  toggleMute,
  toggleSuffle,
  changeVolume,
  updatePlaylistMusic,
  appendPlaylistMusic,
  searchMusic,
  searchMoreMusic,
  setPreviousMusic,
  setNextMusic,
  addPlaylistMusic,
  deletePlaylistMusic,
  changeSuffle,
} from './slice';

import music from '../../fixtures/music';
import musics from '../../fixtures/musics';
import { filterMusicInfo, suffle } from '../services/utils';

jest.mock('../services/api');
jest.mock('../services/storage');

const middleware = [thunk];
const mockStore = configureStore(middleware);

describe('slice', () => {
  describe('reducer', () => {
    it('setPreviousKeyword', () => {
      const initialState = {
        previousKeyword: '',
      };

      const state = reducer(initialState, setPreviousKeyword('새로운 음악'));

      expect(state.previousKeyword).toBe('새로운 음악');
    });

    it('updateInput', () => {
      const initialState = {
        input: '',
      };

      const state = reducer(initialState, updateInput('새로운 음악'));

      expect(state.input).toBe('새로운 음악');
    });

    it('setResponse', () => {
      const initialState = {
        nextPageToken: '',
        musics: [],
      };

      const state = reducer(initialState, setResponse({
        nextPageToken: 'NEXT_PAGE_TOKEN',
        items: ['SONG1', 'SONG2'],
      }));

      expect(state.nextPageToken).toBe('NEXT_PAGE_TOKEN');
      expect(state.musics[0]).toBe('SONG1');
    });

    it('addResponse', () => {
      const initialState = {
        nextPageToken: 'NEXT_PAGE_TOKEN',
        musics: ['SONG1', 'SONG2'],
      };

      const state = reducer(initialState, addResponse({
        nextPageToken: 'NEXT_PAGE_TOKEN2',
        items: ['SONG3', 'SONG4'],
      }));

      expect(state.nextPageToken).toBe('NEXT_PAGE_TOKEN2');
      expect(state.musics[3]).toBe('SONG4');
    });

    it('setPlayer', () => {
      const initialState = {};
      const song = {
        videoId: 'VIDEO_ID',
        title: 'TITLE',
        url: 'URL',
      };

      const state = reducer(initialState, setPalyer(song));

      expect(state.player.videoId).toBe('VIDEO_ID');
    });

    it('sufflePlaylist', () => {
      const initialState = {
        musics: musics.items,
        suffledPlaylist: [],
      };
      const state = reducer(initialState, sufflePlaylist(1));
      expect(state.suffledPlaylist.length).toBe(2);
    });

    it('sufflePlaylist', () => {
      const initialState = {
        playlist: musics.items.map((song) => filterMusicInfo(song)),
        suffledPlaylist: [],
      };
      const state = reducer(initialState, sufflePlaylist(0));
      expect(state.suffledPlaylist.length).toBe(2);
    });

    it('changePlayStyle', () => {
      const initialState = {
        playerInfo: { playStyle: 1 },
      };

      const state = reducer(initialState, changePlayStyle());
      expect(state.playerInfo.playStyle).toBe(2);
      const nextState = reducer(state, changePlayStyle());
      expect(nextState.playerInfo.playStyle).toBe(0);
    });

    it('toggleMute', () => {
      const initialState = {
        playerInfo: { isMute: true },
      };

      const state = reducer(initialState, toggleMute());
      expect(state.playerInfo.isMute).toBe(false);
    });

    it('toggleSuffle', () => {
      const initialState = {
        playerInfo: { isSuffle: true },
      };

      const state = reducer(initialState, toggleSuffle());
      expect(state.playerInfo.isSuffle).toBe(false);
    });

    it('changeVolume', () => {
      const initialState = {
        playerInfo: { volume: 1 },
      };

      const state = reducer(initialState, changeVolume(0.5));
      expect(state.playerInfo.volume).toBe(0.5);
    });

    it('updatePlaylistMusic', () => {
      const initialState = {
        playlist: [],
      };
      const playlist = musics.items.map((song) => filterMusicInfo(song));

      const state = reducer(initialState, updatePlaylistMusic(playlist));

      expect(state.playlist.length).toBe(2);
    });

    it('appendPlaylistMusic', () => {
      const initialState = {
        playlist: [],
      };
      const song = {
        videoId: 'VIDEO_ID',
        title: 'TITLE',
        url: 'URL',
      };

      const state = reducer(initialState, appendPlaylistMusic(song));

      expect(state.playlist.length).toBe(1);
    });
  });

  describe('actions', () => {
    let store;
    describe('searchMusic', () => {
      beforeEach(() => jest.clearAllMocks());

      context('이전 검색어와 같을 때', () => {
        given('previousKeyword', () => 'DEAN');
        it('새로운 검색을 시도하지 않는다.', async () => {
          const storeMock = mockStore({ previousKeyword: 'DEAN' });

          await storeMock.dispatch(searchMusic('DEAN'));

          const actions = storeMock.getActions();

          expect(actions[0]).not.toEqual(setResponse([]));
        });
      });
      context('이전 검색어와 다를 때', () => {
        given('previousKeyword', () => 'LEAN');
        it('Youtube 음악을 불러와 setMusics를 실행한다.', async () => {
          const storeMock = mockStore({ previousKeyword: '' });

          await storeMock.dispatch(searchMusic('DEAN'));

          const actions = storeMock.getActions();

          expect(actions[0]).toEqual(setResponse([]));
        });
      });
    });

    describe('searchMoreMusic', () => {
      beforeEach(() => {
        store = mockStore({});
      });

      it('Youtube 음악을 불러와 setMusics를 실행한다.', async () => {
        await store.dispatch(searchMoreMusic('DEAN', 'NEXT_PAGE_TOKEN'));

        const actions = store.getActions();
        expect(actions[0]).toEqual(addResponse([]));
      });
    });

    describe('setPreviousMusic', () => {
      context('suffle이 켜져있을 때', () => {
        context('새로운 노래가 있을 경우', () => {
          it('다시 셔플을 한다.', () => {
            store = mockStore({
              musics: musics.items,
              playlist: musics.items.map((song) => filterMusicInfo(song)),
              suffledPlaylist: [],
              player: { resultToken: 1 },
              playerInfo: { isSuffle: true },
            });
            store.dispatch(setPreviousMusic({ resultToken: 1, ...music }));
            const actions = store.getActions();
            expect(actions[0]).toEqual(sufflePlaylist(1));
          });
        });
        context('새로운 노래가 없을 경우', () => {
          it('셔플목록의 이전노래를 실행한다.', () => {
            store = mockStore({
              musics: musics.items,
              playlist: musics.items.map((song) => filterMusicInfo(song)),
              suffledPlaylist: suffle(musics.items),
              player: { resultToken: 1 },
              playerInfo: { isSuffle: true },
            });

            store.dispatch(setPreviousMusic({ resultToken: 1, ...music }));
            const actions = store.getActions();
            expect(actions[0].type).toBe('application/setPalyer');
          });
        });
      });

      context('suffle이 꺼져있을 때', () => {
        it('Playlist의 이전 곡을 실행시킨다.', () => {
          store = mockStore({
            musics: musics.items,
            playlist: musics.items.map((song) => filterMusicInfo(song)),
            suffledPlaylist: suffle(musics.items),
            player: { resultToken: 0 },
            playerInfo: { isSuffle: false },
          });
          store.dispatch(setPreviousMusic({ resultToken: 0, ...music }));

          const actions = store.getActions();
          const previousMusic = { resultToken: 0, ...filterMusicInfo(musics.items[1]) };
          expect(actions[0]).toEqual(setPalyer(previousMusic));
        });

        it('SearchResult의 이전 곡을 실행시킨다.', () => {
          store = mockStore({
            musics: musics.items,
            playlist: musics.items.map((song) => filterMusicInfo(song)),
            suffledPlaylist: suffle(musics.items),
            player: { resultToken: 1 },
            playerInfo: { isSuffle: false },
          });
          store.dispatch(setPreviousMusic({ resultToken: 1, ...music }));

          const actions = store.getActions();
          const previousMusic = { resultToken: 1, ...filterMusicInfo(musics.items[1]) };
          expect(actions[0]).toEqual(setPalyer(previousMusic));
        });
      });
    });

    describe('setNextMusic', () => {
      context('suffle이 켜져있을 때', () => {
        context('새로운 노래가 있을 경우', () => {
          it('다시 셔플을 한다.', () => {
            store = mockStore({
              musics: musics.items,
              playlist: musics.items.map((song) => filterMusicInfo(song)),
              suffledPlaylist: [],
              player: { resultToken: 1 },
              playerInfo: { isSuffle: true },
            });
            store.dispatch(setNextMusic({ resultToken: 1, ...music }));
            const actions = store.getActions();
            expect(actions[0]).toEqual(sufflePlaylist(1));
          });
        });
        context('새로운 노래가 없을 경우', () => {
          it('셔플목록의 다음노래를 실행한다.', () => {
            const suffledPlaylist = suffle(musics.items);

            store = mockStore({
              musics: musics.items,
              playlist: musics.items.map((song) => filterMusicInfo(song)),
              suffledPlaylist,
              player: { resultToken: 1 },
              playerInfo: { isSuffle: true },
            });

            store.dispatch(setNextMusic({ resultToken: 1, ...music }));
            const actions = store.getActions();
            expect(actions[0].type).toBe('application/setPalyer');
          });
        });
      });

      context('suffle이 꺼져있을 때', () => {
        it('Playlist의 다음 곡을 실행시킨다.', () => {
          store = mockStore({
            musics: musics.items,
            playlist: musics.items.map((song) => filterMusicInfo(song)),
            suffledPlaylist: suffle(musics.items),
            player: { resultToken: 1 },
            playerInfo: { isSuffle: false },
          });

          store.dispatch(setNextMusic({ resultToken: 0, ...music }));

          const actions = store.getActions();
          const nextMusic = { resultToken: 1, ...filterMusicInfo(musics.items[1]) };
          expect(actions[0]).toEqual(setPalyer(nextMusic));
        });

        it('SearchResult의 다음 곡을 실행시킨다.', () => {
          store = mockStore({
            musics: musics.items,
            playlist: musics.items.map((song) => filterMusicInfo(song)),
            suffledPlaylist: suffle(musics.items),
            player: { resultToken: 0 },
            playerInfo: { isSuffle: false },
          });
          store.dispatch(setNextMusic({ resultToken: 0, ...music }));

          const actions = store.getActions();
          const nextMusic = { resultToken: 0, ...filterMusicInfo(musics.items[1]) };
          expect(actions[0]).toEqual(setPalyer(nextMusic));
        });
      });
    });

    describe('addPlaylistMusic', () => {
      it('새로운 음악을 playlist에 추가한다.', () => {
        store = mockStore({ playlist: [] });
        store.dispatch(addPlaylistMusic(music));

        const actions = store.getActions();
        expect(actions[0]).toEqual(appendPlaylistMusic(music));
      });

      it('새로운 음악을 playlist에 1번만 추가한다.', () => {
        store = mockStore({ playlist: [music] });
        store.dispatch(addPlaylistMusic(music));
        store.dispatch(addPlaylistMusic(music));
        store.dispatch(addPlaylistMusic(music));

        const actions = store.getActions();
        expect(actions.length).toBe(0);
      });
    });

    describe('deletePlaylistMusic', () => {
      it('음악을 playlist에서 삭제한다.', () => {
        const playlist = musics.items.map((song) => filterMusicInfo(song));

        store = mockStore({ playlist });
        store.dispatch(deletePlaylistMusic(music.videoId));

        const actions = store.getActions();
        expect(actions[0]).toEqual(updatePlaylistMusic([filterMusicInfo(musics.items[1])]));
      });

      it('새로운 음악을 playlist에 1번만 추가한다.', () => {
        store = mockStore({ playlist: [music] });
        store.dispatch(addPlaylistMusic(music));
        store.dispatch(addPlaylistMusic(music));
        store.dispatch(addPlaylistMusic(music));

        const actions = store.getActions();
        expect(actions.length).toBe(0);
      });
    });

    describe('changeSuffle', () => {
      it('suffle이 켜질 때 suffle을 한다.', () => {
        store = mockStore({
          musics: musics.items,
          playlist: musics.items.map((song) => filterMusicInfo(song)),
          suffledPlaylist: suffle(musics.items),
          player: { resultToken: 1 },
          playerInfo: { isSuffle: false },
        });

        store.dispatch(changeSuffle());

        const actions = store.getActions();
        expect(actions[0]).toEqual(sufflePlaylist(filterMusicInfo(1)));
      });

      it('suffle이 꺼질 때 suffle 하지않는다.', () => {
        store = mockStore({
          musics: musics.items,
          playlist: musics.items.map((song) => filterMusicInfo(song)),
          suffledPlaylist: suffle(musics.items),
          player: { resultToken: 1 },
          playerInfo: { isSuffle: true },
        });

        store.dispatch(changeSuffle());

        const actions = store.getActions();
        expect(actions[0]).toEqual(toggleSuffle());
      });
    });
  });
});

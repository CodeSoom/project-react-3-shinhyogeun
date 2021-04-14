import thunk from 'redux-thunk';

import configureStore from 'redux-mock-store';

import given from 'given2';

import reducer, {
  setPreviousKeyword,
  setPreviousPageToken,
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
  togglePaused,
  listenMusic,
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
      const initialState = { previous: { keyword: '' } };

      const state = reducer(initialState, setPreviousKeyword('새로운 음악'));

      expect(state.previous.keyword).toBe('새로운 음악');
    });

    it('setPreviousPageToken', () => {
      const initialState = { previous: { pageToken: '' } };

      const state = reducer(initialState, setPreviousPageToken('PREVIOUS_PAGE_TOKEN'));

      expect(state.previous.pageToken).toBe('PREVIOUS_PAGE_TOKEN');
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

    it('togglePaused', () => {
      const initialState = {
        playerInfo: { isPaused: false },
      };

      const state = reducer(initialState, togglePaused());
      expect(state.playerInfo.isPaused).toBe(true);
    });

    it('togglePaused', () => {
      const initialState = {
        playerInfo: { isPaused: false },
      };

      const state = reducer(initialState, togglePaused(false));
      expect(state.playerInfo.isPaused).toBe(false);
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
        it('새로운 검색을 시도하지 않는다.', async () => {
          const storeMock = mockStore({ previous: { keyword: 'DEAN' } });

          await storeMock.dispatch(searchMusic('DEAN'));

          const actions = storeMock.getActions();

          expect(actions[0]).not.toEqual(setResponse({ nextPageToken: 'NEXT_PAGE_TOKEN', items: [] }));
        });
      });
      context('이전 검색어와 다를 때', () => {
        given('previousKeyword', () => 'LEAN');
        it('Youtube 음악을 불러와 setMusics를 실행한다.', async () => {
          const storeMock = mockStore({ previous: { keyword: '' } });

          await storeMock.dispatch(searchMusic('DEAN'));

          const actions = storeMock.getActions();
          expect(actions[0]).toEqual(setResponse({ nextPageToken: '', items: [] }));
          expect(actions[1]).toEqual(setResponse({ nextPageToken: 'NEXT_PAGE_TOKEN', items: [] }));
        });
      });
    });

    describe('searchMoreMusic', () => {
      context('연속적인 클릭이 일어나지 않았을 때', () => {
        it('Youtube 음악을 불러와 setMusics를 실행한다.', async () => {
          store = mockStore({
            previous: { pageToken: '' },
            musics: [],
          });
          await store.dispatch(searchMoreMusic('DEAN', 'NEXT_PAGE_TOKEN'));

          const actions = store.getActions();
          expect(actions[0]).toEqual(setPreviousPageToken('NEXT_PAGE_TOKEN'));
          expect(actions[1]).toEqual(addResponse({ nextPageToken: 'NEXT_PAGE_TOKEN', items: [] }));
        });
      });

      context('연속적인 클릭이 일어났을 때', () => {
        it('Youtube 음악을 불러오지 않는다.', async () => {
          store = mockStore({ previous: { pageToken: 'NEXT_PAGE_TOKEN' } });
          await store.dispatch(searchMoreMusic('DEAN', 'NEXT_PAGE_TOKEN'));

          const actions = store.getActions();
          expect(actions).toEqual([]);
        });
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

    describe('listenMusic', () => {
      context('새로운 음악의 실행이 요청되었을 때', () => {
        it('새로운 음악으로 플레이어를 설정한다.', () => {
          store = mockStore({
            player: { resultToken: 1, videoId: 'YYY' },
            playerInfo: { isPaused: false },
          });
          store.dispatch(listenMusic({ resultToken: 1, videoId: 'XXX' }));
          const actions = store.getActions();

          expect(actions[0]).toStrictEqual(setPalyer({ resultToken: 1, videoId: 'XXX' }));
        });
      });

      context('기존의 음악이 다시 실행을 요청받을 때', () => {
        it('멈춰있는 경우라면 다시 플레어어로 설정한다.', () => {
          store = mockStore({
            player: { resultToken: 1, videoId: 'YYY' },
            playerInfo: { isPaused: true },
          });
          store.dispatch(listenMusic({ resultToken: 1, videoId: 'YYY' }));
          const actions = store.getActions();

          expect(actions[0]).toStrictEqual(setPalyer({ resultToken: 1, videoId: 'YYY' }));
        });

        it('듣고있는 중이라면 무시하다.', () => {
          store = mockStore({
            player: { resultToken: 1, videoId: 'YYY' },
            playerInfo: { isPaused: false },
          });
          store.dispatch(listenMusic({ resultToken: 1, videoId: 'YYY' }));
          const actions = store.getActions();

          expect(actions[0]).toBeUndefined();
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
      context('현재 재생되는 음악이 아닐경우', () => {
        it('음악을 playlist에서 삭제한다.', () => {
          const playlist = musics.items.map((song) => filterMusicInfo(song));

          store = mockStore({
            playlist,
            player: {},
          });
          store.dispatch(deletePlaylistMusic(music.videoId));

          const actions = store.getActions();
          expect(actions[0]).toEqual(updatePlaylistMusic([filterMusicInfo(musics.items[1])]));
        });
      });
      context('현재 재생되는 음악일 경우', () => {
        it('재생을 멈추고 음악을 playlist에서 삭제한다.', () => {
          const playlist = musics.items.map((song) => filterMusicInfo(song));

          store = mockStore({
            playlist,
            player: { resultToken: 0, ...music },
          });
          store.dispatch(deletePlaylistMusic(music.videoId));

          const actions = store.getActions();
          expect(actions[0]).toEqual(setPalyer({}));
          expect(actions[1]).toEqual(updatePlaylistMusic([filterMusicInfo(musics.items[1])]));
        });
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

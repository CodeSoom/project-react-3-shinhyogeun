import thunk from 'redux-thunk';

import configureStore from 'redux-mock-store';

import reducer, {
  updateInput,
  setResponse,
  setPalyer,
  addResponse,
  appendPlaylistMusic,
  deleteMusic,
  searchMusic,
  searchMoreMusic,
  addPlaylistMusic,
} from './slice';

import music from '../../fixtures/music';
import musics from '../../fixtures/musics';
import { filterMusicInfo } from '../services/utils';

jest.mock('../services/api');
jest.mock('../services/storage');

const middleware = [thunk];
const mockStore = configureStore(middleware);

describe('slice', () => {
  describe('reducer', () => {
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

    it('deleteMusic', () => {
      const initialState = {
        playlist: musics.items.map((song) => filterMusicInfo(song)),
      };

      const state = reducer(initialState, deleteMusic('_dIHX0J6bxw'));

      expect(state.playlist.length).toBe(1);
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
      beforeEach(() => {
        store = mockStore({});
      });

      it('Youtube 음악을 불러와 setMusics를 실행한다.', async () => {
        await store.dispatch(searchMusic('DEAN'));

        const actions = store.getActions();
        expect(actions[0]).toEqual(setResponse([]));
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
  });
});

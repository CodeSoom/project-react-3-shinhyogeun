import thunk from 'redux-thunk';

import configureStore from 'redux-mock-store';

import reducer, {
  updateInput,
  setResponse,
  addResponse,
  searchMusic,
  searchMoreMusic,
} from './slice';

jest.mock('../services/api');

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
  });
});

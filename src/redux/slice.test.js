import thunk from 'redux-thunk';

import configureStore from 'redux-mock-store';

import reducer, { searchMusic, setResponse, updateInput } from './slice';

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
  });

  describe('actions', () => {
    let store;
    describe('fetchYoutubeMusics', () => {
      beforeEach(() => {
        store = mockStore({
          input: 'DEAN',
        });
      });

      it('Youtube 음악을 불러와 setMusics를 실행한다.', async () => {
        await store.dispatch(searchMusic());

        const actions = store.getActions();
        expect(actions[0]).toEqual(setResponse([]));
      });
    });
  });
});

import reducer, { updateInput } from './slice';

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
});

import { createSlice } from '@reduxjs/toolkit';
import { fetchYouTubeMusics } from '../services/api';

const { reducer, actions } = createSlice({
  name: 'application',
  initialState: {
    input: '',
    musics: [],
  },
  reducers: {
    updateInput: (state, { payload: input }) => ({
      ...state,
      input,
    }),

    setMusics: (state, { payload: musics }) => ({
      ...state,
      musics: [...state.musics, musics],
    }),
  },
});

export const { updateInput, setMusics } = actions;

export function searchMusic() {
  return async (dispatch, getState) => {
    const { input } = getState();
    const response = await fetchYouTubeMusics(input);

    dispatch(setMusics(response));
  };
}

export default reducer;

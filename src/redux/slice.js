import { createSlice } from '@reduxjs/toolkit';
import { fetchYouTubeMusics } from '../services/api';

const { reducer, actions } = createSlice({
  name: 'application',
  initialState: {
    input: '',
    nextPageToken: '',
    musics: [],
  },
  reducers: {
    updateInput: (state, { payload: input }) => ({
      ...state,
      input,
    }),

    setResponse: (state, { payload: { nextPageToken, items } }) => ({
      ...state,
      nextPageToken,
      musics: [...state.musics, ...items],
    }),
  },
});

export const { updateInput, setResponse } = actions;

export function searchMusic() {
  return async (dispatch, getState) => {
    const { input } = getState();
    const response = await fetchYouTubeMusics(input);

    dispatch(setResponse(response));
  };
}

export default reducer;

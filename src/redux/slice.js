import { createSlice } from '@reduxjs/toolkit';

import { fetchYouTubeMusics } from '../services/api';

const { reducer, actions } = createSlice({
  name: 'application',
  initialState: {
    input: '',
    nextPageToken: '',
    musics: [],
    player: {},
  },
  reducers: {
    updateInput: (state, { payload: input }) => ({
      ...state,
      input,
    }),

    setResponse: (state, { payload: { nextPageToken, items } }) => ({
      ...state,
      nextPageToken,
      musics: [...items],
    }),

    addResponse: (state, { payload: { nextPageToken, items } }) => ({
      ...state,
      nextPageToken,
      musics: [...state.musics, ...items],
    }),

    setPalyer: (state, { payload: { videoId, title, url } }) => ({
      ...state,
      player: { videoId, title, url },
    }),
  },
});

export const {
  updateInput,
  addResponse,
  setResponse,
  setPalyer,
} = actions;

export function searchMusic(keyword) {
  return async (dispatch) => {
    const response = await fetchYouTubeMusics(keyword);

    dispatch(setResponse(response));
  };
}

export function searchMoreMusic(keyword, nextPageToken) {
  return async (dispatch) => {
    const response = await fetchYouTubeMusics(keyword, nextPageToken);

    dispatch(addResponse(response));
  };
}

export default reducer;

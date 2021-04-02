import { createSlice } from '@reduxjs/toolkit';

import { fetchYouTubeMusics } from '../services/api';

import { saveItem } from '../services/storage';

const { reducer, actions } = createSlice({
  name: 'application',
  initialState: {
    input: '',
    nextPageToken: '',
    playlist: [],
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

    appendPlaylistMusic: (state, { payload: { videoId, title, url } }) => ({
      ...state,
      playlist: [...state.playlist, { videoId, title, url }],
    }),
  },
});

export const {
  updateInput,
  addResponse,
  setResponse,
  setPalyer,
  appendPlaylistMusic,
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

export function addPlaylistMusic(music) {
  return (dispatch, getState) => {
    const { playlist } = getState();

    const isAlreadyIn = playlist.map((song) => song.videoId).includes(music.videoId);

    if (isAlreadyIn) {
      return;
    }

    saveItem('PLAYLIST', [...playlist, music]);

    dispatch(appendPlaylistMusic(music));
  };
}

export default reducer;

import { createSlice } from '@reduxjs/toolkit';

import { fetchYouTubeMusics } from '../services/api';

import { saveItem } from '../services/storage';
import { getNextMusic, getPreviousMusic } from '../services/utils';

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

    setPalyer: (state, { payload: playerInfo }) => ({
      ...state,
      player: playerInfo,
    }),

    updatePlaylistMusic: (state, { payload: playlist }) => ({
      ...state,
      playlist,
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
  updatePlaylistMusic,
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

export function setPreviousMusic(music) {
  return (dispatch, getState) => {
    const state = getState();
    const { resultToken } = music;
    const playlist = resultToken ? state.musics : state.playlist;
    const previousMusic = getPreviousMusic(playlist, music);

    dispatch(setPalyer({ resultToken, ...previousMusic }));
  };
}

export function setNextMusic(music) {
  return (dispatch, getState) => {
    const state = getState();
    const { resultToken } = music;
    const playlist = resultToken ? state.musics : state.playlist;
    const nextMusic = getNextMusic(playlist, music);

    dispatch(setPalyer({ resultToken, ...nextMusic }));
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

export function deletePlaylistMusic(videoId) {
  return (dispatch, getState) => {
    const { playlist } = getState();

    const filteredPlaylist = playlist.filter((music) => music.videoId !== videoId);

    saveItem('PLAYLIST', filteredPlaylist);

    dispatch(updatePlaylistMusic(filteredPlaylist));
  };
}

export default reducer;

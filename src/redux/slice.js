import { createSlice } from '@reduxjs/toolkit';

import { fetchYouTubeMusics } from '../services/api';

import { saveItem } from '../services/storage';

import {
  check, getNextMusic, getPreviousMusic, suffle,
} from '../services/utils';

const { reducer, actions } = createSlice({
  name: 'application',
  initialState: {
    previous: {
      keyword: null,
      pageToken: '',
    },
    input: '',
    nextPageToken: '',
    playlist: [],
    suffledPlaylist: [],
    musics: [],
    player: {},
    playerInfo: {
      playStyle: 0,
      volume: 1,
      isMute: false,
      isSuffle: false,
    },
  },
  reducers: {
    setPreviousKeyword: (state, { payload: keyword }) => ({
      ...state,
      previous: {
        ...state.previous,
        keyword,
      },
    }),

    setPreviousPageToken: (state, { payload: pageToken }) => ({
      ...state,
      previous: {
        ...state.previous,
        pageToken,
      },
    }),

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

    setPalyer: (state, { payload: player }) => ({
      ...state,
      player,
    }),

    sufflePlaylist: (state, { payload: resultToken }) => ({
      ...state,
      suffledPlaylist: resultToken ? suffle(state.musics) : suffle(state.playlist),
    }),

    changePlayStyle: (state) => ({
      ...state,
      playerInfo: {
        ...state.playerInfo,
        playStyle: state.playerInfo.playStyle < 2 ? state.playerInfo.playStyle + 1 : 0,
      },
    }),

    toggleMute: (state) => ({
      ...state,
      playerInfo: {
        ...state.playerInfo,
        isMute: !state.playerInfo.isMute,
      },
    }),

    toggleSuffle: (state) => ({
      ...state,
      playerInfo: {
        ...state.playerInfo,
        isSuffle: !state.playerInfo.isSuffle,
      },
    }),

    changeVolume: (state, { payload: volume }) => ({
      ...state,
      playerInfo: {
        ...state.playerInfo,
        volume,
      },
    }),

    updatePlaylistMusic: (state, { payload: playlist }) => ({
      ...state,
      playlist,
    }),

    appendPlaylistMusic: (state, { payload: { videoId, title, url } }) => ({
      ...state,
      playlist: [{ videoId, title, url }, ...state.playlist],
    }),
  },
});

export const {
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
} = actions;

export function searchMusic(word) {
  return async (dispatch, getState) => {
    const { previous: { keyword } } = getState();

    if (keyword === word) {
      return;
    }

    dispatch(setResponse({ nextPageToken: '', items: [] }));

    const response = await fetchYouTubeMusics(word);

    dispatch(setResponse(response));
    dispatch(setPreviousKeyword(word));
  };
}

export function searchMoreMusic(keyword, nextPageToken) {
  return async (dispatch, getState) => {
    const { musics, previous: { pageToken } } = getState();

    if (pageToken === nextPageToken) {
      return;
    }

    dispatch(setPreviousPageToken(nextPageToken));

    const response = await fetchYouTubeMusics(keyword, nextPageToken);

    const checkedResponse = check(musics, response);

    dispatch(addResponse(checkedResponse));
  };
}

export function setPreviousMusic(music) {
  return (dispatch, getState) => {
    const state = getState();
    const {
      musics,
      playlist,
      suffledPlaylist,
      player: { resultToken },
      playerInfo: { isSuffle },
    } = state;
    const nowPlaylist = resultToken ? musics : playlist;

    if (isSuffle) {
      if (nowPlaylist.length !== suffledPlaylist.length) {
        dispatch(sufflePlaylist(resultToken));

        return setPreviousMusic(music);
      }
      const previousMusic = getPreviousMusic(suffledPlaylist, music);

      return dispatch(setPalyer({ resultToken, ...previousMusic }));
    }

    const previousMusic = getPreviousMusic(nowPlaylist, music);

    return dispatch(setPalyer({ resultToken, ...previousMusic }));
  };
}

export function setNextMusic(music, repeat = false) {
  return (dispatch, getState) => {
    const state = getState();
    const {
      musics,
      playlist,
      suffledPlaylist,
      player: { resultToken },
      playerInfo: { isSuffle },
    } = state;

    const nowPlaylist = resultToken ? musics : playlist;

    if (isSuffle) {
      if (nowPlaylist.length !== suffledPlaylist.length && !repeat) {
        dispatch(sufflePlaylist(resultToken));

        return dispatch(setNextMusic(music, !repeat));
      }
      const nextMusic = getNextMusic(suffledPlaylist, music);

      return dispatch(setPalyer({ resultToken, ...nextMusic }));
    }

    const nextMusic = getNextMusic(nowPlaylist, music);

    return dispatch(setPalyer({ resultToken, ...nextMusic }));
  };
}

export function addPlaylistMusic(music) {
  return (dispatch, getState) => {
    const { playlist } = getState();

    const isAlreadyIn = playlist.map((song) => song.videoId).includes(music.videoId);

    if (isAlreadyIn) {
      return;
    }

    saveItem('PLAYLIST', [music, ...playlist]);

    dispatch(appendPlaylistMusic(music));
  };
}

export function deletePlaylistMusic(videoId) {
  return (dispatch, getState) => {
    const { playlist, player } = getState();

    const filteredPlaylist = playlist.filter((music) => music.videoId !== videoId);

    if (player.videoId === videoId && !player.resultToken) {
      dispatch(setPalyer({}));
    }

    saveItem('PLAYLIST', filteredPlaylist);

    dispatch(updatePlaylistMusic(filteredPlaylist));
  };
}

export function changeSuffle() {
  return (dispatch, getState) => {
    const { player: { resultToken }, playerInfo: { isSuffle } } = getState();

    if (!isSuffle) {
      dispatch(sufflePlaylist(resultToken));
    }

    dispatch(toggleSuffle());
  };
}

export default reducer;

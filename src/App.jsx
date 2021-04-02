import React from 'react';

import { useDispatch } from 'react-redux';

import { Switch, Route, Link } from 'react-router-dom';

import PlayerPage from './pages/PlayerPage';
import PlaylistPage from './pages/PlaylistPage';
import SearchFormPage from './pages/SearchFormPage';
import SearchResultPage from './pages/SearchResultPage';

import { appendPlaylistMusic } from './redux/slice';

import { loadItem } from './services/storage';

export default function App() {
  const dispatch = useDispatch();

  const playlistMusic = loadItem('PLAYLIST');
  playlistMusic?.map((music) => dispatch(appendPlaylistMusic(music)));

  return (
    <>
      <header>
        <h1>
          <Link to="/">My Playlist</Link>
        </h1>
      </header>
      <SearchFormPage />
      <Switch>
        <Route exact path="/" component={PlaylistPage} />
        <Route path="/result/:searchQuery?" component={SearchResultPage} />
      </Switch>
      <PlayerPage />
    </>
  );
}

import React from 'react';

import { Switch, Route, Link } from 'react-router-dom';
import PlaylistPage from './pages/PlaylistPage';

import SearchFormPage from './pages/SearchFormPage';

import SearchResultPage from './pages/SearchResultPage';

export default function App() {
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
        <Route path="/search/:keyword" component={SearchResultPage} />
      </Switch>
    </>
  );
}

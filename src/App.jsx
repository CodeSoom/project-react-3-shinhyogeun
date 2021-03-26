import React from 'react';

import { Switch, Route, Link } from 'react-router-dom';

import SearchFormContainer from './container/SearchFormContainer';

import SearchResultPage from './pages/SearchResultPage';

export default function App() {
  return (
    <>
      <header>
        <h1>
          <Link to="/">My Playlist</Link>
        </h1>
      </header>
      <SearchFormContainer />
      <Switch>
        {/* <Route exact path="/" component={} /> */}
        <Route exact path="/search/:keyword" component={SearchResultPage} />
      </Switch>
    </>
  );
}

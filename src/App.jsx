import React from 'react';

import { Switch, Route } from 'react-router-dom';
import SearchFormContainer from './container/SearchFormContainer';
import SearchResultPage from './pages/SearchResultPage';

export default function App() {
  return (
    <>
      <h1>My PlayList</h1>
      <SearchFormContainer />
      <Switch>
        {/* <Route exact path="/playlist" component={} /> */}
        <Route exact path="/:keyword" component={SearchResultPage} />
      </Switch>
    </>
  );
}

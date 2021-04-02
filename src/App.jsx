import React from 'react';

import { useDispatch } from 'react-redux';

import { Switch, Route, Link } from 'react-router-dom';

import styled from '@emotion/styled';
import PlayerPage from './pages/PlayerPage';
import PlaylistPage from './pages/PlaylistPage';
import SearchFormPage from './pages/SearchFormPage';
import SearchResultPage from './pages/SearchResultPage';

import GlobalStyle from './styles/global';

import { appendPlaylistMusic } from './redux/slice';

import { loadItem } from './services/storage';

const Title = styled.h1({
  fontFamily: 'Montserrat, sans-serif',
  fontSize: '50px',
  textAlign: 'center',
  height: '65px',
  borderBottom: '5px solid teal',
  borderTop: '5px solid red',
  '& a:link, a:visited, a:hover': {
    color: 'black',
    textDecoration: 'none',
  },
});

const Header = styled.header({
  padding: '0 30px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export default function App() {
  const dispatch = useDispatch();

  const playlistMusic = loadItem('PLAYLIST');
  playlistMusic?.map((music) => dispatch(appendPlaylistMusic(music)));

  return (
    <>
      <Header>
        <Title>
          <Link to="/">My Playlist</Link>
        </Title>
        <SearchFormPage />
      </Header>
      <Switch>
        <Route exact path="/" component={PlaylistPage} />
        <Route path="/result/:searchQuery?" component={SearchResultPage} />
      </Switch>
      <GlobalStyle />
      <PlayerPage />
    </>
  );
}

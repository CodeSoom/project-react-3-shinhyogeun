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
import BackgroundPage from './pages/BackgroundPage';

const Title = styled.h1({
  fontFamily: 'Montserrat, sans-serif',
  fontSize: '55px',
  height: '75px',
  width: '1900px',
  paddingLeft: '100px',
  borderBottom: '5px solid teal',
  borderTop: '5px solid red',
  '& a:link, a:visited, a:hover': {
    textDecoration: 'none',
  },
});

const Header = styled.header({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0',
});

export default function App() {
  const dispatch = useDispatch();

  const playlistMusic = loadItem('PLAYLIST');
  playlistMusic?.map((music) => dispatch(appendPlaylistMusic(music)));

  return (
    <>
      <BackgroundPage />
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

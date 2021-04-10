import React from 'react';

import { useDispatch } from 'react-redux';

import { Switch, Route, Link } from 'react-router-dom';

import styled from '@emotion/styled';
import colorChage from './styles/animations/colorChange';

import PlayerPage from './pages/PlayerPage';
import PlaylistPage from './pages/PlaylistPage';
import SearchFormPage from './pages/SearchFormPage';
import SearchResultPage from './pages/SearchResultPage';

import GlobalStyle from './styles/global';

import { appendPlaylistMusic } from './redux/slice';

import { loadItem } from './services/storage';

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

const Background = styled.div({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  animation: `${colorChage} 10s linear infinite alternate both`,
  filter: 'brightness(30%)',
  zIndex: '-1',
});

export default function App() {
  const dispatch = useDispatch();

  const playlistMusic = loadItem('PLAYLIST');
  playlistMusic?.map((music) => dispatch(appendPlaylistMusic(music)));

  return (
    <>
      <Background />
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

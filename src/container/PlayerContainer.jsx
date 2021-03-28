import React from 'react';

import { useSelector } from 'react-redux';

import Player from '../components/Player';

import { get } from '../services/utils';

export default function PlayerContainer() {
  const music = useSelector(get('player'));

  if (!music?.videoId) {
    return (<></>);
  }

  return (<Player music={music} />);
}

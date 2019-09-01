import React, { useContext } from 'react';
import MainContext from '../Main/context'

import { Container } from './styles';

export default function ViewBoard({ board }) {

  const { setBoardCurrent } = useContext(MainContext)

  function handleBoard(){
    setBoardCurrent(board)
  }

  return (
    <Container onClick={handleBoard} style={{borderLeft: `2px solid ${board.color}`}}>
        <h3>{board.title}</h3>
        <p><small>Listas: {board.lists_size}</small></p>
    </Container>
  );
}

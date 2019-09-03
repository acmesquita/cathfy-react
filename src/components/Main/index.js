import React, { useState, useEffect } from 'react';
import api from '../../services/api'
import ViewBoard from '../ViewBoard';
import MainContext from './context'
import Board from '../Board'

import { Container } from './styles';
import ButtonBoard from '../ButtonBoard';
import produce from 'immer';

export default function Main() {
  
  const [boards, setBoards] = useState([]);
  const [boardCurrent, setBoardCurrent] = useState(false)

  useEffect( () => {
    async function loadBoards(){
      let res = await api.get('/boards')
      setBoards(res.data)
    }

    loadBoards()
  }, [])

  function addBoard(board){
    setBoards(produce(boards, draft => {
      draft.push(board)
    }))
  }

  return (
    <>
    { !boardCurrent && 
      <MainContext.Provider value={{ setBoardCurrent, addBoard }}>
        <Container>
          { boards && !boardCurrent &&
            boards.map( board => (<ViewBoard key={`_${board.id}`} board={board} />))
          }
        </Container>
        <ButtonBoard />
      </MainContext.Provider>
    }
    { boardCurrent && 
      <Board board={boardCurrent} />
    }
    </>
  );
}

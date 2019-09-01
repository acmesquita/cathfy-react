import React, { useState, useEffect } from 'react';
import api from '../../services/api'
import ViewBoard from '../ViewBoard';
import MainContext from './context'
import Board from '../Board'


import { Container } from './styles';

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


  return (
    <>
    { !boardCurrent && 
      <MainContext.Provider value={{ setBoardCurrent }}>
        <Container>
          { boards && !boardCurrent &&
            boards.map( board => (<ViewBoard key={`_${board.id}`} board={board} />))
          }
        </Container>
      </MainContext.Provider>
    }
    { boardCurrent && 
      <Board board={boardCurrent} />
    }
    </>
  );
}

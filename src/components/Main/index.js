import React, { useState, useEffect } from 'react';
import {initAuth, getBoards} from '../../services/api'
import ViewBoard from '../ViewBoard';
import MainContext from './context'
import Board from '../Board'

import { Container } from './styles';
import ButtonBoard from '../ButtonBoard';
import produce from 'immer';
import Login from '../Login';

export default function Main() {
  
  const [boards, setBoards] = useState([]);
  const [boardCurrent, setBoardCurrent] = useState(false)
  const [userCurrent, setUserCurrent] = useState( JSON.parse(localStorage.getItem("token")))
  const [messageError, setMessageError] = useState(false)

  function loadBoards(token){
    getBoards().then(res => {
      setBoards(res.data)
    })
  }
  
  useEffect( () => {
    if(userCurrent){
      initAuth(userCurrent.token)
      loadBoards(userCurrent)
    }
  }, [userCurrent, boardCurrent, boards])
  
  function addBoard(board){
    setBoards(produce(boards, draft => {
      draft.push(board)
    }))
  }
  
  function setUser(user){
    if(user.token){
      setUserCurrent(user.token)
      localStorage.setItem("token", JSON.stringify(user))
    }
    else {
      console.log('entrou no erro')
      setMessageError("Dados inválidos")
    }
  }

  function getUser(){
    return userCurrent;
  }

  if(!userCurrent){
    return (
      <MainContext.Provider value={{ setUser, getUser, loadBoards }}>
        <Container>
          <Login error={messageError} />
        </Container>
      </MainContext.Provider>
    )
  }

  return (
    <>
    { !boardCurrent && userCurrent &&
      <MainContext.Provider value={{ setBoardCurrent, addBoard }}>
        <Container>
          { boards && !boardCurrent &&
            boards.map( board => (<ViewBoard key={`_${board.id}`} board={board} />))
          }
        </Container>
        <ButtonBoard />
      </MainContext.Provider>
    }
    { boardCurrent && userCurrent &&
      <Board board={boardCurrent} />
    }
    </>
  );
}

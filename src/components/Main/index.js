import React, { useState, useEffect } from 'react';
import api from '../../services/api'
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
    api.get('/boards', {
      headers: { "Authorization": "Bearer " + token , "Content-Type": "application/json"}
    }).then(res => {
      setBoards(res.data)
    })
  }
  
  useEffect( () => {
    if(userCurrent){
      loadBoards(userCurrent.token)
    }
  }, [])
  
  function addBoard(board){
    setBoards(produce(boards, draft => {
      draft.push(board)
    }))
  }
  
  function setUser(user){
    if(user.token){
      setUserCurrent(user)
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

  if(!userCurrent || !userCurrent.token){
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
    { !boardCurrent && userCurrent && userCurrent.token &&
      <MainContext.Provider value={{ setBoardCurrent, addBoard }}>
        <Container>
          { boards && !boardCurrent &&
            boards.map( board => (<ViewBoard key={`_${board.id}`} board={board} />))
          }
        </Container>
        <ButtonBoard token={userCurrent.token} />
      </MainContext.Provider>
    }
    { boardCurrent && userCurrent && userCurrent.token &&
      <Board board={boardCurrent} user={userCurrent} />
    }
    </>
  );
}

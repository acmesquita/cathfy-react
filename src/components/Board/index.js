import React, { useState, useEffect } from 'react';
import produce from 'immer';
import BoardContext from './context'
import api from '../../services/api'

import List from '../List'
import { Container } from './styles';


export default function Board() {

  const [lists, setLists] = useState([])
  
  useEffect( () => {
    async function loadLists() {
      const res = await api.get('/lists')
      setLists(res.data)
    }

    loadLists()
  }, [])

  
  function move(fromList, toList, fromCard, toCard){
    setLists(produce(lists, draft => {
      const dragged = draft[fromList].cards[fromCard]

      draft[fromList].cards.splice(fromCard, 1);
      draft[toList].cards.splice(toCard, 0, dragged);
    }))    
  }

  function add(card){
    api.post('/lists/1/cards', card).then( res => {
      setLists(produce(lists, draft => {
        draft[0].cards.push(res.data)
      }))
    })  
  }

  return (
    <BoardContext.Provider value={{ lists, move, add }}>
      <Container>
        { lists.map((list, index) => <List key={list.title} index={index} data={list} listSize={list.cards.length} />) }
      </Container>
    </BoardContext.Provider>
  );
}

import React, { useState } from 'react';
import procude from 'immer';
import BoardContext from './context'
import {loadLists} from '../../services/api'

import List from '../List'
import { Container } from './styles';

const data = loadLists();

export default function Board() {
  const [lists, setLists] = useState(data)

  function move(fromList, toList, fromCard, toCard){
    setLists(procude(lists, draft => {
      const dragged = draft[fromList].cards[fromCard]

      draft[fromList].cards.splice(fromCard, 1);
      draft[toList].cards.splice(toCard, 0, dragged);
    }))    
  }

  return (
    <BoardContext.Provider value={{ lists, move }}>
      <Container>
        { lists.map((list, index) => <List key={list.title} index={index} data={list}/>) }
      </Container>
    </BoardContext.Provider>
  );
}

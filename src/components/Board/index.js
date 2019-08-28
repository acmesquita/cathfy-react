import React, { useState, useEffect } from 'react';
import produce from 'immer';
import ReactLoading from 'react-loading';
import BoardContext from './context'
import api, {sendList} from '../../services/api'

import List from '../List'
import { Container, Loading } from './styles';


export default function Board() {

  const [lists, setLists] = useState([])
  const [loading, setLoading] = useState(false)
  
  useEffect( () => {
    async function loadLists() {
      const res = await api.get('/lists')
     
      let lista = res.data.map(list => {
        list.cards = list.cards.map( (card, index) => {
          card.position = index
          return card
        })
        let listSort = {...list, cards: list.cards.sort((c1, c2) => c1.position - c2.position)}
        return listSort
      })
      console.log(lista)     
      setLists(lista)
    }

    loadLists()
  }, [])

  function updateList(idList) {
    let newLists = updateListPosition();
    let list = newLists[idList]
    setLoading(true)
    sendList(list).then( res => {
      if(res.status === 204){
        setLoading(false)
      }
    })
  }

  function updateListPosition() {

    let newLists = produce(lists, draft => {
      draft.map(list => {
        list.cards = list.cards.map( (card, index) => {
          card.position = index
          return card
        })
        let listSort = list.cards.sort((c1, c2) => c1.position - c2.position)
        return listSort
      })

    })
    setLists(newLists);
    return newLists
  }
  
  function move(fromList, toList, fromCard, toCard){
    setLists(produce(lists, draft => {
      const dragged = draft[fromList].cards[fromCard]

      draft[fromList].cards.splice(fromCard, 1);
      draft[toList].cards.splice(toCard, 0, dragged);

    }));
    
  }

  function add(card){
    setLoading(true)
    api.post('/lists/1/cards', {card}).then( res => {
      setLists(produce(lists, draft => {
        draft[0].cards.push(res.data)
        updateList(1)
        setLoading(false)
      }))
    })  
  }

  function addItem(listId, cardPosition, item){
    setLists(produce(lists, draft => {
      draft[listId].cards[cardPosition].items.push(item)
    }))
  }

  function updateIdItem(listId, cardPosition, item){
    setLists(produce(lists, draft => {
      
      draft[listId].cards[cardPosition].items.push(item)
    }))
  }

  if(loading){
    return (
      <Loading>
        <ReactLoading type={'spokes'} color={'#555'} height={64} width={64} className={'loading'} />
      </Loading>
    );
  }else {
    return (
      <BoardContext.Provider value={{ lists, move, add, addItem, updateList, updateListPosition, updateIdItem }}>
        <Container>
          { lists.map((list, index) => <List key={list.title} index={index} data={list} listSize={list.cards.length} />) }
        </Container>
      </BoardContext.Provider>
    );
  }
}

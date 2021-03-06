import React, { useState, useEffect } from 'react';
import produce from 'immer';
import ReactLoading from 'react-loading';
import BoardContext from './context'
import {sendList, getLists, sendCard} from '../../services/api'

import List from '../List'
import { Container, Loading } from './styles';


export default function Board({board}) {

  const [lists, setLists] = useState([])
  const [loading, setLoading] = useState(false)
  
  useEffect( () => {
    async function loadLists() {
      if(board){
        getLists(board.id).then(res => {
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
        })
       
      }
    }

    loadLists()
  }, [])

  function updateList(idList) {
    let newLists = updateListPosition();
    let list = newLists[idList]
    setLoading(true)
    sendList(list).then( res => {
      setLoading(false)
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

  function add(list_id, card){
    setLoading(true)
    sendCard(list_id, card).then( res => {
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

  function checkItem(listId, cardId, item) {
    let newList = lists.map(list => {
      list.cards.map(card => {
        if(card.id === cardId){
          card.items.map(i => {
            if(i.id === item.id){
              i.done = item.done;
            }
            return i
          })
        }
        return card
      })
      return list
    })
    
    setLists(newList)

  }

  function saveDescriptionCard(cardId, card){
    let newList = lists.map(list => {
      list.cards.map(c => {
        if(c.id === cardId){
          console.log(c, card)
          c.description = card.description
        }
        return card
      })
      return list
    })
    
    setLists(newList)
  }

  if(loading){
    return (
      <Loading>
        <ReactLoading type={'spokes'} color={'#555'} height={64} width={64} className={'loading'} />
      </Loading>
    );
  }else {
    return (
      <BoardContext.Provider value={{ lists, move, add, addItem, updateList, updateListPosition, checkItem, saveDescriptionCard }}>
        <Container>
          { lists.map((list, index) => <List key={list.title} index={index} data={list} listSize={list.cards.length} />) }
        </Container>
      </BoardContext.Provider>
    );
  }
}

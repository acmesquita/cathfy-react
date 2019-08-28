import React, {useState, useContext} from 'react';
import BoardContext from '../Board/context'

import {sendItem} from '../../services/api'
// import { Container } from './styles';

export default function NewItemCard({ card, listId }) {

  const [content, setContent] = useState("")
  const { addItem, updateIdItem } = useContext(BoardContext)

  function add(){
    if(content.length > 0){
      let item = {
        content: content,
        done: false,
        card_id: card.id
      }
  
      sendItem(listId, card.id, item).then( data => {
        console.log(data)
        updateIdItem(listId, card.id, data)
        addItem(listId, card.position, data)
        setContent("")
      })
    }
  }

  function handleChange(event) {
    setContent(event.target.value);
  }

  return (
    <p>
      <input placeholder="Novo item" value={content} onChange={handleChange}/>
      <button type="button" onClick={add}>+</button>
    </p>
  );
}

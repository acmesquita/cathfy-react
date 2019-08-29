import React, {useState, useContext} from 'react';
import BoardContext from '../Board/context'

import {sendItem} from '../../services/api'
import { Container } from './styles';

export default function NewItemCard({ card, listId }) {

  const [content, setContent] = useState("")
  const { addItem } = useContext(BoardContext)

  function add(){
    if(content.length > 0){
      let item = {
        content: content,
        done: false,
        card_id: card.id
      }
  
      sendItem(listId, card.id, item).then( data => {
        addItem(listId, card.position, data)
        setContent("")
      })
    }
  }

  function handleChange(event) {
    setContent(event.target.value);
  }

  return (
    <Container>
      <input placeholder="Novo item" className="content" value={content} onChange={handleChange}/>
      {content.length > 0 && (<button type="button" className="btn-add" onClick={add}>Adicionar</button>)}
    </Container>
  );
}

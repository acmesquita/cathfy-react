import React, {useState, useContext} from 'react';
import BoardContext from '../Board/context'
import { sendDoneItem } from '../../services/api'

import { Container } from './styles';

export default function ItemCard({ item, listId }) {

  const [done, setDone] = useState(item.done)
  const { checkItem } = useContext(BoardContext)

  function handleChange(event){
    setDone(event.target.checked)
    sendDoneItem(listId, item.card_id, {...item, done:event.target.checked})
    checkItem(listId, item.card_id, {...item, done:event.target.checked})
  }

  return (
    <Container>
      <input type="checkbox" className="cbx" id={"_"+item.id} style={{display: "none"}} checked={done} onChange={handleChange}/>
      <label for={"_"+item.id} className="check">
        <svg width="18px" height="18px" viewBox="0 0 18 18">
          <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
          <polyline points="1 9 7 14 15 4"></polyline>
        </svg>
        <span className="contentItem">{item.content}</span>
      </label>
      
    </Container>
  );
}

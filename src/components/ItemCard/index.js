import React, {useState} from 'react';

import { sendDoneItem } from '../../services/api'

// import { Container } from './styles';

export default function ItemCard({ item, listId }) {

  const [done, setDone] = useState(item.done)

  function handleChange(event){
    setDone(event.target.checked)
    sendDoneItem(listId, item.card_id, {...item, done:event.target.checked})
  }

  return (
    <p>
      <input type="checkbox" name="done" checked={done} onChange={handleChange}/>
      <i>{item.content}</i>
    </p>
  );
}

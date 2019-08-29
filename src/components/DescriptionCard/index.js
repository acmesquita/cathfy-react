import React, { useState, useContext } from 'react';
import BoardContext from '../Board/context'
import {editCard} from '../../services/api'
import TextareaAutosize from 'react-textarea-autosize';
import { Container } from './styles';

export default function DescriptionCard({card, listId}) {

  const [save, setSave] = useState(false)
  const [description, setDescription] = useState(card.description)

  const {saveDescriptionCard} = useContext(BoardContext)

  function handleChange(event){
    setDescription(event.target.value)
  }
  function cancelEdit(){
    setSave(false)
    setDescription(card.description)
  }

  function saveCard(){
    let newCard = {...card, description: description}
    editCard(listId, newCard)
    setDescription(description)
    saveDescriptionCard(card.id, newCard)
    setSave(false)
  }

  function focus(){
    if(!save){
      setSave(true)
    }
  }


  return (
    <Container>
       <TextareaAutosize
          placeholder="Descrição..."
          className={save ? "descriptionFocus description" : "description"}
          value={description}
          onChange={handleChange}
          onFocus={focus}
        />  
        {save && (<><button className="btn-save" onClick={saveCard}>Salvar</button> <button className="btn-cancel" onClick={cancelEdit}>X</button></>)}
    </Container>
  );
}

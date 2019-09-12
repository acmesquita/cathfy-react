import React, {useContext, useState} from 'react';
import PopPop from 'react-poppop';
import BoardContext from '../Board/context'
import { MdAdd } from 'react-icons/md';
import { Container } from './styles';

export default function Button({ listId, token }) {

  const [show, setShow] = useState(false)
  const [content, setContent] = useState("")
  const [description, setDescription] = useState("")
  const [card, setCard] = useState({
    content: "",
    description: "",
    labels: '#7159c1',
    user_id: 1,
    list_id: listId,
    position: -1,
    items: []
  })
  const { add } = useContext(BoardContext)
  
  function handleChangeContent(event) {
    setContent(event.target.value);
  }

  function handleChangeDescription(event) {
    setDescription(event.target.value);
  }

  function toggleShow(show){
    setShow(show);
  }

  function addCard(){
    let newCard = {...card, content: content, description: description}
    setCard(newCard)
    console.log(newCard)
    add(newCard)
  }

	return (
		<Container>
			<button onClick={() => toggleShow(true)}>
				<MdAdd size={24} color="#FFF" />
			</button>
      <PopPop position="centerCenter"
              open={show}
              closeBtn={true}
              closeOnEsc={true}
              onClose={() => toggleShow(false)}
              closeOnOverlay={true}
              overlayStyle={{
                backgroundColor: 'rgba(0,0,0,0.1)'
              }}
              contentStyle={{
                overflow: 'visible',
                height: '450px',
                width: '350px',
                maxWidth: '700px',
                padding:'20px',
              }}>
        <div style={
          {
            paddingBottom: '20px'
          }
        }>
          <h1 style={{
            paddingTop: '8px'
          }}>Nova Tarefa</h1>
        </div>
        <div style={
          {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignContent: 'center',
            height: 'calc(100% - 60px)',
          }
        }>
          <div style={
            {
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignContent: 'center',
              height: '50px',
            }
          }>
            <label>Título</label>
            <input 
              onChange={handleChangeContent}
              value={content}
              style={{
                marginBottom: '5px',
                padding: '3px',
                display: 'inline-block',
                boxSizing: 'content-box',
                border: '0 solid #ffffff',
                borderRightWidth: '1px',
                borderBottom: '1px solid #878787',
                font: 'normal 16px/normal Verdana, Geneva, sans-serif',
                color: 'rgb(33, 33, 33)',
                textOverflow: 'clip',
                background: 'rgba(252,252,252,1)',
                boxShadow: '0 0 0 0 rgba(0,0,0,0.2) inset',
                textShadow: '1px 1px 0 rgba(255,255,255,0.66)',
                transition: 'all 200ms cubic-bezier(0.42, 0, 0.58, 1)',
              }}/>
          </div>
          <div style={
            {
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignContent: 'center',
              height: '200px',
            }
          }>
            <label>Descrição</label>
            <textarea 
              rows={10}
              onChange={handleChangeDescription}
              value={description}
              style={{
                marginBottom: '5px',
                padding: '3px',
                display: 'inline-block',
                boxSizing: 'content-box',
                border: '0 solid #ffffff',
                borderRightWidth: '1px',
                borderBottom: '1px solid #878787',
                font: 'normal 16px/normal Verdana, Geneva, sans-serif',
                color: 'rgb(33, 33, 33)',
                textOverflow: 'clip',
                background: 'rgba(252,252,252,1)',
                boxShadow: '0 0 0 0 rgba(0,0,0,0.2) inset',
                textShadow: '1px 1px 0 rgba(255,255,255,0.66)',
                transition: 'all 200ms cubic-bezier(0.42, 0, 0.58, 1)',
              }}/>
          </div>
          <button 
            type="button"
            onClick={addCard}
            style={{
              boxSizing: 'content-box',
              cursor: 'pointer',
              padding: '8px 36px 8px 37px',
              border: '1px solid #3552e3',
              borderRadius: '3px',
              font: 'normal normal bold 16px/normal Verdana, Geneva, sans-serif',
              color: 'rgba(255,255,255,0.9)',
              textAlign: 'center',
              background: '#3552e3',
              boxShadow: '0 0 0 0 rgba(0,0,0,0.2)',
              transition: 'all 300ms cubic-bezier(0.42, 0, 0.58, 1)',
            }}  
          >
            Adicionar
          </button>
        </div>
      </PopPop>
		</Container>
	);
}

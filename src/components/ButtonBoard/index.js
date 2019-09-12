import React, {useState, useContext} from 'react';
import PopPop from 'react-poppop';
import { MdAdd } from 'react-icons/md';
import { sendBoard } from '../../services/api'
import MainContext from '../Main/context'

import { Container } from './styles';

export default function ButtonBoard({ token }) {

  const [show, setShow] = useState(false)
  const [board, setBoard] = useState({})

  const { addBoard } = useContext(MainContext)

  function toggleShow(show){
    setShow(show);
  }

  function sendNewBoard(){
    console.log(board, token)
    sendBoard(board, token).then( res => {
      addBoard(res.data)
      setBoard({})
      setShow(false)
    })
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
                backgroundColor: 'rgba(0,0,0,0.6)'
              }}
              contentStyle={{
                overflow: 'visible',
                height: '450px',
                width: '350px',
                maxWidth: '700px',
                padding:'20px',
              }}>
        <div 
        style={
          {
            paddingBottom: '20px'
          }
        }>
          <h1 
          style={{
            paddingTop: '8px'
          }}>
            Novo Quadro
          </h1>
        </div>
        <div 
        style={
          {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignContent: 'center',
            height: 'calc(100% - 60px)',
          }
        }>
          <div 
          style={
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
              onChange={(event) => setBoard({...board, title: event.target.value})}
              value={board.title}
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
          {/* <div 
          style={
            {
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignContent: 'center',
              height: '200px',
            }
          }>
            <label>Objetivo</label>
            <input 
              onChange={(event) => setBoard({...board, objective: event.target.value})}
              value={board.objective}
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
          <div 
            style={
              {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignContent: 'center',
                height: '200px',
              }
            }
          >
            <label>Início</label>
            <input 
              type="date"
              onChange={(event) => setBoard({...board, start: event.target.value})}
              value={board.start}
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

          <div
            style={
              {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignContent: 'center',
                height: '200px',
              }
            }
          >
            <label>Fim</label>
            <input 
              type="date"
              onChange={(event) => setBoard({...board, end: event.target.value})}
              value={board.end}
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
          </div> */}
          <button 
            type="button"
            onClick={sendNewBoard}
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

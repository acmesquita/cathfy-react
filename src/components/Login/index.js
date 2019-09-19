import React, { useState, useContext } from 'react';
import MainContext from '../Main/context';
import { Container } from './styles';
import {createUser, authUser} from '../../services/api'
import MessageError from '../MessageError';


import logo from '../../asserts/logo.png'

export default function Login({ error }) {

  const [singUp, setSingUp] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState(error)


  const { setUser, getUser, loadBoards } = useContext(MainContext)

  function sendUser(){
    if(singUp){
      let user = {
        email,
        password,
        username
      }
      
      createUser({user}).then(res => {
        if(res){
          toggleSingUp();
        }
      }).catch( err => {
        setMsg("Erro ao cadastrar")
        setUsername('')
        setEmail('')
        setPassword('')
      });
    }
    else{
      let auth = {
        email,
        password
      }
      authUser({auth}).then( res => {
        console.log(res)
        setUser({...getUser(), token: res.jwt })
        loadBoards(res.jwt)
      }).catch( err => {
        setUser(false)
        setEmail('')
        setPassword('')
      })
    }
  }

  function toggleSingUp(){
    setEmail('')
    setPassword('')
    setUsername('')
    setMsg('')
    setSingUp(!singUp)
  }

  return (
    <Container>
      <div className="box-img">
        <img src={logo} height={100} width={100}/>
      </div>
      { msg && <MessageError msg={msg} />}
      <div className="box-content">
        { singUp && (
          <input
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="content"
            type="text"
            placeholder="Username"
        />
        )}
        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="content"
          type="email"
          placeholder="E-mail"
        />
        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="content"
          type="password"
          placeholder="Senha"
        />
      </div>
      <button type="button" className="btn-enter" onClick={sendUser}>Enviar</button>
      { !singUp && (<button type="button" className="btn-link" onClick={toggleSingUp}>Cadastrar</button>)}
      { singUp && (<button type="button" className="btn-link" onClick={toggleSingUp}>Entrar</button>)}
    </Container>
  );
}

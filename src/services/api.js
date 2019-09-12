import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1'
});

export default api

export function createUser(user){
  return new Promise((resolve, reject) => {
    api.post('/users/create', user).then( res => {
      if(!res.data){
        reject()
      }
      resolve(res.data);
    }).catch(err => {
      reject(err)
    })
  })
}

export function authUser(auth) {
  return new Promise((resolve, reject) => {
    api.post('/user_token', auth).then( res => {
      resolve(res.data);
    }).catch(err => {
      reject(err)
    })
  })
}

export function sendList(list, token) {
  return new Promise(async (resolve, reject)=> {
    const obj = {...list}
    const cards = [...obj.cards].map(card => (
      {
        id: card.id,
        position: card.position,
        list_id: list.id     
      }
    ));
    console.log(cards)
    const res = await api.put(`/lists/${list.id}/cards`, {cards}, {
      headers: { Authorization: ("Bearer " + token) }
    })
    resolve(res)
  })
}

export async function sendBoard(board, token){
  console.log(token)
  return api.post('/boards', {board}, {
    headers: { Authorization: "Bearer " + token }
  })
}

export async function sendCard(idList, card, token){
  let res = await api.post(`/lists/${idList}/cards/${card.id}`, {card}, {
    headers: { Authorization: "Bearer " + token }
  })
  console.log('Res', res)
  return res.data
}

export async function editCard(idList, card, token){

  let res = await api.put(`/lists/${idList}/cards/${card.id}`, {...card, user_id: 1}, {
    headers: { Authorization: "Bearer " + token }
  })
  console.log('Res', res)
  return res.data
}

export async function sendItem(list_id, card_id, item, token){
  let res = await api.post(`/lists/${list_id}/cards/${card_id}/items`, {item}, {
    headers: { Authorization: "Bearer " + token }
  })
  return res.data
}

export async function sendDoneItem(listId, cardId, item, token){
  let res = await api.put(`/lists/${listId}/cards/${cardId}/items/${item.id}`, {item}, {
    headers: { Authorization: "Bearer " + token }
  })
  return res.data
}
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1'
});

export function initAuth(token){
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

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
      api.defaults.headers.common['Authorization'] = `Bearer ${res.data.jwt}`;
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function getLists(board_id) {
  return new Promise( (resolve, reject) => {
    let path = `/boards/${board_id}/lists`
    api.get(path).then( res => {
      resolve(res)
    }).catch( err => reject(err))
  });
}

export function sendList(list ) {
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
    api.put(`/lists/${list.id}/cards`, {cards}).then(res => {
      resolve(res)
    })
  })
}

export function getBoards(){
  return api.get('/boards')
}

export async function sendBoard(board ){
  console.log(api.defaults)
  return api.post('/boards', {board})
}

export async function sendCard(idList, card){
  return api.post(`/lists/${idList}/cards/`, {card})
}

export async function editCard(idList, card ){

  let res = await api.put(`/lists/${idList}/cards/${card.id}`, {...card, user_id: 1})
  console.log('Res', res)
  return res.data
}

export async function sendItem(list_id, card_id, item){
  let res = await api.post(`/lists/${list_id}/cards/${card_id}/items`, {item})
  return res.data
}

export async function sendDoneItem(listId, cardId, item){
  let res = await api.put(`/lists/${listId}/cards/${cardId}/items/${item.id}`, {item})
  return res.data
}
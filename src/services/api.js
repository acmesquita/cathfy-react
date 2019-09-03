import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1'
});

export default api


export function sendList(list) {
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
    const res = await api.put(`/lists/${list.id}/cards`, {cards})
    resolve(res)
  })
}

export async function sendBoard(board){
  return api.post('/boards', {board})
}

export async function sendCard(idList, card){
  let res = await api.post(`/lists/${idList}/cards/${card.id}`, {card})
  console.log('Res', res)
  return res.data
}

export async function editCard(idList, card){

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
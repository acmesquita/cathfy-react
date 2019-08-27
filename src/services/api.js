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

export async function sendCard(idList, card){
  let res = await api.post(`/lists/${idList}/cards/${card.id}`, {card})
  console.log('Res', res)
  return res.data
}
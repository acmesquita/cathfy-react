import React from 'react';

import { Container } from './styles';
import ItemCard from '../ItemCard';
import NewItemCard from '../NewItemCard';
import ProgressBar from '../ProgressBar';

export default function ViewCard({ card, listId }) {
  return (
    <Container>
      <div style={
          {
            paddingBottom: '20px',
            paddingTop: '10px',
          }
        }>
          <h2>{card.content}</h2>
        </div>
        {card.user && (<img src={card.user} alt="avatar" width={40} height={40} style={{borderRadius: '30px'}}/> )}
        <p style={{
          fontSize: '16px',
          margin: '20px 5px'
        }}>
        {card.description}
        </p>
        <hr />
        <h3 style={{
          margin: '10px 5px'
        }}>Lista</h3>
        <ul style={{
          marginLeft: '5px'
        }}>
          {card.items.length > 0 && <li><ProgressBar total={card.items.length} max={card.items.filter( item => {return item.done}).length}/></li> }
          {card.items.map(item => (
            <li key={item.id}>
              <ItemCard item={item} listId={listId}/>
            </li>
          ))}
          <li><NewItemCard card={card} listId={listId}/></li>
        </ul>
    </Container>
  );
}

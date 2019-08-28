import React from 'react';

import { Container } from './styles';
import ItemCard from '../ItemCard';
import NewItemCard from '../NewItemCard';

export default function ViewCard({ card, listId }) {
  return (
    <Container>
      <div style={
          {
            paddingBottom: '20px'
          }
        }>
          <h2>{card.content}</h2>
        </div>
        {card.user && (<img src={card.user} alt="avatar" width={40} height={40} style={{borderRadius: '3px'}}/> )}
        <p><b>Descrição</b></p>
        <p>
        {card.description}
        </p>
        <h3>Checklist</h3>
        <ul>
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

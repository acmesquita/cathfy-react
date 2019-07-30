import React from 'react';

import { MdAdd } from 'react-icons/md';

import Card from '../Card'

import { Container } from './styles';

export default function List({ data, index: listIndex }) {
  return (
    <Container done={data.done}>
      <header>
        <h2>{data.title}</h2>

        { data.creatable && (
          <button>
            <MdAdd size={24} color="#FFF" />
          </button>
        )}
      </header>

      <ul>
        { data.cards.map((card, index) => 
          (<Card 
            key={card.id}
            index={index} 
            listIndex={listIndex} 
            data={card} 
          />)
        )}
      </ul>
    </Container>
  );
}

import React from 'react';

import { MdAdd } from 'react-icons/md';

import ListDrop from '../ListDrop'

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

      <ListDrop cards={data.cards} listIndex={listIndex} listSize={data.cards.length}/>

    </Container>
  );
}

import React from 'react';

import ListDrop from '../ListDrop'

import { Container } from './styles';
import Button from '../Button';

export default function List({ data, index: listIndex, token }) {

  return (
    <Container done={data.done}>
      <header>
        <h2>{data.title} {data.cards.length}</h2>

        { data.creatable && (
          <Button listId={data.id} token={token} />
        )}
      </header>

      <ListDrop cards={data.cards} listIndex={listIndex} listSize={data.cards.length}/>

    </Container>
  );
}

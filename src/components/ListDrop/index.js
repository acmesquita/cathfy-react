import React, {useContext} from 'react';
import BoardContext from '../Board/context'
import { useDrop } from 'react-dnd'

import { Container } from './styles';
import Card from '../Card';

export default function ListDrop({ cards, listIndex, listSize }) {
  const { move } = useContext(BoardContext)

  const [{ isOver }, dropRef] = useDrop({
    accept: 'CARD',
    hover: (item, mon) => {
      const listFrom = item.listIndex
      const listTo = listIndex
      const cardFrom = item.index
      const cardTo = listSize

      if (listFrom === listTo) return

      move(listFrom, listTo, cardFrom, cardTo);

      item.index = cardTo
      item.listIndex = listTo

    },
    collect: mon => ({
      isOver: !!mon.isOver(),      
    }),
  })
  
  return (
    <Container ref={dropRef} isOver={isOver}>
      <ul>
        { cards.map((card, index) => 
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

import React, { useRef, useContext } from 'react';
import BoardContext from '../Board/context'
import { useDrag, useDrop } from 'react-dnd'

import { Container, Label } from './styles';

export default function Card({ data, index, listIndex }) {

  const ref = useRef()
  const { move } = useContext(BoardContext)

  const [{isDragging}, dragRef] = useDrag({
    item: { type: 'CARD', index, id: data.id , listIndex },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept:'CARD',
    hover(item, monitor){
      const draggedListIndex = item.listIndex;
      const targetListIndex = listIndex;
      
      const draggedIndex = item.index;
      const targetIndex = index;
      
      if (draggedIndex === targetIndex && draggedListIndex ===targetListIndex ) return;
      
      //return { x: NaN, y: NaN, width: NaN, height: NaN, top: NaN, ...}
      const targetSize = ref.current.getBoundingClientRect(); 
      const targetCenter = (targetSize.bottom - targetSize.top)/2

      //return { x: NaN, y: NaN}
      const draggedOffset = monitor.getClientOffset();
      const draggedTop = draggedOffset.y - targetSize.top;

      if(draggedIndex < targetIndex && draggedTop < targetCenter) return;
      if(draggedIndex > targetIndex && draggedTop > targetCenter) return;

      move(draggedListIndex, targetListIndex, draggedIndex, targetIndex);
      
      item.index = targetIndex;
      item.listIndex = targetListIndex;
    }
  })

  dragRef(dropRef(ref));

  return (
    <Container ref={ref} isDragging={isDragging}>
      <header>
        {data.labels.map(label => <Label key={label} color={label} />)}
      </header>
      <p>{data.content}</p>
      {data.user && (<img src={data.user} alt="avatar"/>)}
    </Container>
  );
}

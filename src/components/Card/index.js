import React, { useRef, useContext, useState } from 'react';
import BoardContext from '../Board/context'
import { useDrag, useDrop } from 'react-dnd'
import PopPop from 'react-poppop';

import { Container, Label } from './styles';
import ViewCard from '../ViewCard';

export default function Card({ data, index, listIndex }) {

  const [show, setShow] = useState(false)
  const ref = useRef()
  const { move, updateList } = useContext(BoardContext)

  function toggleShow(show){
    setShow(show);
  }

  const [{isDragging}, dragRef] = useDrag({
    item: { type: 'CARD', index, id: data.id , listIndex },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept:['CARD'],
    drop:(item, mon) => {
      updateList(item.listIndex);
    },
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
    <Container ref={ref} isDragging={isDragging} modalShow={show} >
      <header>
        {data.labels.map(label => <Label key={label} color={label} />)}
      </header>
      <p  onClick={() => toggleShow(true)}>{data.content}</p>
      {data.user && (<img src={data.user} alt="avatar"/>)}
      <PopPop position="topCenter"
              open={show}
              closeBtn={true}
              closeOnEsc={true}
              onClose={() => toggleShow(false)}
              closeOnOverlay={true}
              overlayStyle={{
              }}
              contentStyle={{
                overflow: 'visible',
                maxWidth: '700px',
                width: '700px',
                padding:'20px',
                margin: '20px 0 50px',
                minHeight: '600px',
              }}>
        <ViewCard card={data} listId={listIndex} />
      </PopPop>

    </Container>
  );
}

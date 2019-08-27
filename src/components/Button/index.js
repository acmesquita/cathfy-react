import React, {useContext} from 'react';
import BoardContext from '../Board/context'
import { MdAdd } from 'react-icons/md';
import { Container } from './styles';

export default function Button() {

	const { add } = useContext(BoardContext)

  function addCard(){
    let response = prompt('Adicionar nova tarefa')
    let card = {
      content: response,
      labels: '#7159c1',
      user_id: 1
    }
    add(card)
  }

	return (
		<Container>
			<button onClick={addCard}>
				<MdAdd size={24} color="#FFF" />
			</button>
		</Container>
	);
}

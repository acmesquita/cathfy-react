import React, {useContext} from 'react';
import BoardContext from '../Board/context'
import { MdAdd } from 'react-icons/md';
import { Container } from './styles';

export default function Button() {

	const { add } = useContext(BoardContext)

  function addCard(){
    let response = prompt('Opa')
    let card = {
      id: 14,
      content: response,
      labels: ['#7159c1'],
      user: 'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/profile.png'
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

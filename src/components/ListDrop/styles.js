import styled, {css} from 'styled-components';

export const Container = styled.div`
  height: 90%;
  margin-top: 30px;
  min-height: auto;
  overflow: auto;

  ::-webkit-scrollbar {
    width: 3px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: transparent; 
  }
   
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: transparent; 
  }
  
  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555; 
  }
  ${props => (props.isOver)&& css`
    padding-top: 0;
    border: 2px dashed #0003;
    border-radius: 0;
    box-shadow: none;
    cursor: grabbing;
  `}
`;

import styled, {css} from 'styled-components';

export const Container = styled.div`
  height: 100%;
  margin-top: 30px;
  ${props => (props.isOver)&& css`
    padding-top: 0;
    border: 2px dashed #0003;
    border-radius: 0;
    box-shadow: none;
    cursor: grabbing;
  `}
`;

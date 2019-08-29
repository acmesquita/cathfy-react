import styled from 'styled-components';

export const Container = styled.div`

  display: flex;
  justify-content: center;

  .content {
    width: 98%;
    border: none;
    font-size: 16px;
    padding: 3px;  
    margin: 5px 0px;
  }

  .content:focus {
    border-bottom: 1px solid #525252;
  }

  .btn-add {
    padding: 9px;
    border-radius: 5px;
    background: rgb(53, 82, 227);
    color: white;
    border-width: 0px;
    margin-left: 5px;
    font-size: 16px;
    cursor: pointer;
  }
`;

import styled from 'styled-components';

export const Container = styled.div`
  
  position: absolute;
  bottom: 50px;
  z-index: 10000;
  right: 100px;

  button {
    width: 50px;
    height: 50px;
    border-radius: 20px;
    background: #3b5bfd;
    border: 0;
    cursor: pointer;
  }

  .input-board {
    margin-bottom: 5px;
    padding: 3px;
    display: inline-block;
    box-sizing: content-box;
    border: 0 solid #ffffff;
    border-right-width: 1px;
    border-bottom: 1px solid #878787;
    font: normal 16px/normal Verdana, Geneva, sans-serif;
    text-overflow: clip;
    background: rgba(252,252,252,1);
    box-shadow: 0 0 0 0 rgba(0,0,0,0.2) inset;
    text-shadow: 1px 1px 0 rgba(255,255,255,0.66);
    transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1);
    width: 100%;
  }
`;

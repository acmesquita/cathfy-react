import styled from 'styled-components';

export const Container = styled.div`
  
  height: calc(100% - 80px);
  border: 1px solid white;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 350px;
  background: white;
  box-shadow: 1px 1px 5px #d6d6d6;
  padding: 25px;

  .box-img {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .content {
    width: 98%;
    border: none;
    font-size: 16px;
    padding: 3px;  
    margin: 5px 0px;
    border-bottom: 1px solid #d6d6d6;
    font-size: 16px;
    margin-bottom: 30px;
  }

  .content:focus {
    border-bottom: 1px solid #525252;

  }

  .box-content {
    margin: 30px 0;
  }

  .btn-enter {
    padding: 9px;
    border-radius: 5px;
    background: rgb(53,82,227);
    color: white;
    border-width: 0px;
    margin-left: 5px;
    font-size: 14px;
    cursor: pointer;
    width: 98%;
    margin: 0;
    text-transform: uppercase;
    margin-bottom: 20px;

  }

  .btn-link {
    color: rgb(53,82,227);
    border: none;
    background: #fff;
    font-size: 12px;
    text-transform: uppercase;
    cursor: pointer;
  }

`;

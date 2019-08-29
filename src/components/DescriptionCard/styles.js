import styled from 'styled-components';

export const Container = styled.div`
  .description {
    margin: 10px 0px;
    width: 100%;
    height: 60px;
    font-size: 16px;
    font-family: sans-serif;
    background: rgb(255, 255, 255);
    padding: 3px;
    border: none;
    resize: none;
  }

  .descriptionFocus {
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0px 0.3px 5px 0px #717171;
    /* background: #f3f0f09c; */
    padding: 10px;
  }

  .btn-save {
    padding: 9px;
    background: #3552e3;
    border: none;
    color: white;
    border-radius: 3px;
    font-size: 16px;
    cursor: pointer;
    font-family: sans-serif;
  }

  .btn-cancel {
    color: rgb(0, 0, 0);
    text-shadow: rgb(255, 255, 255) 0px 1px 0px;
    opacity: 0.4;
    cursor: pointer;
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 20px;
    width: 30px;
    background: none;
    border: none;
    vertical-align: middle;
    font-weight: bold;
  }
`;

import React from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend'

import GlobalStyle from './styles/global';
import Header from './components/Header';
import Main from './components/Main';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Header />
      <Main />
      <GlobalStyle />
    </DndProvider>
  );
}

export default App;

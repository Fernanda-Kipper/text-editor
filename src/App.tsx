import React from 'react';
import { EditorContextProvider } from './context/editor-context';

import { Router } from './router';

function App() {
  return (
    <EditorContextProvider>
      <Router />
    </EditorContextProvider>
  );
}

export default App;

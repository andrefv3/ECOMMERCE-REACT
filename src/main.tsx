import React from 'react';
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { store, persistor } from './store.ts'
import { PersistGate } from 'redux-persist/integration/react'
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
     <PersistGate persistor={persistor}>
      <React.StrictMode>
        <App />
      </React.StrictMode>,
     </PersistGate>
  </Provider>
)

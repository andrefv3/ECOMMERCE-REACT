import React from 'react';
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { routes } from './router/router'
import { store, persistor } from './store.ts'
import { PersistGate } from 'redux-persist/integration/react'
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
     <PersistGate persistor={persistor}>
      <React.StrictMode>
        <BrowserRouter>
          <Routes>
            {routes.map((value) => {
              return (
                <Route 
                  key={value.key} 
                  path={value.path}
                  element={value.component}>
                </Route>
              )
            })}
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
     </PersistGate>
  </Provider>
)

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { routes } from './router/router'
import { store, persistor } from './store.ts'
import { PersistGate } from 'redux-persist/integration/react'
import { WishlistProvider } from './contexts/WishlistContext.tsx';
import { CartProvider } from './contexts/CartContext.tsx';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: import.meta.env.VITE_API_REST_SHOPI,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
    },
    query: {
      fetchPolicy: 'no-cache',
    },
  }
})

root.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <React.StrictMode>
          <BrowserRouter>
          <CartProvider>
            <WishlistProvider>
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
            </WishlistProvider>
          </CartProvider>
          </BrowserRouter>
        </React.StrictMode>
      </PersistGate>
    </Provider>
  </ApolloProvider>
)

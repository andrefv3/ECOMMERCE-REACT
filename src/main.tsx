import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store, persistor } from './store.ts';
import { PersistGate } from 'redux-persist/integration/react';
import { WishlistProvider } from './contexts/WishlistContext.tsx';
import { CartProvider } from './contexts/CartContext.tsx';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { SearchProvider } from './contexts/SearchContext.tsx';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const root = createRoot(
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
});

root.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <React.StrictMode>
          <BrowserRouter>
            <SearchProvider>
              <CartProvider>
                <WishlistProvider>
                  <App />
                </WishlistProvider>
              </CartProvider>
            </SearchProvider>
          </BrowserRouter>
        </React.StrictMode>
      </PersistGate>
    </Provider>
  </ApolloProvider>,
);
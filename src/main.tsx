import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { routes } from './router/router';
import { store, persistor } from './store.ts';
import { PersistGate } from 'redux-persist/integration/react';
import { WishlistProvider } from './contexts/WishlistContext.tsx';
import { CartProvider } from './contexts/CartContext.tsx';
import { ApolloClient, ApolloProvider, InMemoryCache, useMutation } from '@apollo/client';
import { SearchProvider } from './contexts/SearchContext.tsx';
import { GENERATE_USER_VISITOR } from './graphql/user/user.graphql.ts';
import { GENERATE_WISHLIST } from './graphql/wishlist/wishlist.graphql.ts';
import { createRoot } from 'react-dom/client';
import Cookies from 'js-cookie';
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

const App: React.FC = () => {
  const [mutationUserVisitor] = useMutation(GENERATE_USER_VISITOR);
  const [mutationWishlistNew] = useMutation(GENERATE_WISHLIST);

  useEffect(() => {
    const createClientVisitor = async () => {
      try {
        const response = await mutationUserVisitor();
        const user = response.data.createAnonymousUser;
        Cookies.set('user', user.id);
        
        // Una vez que se ha creado el usuario, intenta crear la wishlist
        createWishlist(user.id);
      } catch (error) {
        console.error('Error al crear usuario: ', error);
      }
    };
  
    const createWishlist = async (userId: string | undefined) => {
      try {
        if(userId){
          const response = await mutationWishlistNew({ variables: { object: { userId } } });
          const wishlist = response.data.createAWishlist;
          Cookies.set('dt_wsl', wishlist.id);
        }
      } catch (error) {
        console.error('Error al crear wishlist: ', error);
      }
    };
  
    const userInCookies = Cookies.get('user');
    Cookies.get('dt_wsl');
  
    if (!userInCookies) {
      createClientVisitor();
    } 
  }, [mutationUserVisitor, mutationWishlistNew]);  

  return (
    <div>
      <Routes>
        {routes.map((value) => (
          <Route key={value.key} path={value.path} element={value.component} />
        ))}
      </Routes>
    </div>
  );
};

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
import { Route, Routes } from "react-router-dom";
import { routes } from "./router/router";
import { useMutation } from "@apollo/client";
import { GENERATE_USER_VISITOR } from "./graphql/user/user.graphql";
import { GENERATE_WISHLIST } from "./graphql/wishlist/wishlist.graphql";
import { useEffect } from "react";
import Cookies from 'js-cookie';

const App: React.FC = () => {
    const [mutationUserVisitor] = useMutation(GENERATE_USER_VISITOR);
    const [mutationWishlistNew] = useMutation(GENERATE_WISHLIST);
  
    const createWishlist = async (userId: string | undefined) => {
      try {
        if(userId){
          const response = await mutationWishlistNew({ variables: { object: { userId } } });
          const wishlist = response.data.createAWishlist;
          Cookies.set('dt_wsl', wishlist.id, {secure: true, sameSite: 'strict'});
        }
      } catch (error) {
        console.error('Error al crear wishlist: ', error);
      }
    };
  
    const createClientVisitor = async () => {
      try {
        const response = await mutationUserVisitor();
        const user = response.data.createAnonymousUser;
        Cookies.set('user', user.id, {secure: true, sameSite: 'strict'});
        
        // Una vez que se ha creado el usuario, intenta crear la wishlist
        createWishlist(user.id);
      } catch (error) {
        console.error('Error al crear usuario: ', error);
      }
    };
  
    useEffect(() => {
      const initializeUser = async () => {
        const userInCookies = Cookies.get('user');
        if (!userInCookies) {
          try {
            await createClientVisitor();
          } catch (error) {
            console.error('Error initializing user:', error);
          }
        }
      };
  
      initializeUser();
    }, [mutationUserVisitor]); 
  
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

export default App;
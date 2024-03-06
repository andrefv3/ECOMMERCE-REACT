import { Route, Routes } from "react-router-dom";
import { routes } from "./router/router";
import { useLazyQuery, useMutation } from "@apollo/client";
import { CONSULTING_USER_EXIST, GENERATE_USER_VISITOR } from "./graphql/user/user.graphql";
import { GENERATE_WISHLIST } from "./graphql/wishlist/wishlist.graphql";
import { useEffect, useRef } from "react";
import { UserDTO } from "./graphql/dto/user-single-dto";
import Cookies from 'js-cookie';

const App: React.FC = () => {
  const [mutationUserVisitor] = useMutation(GENERATE_USER_VISITOR);
  const [mutationWishlistNew] = useMutation(GENERATE_WISHLIST);
  const [queryUserExist] = useLazyQuery(CONSULTING_USER_EXIST);
  const mutationUserVisitorRef = useRef(mutationUserVisitor);

  const createWishlist = async (user: UserDTO) => {
    try {
      if(user){
        const response = await mutationWishlistNew({ variables: { object: { userId: user.id} } });
        const wishlist = response.data.createAWishlist;
        Cookies.set('dt_wsl', wishlist.id, {secure: true, sameSite: 'strict'});
      }
    } catch (error) {
      console.error('Error al crear wishlist: ', error);
    }
  };

  useEffect(() => {
    if (!Cookies.get('user')) {
      Cookies.set('user', import.meta.env.VITE_API_USER_ID_DFT, { secure: true, sameSite: 'strict' });
    }
  }, [Cookies.get('user')]);
  
  useEffect(() => {
    const initializeUser = async () => {
      const userInCookies = Cookies.get('user');
      if(userInCookies){
        try {  
          const response = await queryUserExist({ variables: { user_code: userInCookies.toString() }});

          if(response.error?.message === 'Usuario no encontrado'){
            const response = await mutationUserVisitorRef.current();
            const user = response.data.createAnonymousUser;
            Cookies.set('user', user.id, { secure: true, sameSite: 'strict' });
            createWishlist(user);
          }
        } catch (error) {
          console.error('Error al inicializar usuario: ', error);
        }
      }
    };

    initializeUser();
  }, [mutationUserVisitorRef]);   
    
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
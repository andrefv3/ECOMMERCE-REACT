import { realiceComponent } from './routerLogic';

const renderComponent = (key: string) => {
  const Component = realiceComponent[key];
  return <Component />;
};

export const routes = [
  {
    title: 'Home',
    path: '/',
    key: 'Home',
    component: renderComponent('Home'),
  },
  {
    title: 'DetailsProduct',
    path: '/:id/p',
    key: 'DetailsProduct',
    component: renderComponent('DetailsProduct'),
  },
  {
    title: 'Wishlist',
    path: '/wishlist',
    key: 'Wishlist',
    component: renderComponent('Wishlist'),
  },

  // 404 NOT FOUND
  {
    title: '',
    path: '*',
    key: 'notFound',
    component: renderComponent('NotFound'),
  }
];

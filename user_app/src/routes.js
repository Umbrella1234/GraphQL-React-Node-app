import { UsersPage } from './pages/UsersPage';
import { UserPage } from './pages/UserPage';

export default [
  {
    path: '/',
    component: UsersPage,
    exact: true,
  },
  {
    path: '/user/:userID',
    component: UserPage,
  },
];

import HomeDemo from './demo/HomeDemo';
import Root from '../components/Root';
import LandingPage from './main/LandingPage';
import Signup from './signup/Signup';
import Login from './login/Login';

const routes = [
  // Sign up page
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: 'signup',
    element: <Signup />,
  },
  {
    path: 'login',
    element: <Login />,
  },
  // Main App
  {
    path: '/demo',
    element: <Root />,
    children: [
      {
        path: '/demo',
        element: <HomeDemo />,
      },
    ],
  },
];

export default routes;

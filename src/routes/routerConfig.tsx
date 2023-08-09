import HomeDemo from './demo/HomeDemo';
import Root from '../components/Root';
import LandingPage from './main/LandingPage';
import Signup from './signup/Signup';
import Login from './login/Login';
import Dashboard from './main/Dashboard';
import TablePanel from '../components/TablePanel';

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
    path: 'demo',
    element: <Root />,
    children: [
      {
        path: '',
        element: <HomeDemo />,
      },
      {
        path: 'job/:id',
        element: <TablePanel />,
      },
    ],
  },
  {
    path: 'dashboard',
    element: <Root />,
    children: [
      {
        path: '',
        element: <Dashboard />,
      },
      {
        path: 'job/:id',
        element: <TablePanel />,
      },
    ],
  },
];

export default routes;

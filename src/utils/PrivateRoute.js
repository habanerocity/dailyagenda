import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../store/user-context';

import { Outlet } from 'react-router-dom';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { jwt, guestUser } = useContext(UserContext);

  return (
    (jwt || guestUser.isGuest) ? <Outlet /> : <Navigate to="/Login" />
  );
};

export default PrivateRoute;
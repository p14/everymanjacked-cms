import { Navigate, Outlet } from 'react-router-dom';
import { useSessionContext } from '../../context/session.context';

const RequireAuth = () => {

  const sessionContext = useSessionContext();

  if (!sessionContext.isLoggedIn) {
    return (
      <Navigate to='/' />
    );
  }

  /**
   * Change background color to white when signed into the app
   */
  document.body.style.backgroundColor = '#fff';

  return (
    <Outlet />
  );
}

export default RequireAuth;

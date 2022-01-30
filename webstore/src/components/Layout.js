import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const Layout = ({ children }) => {
  const { isLoading, isAuthenticated, logout } = useAuth0();

  return (
    <>
      <header>
        <h1>Ma Boutique</h1>
        <nav>
          <ul>
            <li>
              <Link className='menuitem' to='/'>
                Accueil
              </Link>
            </li>
            {!isLoading && isAuthenticated && (
              <li>
                <button className='menuitem' onClick={logout}>
                  Déconnexion
                </button>
              </li>
            )}
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </>
  );
};

export default Layout;

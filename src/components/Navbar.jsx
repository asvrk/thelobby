import { NavLink } from 'react-router-dom';
import Lobby from '../assets/lobby.svg';

const Navbar = () => {
  const linkClass = ({ isActive }) =>
    isActive ? 'nav-link active' : 'nav-link';

  return (
    <>
      <nav
        className='navbar navbar-expand-md navbar-light bg-light '
        aria-label='Navigation'
      >
        <div className='container'>
          <NavLink to='/' className='navbar-brand'>
            <img src={Lobby} alt='The Lobby' />
          </NavLink>
          <button className='navbar-toggler' type='button'>
            <span className='navbar-toggler-icon'></span>
          </button>

          <div className='collapse navbar-collapse'>
            <ul className='nav nav-pills ms-auto mb-2 mb-md-0'>
              <li className='nav-item'>
                <NavLink to='/' className={linkClass}>
                  Lobby
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink to='/games' className={linkClass}>
                  Games
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink to='/friends' className={linkClass}>
                  Friends
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink to='/leaderboard' className={linkClass}>
                  Leaderboard
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

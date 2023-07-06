import UserContext from "../../contexts/UserContext";
import { useContext } from "react";

import { Link, NavLink } from "react-router-dom";

import "../../styles/Header.css";

const Header = () => {

  const { 
    successfulLogin, logOut, loggedUserInfo 
  } = useContext(UserContext);

  
  return (
    <header>
      <nav className="flex fsb fvc">

        <div className="logo-wrapper">
          <Link to="/" className="link">
            <span className="logo">30 y 30</span>
          </Link>
        </div>

        {
          !successfulLogin
          ? 
            <div className="links-wrapper">
              <ul className="links flex">
                <li>
                  <NavLink className="link" to="/login">Login</NavLink>
                </li>
                <li>
                  <NavLink className="link"  to="/register">
                    Register
                  </NavLink>
                </li>
              </ul>
            </div>
          : 
            <>
              <div className="logo-name flex">
                <span className="username">User: {loggedUserInfo.username}</span>
                <div className="logout-btn">
                  <button onClick={logOut}>Log out</button>
                </div>
              </div>
            </>
        }
      </nav>
    </header>
  )
}
export default Header;
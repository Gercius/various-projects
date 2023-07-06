import { Link } from "react-router-dom";

import UserContext from "../../contexts/UserContext";
import { useContext } from "react";

import "./Header.css"


const Header = () => {

  const { successfulLogin } = useContext(UserContext);

  return (
    <>
      {
        successfulLogin
        ? 
          <header>
            <Link className="logo" to={"/home"}><span>Logo</span></Link>
            <nav>
              <ul className="links">
                <li><Link className="link" to={"/home"}>Home</Link></li>
                <li><Link className="link" to={"/add_post"}>Add Post</Link></li>
              </ul>
            </nav>
          </header>
        : 
          <header>
            <Link className="logo" to={"/"}><span>Logo</span></Link>
          </header>
      }
    </>
  )
}

export default Header;
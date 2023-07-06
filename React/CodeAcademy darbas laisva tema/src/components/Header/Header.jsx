import './Header.css'

const Header = ({ loggedUser, foundMushrooms }) => {

  return ( 
    <header>
      <img className="avatar" src={loggedUser.avatar} alt="" />
      <div className="userInfo">
        <p>Vartotojas: {loggedUser.username} </p>
        <p>Rasta skirtingų grybų: {foundMushrooms}</p>
      </div>
    </header>
   );
}
 
export default Header;
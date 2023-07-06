import './SignIn.css'
import { useState } from "react";

const SignIn = ({ setLoggedUser, users, setLoggedIn }) => {

  const [login, setLogin] = useState('');
  const [password, setpassword] = useState('');


const handleForm = (e) => {
  e.preventDefault();

  if(login === 'grybumegautojasis' && password === 'grybai123') {
    users.filter(user => user.username === login
      ? (setLoggedUser(user), setLoggedIn(true))
      : undefined
    );
  }
}

  return ( 
    <div className="signInWrapper">
      <form onSubmit={handleForm}>
        <label htmlFor="">
          Prisijungimo Vardas:
          <input required type="text" value={login}
            onChange={e => setLogin(e.target.value)} 
          />
        </label>

        <label htmlFor="">
          Slaptažodis:
          <input required type="password" value={password}
            onChange={e => setpassword(e.target.value)}
          />
        </label>
        <button>Prisijungti</button>
      </form>
      <div className="logo">
        <span className='logoName'>GRYBAI</span>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Tango_Style_Mushroom_icon.svg/1024px-Tango_Style_Mushroom_icon.svg.png" alt="" />
      </div>
    </div>
   );
}
 
export default SignIn;
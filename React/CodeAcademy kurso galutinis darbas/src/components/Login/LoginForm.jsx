import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";

import "../../styles/Login.css";


const LoginForm = () => {

  const navigation = useNavigate();

  const { 
    users, setSuccessfulLogin, setLoggedUserInfo 
  } = useContext(UserContext);

  const [formInputs, setFormInputs] = useState({
    email: '',
    password: ''
  });

  const handleInputs = (e) => {
    const inputValue = e.target.value
    const inputName = e.target.name
    setFormInputs({...formInputs, [inputName]: inputValue});
    
  }

  const handleForm = (e) => {
    e.preventDefault();

    const loginError = () => {
      let error = document.querySelector('.error');
      error.innerHTML = 'Incorrect email or password!'
      setTimeout(() => {
        error.innerHTML = ''
      }, 3000);
    }

    const loggedUser = users.find(user =>
      user.email === formInputs.email
      && user.password === formInputs.password
    );

    if (loggedUser === undefined) {
      setSuccessfulLogin(false);
      loginError();
    } else {
      setSuccessfulLogin(true);
      setLoggedUserInfo(loggedUser)
      navigation('/')
    }
  }


  return (
    <form onSubmit={handleForm}>

      <div className="email">
        <label htmlFor="email">Email</label>
        <input 
          type="email"
          name="email"
          value={formInputs.email}
          onChange={handleInputs}
          required
        />
      </div>

      <div className="password">
        <label htmlFor="password">Password</label>
        <input 
          type="password"
          name="password"
          value={formInputs.password}
          onChange={handleInputs}
          required
        />
      </div>
      
      <div className="login-btn">
        <button type="submit">Login</button>
      </div>
      <div>
        <span className="error"></span>
      </div>
    </form>
  )
}
export default LoginForm;
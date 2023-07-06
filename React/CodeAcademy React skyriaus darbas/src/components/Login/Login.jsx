import UserContext from "../../contexts/UserContext";
import { useContext, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import "./Login.css";


const Login = () => {

  const navigation = useNavigate();

  const { users, setSuccessfulLogin } = useContext(UserContext);

  const [formInputs, setFormInputs] = useState({
    email: '',
    password: ''
  });

  const handleInputs = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    setFormInputs({...formInputs, [inputName]: inputValue});
  }

  const handleForm = (e) => {
    e.preventDefault();

    const loginError = () => {
      let err = document.querySelector('.error');
      err.innerHTML = 'Incorrect email or password!'
      setTimeout(() => {
        err.innerHTML = ''
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
      navigation('/home')
    }
  }


  return (
    <div className="login-wrapper">
      <form onSubmit={handleForm}>
        <div className="input-wrapper">
          <label htmlFor="">Email</label>
          <input 
            type="email" 
            name="email"
            id="email"
            required
            value={formInputs.email}
            onChange={handleInputs}
          />
        </div>

        <div className="input-wrapper">
          <label htmlFor="">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            minLength={5}
            value={formInputs.password}
            onChange={handleInputs}
          />
        </div>

        <button type="submit">Log in</button>
      </form>
      <Link className="create-acc" to='/register'>Create new account</Link>
      <br />
      <span className="error"></span>
    </div>
  )
}

export default Login;
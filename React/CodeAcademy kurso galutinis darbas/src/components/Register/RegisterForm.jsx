import UserContext from "../../contexts/UserContext";
import { useContext, useState } from "react";

import { useNavigate } from "react-router-dom";

import "../../styles/Register.css"


const RegisterForm = () => {

  const navigation = useNavigate();

  const { 
    users, addNewUser, setSuccessfulLogin, setLoggedUserInfo
  } = useContext(UserContext);

  const [formInputs, setFormInputs] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const errorMessages = {
    emailExists: 'Account with this email already exsists!',
    usernameExists: 'Account with this username already exsists!',
    passNotMatch: 'Passwords do not match!'
  }

  const handleInputs = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    setFormInputs({...formInputs, [inputName]: inputValue});
  }

  const handleForm = (e) => {
    e.preventDefault();

    const newUser = {
      email: formInputs.email,
      username: formInputs.username,
      password: formInputs.password,
      id: crypto.randomUUID()
    }

    const handleErrors = (message) => {
      let error = document.querySelector('.error')
      error.innerHTML = message;
        setTimeout(() => {
          error.innerHTML = ''
        }, 3000);
    }

    if (users.find(user => user.email === formInputs.email)) {
      handleErrors(errorMessages.emailExists);

    } else if (formInputs.password !== formInputs.confirmPassword) {
      handleErrors(errorMessages.passNotMatch);
      passReset();

    } else if (users.find(user => user.username === formInputs.username)) {
      handleErrors(errorMessages.usernameExists);

    } else {
      addNewUser(newUser);
      setSuccessfulLogin(true);
      setLoggedUserInfo(newUser);
      navigation('/');
    }
  }

  const passReset = () => {
    setFormInputs({
      ...formInputs,
      password: '',
      confirmPassword: ''
    })
  }


  return (
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
        <label htmlFor="">Username</label>
        <input 
          type="text" 
          name="username"
          id="username"
          required
          value={formInputs.username}
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
          minLength={6}
          value={formInputs.password}
          onChange={handleInputs}
        />
      </div>

      <div className="input-wrapper">
        <label htmlFor="">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          required
          value={formInputs.confirmPassword}
          onChange={handleInputs}
        />
      </div>
      <div className="register-btn">
        <button type="submit">Register</button>
      </div>
      <div>
        <span className="error"></span>
      </div>
      
    </form>
  )
}

export default RegisterForm;
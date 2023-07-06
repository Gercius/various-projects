import UserContext from "../../contexts/UserContext";
import { useContext, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import "./Register.css"


const Register = () => {

  const navigation = useNavigate();

  const { 
    users, addNewUser, setSuccessfulLogin 
  } = useContext(UserContext);

  const [formInputs, setFormInputs] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const errorMessages = {
    userExists: 'User with this email already exsists!',
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
      handleErrors(errorMessages.userExists);
      emailReset();

    } else if (formInputs.password !== formInputs.confirmPassword) {
      handleErrors(errorMessages.passNotMatch);
      passReset();

    } else {
      addNewUser(newUser);
      setSuccessfulLogin(true);
      navigation('/home')
    }
  }

  //other functions

  const passReset = () => {
    setFormInputs({
      ...formInputs,
      password: '',
      confirmPassword: ''
    })
  }

  const emailReset = () => {
    setFormInputs({
      ...formInputs,
      email: ''
    })
  }


  return (
    <div className="register-wrapper">
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

        <div className="input-wrapper">
          <label htmlFor="">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            required
            minLength={5}
            value={formInputs.confirmPassword}
            onChange={handleInputs}
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <Link className="login-link" to='/login'>Login</Link></p>
      <span className="error"></span>
    </div>
  )
}

export default Register;
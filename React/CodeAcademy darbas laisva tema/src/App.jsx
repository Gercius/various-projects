import Header from './components/Header/Header';
import SignIn from './components/Sign_in/SignIn';
import AddMushroom from './components/AddMushroom/AddMushroom';
import Mushroom from './components/Mushroom/Mushroom';
import Footer from './components/Footer/Footer';

import './App.css';

import { useState, useEffect } from 'react';


const App = () => {
  const [mushrooms, setMushrooms] = useState(null);
  const [users, setUsers ] = useState(null);
  const [loggedUser, setLoggedUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [foundMushrooms, setFoundMushrooms] = useState(0);

  const fetchMushrooms = async () => {
    const fetchedMushrooms = await fetch('http://localhost:5000/mushrooms')
      .then(res => res.json());
    setMushrooms(fetchedMushrooms);
  }

  const fetchUsers = async () => {
    const fetchedUsers = await fetch('http://localhost:5000/users')
      .then(res => res.json());
    setUsers(fetchedUsers);
  }

  const addMushroom = async (mushroom) => {
    await fetch('http://localhost:5000/mushrooms', {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
        body: JSON.stringify(mushroom)
      })
      .then(res => res.json())
      .then(fetchMushrooms());
  }

  const deleteMushroom = async (id) => {
   await fetch(`http://localhost:5000/mushrooms/${id}`, {
        method: 'DELETE'
      })

    setMushrooms(mushrooms.filter(mushroom => mushroom.id !== id))
  }

  // const changeMushroom = async (id, mushroom) => {
  //   await fetch(`http://localhost:5000/mushrooms/${id}`, {
  //     method: "PATCH",
  //     headers: {
  //       'Content-type': 'application/json'
  //     },
  //       body: JSON.stringify(mushroom)
  //     })
  //     .then(res => res.json())
  //     .then(fetchMushrooms());
  // }

  useEffect(() => {
    fetchMushrooms();
    fetchUsers();
  }, []);


  return (
    <div className="appWrapper">
      {loggedIn
        ? <>
            <Header 
              loggedUser = {loggedUser} 
              foundMushrooms ={foundMushrooms}
            />
            <main>
              <AddMushroom
                addMushroom = {addMushroom}
              />
              <section className='mushrooms'>
                <ul className='mushroomCards'>
                  <Mushroom 
                    mushrooms = {mushrooms}
                    setMushrooms = {setMushrooms}
                    deleteMushroom = {deleteMushroom}
                    foundMushrooms = {foundMushrooms}
                    setFoundMushrooms = {setFoundMushrooms}
                    fetchMushrooms = {fetchMushrooms}
                  />
                </ul>
              </section>
            </main>
          </>
        : <>
            <SignIn 
              users={users}
              setLoggedIn = {setLoggedIn}
              setLoggedUser = {setLoggedUser}
            />
            <div className='imkGryba'>
              <img src="https://preview.redd.it/xe8hc5okvut51.jpg?auto=webp&s=8eb6f94341fbb5aa9f5f2c44b6292248894e4319" alt="" />
            </div>
          </>
      }
      <Footer />
    </div>
  );
}

export default App;
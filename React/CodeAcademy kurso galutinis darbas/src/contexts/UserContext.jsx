import { createContext, useState, useEffect } from "react";


const UserContext = createContext();

const UserProvider = ({ children }) => {

  const [users, setUsers] = useState([]);
  const [loggedUserInfo, setLoggedUserInfo] = useState(null);
  const [successfulLogin, setSuccessfulLogin] = useState(false);

  const fetchUsers = async () => {
    const fetchedUsers = await fetch('http://localhost:4000/users')
      .then(res => res.json());

      setUsers(fetchedUsers);
  }

  const addNewUser = async (newUser) => {
    await fetch('http://localhost:4000/users', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
      .then(res => res.json());
      
    setUsers([...users, newUser]);
  }

  useEffect(() => {
    fetchUsers();
  }, [])

  const logOut = () => {
    setSuccessfulLogin(false);
  }

  return (
    <UserContext.Provider
      value={{
        users,
        setUsers,
        loggedUserInfo,
        setLoggedUserInfo,
        successfulLogin,
        setSuccessfulLogin,
        addNewUser,
        logOut
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export {UserProvider};
export default UserContext;
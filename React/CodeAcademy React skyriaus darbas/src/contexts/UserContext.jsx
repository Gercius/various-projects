import { createContext, useEffect, useState } from "react";


const UserContext = createContext();

const UserProvider = ({ children }) => {
  
  const [successfulLogin, setSuccessfulLogin] = useState();
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const fetchedUsers = await fetch('http://localhost:4000/users')
      .then(res => res.json());

    setUsers(fetchedUsers);
  }

  useEffect(() => {
    fetchUsers();
  }, [])

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


  return (
    <UserContext.Provider
      value={{
        users,
        setUsers,
        successfulLogin,
        setSuccessfulLogin,
        addNewUser
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export { UserProvider };
export default UserContext;
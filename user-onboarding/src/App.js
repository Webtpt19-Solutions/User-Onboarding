import React, { useState } from 'react';
import Form from './components/form.js';
import UserList from './components/userList.js';
import './App.css';

function App() {
  const [ users, setUsers ] = useState([]);

  const addUser = (newUser) => {
    const newUserList = [
      ...users,
      newUser
    ]
    setUsers(newUserList)
  };

  return (
    <div className="App">
      <Form addUser={addUser}/>
      <UserList userList={users}/>
    </div>
  );
}

export default App;

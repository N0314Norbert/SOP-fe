import './App.css';
import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import Menu from './Menu';

export const StateProvider = React.createContext();

function App() {
  const [location, setLocation] = useState('LOGIN');
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <StateProvider.Provider
      value={{ location, setLocation, loggedIn, setLoggedIn }}
    >
      {location == 'LOGIN' && !loggedIn && <Login />}
      {location == 'REGISTER' && !loggedIn && <Register />}
      {location == 'MENU' && loggedIn && <Menu />}
    </StateProvider.Provider>
  );
}

export default App;

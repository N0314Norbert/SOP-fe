import { useContext } from 'react';
import { StateProvider } from './App';
import './App.css';
import axios from 'axios';

function Register() {
  const { location, setLocation } = useContext(StateProvider);
  const back = () => {
    setLocation('LOGIN');
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const { uname, pass, email } = document.forms[0];
    console.log(uname.value, pass.value, email.value);
    axios.post('http://localhost:5000/users/register', {
      name: uname.value,
      password: pass.value,
      email: email.value,
    });

    uname.value = pass.value = email.value = '';
  };

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Register</div>
        <form onSubmit={handleRegister}>
          <div className="input-container">
            <label>Username </label>
            <input type="text" name="uname" required pattern="[a-zA-Z0-9 _]+" />
          </div>
          <div className="input-container">
            <label>Password </label>
            <input type="password" name="pass" required />
          </div>
          <div className="input-container">
            <label>Email </label>
            <input type="email" name="email" required />
          </div>
          <div className="button-container">
            <input type="submit" />
          </div>
        </form>
        <div className="button-container">
          <button onClick={back}>Back</button>
        </div>
      </div>
    </div>
  );
}

export default Register;

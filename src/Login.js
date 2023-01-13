import axios from 'axios';
import { useContext } from 'react';
import { StateProvider } from './App';
import './App.css';

function Login() {
  const { setLocation, setLoggedIn } = useContext(StateProvider);
  const register = () => {
    setLocation('REGISTER');
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    const { uname, pass } = document.forms[0];
    const response = await axios.post('http://localhost:5000/users/login', {
      name: uname.value,
      password: pass.value,
    });
    if (response.data === 'OK') {
      setLoggedIn(true);
      setLocation('MENU');
    } else {
      alert('Wrong username or password');
    }

    uname.value = pass.value = '';
  };

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Sign In</div>
        <form onSubmit={handleLogin}>
          <div className="input-container">
            <label>Username </label>
            <input type="text" name="uname" required pattern="[a-zA-Z0-9 _]+" />
          </div>
          <div className="input-container">
            <label>Password </label>
            <input type="password" name="pass" required />
          </div>
          <div className="button-container">
            <input type="submit" />
          </div>
        </form>
        <div className="button-container">
          <button onClick={register}>Register</button>
        </div>
      </div>
    </div>
  );
}

export default Login;

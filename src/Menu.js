import axios from 'axios';
import { useContext } from 'react';
import { StateProvider } from './App';
import './App.css';

function Menu() {
  const { setLocation, setLoggedIn } = useContext(StateProvider);
  const logout = () => {
    setLocation('LOGIN');
    setLoggedIn(false);
  };
  const handleDelete = async (e) => {
    e.preventDefault();
    const { uname, pass, uuid } = document.forms[0];
    const response = await axios
      .delete(`http://localhost:5000/users/${uuid.value}`, {
        data: {
          name: uname.value,
          password: pass.value,
        },
      })
      .catch((err) => {
        switch (err.response.status) {
          case 422:
            alert('Invalid uuid format');
            break;
          case 401:
            alert('Invalid credentials');
          default:
            alert('error');
            break;
        }
      });
    if (response?.data == 'OK') {
      alert(`User with uuid: ${uuid.value} has been deleted`);
    }

    uname.value = pass.value = uuid.value = '';
  };

  const handleUsers = async () => {
    const response = await axios.get('http://localhost:5000/users');
    const usersList = document.getElementsByName('usersList');
    const names = response.data.map((item) => {
      return item['user_name'];
    });
    usersList[0].innerText = names.toString();
  };

  const getUserById = async (e) => {
    e.preventDefault();
    const { uuid } = document.forms[1];
    const response = await axios
      .get(`http://localhost:5000/users/${uuid.value}`)
      .catch((err) => {
        switch (err.response.status) {
          case 422:
            alert('Invalid uuid format');
            break;
          default:
            alert('error');
            break;
        }
      });
    const usersList = document.getElementsByName('singleUser');
    const names = response.data.map((item) => {
      return item['user_name'];
    });
    usersList[0].innerText = names.toString();
  };

  const updateUser = async (e) => {
    e.preventDefault();
    const { uname, pass, uuid, newemail } = document.forms[2];
    const response = await axios
      .patch(`http://localhost:5000/users/${uuid.value}`, {
        name: uname.value,
        password: pass.value,
        newemail: newemail.value,
      })
      .catch((err) => {
        switch (err.response.status) {
          case 422:
            alert('Invalid uuid format');
            break;
          case 401:
            alert('Invalid credentials');
            break;
          case 204:
            alert('No such uuid exists');
            break;
          default:
            alert('error');
            break;
        }
      });
    if (response?.data == 'OK') {
      alert(
        `User's email with uuid: ${uuid.value} has been changed to ${newemail.value}`,
      );
    }

    uname.value = pass.value = uuid.value = newemail.value = '';
  };

  return (
    <>
      <div className="app">
        <div className="login-form">
          <div className="title">Delete User</div>
          <form onSubmit={handleDelete}>
            <div className="input-container">
              <label>Username </label>
              <input
                type="text"
                name="uname"
                required
                pattern="[a-zA-Z0-9 _]+"
              />
            </div>
            <div className="input-container">
              <label>Password </label>
              <input type="password" name="pass" required />
            </div>
            <div className="input-container">
              <label>Uuid </label>
              <input type="text" name="uuid" required />
            </div>
            <div className="button-container">
              <input type="submit" />
            </div>
          </form>
        </div>
        <div className="login-form">
          <div className="title">Get Users</div>
          <div className="button-container">
            <button onClick={handleUsers}>List</button>
          </div>
          <div>
            <label>List of users</label>
          </div>
          <label name="usersList"></label>
        </div>
        <div className="login-form">
          <div className="title">Get Users</div>
          <form>
            <div className="button-container"></div>
            <div className="input-container">
              <label>Uuid </label>
              <input type="text" name="uuid" required />
            </div>
            <div>
              <div className="button-container">
                <button onClick={getUserById}>List</button>
              </div>
              <label>User's name</label>
            </div>
            <label name="singleUser"></label>
          </form>
        </div>
        <div className="login-form">
          <div className="title">Change Email</div>
          <form onSubmit={updateUser}>
            <div className="input-container">
              <label>Username </label>
              <input
                type="text"
                name="uname"
                required
                pattern="[a-zA-Z0-9 _]+"
              />
            </div>
            <div className="input-container">
              <label>Password </label>
              <input type="password" name="pass" required />
            </div>
            <div className="input-container">
              <label>New email </label>
              <input type="text" name="newemail" required />
            </div>
            <div className="input-container">
              <label>Uuid </label>
              <input type="text" name="uuid" required />
            </div>
            <div className="button-container">
              <input type="submit" />
            </div>
          </form>
        </div>
        <div className="button-container">
          <button onClick={logout}>Logout</button>
        </div>
      </div>
    </>
  );
}

export default Menu;

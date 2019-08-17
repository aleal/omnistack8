import React, {useState} from 'react';
import logo from '../assets/logo.svg';
import './Login.css';

import api from '../services/api';

export default function Login ({ history }) {
    const [username, setUsername] = useState('');
    async function handleSubmit(e) {
      e.preventDefault();
      console.log(username);
      const response = await api.post('/devs', {
        username
      });
      const { _id } = response.data;
      history.push(`/main/${_id}`);
    } 
    return (
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <img alt="Tindev" src={logo} />
          <input placeholder="git user" value={username} onChange={e=>setUsername(e.target.value)} />
          <button type="submit" >OK</button>
        </form>
      </div>
    );
}

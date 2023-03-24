import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';

const App = () => {

  const [user, setUser] = useState(null);
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);

  const baseUrl = import.meta.env.VITE_BASE_URL

  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios.post(`${baseUrl}/api/login`, { name: value }, {
      withCredentials: true
    }).then(res => {
      setUser(res.data.name);
      setLoading(false);
      toast.success(res.data.message);
    }).catch(err => {
      setLoading(false);
      toast.error('something wents wrong');
    });
  }

  const handleLogout = async () => {
    setLoading(true);
    axios.post(`${baseUrl}/api/logout`, { name: value }, {
      withCredentials: true
    }).then(res => {
      setUser(null);
      setLoading(false);
      toast.success(res.data.message);
    }).catch(err => {
      setLoading(false);
      toast.error('something wents wrong');
    });
  }
  
  useEffect(() => {
    axios.get(`${baseUrl}/api/me`, {
      withCredentials: true
    }).then(res => {
      setUser(res.data.name);
      setLoading(false);
    }).catch(err => {
      setUser(null);
      setLoading(false);
    })
  }, []);

  return <>
    {
      loading ? <p>loading..</p> : (
        <div className="App">
          <h1>Hello {user ? user : 'login'}</h1>
          <form onSubmit={handleSubmit}>
            <input type='text' placeholder='Your name..' value={value} onChange={e => setValue(e.target.value)} />
            <button type="submit">Login</button>
            {user && <button className='logout-btn' type='button' onClick={handleLogout}>logout</button>}
          </form>
        </div>
      )
    }
      <Toaster />
  </>
}

export default App
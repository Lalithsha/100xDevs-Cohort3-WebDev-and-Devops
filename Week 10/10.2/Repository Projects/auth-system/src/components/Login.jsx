import { useState, useContext } from 'react';
import { AuthContext } from '../App';


export default function Login({onLogin: propsOnLogin}) {
    

   const [userName, setUserName] = useState('');
   const contextValue = useContext(AuthContext); 

   const handleLogin = ()=>{
    if(contextValue?.login){
        contextValue.login(userName);
    }
    else if(propsOnLogin)  {
        propsOnLogin(userName);
    }
    setUserName('');
   }
   
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '300px', margin: '0 auto' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label htmlFor="username" style={{ fontWeight: 'bold' }}>Username</label>
        <input
          id="username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter your username"
          style={{
            padding: '0.5rem',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />
      </div>
      <button
        onClick={handleLogin}
        style={{
          backgroundColor: '#3f98b5',
          color: 'white',
          border: 'none',
          padding: '0.5rem 1rem',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Login
      </button>
    </div>
  )
}

import { useState, createContext } from 'react'
import './App.css'
import Header from './components/Header'
import Home from './components/Home';
import Login from "./components/Login";

export const AuthContext = createContext(undefined);

function App() {
  
  const [userName, setUserName] = useState('');
  const [useContextAPI, setUseContextAPI] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);

  const login=(userName)=>{
    setUserName(userName);
    setLoggedIn(true);
  }

  const logout =()=>{
    setUserName('');
    setLoggedIn(false);
  }
  
  const contextValues = isLoggedIn ? {userName, login, isLoggedIn, logout}: undefined;
  
  return (
    <>
    <AuthContext.Provider  value={contextValues}  >
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header userName={userName} isLoggedIn={isLoggedIn} logout={logout}  />
      
      <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          padding: '1rem',
          backgroundColor: '#f0f0f0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              id="use-context-api"
              type="checkbox"
              checked={useContextAPI}
              onChange={(e) => setUseContextAPI(e.target.checked)}
            />
            <label htmlFor="use-context-api">
              Use Context API: {useContextAPI ? 'On' : 'Off'}
            </label>
          </div>
        </div>
      <main style={{ flex: 1, padding: '1rem' }}>
        {isLoggedIn ? (
            <Home />
          ) : (
            <Login onLogin={login} />
          )}
      </main>
      </div>
      </AuthContext.Provider>
    </>
  )
}

export default App

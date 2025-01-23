import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import PropTypes from 'prop-types';
import App from './App.jsx'

const RootLayout = ({ children }) => {
  return (
    <div className="bg-gradient-to-b from-yellow-500 to-orange-500 min-h-screen font-dm-sans">
      {children}
    </div>
  );
};

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RootLayout>   
    <App />
    </RootLayout>
  </StrictMode>,
)


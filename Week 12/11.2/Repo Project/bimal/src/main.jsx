import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

/* // Import Google Fonts using @fontsource
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/700.css"; */

const RootLayout = ({ children }) => {
  return (
    <div className="bg-gradient-to-b from-yellow-500 to-orange-500 min-h-screen font-dm-sans">
      {children}
    </div>
  );
};


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RootLayout>
    <App />

    </RootLayout>
  </StrictMode>,
)


// import React from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../App";
import { useContext } from "react";

const AppBar = ({userName: propsUsername, login, isLoggedIn:propsLoggedIn, logout:propsLogout }) => {

  const contextValue = useContext(AuthContext);
  
  const displayuserName = contextValue?.userName ?? propsUsername;
  const displayIsLogggedIn = contextValue?.isLoggedIn ?? propsLoggedIn;
  const handleLogout = contextValue?.logout ?? propsLogout;
    
  return (
    <div className="flex justify-between items-center p-4 bg-blue-600 text-white">
      {/* Application Title */}
      <div className="text-lg font-bold">Auth System Demo</div>
      
      {/* User Info and Logout */}
      {displayIsLogggedIn ? (
      <div className="flex items-center">
        <span className="mr-4">Welcome, {displayuserName}!</span>
        <button
          onClick={handleLogout}
          className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 transition"
        >
          Logout
        </button>
      </div>
       ): (
        <span>Not logged in</span>
       ) }
    </div>
  );
};

AppBar.propTypes = {
  userName: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default AppBar;

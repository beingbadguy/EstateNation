import { createContext, useEffect, useState } from "react";
import { auth, firestore } from "../config/firebase";
import { signOut } from "firebase/auth";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(false);
  const logoutHandle = () => {
    auth
      .signOut()
      .then(() => {
        console.log("Sign-out successful.");
        setUserData(false);
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  const [favno, setFavNo] = useState( userData && userData.favourites.length || 0);

  return (
    <AuthContext.Provider
      value={{ userData, setUserData, logoutHandle, favno, setFavNo }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

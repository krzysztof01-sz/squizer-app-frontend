import { createContext, useState } from 'react';

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(Boolean(localStorage.getItem('isLogged')));
  return <AuthContext.Provider value={{ isLogged, setIsLogged }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

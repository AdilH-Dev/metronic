/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import * as authHelper from '../_helpers';
const API_URL = import.meta.env.VITE_APP_API_URL;
export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/user`;
export const LOGIN_URL = `${API_URL}/login`;
export const REGISTER_URL = `${API_URL}/register`;
export const REQUEST_PASSWORD_URL = `${API_URL}/forgotpassword`;
const AuthContext = createContext(null);
const AuthProvider = ({
  children
}) => {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(authHelper.getAuth());
  const [currentUser, setCurrentUser] = useState();

  // Verity user session and validate bearer authentication
  const verify = async () => {
    if (auth) {
      try {
        const {
          data: user
        } = await getUser();
        setCurrentUser(user);
      } catch (error) {
        saveAuth(undefined);
        setCurrentUser(undefined);
      }
    }
  };
  useEffect(() => {
    verify().finally(() => {
      // delay for layout initialization
      setLoading(false);
    });
  }, []);

  // Set auth object and save it to local storage
  const saveAuth = auth => {
    setAuth(auth);
    if (auth) {
      authHelper.setAuth(auth);
    } else {
      authHelper.removeAuth();
    }
  };

  // Login user with email and password
  const login = async (email, password) => {
    try {
      const {
        data: auth
      } = await axios.post(LOGIN_URL, {
        email,
        password
      });
      saveAuth(auth);
      const {
        data: user
      } = await getUser();
      setCurrentUser(user);
    } catch (error) {
      saveAuth(undefined);
      throw new Error(`Error ${error}`);
    }
  };

  // Register user using default registration information
  const register = async (email, password, firstname, lastname, password_confirmation) => {
    try {
      const {
        data: auth
      } = await axios.post(REGISTER_URL, {
        email,
        first_name: 'DefaultName',
        last_name: 'DefaultSurname',
        password,
        password_confirmation
      });
      saveAuth(auth);
      const {
        data: user
      } = await getUser();
      setCurrentUser(user);
    } catch (error) {
      saveAuth(undefined);
      throw new Error(`Error ${error}`);
    }
  };

  // Server should return object => { result: boolean } (Is Email in DB)
  const requestPassword = async email => {
    await axios.post(REQUEST_PASSWORD_URL, {
      email
    });
  };

  // Returns user by using bearer authentication token
  const getUser = async () => {
    return await axios.get(GET_USER_BY_ACCESSTOKEN_URL);
  };

  // Delete auth local storage and resets current user state
  const logout = () => {
    saveAuth(undefined);
    setCurrentUser(undefined);
  };
  return <AuthContext.Provider value={{
    isLoading: loading,
    auth,
    saveAuth,
    currentUser,
    setCurrentUser,
    login,
    register,
    requestPassword,
    getUser,
    logout,
    verify
  }}>
      {children}
    </AuthContext.Provider>;
};
export { AuthContext, AuthProvider };
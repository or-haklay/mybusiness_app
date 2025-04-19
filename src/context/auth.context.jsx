import { createContext, useContext, useState } from "react";
import userService from "../services/userServices";
import { ref } from "joi";
import { useEffect } from "react";

export const authContext = createContext();
authContext.displayName = "Auth";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(userService.getUser());
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await userService.getUserData(user?._id);
        setUserData(response);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, []);

  const loadUserData = async () => {
    if (user) {
      const response = await userService.getUserData(user?._id);
      setUserData(response);
      return response;
    }
  };

  const updateUser = async (values) => {
    const response = await userService.updateUser(user?._id, values);
    setUser(response);
    return response;
  };

  const refreshUser = () => {
    setUser(userService.getUser());
    loadUserData();
  };

  const signIn = async (values) => {
    const response = await userService.signIn(values);
    refreshUser();
    return response;
  };
  const register = async (values) => {
    const response = await userService.register(values);
    refreshUser();
    return response;
  };
  const signOut = () => {
    userService.signOut();
    refreshUser();
  };

  return (
    <authContext.Provider
      value={{
        user,
        userData,
        signIn,
        register,
        refreshUser,
        signOut,
        updateUser,
      }}
    >
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  return useContext(authContext);
}

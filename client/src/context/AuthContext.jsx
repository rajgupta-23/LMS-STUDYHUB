import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("studyhub_token");

    if (!token) {
      setLoading(false);
      return;
    }

    api
      .get("/auth/me")
      .then((res) => {
        setUser(res.data.user);
      })
      .catch(() => {
        localStorage.removeItem("studyhub_token");
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const login = async (email, password, dateOfBirth) => {
    const res = await api.post("/auth/login", {
      email,
      password,
      dateOfBirth,
    });

    localStorage.setItem("studyhub_token", res.data.token);
    setUser(res.data.user);
    return res.data.user;
  };

  const register = async (name, email, password, role, dateOfBirth) => {
    const res = await api.post("/auth/register", {
      name,
      email,
      password,
      role,
      dateOfBirth,
    });

    localStorage.setItem("studyhub_token", res.data.token);
    setUser(res.data.user);
    return res.data.user;
  };

  const logout = () => {
    localStorage.removeItem("studyhub_token");
    setUser(null);
  };

  const updateUser = async (profileData) => {
    const res = await api.put("/users/profile", profileData);
    const updatedUser = res.data.user;
    setUser(updatedUser);
    return updatedUser;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
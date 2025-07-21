import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useModalStore } from "../store/useModalStore";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { openModal } = useModalStore();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const fetchUser = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/auth/me`, {
          credentials: "include"
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data?.user || null);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("AuthContext: Failed to fetch user", err);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE}/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      setUser(res.data.user);
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      throw err;
    }
  };

  const logout = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/auth/logout`, {
      method: "POST",
      credentials: "include"
    });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

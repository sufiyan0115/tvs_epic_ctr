import { useLocalStorage } from "@mantine/hooks";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_URL } from "../config/constants";

const AuthContext = createContext({
  auth: false,
  setAuth: (a: any) => {},
  user: {},
  setUser: (a: any) => {},
  login: (values: {}) => {},
  logout: () => {},
  loading: false,
  tokenChecking: true,
});

export const AuthProvider = (props: any) => {
  const navigate = useNavigate();
  const storedToken = localStorage.getItem("token_tvs");
  const [token, setToken] = useState(storedToken);
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [tokenChecking, setTokenChecking] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkJwtToken();
  }, []);

  const checkJwtToken = () => {
    if (!user && token) {
      axios
        .get(`${API_URL}user`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setAuth(true);
          let user_data = res.data;
          user_data.token = token;
          setUser(user_data);
          setTokenChecking(false);
        })
        .catch((err) => {
          setAuth(false);
          setUser(null);
          setToken(null);
          setTokenChecking(false);
        });
    } else {
      console.log("No Token Found");
      setLoading(false);
      setTokenChecking(false);
    }
  };

  const login = (values: {}) => {
    setLoading(true);
    axios
      .post(`${API_URL}login`, values)
      .then((res) => {
        setAuth(true);
        const user_data = res.data.user;
        user_data.token = res.data.token;
        console.log(user_data);
        localStorage.setItem("token_tvs", user_data.token);
        setToken(res.data.token);
        setUser(user_data);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        const message = err?.response?.data?.message || "Something went wrong";
        toast.error(message, {
          position: "top-right",
          autoClose: 1000,
          closeOnClick: true,
          progress: undefined,
        });
        setLoading(false);
      });
  };

  const logout = () => {
    setAuth(false);
    setToken(null);
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        user,
        setUser,
        login,
        logout,
        loading,
        tokenChecking,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/authService";
import { Toast } from "../../utils/myFunctions";
import { AxiosError } from "axios";
import useCookie from "react-use-cookie";

interface LoginForm {
  username: string;
  password: string;
}

export const LoginPage: React.FC = () => {
  const authService = AuthService();
  const navigate = useNavigate();
  const [formLogin, setFormLogin] = useState<LoginForm>({
    username: "",
    password: "",
  });
  const [errorFormLogin, setErrorFormLogin] = useState("");
  const [loadingFormLogin, setloadingFormLogin] = useState(false);
  const [cookieLogin, setCookieLogin] = useCookie(
    "userLoginCookie",
    ""
  );
  const userLoginCookie = cookieLogin
    ? JSON.parse(cookieLogin)
    : null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormLogin((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorFormLogin("");
    setloadingFormLogin(true);
    try {
      const response = await authService.loginAuth(formLogin);
      if (response.status === 200) {
        const userData = {
          token: response.token,
          name: response.user.name,
          role: response.user.role,
        };
        setCookieLogin(JSON.stringify(userData), { days: 1 });
        Toast.fire({
          icon: "success",
          title: `Selamat Datang ${response.user.name}`,
          timer: 4000,
        });
        navigate("/dashboard");
      } else {
        setErrorFormLogin("Username/Password yang anda masukan salah!");
        setloadingFormLogin(false);
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 400) {
        setErrorFormLogin("Username/Password yang anda masukan salah!");
      }
      setloadingFormLogin(false);
    }
  };

  useEffect(() => {
    const isAuthenticated = userLoginCookie?.token;

    if (isAuthenticated) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100 position-relative"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1721814055224-d7165bf5238b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          zIndex: 1,
        }}
      ></div>

      <div
        className="card shadow-sm p-4 position-relative"
        style={{
          width: "100%",
          maxWidth: "450px",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          zIndex: 2,
        }}
      >
        <div className="card-body">
          <h5 className="card-title text-center mb-4 h3 fw-bold">Login</h5>
          {errorFormLogin && (
            <div className="alert alert-danger">{errorFormLogin}</div>
          )}
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                NIM/NIP
              </label>
              <input
                type="text"
                name="username"
                className="form-control form-control-lg"
                autoComplete="off"
                id="username"
                placeholder="NIM/NIP.."
                value={formLogin.username}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="form-control form-control-lg"
                autoComplete="off"
                id="password"
                placeholder="Password.."
                value={formLogin.password}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100 py-2 fw-bold"
            >
              {loadingFormLogin ? (
                <div className="spinner-border text-light" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

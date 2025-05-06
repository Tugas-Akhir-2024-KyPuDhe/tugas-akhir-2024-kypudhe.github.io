import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/authService";
import { Toast } from "../../utils/myFunctions";
import { AxiosError } from "axios";
import useCookie from "react-use-cookie";
// import logoTutWuri from "./../../assets/images/logo-tut-wuri-handayani.png";
import { School } from "../../interface/school.interface";
import ConfigSchoolService from "../../services/sekolahConfigService";

interface LoginForm {
  username: string;
  password: string;
}

export const LoginPage: React.FC = () => {
  const authService = AuthService();
  const configSchool = ConfigSchoolService();
  const navigate = useNavigate();
  const [formLogin, setFormLogin] = useState<LoginForm>({
    username: "",
    password: "",
  });
  const [errorFormLogin, setErrorFormLogin] = useState<{
    [key: string]: string;
  }>({});
  const [loadingFormLogin, setloadingFormLogin] = useState(false);
  const [cookieLogin, setCookieLogin] = useCookie("userLoginCookie", "");
  const userLoginCookie = cookieLogin ? JSON.parse(cookieLogin) : null;
  const [dataConfig, setDataConfig] = useState<School>();

  const getDataConfig = async () => {
    try {
      const response = await configSchool.getConfigSchool();
      setDataConfig(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormLogin((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrorFormLogin((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const requiredFields = ["username", "password"];
    const newErrors: { [key: string]: string } = {};

    requiredFields.forEach((field) => {
      if (!formLogin[field as keyof typeof formLogin]) {
        newErrors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required.`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrorFormLogin(newErrors);
      return;
    }
    setloadingFormLogin(true);
    try {
      const response = await authService.loginAuth(formLogin);
      if (response.status === 200) {
        const userData = {
          token: response.token,
          name: response.user.name,
          role: response.user.role,
          photo: response.user.photo,
        };
        setCookieLogin(JSON.stringify(userData), { days: 1 });
        Toast.fire({
          icon: "success",
          title: `Selamat Datang ${response.user.name}`,
          timer: 4000,
        });
        navigate("/dashboard");
      } else {
        Toast.fire({
          icon: "error",
          title: `Username/Password yang anda masukan salah!`,
          timer: 4000,
        });
        setloadingFormLogin(false);
        setFormLogin({
          username: "",
          password: "",
        });
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 400) {
        Toast.fire({
          icon: "error",
          title: `Username/Password yang anda masukan salah!`,
          timer: 4000,
        });
      }
      setloadingFormLogin(false);
      setFormLogin({
        username: "",
        password: "",
      });
    }
  };

  useEffect(() => {
    getDataConfig();
  }, []);

  useEffect(() => {
    const isAuthenticated = userLoginCookie?.token;

    if (isAuthenticated) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-4 vh-100 ">
            <div className="w-100 p-4 px-4">
              <div className="img-logo text-center mb-5">
                {dataConfig?.logo && (
                  <img
                    src={dataConfig?.logo?.url}
                    alt=""
                    className="img-fluid mb-3"
                    width="180"
                  />
                )}
                <h5 className="card-title text-center mb-2 h3 fw-bold">
                  Login
                </h5>
                <p>
                  Silahkan Login Terlebih Dahulu Untuk Mengakses Portal Sekolah
                </p>
              </div>
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label ms-1">
                    NIM/NIP
                  </label>
                  <input
                    type="text"
                    name="username"
                    autoFocus
                    className={`form-control form-control-lg ${
                      errorFormLogin.username ? "is-invalid" : ""
                    }`}
                    autoComplete="off"
                    id="username"
                    value={formLogin.username}
                    onChange={handleChange}
                  />
                  {errorFormLogin.username && (
                    <div className="invalid-form">NIM/NIP masih kosong!</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label ms-1">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    className={`form-control form-control-lg ${
                      errorFormLogin.password ? "is-invalid" : ""
                    }`}
                    autoComplete="off"
                    id="password"
                    value={formLogin.password}
                    onChange={handleChange}
                  />
                  {errorFormLogin.password && (
                    <div className="invalid-form">Password masih kosong!</div>
                  )}
                </div>
                <button
                  type="submit"
                  className="btn btn-primary bg-blue border-0 w-100 py-2 fw-bold"
                  disabled={loadingFormLogin}
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
          <div className="col-lg-8 px-0 d-none d-lg-block d-md-block">
            <img
              src="https://images.unsplash.com/photo-1721814055224-d7165bf5238b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="img-fluid w-100 h-100"
              style={{ filter: "brightness(0.65)" }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

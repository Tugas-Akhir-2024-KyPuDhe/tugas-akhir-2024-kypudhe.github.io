import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/authService";
import useCookie from "react-use-cookie";
import { Toast } from "../utils/myFunctions";

interface PrivateRouteProps {
  Component: React.ComponentType;
  Role: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ Component, Role }) => {
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [cookieLogin, setCookieLogin] = useCookie("userLoginCookie");
  const userLoginCookie = cookieLogin ? JSON.parse(cookieLogin) : null;
  const authService = AuthService();

  useEffect(() => {
    const checkToken = async () => {
      if (userLoginCookie && userLoginCookie.token) {
        try {
          const response = await authService.validateToken(
            userLoginCookie.token
          );
          if (response.valid) {
            if (Role.includes(response.role)) {
              setIsValid(response.valid);
            } else {
              Toast.fire({
                icon: "error",
                title: `Anda Tidak Berhak Akses Kehalaman Tersebut!`,
                timer: 4000,
              });
              setIsValid(false);
            }
          } else {
            setCookieLogin("");
            setIsValid(false);
          }
        } catch (error) {
          setCookieLogin("");
          console.error(error);
          Toast.fire({
            icon: "error",
            title: `Sesi Anda Telah Habis, Silahkan Login Kembali`,
            timer: 4000,
          });
        }
      } else {
        Toast.fire({
          icon: "error",
          title: `Harap Login Terlebih Dahulu!`,
          timer: 4000,
        });
        setIsValid(false);
      }
    };

    checkToken();
  }, [authService, userLoginCookie]);

  if (isValid === null) {
    return <div></div>;
  }

  return isValid ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;

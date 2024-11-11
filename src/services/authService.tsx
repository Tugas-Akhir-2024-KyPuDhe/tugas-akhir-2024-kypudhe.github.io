import axios from "axios";
import {
    LoginData,
    LoginResponse,
    TokenValidationResponse,
    DetailUserResponse,
    UpdateUserResponse,
    UpdatedBiodata,
} from "./../interface/auth.interface";
import { useNavigate } from "react-router-dom";
import useCookie from "react-use-cookie";

const apiUrl = import.meta.env.VITE_API_URL;
const AuthService = () => {
    const navigate = useNavigate();
    const [cookieLogin, setCookieLogin] = useCookie("userLoginCookie", "");
    const userLoginCookie = cookieLogin ? JSON.parse(cookieLogin) : null;
  
    const loginAuth = async (data: LoginData): Promise<LoginResponse> => {
      try {
        const response = await axios.post<LoginResponse>(
          `${apiUrl}/api/auth/login`,
          data
        );
        return response.data;
      } catch (error) {
        console.error("Error during login:", error);
        throw error;
      }
    };
  
    const validateToken = async (
      token: string
    ): Promise<TokenValidationResponse> => {
      try {
        const response = await axios.get<TokenValidationResponse>(
          `${apiUrl}/api/auth/verify-token`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        return response.data;
      } catch (error) {
        console.error("Error validating token:", error);
        throw error;
      }
    };
  
    const getUser = async (): Promise<DetailUserResponse> => {
      try {
        const response = await axios.get<LoginResponse>(
          `${apiUrl}/api/auth/get/user`,
          {
            headers: {
              authorization: `Bearer ${userLoginCookie?.token}`,
            },
          }
        );
        return response.data.user;
      } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
      }
    };

    const updateUser = async (data: UpdatedBiodata): Promise<UpdateUserResponse> => {
      try {
        const response = await axios.put<UpdateUserResponse>(
          `${apiUrl}/api/auth/update/user`, data,
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${userLoginCookie?.token}`,
            },
          }
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
      }
    };
  
    const logout = () => {
      setCookieLogin("");
      navigate("/login");
    };
  
    return {
      loginAuth,
      logout,
      validateToken,
      getUser,  
      updateUser,
    };
  };
  
  export default AuthService;
  

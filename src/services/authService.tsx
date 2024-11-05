import axios from "axios";
import {
  LoginData,
  LoginResponse,
  TokenValidationResponse,
} from "./../interface/auth.interface";
import { useNavigate } from "react-router-dom";
import useCookie from "react-use-cookie";

const apiUrl = import.meta.env.VITE_API_URL;

const AuthService = () => {
  const navigate = useNavigate();
  const [, setCookieLogin] = useCookie("userLoginCookie");

  const loginAuth = async (data: LoginData): Promise<LoginResponse> => {
    try {
      const response = await axios.post<LoginResponse>(
        `${apiUrl}/api/auth/login`,
        data
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Penanganan untuk error Axios
        console.error("Error during login:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Login failed");
      } else {
        // Error yang tidak terduga
        console.error("Unexpected error during login:", error);
        throw new Error("An unexpected error occurred");
      }
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
      if (axios.isAxiosError(error)) {
        console.error("Error validating token:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Token validation failed");
      } else {
        console.error("Unexpected error validating token:", error);
        throw new Error("An unexpected error occurred");
      }
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
  };
};

export default AuthService;

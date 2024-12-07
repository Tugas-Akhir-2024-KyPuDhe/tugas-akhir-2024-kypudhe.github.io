import axios from "axios";
import {
  LoginData,
  LoginResponse,
  TokenValidationResponse,
  DetailUserResponse,
  UpdateUserResponse,
  UpdatedBiodata,
  StudentDetails,
  StaffDetails,
  GetUsersResponse,
  ResponseGetStudentDetail,
  ResponseUpdatePhotoUser,
} from "./../interface/auth.interface";
import useCookie from "react-use-cookie";
import { FormParentOfStudent } from "../interface/student.interface";
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;
const AuthService = () => {
  const navigate = useNavigate();
  const [cookieLogin, setCookieLogin] = useCookie("userLoginCookie", "");
  const userLoginCookie = cookieLogin ? JSON.parse(cookieLogin) : null;

  const handleUnauthorized = (status: number) => {
    if (status === 401) {
      navigate("/login");
    }
  };
  const loginAuth = async (data: LoginData): Promise<LoginResponse> => {
    try {
      const response = await axios.post<LoginResponse>(
        `${apiUrl}/api/auth/login`,
        data
      );
      return response.data;
    } catch (error) {
      console.log("");
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
      console.log("");
      throw error;
    }
  };

  const getUser = async (): Promise<DetailUserResponse> => {
    try {
      const response = await axios.get<LoginResponse>(
        `${apiUrl}/api/user/get/${userLoginCookie?.token}`,
        {
          headers: {
            authorization: `Bearer ${userLoginCookie?.token}`,
          },
        }
      );
      return response.data.user;
    } catch (error) {
      console.log("");
      throw error;
    }
  };

  const getUsers = async <T extends StudentDetails | StaffDetails>(
    tipe: "STUDENT" | "STAFF" | "TEACHER",
    major: string = ""
  ): Promise<GetUsersResponse<T>> => {
    try {
      const response = await axios.get<GetUsersResponse<T>>(
        `${apiUrl}/api/user/get?tipe=${tipe}&majorCode=${major}`,
        {
          headers: {
            authorization: `Bearer ${userLoginCookie?.token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log("");
      throw error;
    }
  };

  const updateUser = async (
    data: UpdatedBiodata
  ): Promise<UpdateUserResponse> => {
    try {
      const response = await axios.put<UpdateUserResponse>(
        `${apiUrl}/api/user/update/${userLoginCookie?.token}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${userLoginCookie?.token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log("");
      throw error;
    }
  };

  const createStundent = async (
    data: FormData
  ): Promise<UpdateUserResponse> => {
    try {
      const response = await axios.post<UpdateUserResponse>(
        `${apiUrl}/api/auth/register/student`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${userLoginCookie?.token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log("");
      throw error;
    }
  };

  const updateStundent = async (
    id: number,
    data: FormData
  ): Promise<UpdateUserResponse> => {
    try {
      const response = await axios.put<UpdateUserResponse>(
        `${apiUrl}/api/auth/update/student/${id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${userLoginCookie?.token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleUnauthorized(error.response?.status || 0);
      }
      throw error;
    }
  };

  const getStudentByNis = async (
    nis: number
  ): Promise<ResponseGetStudentDetail> => {
    try {
      const response = await axios.get<ResponseGetStudentDetail>(
        `${apiUrl}/api/student/get/${nis}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${userLoginCookie?.token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleUnauthorized(error.response?.status || 0);
      }
      throw error;
    }
  };

  const updatePhotoUser = async (
    id: number,
    formData: FormData
  ): Promise<ResponseUpdatePhotoUser> => {
    try {
      const response = await axios.put<ResponseGetStudentDetail>(
        `${apiUrl}/api/user/update/photo/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Bearer ${userLoginCookie?.token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleUnauthorized(error.response?.status || 0);
      }
      throw error;
    }
  };

  const updateDataParent = async (
    nis: number,
    data: FormParentOfStudent
  ): Promise<ResponseUpdatePhotoUser> => {
    try {
      const response = await axios.put<ResponseGetStudentDetail>(
        `${apiUrl}/api/student/updateParent/${nis}`,
        data,
        {
          headers: {
            authorization: `Bearer ${userLoginCookie?.token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleUnauthorized(error.response?.status || 0);
      }
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
    getUsers,
    updateUser,
    createStundent,
    updateStundent,
    getStudentByNis,
    updatePhotoUser,
    updateDataParent,
  };
};

export default AuthService;

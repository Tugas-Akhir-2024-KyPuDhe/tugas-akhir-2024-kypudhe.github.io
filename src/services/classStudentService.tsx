import axios from "axios";
import useCookie from "react-use-cookie";
import {
  FormState,
  GetAllClassResponse,
  GetClassDetailResponse,
  ResponseAction,
} from "../interface/studentClass.interface";
import { useNavigate } from "react-router-dom";
import { PayloadInsertStundets } from "../interface/student.interface";

const apiUrl = import.meta.env.VITE_API_URL;
const ClassStudentService = () => {
  const navigate = useNavigate();
  const [cookieLogin] = useCookie("userLoginCookie", "");
  const userLoginCookie = cookieLogin ? JSON.parse(cookieLogin) : null;
  const handleUnauthorized = (status: number) => {
    if (status === 401) {
      navigate("/login");
    }
  };

  const getAllClass = async (): Promise<GetAllClassResponse> => {
    try {
      const response = await axios.get<GetAllClassResponse>(
        `${apiUrl}/api/class/get`,
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

  const getClassById = async (id: number): Promise<GetClassDetailResponse> => {
    try {
      const response = await axios.get<GetClassDetailResponse>(
        `${apiUrl}/api/class/get/${id}`,
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

  const createClass = async (data: FormState): Promise<ResponseAction> => {
    try {
      const response = await axios.post<ResponseAction>(
        `${apiUrl}/api/class/store`,
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

  const updateClass = async (
    id: number,
    data: FormState
  ): Promise<ResponseAction> => {
    try {
      const response = await axios.put<ResponseAction>(
        `${apiUrl}/api/class/update/${id}`,
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

  const insertStudentInClass = async (
    data: PayloadInsertStundets
  ): Promise<ResponseAction> => {
    try {
      const response = await axios.put<ResponseAction>(
        `${apiUrl}/api/class/insert-stundent-inclass/`,
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

  return {
    createClass,
    updateClass,
    getAllClass,
    getClassById,
    insertStudentInClass,
  };
};

export default ClassStudentService;

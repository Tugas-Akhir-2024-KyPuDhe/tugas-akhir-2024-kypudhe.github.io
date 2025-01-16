import axios from "axios";
import useCookie from "react-use-cookie";
import { useNavigate } from "react-router-dom";
import {
  FormStudentPosition,
  ResponseActionSP,
} from "../interface/studentPosition.interface";

const apiUrl = import.meta.env.VITE_API_URL;
const StudentPositionService = () => {
  const navigate = useNavigate();
  const [cookieLogin] = useCookie("userLoginCookie", "");
  const userLoginCookie = cookieLogin ? JSON.parse(cookieLogin) : null;
  const handleUnauthorized = (status: number) => {
    if (status === 401) {
      navigate("/login");
    }
  };

  const createPosition = async (
    data: FormStudentPosition
  ): Promise<ResponseActionSP> => {
    try {
      const response = await axios.post<ResponseActionSP>(
        `${apiUrl}/api/student-position-inclass/store`,
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

  const getAllPositionByClass = async (
    id: number
  ): Promise<ResponseActionSP> => {
    try {
      const response = await axios.get<ResponseActionSP>(
        `${apiUrl}/api/student-position-inclass/get-byClassId/${id}`,
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

  const deletePosition = async (id: number): Promise<ResponseActionSP> => {
    try {
      const response = await axios.delete<ResponseActionSP>(
        `${apiUrl}/api/student-position-inclass/delete/${id}`,
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
    createPosition,
    getAllPositionByClass,
    deletePosition,
  };
};

export default StudentPositionService;

import axios from "axios";
import useCookie from "react-use-cookie";
import {
  FormState,
  GetAllClassResponse,
  GetClassDetailResponse,
  ResponseAction,
} from "../interface/studentClass.interface";

const apiUrl = import.meta.env.VITE_API_URL;
const ClassStudentService = () => {
  const [cookieLogin] = useCookie("userLoginCookie", "");
  const userLoginCookie = cookieLogin ? JSON.parse(cookieLogin) : null;

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
        console.error(
          "Error fetching banners:",
          error.response?.data || error.message
        );
        throw new Error(
          error.response?.data?.message || "Failed to fetch banners"
        );
      }
      throw new Error("An unexpected error occurred");
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
        console.error(
          "Error fetching banners:",
          error.response?.data || error.message
        );
        throw new Error(
          error.response?.data?.message || "Failed to fetch banners"
        );
      }
      throw new Error("An unexpected error occurred");
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
      console.error("Error fetching user data:", error);
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
      console.error("Error fetching user data:", error);
      throw error;
    }
  };

  return {
    createClass,
    updateClass,
    getAllClass,
    getClassById,
  };
};

export default ClassStudentService;

import axios from "axios";
import {
  StaffDetailResponse,
  UpdateUserResponse,
} from "./../interface/auth.interface";
import useCookie from "react-use-cookie";
import {
  GetClassOfTeacher,
  ResponseGetStaff,
  ResponseGetStaffDetail,
} from "../interface/staff.interface";
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;
const StaffService = () => {
  const navigate = useNavigate();
  const [cookieLogin] = useCookie("userLoginCookie", "");
  const userLoginCookie = cookieLogin ? JSON.parse(cookieLogin) : null;

  const handleUnauthorized = (status: number) => {
    if (status === 401) {
      navigate("/login");
    }
  };

  const getStaff = async (
    tipe: "STAFF" | "TEACHER" | ""
  ): Promise<ResponseGetStaff> => {
    try {
      const response = await axios.get<ResponseGetStaff>(
        `${apiUrl}/api/staff/get?tipe=${tipe}`,
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

  const updateUserStaff = async (
    id: number,
    data: FormData
  ): Promise<UpdateUserResponse> => {
    try {
      const response = await axios.put<UpdateUserResponse>(
        `${apiUrl}/api/staff/update/${id}`,
        data,
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

  const detailUserStaff = async (
    username: string
  ): Promise<StaffDetailResponse> => {
    try {
      const response = await axios.get<StaffDetailResponse>(
        `${apiUrl}/api/user/get/detail/${username}`,
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

  const getStaffByNip = async (
    nip: string
  ): Promise<ResponseGetStaffDetail> => {
    try {
      const response = await axios.get<ResponseGetStaffDetail>(
        `${apiUrl}/api/staff/get/${nip}`,
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

  const getClassOfTeacher = async (
    nip: string
  ): Promise<GetClassOfTeacher> => {
    try {
      const response = await axios.get<GetClassOfTeacher>(
        `${apiUrl}/api/staff/get/class/${nip}`,
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

  const createStaff = async (data: FormData): Promise<UpdateUserResponse> => {
    try {
      const response = await axios.post<UpdateUserResponse>(
        `${apiUrl}/api/auth/register/staff`,
        data,
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

  return {
    getStaff,
    updateUserStaff,
    detailUserStaff,
    getStaffByNip,
    createStaff,
    getClassOfTeacher,
  };
};

export default StaffService;

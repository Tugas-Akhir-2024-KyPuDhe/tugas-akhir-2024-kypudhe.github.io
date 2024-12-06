import axios from "axios";
import {
  StaffDetailResponse,
  UpdateUserResponse,
} from "./../interface/auth.interface";
import useCookie from "react-use-cookie";
import {
  ResponseGetStaff,
  ResponseGetStaffDetail,
} from "../interface/staff.interface";

const apiUrl = import.meta.env.VITE_API_URL;
const StaffService = () => {
  const [cookieLogin] = useCookie("userLoginCookie", "");
  const userLoginCookie = cookieLogin ? JSON.parse(cookieLogin) : null;

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
      console.error("Error fetching user data:", error);
      throw error;
    }
  };

  const updateUser = async (
    id: number,
    data: FormData
  ): Promise<UpdateUserResponse> => {
    try {
      const response = await axios.put<UpdateUserResponse>(
        `${apiUrl}/api/staff/update/${id}`,
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
      console.error("Error fetching user data:", error);
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
      console.error("Error fetching user data:", error);
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
      console.error("Error fetching user data:", error);
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

  return {
    getStaff,
    updateUser,
    detailUserStaff,
    getStaffByNip,
    createStaff,
  };
};

export default StaffService;

import axios from "axios";
import useCookie from "react-use-cookie";
import { useNavigate } from "react-router-dom";
import {
  IGetAttendance,
  IGetSummaryAttendance,
  IPayloadAttendance,
  IUpdateAttendance,
} from "../interface/studentAttendance.interface";

const apiUrl = import.meta.env.VITE_API_URL;
const StudentAttendanceService = () => {
  const navigate = useNavigate();
  const [cookieLogin] = useCookie("userLoginCookie", "");
  const userLoginCookie = cookieLogin ? JSON.parse(cookieLogin) : null;
  const handleUnauthorized = (status: number) => {
    if (status === 401) {
      navigate("/login");
    }
  };

  const getAttendanceInClass = async (
    classId: number,
    dateAtt: string
  ): Promise<IGetAttendance> => {
    try {
      const response = await axios.get<IGetAttendance>(
        `${apiUrl}/api/student-attendance/get?classId=${classId}&date=${dateAtt}`,
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

  const getAttendanceSummaryInClass = async (
    classId: number,
  ): Promise<IGetSummaryAttendance> => {
    try {
      const response = await axios.get<IGetSummaryAttendance>(
        `${apiUrl}/api/student-attendance/get/summary/${classId}`,
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

  const createAttendanceInClass = async (
    data: IPayloadAttendance
  ): Promise<IGetAttendance> => {
    try {
      const response = await axios.post<IGetAttendance>(
        `${apiUrl}/api/student-attendance/store`,
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

  const updateStudentAttendanceInClass = async (
    id: number,
    data: IUpdateAttendance
  ): Promise<IGetAttendance> => {
    try {
      const response = await axios.put<IGetAttendance>(
        `${apiUrl}/api/student-attendance/update/${id}`,
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

  const updateFinalAttendanceInClass = async (
    id: number
  ): Promise<IGetAttendance> => {
    try {
      const response = await axios.put<IGetAttendance>(
        `${apiUrl}/api/student-attendance/update/final/${id}`,
        {},
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
    getAttendanceInClass,
    createAttendanceInClass,
    updateStudentAttendanceInClass,
    updateFinalAttendanceInClass,
    getAttendanceSummaryInClass,
  };
};

export default StudentAttendanceService;

import axios from "axios";
import useCookie from "react-use-cookie";
import { useNavigate } from "react-router-dom";
import {
  IGetAttendance,
  IGetStudentDetailAttendance,
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

  const getAttendanceInClassWeekly = async (
    classId: number,
    date_start: string,
    date_end: string
  ): Promise<IGetSummaryAttendance> => {
    try {
      const response = await axios.get<IGetSummaryAttendance>(
        `${apiUrl}/api/student-attendance/weekly?classId=${classId}&date_start=${date_start}&date_end=${date_end}`,
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

  const getStudentDetailAttendance = async (
    nis: string,
    clasId: number
  ): Promise<IGetStudentDetailAttendance> => {
    try {
      const response = await axios.get<IGetStudentDetailAttendance>(
        `${apiUrl}/api/student-attendance/get/student?nis=${nis}&classId=${clasId}`,
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
    getAttendanceInClassWeekly,
    createAttendanceInClass,
    updateStudentAttendanceInClass,
    updateFinalAttendanceInClass,
    getAttendanceSummaryInClass,
    getStudentDetailAttendance,
  };
};

export default StudentAttendanceService;

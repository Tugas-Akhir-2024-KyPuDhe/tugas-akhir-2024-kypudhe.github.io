import axios from "axios";
import useCookie from "react-use-cookie";
import { useNavigate } from "react-router-dom";
import {
  ParentOfStudent,
  ResponseGetStudent,
  StudentDetail,
} from "../interface/student.interface";

const apiUrl = import.meta.env.VITE_API_URL;
const StudentService = () => {
  const navigate = useNavigate();
  const [cookieLogin] = useCookie("userLoginCookie", "");
  const userLoginCookie = cookieLogin ? JSON.parse(cookieLogin) : null;

  const handleUnauthorized = (status: number) => {
    if (status === 401) {
      navigate("/login");
    }
  };

  const getNewStudent = async (
    major: string = ""
  ): Promise<ResponseGetStudent<StudentDetail[]>> => {
    try {
      const response = await axios.get<ResponseGetStudent<StudentDetail[]>>(
        `${apiUrl}/api/student/newStudent?majorCode=${major}`,
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

  const getStudentByNis = async (
    nis: string
  ): Promise<ResponseGetStudent<StudentDetail>> => {
    try {
      const response = await axios.get<ResponseGetStudent<StudentDetail>>(
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

  const getAllStudent = async (
    major_code: string = "",
    grade: string = "",
    status: string = "All"
  ): Promise<ResponseGetStudent<StudentDetail[]>> => {
    try {
      const response = await axios.get<ResponseGetStudent<StudentDetail[]>>(
        `${apiUrl}/api/student/get?status=${status}&major_code=${major_code}&grade=${grade}`,
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

  const getParentStudent = async (
    nis: string
  ): Promise<ResponseGetStudent<ParentOfStudent>> => {
    try {
      const response = await axios.get<ResponseGetStudent<ParentOfStudent>>(
        `${apiUrl}/api/student/parent/get?nis=${nis}`,
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
    getNewStudent,
    getAllStudent,
    getStudentByNis,
    getParentStudent,
  };
};

export default StudentService;

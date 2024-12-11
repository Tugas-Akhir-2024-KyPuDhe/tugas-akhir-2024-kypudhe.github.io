import axios from "axios";
import useCookie from "react-use-cookie";
import { ResponseGetStudentDetail } from "../interface/student.interface";
import { useNavigate } from "react-router-dom";
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
  ): Promise<ResponseGetStudentDetail> => {
    try {
      const response = await axios.get<ResponseGetStudentDetail>(
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

  const getAllStudent = async (
    status: string = "",
    major_code: string = "",
    grade: string = ""
  ): Promise<ResponseGetStudentDetail> => {
    try {
      const response = await axios.get<ResponseGetStudentDetail>(
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

  return {
    getNewStudent,
    getAllStudent,
  };
};

export default StudentService;

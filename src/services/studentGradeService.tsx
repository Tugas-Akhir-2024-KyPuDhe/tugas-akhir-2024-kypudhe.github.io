import axios from "axios";
import useCookie from "react-use-cookie";
import { useNavigate } from "react-router-dom";
import {
  FormStateStudentGrade,
  ResponseActionStudentGrade,
} from "../interface/studentGrade.interface";

const apiUrl = import.meta.env.VITE_API_URL;
const StudentGradeService = () => {
  const navigate = useNavigate();
  const [cookieLogin] = useCookie("userLoginCookie", "");
  const userLoginCookie = cookieLogin ? JSON.parse(cookieLogin) : null;

  const handleUnauthorized = (status: number) => {
    if (status === 401) {
      navigate("/login");
    }
  };

  const insertGrade = async (
    data: FormStateStudentGrade
  ): Promise<ResponseActionStudentGrade> => {
    try {
      const response = await axios.post<ResponseActionStudentGrade>(
        `${apiUrl}/api/student-grade/store`,
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
    insertGrade,
  };
};

export default StudentGradeService;

import axios from "axios";
import useCookie from "react-use-cookie";
import { useNavigate } from "react-router-dom";
import { ResponseGetStudenHistory } from "../interface/studentHistory.interface";

const apiUrl = import.meta.env.VITE_API_URL;
const StudentHistoryService = () => {
  const navigate = useNavigate();
  const [cookieLogin] = useCookie("userLoginCookie", "");
  const userLoginCookie = cookieLogin ? JSON.parse(cookieLogin) : null;

  const handleUnauthorized = (status: number) => {
    if (status === 401) {
      navigate("/login");
    }
  };

  const getStudentHistory = async (
    id: string
  ): Promise<ResponseGetStudenHistory> => {
    try {
      const response = await axios.get<ResponseGetStudenHistory>(
        `${apiUrl}/api/student-history/get?id=${id}`,
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
    getStudentHistory,
  };
};

export default StudentHistoryService;

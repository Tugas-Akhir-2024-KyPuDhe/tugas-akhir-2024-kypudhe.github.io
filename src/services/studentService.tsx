import axios from "axios";
import useCookie from "react-use-cookie";
import { ResponseGetStudentDetail } from "../interface/student.interface";

const apiUrl = import.meta.env.VITE_API_URL;
const StudentService = () => {
  const [cookieLogin] = useCookie("userLoginCookie", "");
  const userLoginCookie = cookieLogin ? JSON.parse(cookieLogin) : null;

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
      console.error("Error fetching user data:", error);
      throw error;
    }
  };

  return {
    getNewStudent,
  };
};

export default StudentService;

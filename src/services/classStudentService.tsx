import axios from "axios";
import useCookie from "react-use-cookie";
import { ResponseAction } from "../interface/studentClass.interface";

const apiUrl = import.meta.env.VITE_API_URL;
const ClassStudentService = () => {
  const [cookieLogin] = useCookie("userLoginCookie", "");
  const userLoginCookie = cookieLogin ? JSON.parse(cookieLogin) : null;

  const createClassInvStudent = async (
    capacity: number,
    majorCode: string
  ): Promise<ResponseAction> => {
    try {
      const response = await axios.post<ResponseAction>(
        `${apiUrl}/api/class/createClassInvStudent`,
        { capacity, majorCode },
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
    createClassInvStudent,
  };
};

export default ClassStudentService;

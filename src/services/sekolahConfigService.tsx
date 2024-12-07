import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import useCookie from "react-use-cookie";
import {
  GetConfigSchool,
  ResponseUpdateSchool,
} from "../interface/school.interface";

interface ConfigSchoolService {
  getConfigSchool: () => Promise<GetConfigSchool>;
  updateLogoConfig: (
    id: number,
    formData: FormData
  ) => Promise<ResponseUpdateSchool>;
  updateDataConfigSchool: (
    id: number,
    formData: FormData
  ) => Promise<ResponseUpdateSchool>;
}

const ConfigSchoolService = (): ConfigSchoolService => {
  const navigate = useNavigate();
  const [cookieLogin] = useCookie("userLoginCookie");
  const userLoginCookie = cookieLogin ? JSON.parse(cookieLogin) : null;

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleUnauthorized = (status: number) => {
    if (status === 401) {
      navigate("/login");
    }
  };

  const getConfigSchool = async (): Promise<GetConfigSchool> => {
    try {
      const response: AxiosResponse<GetConfigSchool> = await axios.get(
        `${apiUrl}/api/config-school/get`,
        {
          headers: {
            Authorization: `Bearer ${userLoginCookie.token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log("");
      throw error;
    }
  };

  const updateLogoConfig = async (
    id: number,
    formData: FormData
  ): Promise<ResponseUpdateSchool> => {
    try {
      const response = await axios.put<ResponseUpdateSchool>(
        `${apiUrl}/api/config-school/update/logo/${id}`,
        formData,
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

  const updateDataConfigSchool = async (
    id: number,
    formData: FormData
  ): Promise<ResponseUpdateSchool> => {
    try {
      const response = await axios.put<ResponseUpdateSchool>(
        `${apiUrl}/api/config-school/update/${id}`,
        formData,
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
    getConfigSchool,
    updateLogoConfig,
    updateDataConfigSchool,
  };
};

export default ConfigSchoolService;

import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import useCookie from "react-use-cookie";
import { GetConfigSchool, ResponseUpdateSchool } from "../interface/school.interface";

interface ConfigSchoolService {
  getConfigSchool: () => Promise<GetConfigSchool>;
  updateLogoConfig: (id: number, formData: FormData) => Promise<ResponseUpdateSchool>;
  updateDataConfigSchool: (id: number, formData: FormData) => Promise<ResponseUpdateSchool>;
}

const ConfigSchoolService = (): ConfigSchoolService => {
  const navigate = useNavigate();
  const [cookieLogin, ] = useCookie("userLoginCookie");
  const userLoginCookie = cookieLogin ? JSON.parse(cookieLogin) : null;

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleUnauthorized = (status: number) => {
    if (status === 401) {
      navigate("/dashboard/login");
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
      if (axios.isAxiosError(error)) {
        console.error("Error fetching config school details:", error.response?.data || error.message);
        handleUnauthorized(error.response?.status || 0);
        throw new Error(error.response?.data?.message || "Failed to fetch config school details");
      }
      throw new Error("An unexpected error occurred");
    }
  };

  const updateLogoConfig = async (id: number, formData: FormData): Promise<ResponseUpdateSchool> => {
    try {
      const response = await axios.put<ResponseUpdateSchool>(
        `${apiUrl}/api/config-school/update/logo/${id}`, formData,
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
        console.error("Error updating logo config:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Failed to update logo config");
      }
      throw new Error("An unexpected error occurred");
    }
  };

  const updateDataConfigSchool = async (id: number, formData: FormData): Promise<ResponseUpdateSchool> => {
    try {
      const response = await axios.put<ResponseUpdateSchool>(
        `${apiUrl}/api/config-school/update/${id}`, formData,
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
        console.error("Error updating logo config:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Failed to update logo config");
      }
      throw new Error("An unexpected error occurred");
    }
  };

  return {
    getConfigSchool,
    updateLogoConfig,
    updateDataConfigSchool
  };
};

export default ConfigSchoolService;

import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import useCookie from "react-use-cookie";
import {
  IpayloadSchoolYear,
  IResponse,
  ISchoolYear,
} from "../interface/schoolYear.interface";

interface SchoolYearService {
  getAllSchoolYears: () => Promise<IResponse<ISchoolYear[]>>;
  getSchoolYearById: (id: number) => Promise<IResponse<ISchoolYear>>;
  addSchoolYear: (data: IpayloadSchoolYear) => Promise<IResponse>;
  updateSchoolYear: (
    id: number,
    data: IpayloadSchoolYear
  ) => Promise<IResponse>;
  deleteSchoolYear: (id: number) => Promise<IResponse>;
}

const SchoolYearService = (): SchoolYearService => {
  const navigate = useNavigate();
  const [cookieLogin] = useCookie("userLoginCookie");
  const userLoginCookie = cookieLogin ? JSON.parse(cookieLogin) : null;
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleUnauthorized = (status: number) => {
    if (status === 401) {
      navigate("/login");
    }
  };

  const getAllSchoolYears = async (): Promise<IResponse<ISchoolYear[]>> => {
    try {
      const response: AxiosResponse<IResponse<ISchoolYear[]>> = await axios.get(
        `${apiUrl}/api/school-year/get`,
        {
          headers: {
            Authorization: `Bearer ${userLoginCookie.token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getSchoolYearById = async (
    id: number
  ): Promise<IResponse<ISchoolYear>> => {
    try {
      const response: AxiosResponse<IResponse<ISchoolYear>> = await axios.get(
        `${apiUrl}/api/school-year/get/${id}`,
        {
          headers: {
            Authorization: `Bearer ${userLoginCookie.token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const addSchoolYear = async (
    data: IpayloadSchoolYear
  ): Promise<IResponse> => {
    try {
      const response: AxiosResponse<IResponse> = await axios.post(
        `${apiUrl}/api/school-year/store`,
        data,
        {
          headers: {
            Authorization: `Bearer ${userLoginCookie.token}`,
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

  const updateSchoolYear = async (
    id: number,
    data: IpayloadSchoolYear
  ): Promise<IResponse> => {
    try {
      const response: AxiosResponse<IResponse> = await axios.put(
        `${apiUrl}/api/school-year/update/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${userLoginCookie.token}`,
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

  const deleteSchoolYear = async (id: number): Promise<IResponse> => {
    try {
      const response: AxiosResponse<IResponse> = await axios.delete(
        `${apiUrl}/api/school-year/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${userLoginCookie.token}`,
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
    getAllSchoolYears,
    getSchoolYearById,
    addSchoolYear,
    updateSchoolYear,
    deleteSchoolYear,
  };
};

export default SchoolYearService;

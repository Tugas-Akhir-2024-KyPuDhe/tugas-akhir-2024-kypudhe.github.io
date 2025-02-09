import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import useCookie from "react-use-cookie";
import {
  IpayloadAcademicYear,
  IResponse,
  IAcademicYear,
} from "../interface/academicYear.interface";

interface AcademicYearService {
  getAllAcademicYears: () => Promise<IResponse<IAcademicYear[]>>;
  getAcademicYearById: (id: number) => Promise<IResponse<IAcademicYear>>;
  addAcademicYear: (data: IpayloadAcademicYear) => Promise<IResponse>;
  updateAcademicYear: (
    id: number,
    data: IpayloadAcademicYear
  ) => Promise<IResponse>;
  deleteAcademicYear: (id: number) => Promise<IResponse>;
}

const AcademicYearService = (): AcademicYearService => {
  const navigate = useNavigate();
  const [cookieLogin] = useCookie("userLoginCookie");
  const userLoginCookie = cookieLogin ? JSON.parse(cookieLogin) : null;
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleUnauthorized = (status: number) => {
    if (status === 401) {
      navigate("/login");
    }
  };

  const getAllAcademicYears = async (): Promise<IResponse<IAcademicYear[]>> => {
    try {
      const response: AxiosResponse<IResponse<IAcademicYear[]>> = await axios.get(
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

  const getAcademicYearById = async (
    id: number
  ): Promise<IResponse<IAcademicYear>> => {
    try {
      const response: AxiosResponse<IResponse<IAcademicYear>> = await axios.get(
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

  const addAcademicYear = async (
    data: IpayloadAcademicYear
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

  const updateAcademicYear = async (
    id: number,
    data: IpayloadAcademicYear
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

  const deleteAcademicYear = async (id: number): Promise<IResponse> => {
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
    getAllAcademicYears,
    getAcademicYearById,
    addAcademicYear,
    updateAcademicYear,
    deleteAcademicYear,
  };
};

export default AcademicYearService;

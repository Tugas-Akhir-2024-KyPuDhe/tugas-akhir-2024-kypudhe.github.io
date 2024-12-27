import axios, { AxiosResponse } from "axios";
import {
  GetAllGaleriResponse,
  GetDetailGaleriResponse,
  ResponseActionGaleri,
} from "../interface/galeri.interface";
import { useNavigate } from "react-router-dom";
import useCookie from "react-use-cookie";

interface GaleriService {
  getAllGaleri: (status?: string) => Promise<GetAllGaleriResponse>;
  getGaleriById: (id: number) => Promise<GetDetailGaleriResponse>;
  addGaleri: (formData: FormData) => Promise<ResponseActionGaleri>;
  updateGaleri: (
    id: number,
    formData: FormData
  ) => Promise<ResponseActionGaleri>;
  deleteGaleri: (id: number) => Promise<ResponseActionGaleri>;
}

const GaleriService = (): GaleriService => {
  const navigate = useNavigate();
  const [cookieLogin] = useCookie("userLoginCookie");
  const userLoginCookie = cookieLogin ? JSON.parse(cookieLogin) : null;

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleUnauthorized = (status: number) => {
    if (status === 401) {
      navigate("/login");
    }
  };

  const getAllGaleri = async (status: string = "Active"): Promise<GetAllGaleriResponse> => {
    try {
      const response: AxiosResponse<GetAllGaleriResponse> = await axios.get(
        `${apiUrl}/api/galeri/get?status=${status}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getGaleriById = async (
    id: number
  ): Promise<GetDetailGaleriResponse> => {
    try {
      const response: AxiosResponse<GetDetailGaleriResponse> = await axios.get(
        `${apiUrl}/api/galeri/get/${id}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const addGaleri = async (
    formData: FormData
  ): Promise<ResponseActionGaleri> => {
    try {
      const response: AxiosResponse<ResponseActionGaleri> = await axios.post(
        `${apiUrl}/api/galeri/store`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
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

  const updateGaleri = async (
    id: number,
    formData: FormData
  ): Promise<ResponseActionGaleri> => {
    try {
      const response: AxiosResponse<ResponseActionGaleri> = await axios.put(
        `${apiUrl}/api/galeri/update/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
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

  const deleteGaleri = async (id: number): Promise<ResponseActionGaleri> => {
    try {
      const response: AxiosResponse<ResponseActionGaleri> = await axios.delete(
        `${apiUrl}/api/galeri/delete/${id}`,
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
    getAllGaleri,
    getGaleriById,
    addGaleri,
    updateGaleri,
    deleteGaleri,
  };
};

export default GaleriService;

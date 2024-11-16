import axios, { AxiosResponse } from "axios";
import {
  GetAllGaleriResponse,
  GetDetailGaleriResponse,
  ResponseActionGaleri,
} from "../interface/galeri.interface";
import { useNavigate } from "react-router-dom";
import useCookie from "react-use-cookie";

interface GaleriService {
  getAllGaleri: () => Promise<GetAllGaleriResponse>;
  getGaleriById: (id: number) => Promise<GetDetailGaleriResponse>;
  addGaleri: (formData: FormData) => Promise<ResponseActionGaleri>;
  updateGaleri: (id: number, formData: FormData) => Promise<ResponseActionGaleri>;
  deleteGaleri: (id: number) => Promise<ResponseActionGaleri>;
}

const GaleriService = (): GaleriService => {
  const navigate = useNavigate();
  const [cookieLogin, ] = useCookie("userLoginCookie");
  const userLoginCookie = cookieLogin ? JSON.parse(cookieLogin) : null;

  const apiUrl = import.meta.env.VITE_API_URL;
  
  const handleUnauthorized = (status: number) => {
    if (status === 401) {
      navigate("/dashboard/login");
    }
  };

  const getAllGaleri = async (): Promise<GetAllGaleriResponse> => {
    try {
      const response: AxiosResponse<GetAllGaleriResponse> = await axios.get(
        `${apiUrl}/api/galeri/get`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error fetching galeries:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Failed to fetch galeries");
      }
      throw new Error("An unexpected error occurred");
    }
  };

  const getGaleriById = async (id: number): Promise<GetDetailGaleriResponse> => {
    try {
      const response: AxiosResponse<GetDetailGaleriResponse> = await axios.get(
        `${apiUrl}/api/galeri/get/${id}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error fetching galeri details:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Failed to fetch galeri details");
      }
      throw new Error("An unexpected error occurred");
    }
  };

  const addGaleri = async (formData: FormData): Promise<ResponseActionGaleri> => {
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
      handleUnauthorized(response.status);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error adding galeri:", error.response?.data || error.message);
        handleUnauthorized(error.response?.status || 0);
        throw new Error(error.response?.data?.message || "Failed to add galeri");
      }
      throw new Error("An unexpected error occurred");
    }
  };

  const updateGaleri = async (id: number, formData: FormData): Promise<ResponseActionGaleri> => {
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
      handleUnauthorized(response.status);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error updating galeri:", error.response?.data || error.message);
        handleUnauthorized(error.response?.status || 0);
        throw new Error(error.response?.data?.message || "Failed to update galeri");
      }
      throw new Error("An unexpected error occurred");
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
      handleUnauthorized(response.status);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error deleting galeri:", error.response?.data || error.message);
        handleUnauthorized(error.response?.status || 0);
        throw new Error(error.response?.data?.message || "Failed to delete galeri");
      }
      throw new Error("An unexpected error occurred");
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

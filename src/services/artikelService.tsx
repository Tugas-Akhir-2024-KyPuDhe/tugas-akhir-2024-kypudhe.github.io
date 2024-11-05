import axios, { AxiosResponse } from "axios";
import {
  GetAllArtikelResponse,
  GetDetailArtikelResponse,
  ResponseActionArtikel,
} from "../interface/artikel.interface";
import { useNavigate } from "react-router-dom";

interface ArtikelService {
  getAllArtikels: (page: number, perPage: number, keyword?: string) => Promise<GetAllArtikelResponse>;
  getArtikelById: (id: number) => Promise<GetDetailArtikelResponse>;
  addArtikel: (formData: FormData) => Promise<ResponseActionArtikel>;
  updateArtikel: (id: number, formData: FormData) => Promise<ResponseActionArtikel>;
  deleteArtikel: (id: number) => Promise<ResponseActionArtikel>;
}

const ArtikelService = (): ArtikelService => {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  
  const handleUnauthorized = (status: number) => {
    if (status === 401) {
      navigate("/dashboard/login");
    }
  };

  const getAllArtikels = async (page: number, perPage: number, keyword = ""): Promise<GetAllArtikelResponse> => {
    try {
      const response: AxiosResponse<GetAllArtikelResponse> = await axios.get(
        `${apiUrl}/api/artikel/get?page=${page}&per_page=${perPage}&keyword=${keyword}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error fetching artikels:", error.response?.data || error.message);
        handleUnauthorized(error.response?.status || 0);
        throw new Error(error.response?.data?.message || "Failed to fetch artikels");
      }
      throw new Error("An unexpected error occurred");
    }
  };

  const getArtikelById = async (id: number): Promise<GetDetailArtikelResponse> => {
    try {
      const response: AxiosResponse<GetDetailArtikelResponse> = await axios.get(
        `${apiUrl}/api/artikel/get/${id}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error fetching artikel details:", error.response?.data || error.message);
        handleUnauthorized(error.response?.status || 0);
        throw new Error(error.response?.data?.message || "Failed to fetch artikel details");
      }
      throw new Error("An unexpected error occurred");
    }
  };

  const addArtikel = async (formData: FormData): Promise<ResponseActionArtikel> => {
    try {
      const response: AxiosResponse<ResponseActionArtikel> = await axios.post(
        `${apiUrl}/api/artikel/store`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      handleUnauthorized(response.status);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error adding artikel:", error.response?.data || error.message);
        handleUnauthorized(error.response?.status || 0);
        throw new Error(error.response?.data?.message || "Failed to add artikel");
      }
      throw new Error("An unexpected error occurred");
    }
  };

  const updateArtikel = async (id: number, formData: FormData): Promise<ResponseActionArtikel> => {
    try {
      const response: AxiosResponse<ResponseActionArtikel> = await axios.put(
        `${apiUrl}/api/artikel/update/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      handleUnauthorized(response.status);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error updating artikel:", error.response?.data || error.message);
        handleUnauthorized(error.response?.status || 0);
        throw new Error(error.response?.data?.message || "Failed to update artikel");
      }
      throw new Error("An unexpected error occurred");
    }
  };

  const deleteArtikel = async (id: number): Promise<ResponseActionArtikel> => {
    try {
      const response: AxiosResponse<ResponseActionArtikel> = await axios.delete(
        `${apiUrl}/api/artikel/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      handleUnauthorized(response.status);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error deleting artikel:", error.response?.data || error.message);
        handleUnauthorized(error.response?.status || 0);
        throw new Error(error.response?.data?.message || "Failed to delete artikel");
      }
      throw new Error("An unexpected error occurred");
    }
  };

  return {
    getAllArtikels,
    getArtikelById,
    addArtikel,
    updateArtikel,
    deleteArtikel,
  };
};

export default ArtikelService;

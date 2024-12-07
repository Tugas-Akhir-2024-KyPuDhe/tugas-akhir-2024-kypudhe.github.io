import axios, { AxiosResponse } from "axios";
import {
  GetAllArtikelResponse,
  GetDetailArtikelResponse,
  ResponseActionArtikel,
} from "../interface/artikel.interface";
import { useNavigate } from "react-router-dom";
import useCookie from "react-use-cookie";

interface ArtikelService {
  getAllArtikels: (
    page: number,
    perPage: number,
    keyword?: string
  ) => Promise<GetAllArtikelResponse>;
  getArtikelById: (id: string) => Promise<GetDetailArtikelResponse>;
  addArtikel: (formData: FormData) => Promise<ResponseActionArtikel>;
  updateArtikel: (
    id: number,
    formData: FormData
  ) => Promise<ResponseActionArtikel>;
  deleteArtikel: (id: number) => Promise<ResponseActionArtikel>;
}

const ArtikelService = (): ArtikelService => {
  const navigate = useNavigate();
  const [cookieLogin] = useCookie("userLoginCookie");
  const userLoginCookie = cookieLogin ? JSON.parse(cookieLogin) : null;

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleUnauthorized = (status: number) => {
    if (status === 401) {
      navigate("/login");
    }
  };

  const getAllArtikels = async (
    page: number,
    perPage: number,
    keyword = ""
  ): Promise<GetAllArtikelResponse> => {
    try {
      const response: AxiosResponse<GetAllArtikelResponse> = await axios.get(
        `${apiUrl}/api/artikel/get?page=${page}&per_page=${perPage}&keyword=${keyword}`
      );
      return response.data;
    } catch (error) {
      console.log("");
      throw error;
    }
  };

  const getArtikelById = async (
    id: string
  ): Promise<GetDetailArtikelResponse> => {
    try {
      const response: AxiosResponse<GetDetailArtikelResponse> = await axios.get(
        `${apiUrl}/api/artikel/get/${id}`
      );
      return response.data;
    } catch (error) {
      console.log("");
      throw error;
    }
  };

  const addArtikel = async (
    formData: FormData
  ): Promise<ResponseActionArtikel> => {
    try {
      const response: AxiosResponse<ResponseActionArtikel> = await axios.post(
        `${apiUrl}/api/artikel/store`,
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

  const updateArtikel = async (
    id: number,
    formData: FormData
  ): Promise<ResponseActionArtikel> => {
    try {
      const response: AxiosResponse<ResponseActionArtikel> = await axios.put(
        `${apiUrl}/api/artikel/update/${id}`,
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

  const deleteArtikel = async (id: number): Promise<ResponseActionArtikel> => {
    try {
      const response: AxiosResponse<ResponseActionArtikel> = await axios.delete(
        `${apiUrl}/api/artikel/delete/${id}`,
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
    getAllArtikels,
    getArtikelById,
    addArtikel,
    updateArtikel,
    deleteArtikel,
  };
};

export default ArtikelService;

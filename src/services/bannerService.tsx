import axios, { AxiosResponse } from "axios";
import {
  GetAllBannerResponse,
  GetDetailBannerResponse,
  ResponseActionBanner,
} from "../interface/banner.interface";
import { useNavigate } from "react-router-dom";
import useCookie from "react-use-cookie";

interface BannerService {
  getAllBanners: (status?: string) => Promise<GetAllBannerResponse>;
  getBannerById: (id: number) => Promise<GetDetailBannerResponse>;
  addBanner: (formData: FormData) => Promise<ResponseActionBanner>;
  updateBanner: (
    id: number,
    formData: FormData
  ) => Promise<ResponseActionBanner>;
  deleteBanner: (id: number) => Promise<ResponseActionBanner>;
}

const BannerService = (): BannerService => {
  const navigate = useNavigate();
  const [cookieLogin] = useCookie("userLoginCookie");
  const userLoginCookie = cookieLogin ? JSON.parse(cookieLogin) : null;

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleUnauthorized = (status: number) => {
    if (status === 401) {
      navigate("/login");
    }
  };

  const getAllBanners = async (status: string = "Active"): Promise<GetAllBannerResponse> => {
    try {
      const response: AxiosResponse<GetAllBannerResponse> = await axios.get(
        `${apiUrl}/api/banner/get?status=${status}`
      );
      return response.data;
    } catch (error) {
      console.log("");
      throw error;
    }
  };

  const getBannerById = async (
    id: number
  ): Promise<GetDetailBannerResponse> => {
    try {
      const response: AxiosResponse<GetDetailBannerResponse> = await axios.get(
        `${apiUrl}/api/banner/get/${id}`
      );
      return response.data;
    } catch (error) {
      console.log("");
      throw error;
    }
  };

  const addBanner = async (
    formData: FormData
  ): Promise<ResponseActionBanner> => {
    try {
      const response: AxiosResponse<ResponseActionBanner> = await axios.post(
        `${apiUrl}/api/banner/store`,
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

  const updateBanner = async (
    id: number,
    formData: FormData
  ): Promise<ResponseActionBanner> => {
    try {
      const response: AxiosResponse<ResponseActionBanner> = await axios.put(
        `${apiUrl}/api/banner/update/${id}`,
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

  const deleteBanner = async (id: number): Promise<ResponseActionBanner> => {
    try {
      const response: AxiosResponse<ResponseActionBanner> = await axios.delete(
        `${apiUrl}/api/banner/delete/${id}`,
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
    getAllBanners,
    getBannerById,
    addBanner,
    updateBanner,
    deleteBanner,
  };
};

export default BannerService;

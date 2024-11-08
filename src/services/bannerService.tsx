import axios, { AxiosResponse } from "axios";
import {
  GetAllBannerResponse,
  GetDetailBannerResponse,
  ResponseActionBanner,
} from "../interface/banner.interface";
import { useNavigate } from "react-router-dom";
import useCookie from "react-use-cookie";

interface BannerService {
  getAllBanners: () => Promise<GetAllBannerResponse>;
  getBannerById: (id: number) => Promise<GetDetailBannerResponse>;
  addBanner: (formData: FormData) => Promise<ResponseActionBanner>;
  updateBanner: (id: number, formData: FormData) => Promise<ResponseActionBanner>;
  deleteBanner: (id: number) => Promise<ResponseActionBanner>;
}

const BannerService = (): BannerService => {
  const navigate = useNavigate();
  const [cookieLogin, ] = useCookie("userLoginCookie");
  const userLoginCookie = cookieLogin ? JSON.parse(cookieLogin) : null;

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleUnauthorized = (status: number) => {
    if (status === 401) {
      navigate("/dashboard/login");
    }
  };

  const getAllBanners = async (): Promise<GetAllBannerResponse> => {
    try {
      const response: AxiosResponse<GetAllBannerResponse> = await axios.get(
        `${apiUrl}/api/banner/get`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error fetching banners:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Failed to fetch banners");
      }
      throw new Error("An unexpected error occurred");
    }
  };

  const getBannerById = async (id: number): Promise<GetDetailBannerResponse> => {
    try {
      const response: AxiosResponse<GetDetailBannerResponse> = await axios.get(
        `${apiUrl}/api/banner/get/${id}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error fetching banner details:", error.response?.data || error.message);
        handleUnauthorized(error.response?.status || 0);
        throw new Error(error.response?.data?.message || "Failed to fetch banner details");
      }
      throw new Error("An unexpected error occurred");
    }
  };

  const addBanner = async (formData: FormData): Promise<ResponseActionBanner> => {
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
      handleUnauthorized(response.status);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error adding banner:", error.response?.data || error.message);
        handleUnauthorized(error.response?.status || 0);
        throw new Error(error.response?.data?.message || "Failed to add banner");
      }
      throw new Error("An unexpected error occurred");
    }
  };

  const updateBanner = async (id: number, formData: FormData): Promise<ResponseActionBanner> => {
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
      handleUnauthorized(response.status);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error updating banner:", error.response?.data || error.message);
        handleUnauthorized(error.response?.status || 0);
        throw new Error(error.response?.data?.message || "Failed to update banner");
      }
      throw new Error("An unexpected error occurred");
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
      handleUnauthorized(response.status);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error deleting banner:", error.response?.data || error.message);
        handleUnauthorized(error.response?.status || 0);
        throw new Error(error.response?.data?.message || "Failed to delete banner");
      }
      throw new Error("An unexpected error occurred");
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

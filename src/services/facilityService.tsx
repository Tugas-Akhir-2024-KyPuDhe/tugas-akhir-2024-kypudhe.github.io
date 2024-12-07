import axios, { AxiosResponse } from "axios";
import {
  FajusekActionResponse,
  GetAllFajusekResponse,
  GetSingleFajusekResponse,
} from "../interface/fajusek.interfase";
import { useNavigate } from "react-router-dom";
import useCookie from "react-use-cookie";

interface FacilityService {
  all: () => Promise<GetAllFajusekResponse>;
  single: (id: number) => Promise<GetSingleFajusekResponse>;
  store: (formData: FormData) => Promise<FajusekActionResponse>;
  update: (id: number, formData: FormData) => Promise<FajusekActionResponse>;
  destroy: (id: number) => Promise<FajusekActionResponse>;
}

const FacilityService = (): FacilityService => {
  const navigate = useNavigate();
  const [cookieLogin] = useCookie("userLoginCookie");
  const userLoginCookie = cookieLogin ? JSON.parse(cookieLogin) : null;

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleUnauthorized = (status: number) => {
    if (status === 401) {
      navigate("/login");
    }
  };

  const all = async (): Promise<GetAllFajusekResponse> => {
    try {
      const response: AxiosResponse = await axios.get(
        `${apiUrl}/api/fasilitas/get`
      );

      return response.data;
    } catch (error) {
      console.error("");
      throw error;
    }
  };

  const single = async (id: number): Promise<GetSingleFajusekResponse> => {
    try {
      const response: AxiosResponse = await axios.get(
        `${apiUrl}/api/fasilitas/get/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("");
      throw error;
    }
  };

  const store = async (formData: FormData): Promise<FajusekActionResponse> => {
    try {
      const response: AxiosResponse<FajusekActionResponse> = await axios.post(
        `${apiUrl}/api/fasilitas/store`,
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

  const update = async (
    id: number,
    formData: FormData
  ): Promise<FajusekActionResponse> => {
    try {
      const response: AxiosResponse<FajusekActionResponse> = await axios.put(
        `${apiUrl}/api/fasilitas/update/${id}`,
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

  const destroy = async (id: number): Promise<FajusekActionResponse> => {
    try {
      const response: AxiosResponse<FajusekActionResponse> = await axios.delete(
        `${apiUrl}/api/fasilitas/delete/${id}`,
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
    all,
    single,
    store,
    update,
    destroy,
  };
};

export default FacilityService;

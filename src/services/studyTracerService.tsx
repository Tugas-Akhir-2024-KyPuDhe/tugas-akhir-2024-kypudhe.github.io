import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import useCookie from "react-use-cookie";
import { IResponse, IStudyTracer } from "../interface/studyTracer.interface";

interface StudyTracerService {
  getAllStudyTracers: () => Promise<IResponse<IStudyTracer[]>>;
  getStudyTracerById: (id: number) => Promise<IResponse<IStudyTracer>>;
  addStudyTracer: (formData: FormData) => Promise<IResponse>;
  updateStudyTracer: (id: number, formData: FormData) => Promise<IResponse>;
  deleteStudyTracer: (id: number) => Promise<IResponse>;
}

const StudyTracerService = (): StudyTracerService => {
  const navigate = useNavigate();
  const [cookieLogin] = useCookie("userLoginCookie");
  const userLoginCookie = cookieLogin ? JSON.parse(cookieLogin) : null;

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleUnauthorized = (status: number) => {
    if (status === 401) {
      navigate("/login");
    }
  };

  const getAllStudyTracers = async (): Promise<IResponse<IStudyTracer[]>> => {
    try {
      const response: AxiosResponse<IResponse<IStudyTracer[]>> =
        await axios.get(`${apiUrl}/api/study-tracer/get`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userLoginCookie.token}`,
          },
        });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getStudyTracerById = async (
    id: number
  ): Promise<IResponse<IStudyTracer>> => {
    try {
      const response: AxiosResponse<IResponse<IStudyTracer>> = await axios.get(
        `${apiUrl}/api/study-tracer/get/${id}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
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

  const addStudyTracer = async (formData: FormData): Promise<IResponse> => {
    try {
      const response: AxiosResponse<IResponse> = await axios.post(
        `${apiUrl}/api/study-tracer/store`,
        formData
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleUnauthorized(error.response?.status || 0);
      }
      throw error;
    }
  };

  const updateStudyTracer = async (
    id: number,
    formData: FormData
  ): Promise<IResponse> => {
    try {
      const response: AxiosResponse<IResponse> = await axios.put(
        `${apiUrl}/api/study-tracer/update/${id}`,
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

  const deleteStudyTracer = async (id: number): Promise<IResponse> => {
    try {
      const response: AxiosResponse<IResponse> = await axios.delete(
        `${apiUrl}/api/study-tracer/delete/${id}`,
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
    getAllStudyTracers,
    getStudyTracerById,
    addStudyTracer,
    updateStudyTracer,
    deleteStudyTracer,
  };
};

export default StudyTracerService;

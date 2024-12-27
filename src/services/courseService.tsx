import axios, { AxiosResponse } from "axios";
import {
  GetAllCourseResponse,
  GetDetailCourseResponse,
  ResponseActionCourse,
} from "../interface/course.interface";
import { useNavigate } from "react-router-dom";
import useCookie from "react-use-cookie";

interface CourseService {
  getAllCourses: (grade?: string, sttaus?: string) => Promise<GetAllCourseResponse>;
  getCourseById: (id: number) => Promise<GetDetailCourseResponse>;
  addCourse: (formData: FormData) => Promise<ResponseActionCourse>;
  updateCourse: (
    id: number,
    formData: FormData
  ) => Promise<ResponseActionCourse>;
  deleteCourse: (id: number) => Promise<ResponseActionCourse>;
}

const CourseService = (): CourseService => {
  const navigate = useNavigate();
  const [cookieLogin] = useCookie("userLoginCookie");
  const userLoginCookie = cookieLogin ? JSON.parse(cookieLogin) : null;

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleUnauthorized = (status: number) => {
    if (status === 401) {
      navigate("/login");
    }
  };

  const getAllCourses = async (grade = "", status = "Active"): Promise<GetAllCourseResponse> => {
    try {
      const response: AxiosResponse<GetAllCourseResponse> = await axios.get(
        `${apiUrl}/api/course/get?grade=${grade}&status=${status}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getCourseById = async (
    id: number
  ): Promise<GetDetailCourseResponse> => {
    try {
      const response: AxiosResponse<GetDetailCourseResponse> = await axios.get(
        `${apiUrl}/api/course/get/${id}`
      );
      return response.data;
    } catch (error) {
     console.error(error);
      throw error;
    }
  };

  const addCourse = async (
    formData: FormData
  ): Promise<ResponseActionCourse> => {
    try {
      const response: AxiosResponse<ResponseActionCourse> = await axios.post(
        `${apiUrl}/api/course/store`,
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

  const updateCourse = async (
    id: number,
    formData: FormData
  ): Promise<ResponseActionCourse> => {
    try {
      const response: AxiosResponse<ResponseActionCourse> = await axios.put(
        `${apiUrl}/api/course/update/${id}`,
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

  const deleteCourse = async (id: number): Promise<ResponseActionCourse> => {
    try {
      const response: AxiosResponse<ResponseActionCourse> = await axios.delete(
        `${apiUrl}/api/course/delete/${id}`,
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
    getAllCourses,
    getCourseById,
    addCourse,
    updateCourse,
    deleteCourse,
  };
};

export default CourseService;

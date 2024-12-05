import axios, { AxiosResponse } from "axios";
import {
  GetAllCourseResponse,
  GetDetailCourseResponse,
  ResponseActionCourse,
} from "../interface/course.interface";
import { useNavigate } from "react-router-dom";
import useCookie from "react-use-cookie";

interface CourseService {
  getAllCourses: (grade?: string) => Promise<GetAllCourseResponse>;
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
      navigate("/dashboard/login");
    }
  };

  const getAllCourses = async (grade = ""): Promise<GetAllCourseResponse> => {
    try {
      const response: AxiosResponse<GetAllCourseResponse> = await axios.get(
        `${apiUrl}/api/course/get?grade=${grade}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Error fetching courses:",
          error.response?.data || error.message
        );
        throw new Error(
          error.response?.data?.message || "Failed to fetch courses"
        );
      }
      throw new Error("An unexpected error occurred");
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
      if (axios.isAxiosError(error)) {
        console.error(
          "Error fetching course details:",
          error.response?.data || error.message
        );
        handleUnauthorized(error.response?.status || 0);
        throw new Error(
          error.response?.data?.message || "Failed to fetch course details"
        );
      }
      throw new Error("An unexpected error occurred");
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
      handleUnauthorized(response.status);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Error adding course:",
          error.response?.data || error.message
        );
        handleUnauthorized(error.response?.status || 0);
        throw new Error(
          error.response?.data?.message || "Failed to add course"
        );
      }
      throw new Error("An unexpected error occurred");
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
      handleUnauthorized(response.status);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Error updating course:",
          error.response?.data || error.message
        );
        handleUnauthorized(error.response?.status || 0);
        throw new Error(
          error.response?.data?.message || "Failed to update course"
        );
      }
      throw new Error("An unexpected error occurred");
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
      handleUnauthorized(response.status);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Error deleting course:",
          error.response?.data || error.message
        );
        handleUnauthorized(error.response?.status || 0);
        throw new Error(
          error.response?.data?.message || "Failed to delete course"
        );
      }
      throw new Error("An unexpected error occurred");
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

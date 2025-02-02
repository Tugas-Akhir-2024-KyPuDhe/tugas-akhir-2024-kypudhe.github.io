import axios, { AxiosResponse } from "axios";
import {
  CourseInClass,
  FormState,
  ResponseActionCourseInClass,
} from "../interface/courseInClass.interface";
import { useNavigate } from "react-router-dom";
import useCookie from "react-use-cookie";

interface CourseInClassService {
  addCourse: (formData: FormState) => Promise<ResponseActionCourseInClass>;
  updateCourse: (
    id: number,
    formData: FormState
  ) => Promise<ResponseActionCourseInClass>;
  deleteCourse: (id: number) => Promise<ResponseActionCourseInClass>;
  getCourseinClass: (
    classId: number,
    day?: string
  ) => Promise<ResponseActionCourseInClass<CourseInClass[]>>;
}

const CourseInClassService = (): CourseInClassService => {
  const navigate = useNavigate();
  const [cookieLogin] = useCookie("userLoginCookie");
  const userLoginCookie = cookieLogin ? JSON.parse(cookieLogin) : null;

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleUnauthorized = (status: number) => {
    if (status === 401) {
      navigate("/login");
    }
  };

  const addCourse = async (
    formData: FormState
  ): Promise<ResponseActionCourseInClass> => {
    try {
      const response: AxiosResponse<ResponseActionCourseInClass> =
        await axios.post(`${apiUrl}/api/course-inclass/store`, formData, {
          headers: {
            Authorization: `Bearer ${userLoginCookie.token}`,
          },
        });
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
    formData: FormState
  ): Promise<ResponseActionCourseInClass> => {
    try {
      const response: AxiosResponse<ResponseActionCourseInClass> =
        await axios.put(`${apiUrl}/api/course-inclass/update/${id}`, formData, {
          headers: {
            Authorization: `Bearer ${userLoginCookie.token}`,
          },
        });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleUnauthorized(error.response?.status || 0);
      }
      throw error;
    }
  };

  const deleteCourse = async (
    id: number
  ): Promise<ResponseActionCourseInClass> => {
    try {
      const response: AxiosResponse<ResponseActionCourseInClass> =
        await axios.delete(`${apiUrl}/api/course-inclass/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${userLoginCookie.token}`,
          },
        });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleUnauthorized(error.response?.status || 0);
      }
      throw error;
    }
  };

  const getCourseinClass = async (
    classId: number,
    day: string = ''
  ): Promise<ResponseActionCourseInClass<CourseInClass[]>> => {
    try {
      const response: AxiosResponse<
        ResponseActionCourseInClass<CourseInClass[]>
      > = await axios.get(
        `${apiUrl}/api/course-inclass/get?classId=${classId}&day=${day}`,
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
    addCourse,
    updateCourse,
    deleteCourse,
    getCourseinClass,
  };
};

export default CourseInClassService;

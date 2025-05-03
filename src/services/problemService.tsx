import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import useCookie from "react-use-cookie";
import { IResponse, IProblem } from "../interface/problem.interface";

interface ProblemService {
  getAllProblems: () => Promise<IResponse<IProblem[]>>;
  getProblemById: (id: number) => Promise<IResponse<IProblem>>;
  addProblem: (formData: FormData) => Promise<IResponse>;
  updateProblem: (id: number, data: IProblem) => Promise<IResponse>;
  deleteProblem: (id: number) => Promise<IResponse>;
}

const ProblemService = (): ProblemService => {
  const navigate = useNavigate();
  const [cookieLogin] = useCookie("userLoginCookie");
  const userLoginCookie = cookieLogin ? JSON.parse(cookieLogin) : null;

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleUnauthorized = (status: number) => {
    if (status === 401) {
      navigate("/login");
    }
  };

  const getAllProblems = async (): Promise<IResponse<IProblem[]>> => {
    try {
      const response: AxiosResponse<IResponse<IProblem[]>> = await axios.get(
        `${apiUrl}/api/problem-report/get`,
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

  const getProblemById = async (id: number): Promise<IResponse<IProblem>> => {
    try {
      const response: AxiosResponse<IResponse<IProblem>> = await axios.get(
        `${apiUrl}/api/problem-report/get/${id}`,
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

  const addProblem = async (formData: FormData): Promise<IResponse> => {
    try {
      const response: AxiosResponse<IResponse> = await axios.post(
        `${apiUrl}/api/problem-report/store`,
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

  const updateProblem = async (
    id: number,
    data: IProblem
  ): Promise<IResponse> => {
    try {
      const response: AxiosResponse<IResponse> = await axios.put(
        `${apiUrl}/api/problem-report/update/${id}`,
        data,
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

  const deleteProblem = async (id: number): Promise<IResponse> => {
    try {
      const response: AxiosResponse<IResponse> = await axios.delete(
        `${apiUrl}/api/problem-report/delete/${id}`,
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
    getAllProblems,
    getProblemById,
    addProblem,
    updateProblem,
    deleteProblem
  };
};

export default ProblemService;

import { Media } from "./media.interface";

  export interface Course {
    id: number;
    uuid: string;
    name: string;
    code: string;
    grade: string;
    description: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    image: Media;
  }
  
  export interface GetAllCourseResponse {
    message: string;
    status: number,
    data: Course[];
  }

  export interface GetDetailCourseResponse {
    message: string;
    status: number;
    data: Course;
  }
  
  export interface FormState {
    name: string;
    code: string;
    grade: string;
    description: string;
  }
  
  export interface ResponseActionCourse {
    status: number;
    message: string;
  }
  
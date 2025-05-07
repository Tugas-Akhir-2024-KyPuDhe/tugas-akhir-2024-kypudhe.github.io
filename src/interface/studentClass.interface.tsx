import { StaffDetails } from "./auth.interface";
import { CourseInClass } from "./courseInClass.interface";
import { Fajusek } from "./fajusek.interfase";
import { StudentDetail } from "./student.interface";
import { IStudentPositionInClass } from "./studentPosition.interface";

export interface ResponseAction {
  status: number;
  message: string;
}

export interface FormState {
  id?: number;
  academicYear: string;
  staffId?: string;
  name: string;
  description: string;
  majorCode: string;
  grade?: string;
  group?: string;
  capacity: string;
}

export interface Class {
  id: number;
  uuid: string;
  name: string;
  description: string;
  majorCode: string;
  staffId: number;
  academicYear: string;
  capacity: number;
  status: number;
  createdAt: string;
  updatedAt: string;
  StudentPositionInClass: IStudentPositionInClass[];
  homeRoomTeacher: StaffDetails;
  student: StudentDetail[];
  mainStudent: StudentDetail[];
  CourseInClass?: CourseInClass[];
  major: Fajusek  
  totalStudent: number
}

export interface GetAllClassResponse {
  status: number;
  message: string;
  data: Class[];
}
export interface GetClassDetailResponse {
  status: number;
  message: string;
  data: Class;
}

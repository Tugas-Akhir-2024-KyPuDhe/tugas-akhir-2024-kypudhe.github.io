import { StaffDetails } from "./auth.interface";
import { StudentDetail } from "./student.interface";

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
  createdAt: string;
  updatedAt: string;
  homeRoomTeacher: StaffDetails;
  student: StudentDetail[]
}

export interface GetAllClassResponse {
  status: number,
  message: string;
  data: Class[];
}
export interface GetClassDetailResponse {
  status: number,
  message: string;
  data: Class;
}










import { StudentDetail } from "./student.interface";

export interface IStudentPositionInClass {
  id: number,
  uuid: string,
  nis: string,
  classId: number,
  positionName: string,
  student: StudentDetail
  createdAt: string,
  updatedAt: string,
}

export interface FormStudentPosition {
  nis: string;
  classId: number;
  positionName: string;
}

export interface ResponseActionSP {
  status: number;
  message: string;
}
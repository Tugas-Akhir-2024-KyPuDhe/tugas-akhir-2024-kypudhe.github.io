import { CourseInClass } from "./courseInClass.interface";
import { StaffDetail } from "./staff.interface";
import { Class } from "./studentClass.interface";
import { StudentsGrades } from "./studentGrade.interface";
import { IStudentPositionInClass } from "./studentPosition.interface";

export interface ResponseActionStudentGrade {
  status: number;
  message: string;
}

export interface CurrentClass {
  id: number;
  uuid: string;
  name: string;
  description: string;
  majorCode: string;
  staffId: string;
  academicYear: string;
  capacity: string;
  createdAt: string;
  updatedAt: string;
  StudentPositionInClass: IStudentPositionInClass[];
  homeRoomTeacher: StaffDetail;
  StudentsGrades: StudentsGrades[];
  CourseInClass: CourseInClass[]
}

export interface StudentHistory {
  id: number;
  uuid: string;
  studentId: string;
  nis: string;
  oldClassId: string;
  currentClassId: string;
  academicYear: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  currentClass: Class;
}

export interface ResponseGetStudenHistory {
  status: number;
  message: string;
  data: StudentHistory[];
}
export interface ResponseGetStudenHistoryDetail {
  status: number;
  message: string;
  data: StudentHistory;
}

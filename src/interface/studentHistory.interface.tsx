import { CourseInClass } from "./courseInClass.interface";
import { StaffDetail } from "./staff.interface";
import { StudentsGrades } from "./studentGrade.interface";

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
  homeRoomTeacher: StaffDetail;
  StudentsGrades: StudentsGrades[];
  CourseInClass: CourseInClass[]
}

export interface StudentHistory {
  id: number;
  studentId: string;
  oldClassId: string;
  currentClassId: string;
  academicYear: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  currentClass: CurrentClass;
}

export interface ResponseGetStudenHistory {
  status: number;
  message: string;
  data: StudentHistory[];
}

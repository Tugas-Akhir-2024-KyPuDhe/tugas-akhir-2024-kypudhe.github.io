import { Course } from "./course.interface";
import { StaffDetail } from "./staff.interface";

export interface StudentsGradesByClass {
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
  teacher: StaffDetail
  studentsGrades: StudentsGrades[];
}
export interface StudentsGrades {
  id: number;
  uuid: string;
  nis: string;
  teacherId: number;
  classId: number;
  courseCode: string;
  task: string;
  UH: string;
  PTS: string;
  PAS: string;
  portofolio: string;
  proyek: string;
  attitude: string;
  description: string;
  course: Course;
  teacher: StaffDetail;
  createdAt: Date;
  updatedAt: Date;
}

export interface FormStateStudentGrade {
  nis: string;
  teacherId: number;
  classId: number;
  courseCode: string;
  task: string;
  UH: string;
  PTS: string;
  PAS: string;
  portofolio: string;
  proyek: string;
  attitude: string;
  description?: string;
}

export interface ResponseActionStudentGrade {
  status: number;
  message: string;
}
export interface ResponseGetStudentGrade {
  status: number;
  message: string;
  data: StudentsGradesByClass[];
}

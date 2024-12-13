import { Course } from "./course.interface";
import { StaffDetail } from "./staff.interface";
import { Class } from "./studentClass.interface";

export interface CourseInClass {
  id: number;
  uuid: string;
  teacher: StaffDetail;
  class: Class;
  day: string;
  timeStart: string;
  timeEnd: string;
  createdAt: string;
  updatedAt: string;
  courseDetail: Course;
}

export interface FormState {
  id?: number;
  courseCode: string;
  teacherId: number;
  classId: number;
  day: string;
  timeStart: string;
  timeEnd: string;
}

export interface ResponseActionCourseInClass {
  status: number;
  message: string;
}

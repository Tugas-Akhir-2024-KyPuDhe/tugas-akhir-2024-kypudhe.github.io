// import { LoginData } from "./auth.interface";

import { CourseInClass } from "./courseInClass.interface";
import { Media } from "./media.interface";
import { Role } from "./role.interface";
import { Class } from "./studentClass.interface";

export interface StaffDetail {
  id: number;
  uuid: string;
  name: string;
  birthPlace: string;
  address: string;
  phone: string;
  email: string;
  gender: string;
  mapel: string[];
  nip: string;
  type: string;
  position: string;
  startDate: string;
  endDate: string;
  mediaId: string;
  createdAt: string;
  updatedAt: string;
  photo: Media;
  user?: {
    username: string;
    password: string;
    roles: Role[];
  };
}

export interface ResponseGetStaff {
  status: number;
  message: string;
  data: StaffDetail[];
}

export interface ResponseGetStaffDetail {
  status: number;
  message: string;
  data: StaffDetail;
}
export interface DataClassOfteacher {
  id: string;
  uuid: string;
  name: string;
  CourseInClass: CourseInClass[];
}

export interface GetClassOfTeacher {
  status: number;
  message: string;
  data: DataClassOfteacher;
}
export interface GetClassRoomOfTeacher {
  status: number;
  message: string;
  data: Class[];
}

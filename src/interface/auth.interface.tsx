import { Media } from "./media.interface";

export interface UserDetails {
  // === GENERAL
  id: number;
  uuid: string;
  name: string;
  birthPlace: string;
  address: string;
  phone: string;
  email: string;
  startYear: string;
  endYear: string | null;
  mediaId: string | null;
  createdAt: string;
  updatedAt: string;
  photo: Media;
  gender: string | null;
  // === STAFF OR TEARCHER
  nip?: string;
  type?: string;
  position?: string | null;
  startDate?: string;
  endDate?: string | null;
  // === STUDENT
  nis?: string;
  nisn?: string;

  // === SENSITIF
  password?: string;
}

export interface DetailUserResponse {
  role: "STUDENT" | "TEACHER" | "STAFF";
  name?: string;
  details: UserDetails[];
}

export interface LoginResponse {
  status: number;
  message: string;
  token: string;
  user: DetailUserResponse;
}
export interface UpdateUserResponse {
  status: number;
  message: string;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface TokenValidationResponse {
  valid: boolean;
  user?: DetailUserResponse;
}

export interface UpdatedBiodata {
  name: string;
  email: string;
  phone: string;
  address: string;
  gender: string;
  birthPlace: string;
}


export interface BaseUserDetails {
  id: number;
  uuid: string;
  name: string;
  birthPlace: string;
  address: string;
  phone: string;
  email: string;
  gender: string;
  mediaId: string | null;
  createdAt: string;
  updatedAt: string;
  user: LoginData;
}

// Student-specific details
export interface StudentDetails extends BaseUserDetails {
  nis: string;
  nisn: string;
  startYear: string;
  endYear: string | null;
}

// Staff-specific details
export interface StaffDetails extends BaseUserDetails {
  nip: string;
  type: string;
  position: string | null;
  startDate: string;
  endDate: string | null;
}

// Response for fetching users
export interface GetUsersResponse<T> {
  status: number;
  message: string;
  data: T[];
}

// Updated generic response interface to handle both student and staff data
export interface UserDataResponse<T> {
  status: number;
  data: T[];  // Should be an array of `T`
}

export interface FormCreateStudent {
  id?: number;
  password: string;
  name: string;
  birthPlace: string;
  address: string;
  nis: string;
  nisn: string;
  gender: string;
  phone: string;
  email: string;
  startYear: string;
}

export interface StudentDetail {
  id: number;
  uuid: string;
  name: string;
  birthPlace: string;
  address: string;
  phone: string;
  email: string;
  startYear: Date;
  endYear: string | null;
  mediaId: string | null;
  createdAt: string;
  updatedAt: string;
  photo: Media;
  gender: string;
  nis: string;
  nisn: string;
  user: {
    username: string;
    password: string;
  };
}

export interface ResponseGetStudentDetail{
  status: number;
  message: string;
  data: StudentDetail;
}

export interface ResponseUpdatePhotoUser {
  status: number;
  message: string;
}

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
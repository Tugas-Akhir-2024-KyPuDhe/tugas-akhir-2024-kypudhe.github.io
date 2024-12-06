// import { LoginData } from "./auth.interface";

import { Media } from "./media.interface";

export interface StaffDetail {
  id: number;
  uuid: string;
  name: string;
  birthPlace: string;
  address: string;
  phone: string;
  email: string;
  gender: string;
  mapel: string;
  nip: string;
  type: string;
  position: string;
  startDate: string;
  endDate: string;
  mediaId: string;
  createdAt: string;
  updatedAt: string;
  photo: Media
  user?: {
    username: string;
    password: string;
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

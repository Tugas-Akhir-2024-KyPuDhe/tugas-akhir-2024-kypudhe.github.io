import { Media } from "./media.interface";

export interface Fajusek {
  staffId: string | undefined;
  id: number;
  uuid: string;
  name: string;
  majorCode: string;
  academicYear: string;
  capacity: string;
  description: string;
  prioritas: number;
  createdAt: string;
  updatedAt: string;
  media: Media[];
}

export interface GetAllFajusekResponse {
  message: string;
  data: Fajusek[];
}

export interface GetSingleFajusekResponse {
  message: string;
  data: Fajusek;
}

export interface FajusekActionResponse {
  status: number;
  message: string;
}
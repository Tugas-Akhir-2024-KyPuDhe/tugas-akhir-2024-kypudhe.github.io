import { Media } from "./media.interface";

export interface IResponse<T = unknown> {
  message: string;
  status: number;
  data: T;
}

export interface IProblem {
  id: number;
  uuid: string;
  createdBy: string;
  idName: string;
  pageProblem: string;
  problemDescription: string;
  media?: Media;
  telp: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}

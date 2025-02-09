export interface IResponse<T = unknown> {
  message: string;
  status: number;
  data: T;
}

export interface IAcademicYear {
  id: number;
  uuid: string;
  name: string;
  status: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
}

export interface IpayloadAcademicYear {
  id?: number;
  name: string;
  status?: string;
  createdBy?: string;
}

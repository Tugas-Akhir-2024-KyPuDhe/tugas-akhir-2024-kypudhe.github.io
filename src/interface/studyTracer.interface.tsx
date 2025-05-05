export interface IResponse<T = unknown> {
  message: string;
  status: number;
  data: T;
}

export interface IStudyTracer {
  id?: number | null;
  uuid: string;
  name: string;
  ttl: string;
  gender: string;
  address: string;
  addressNow: string;
  phone: string;
  email: string;
  startYear: string;
  endYear: string;
  employmentStatus: string;
  institutionName: string;
  institutionAddress: string;
  isSatisfactionMet: string;
  disSatisfactionFactors: string;
  studyIssues: string;
  statusApprove: string;
  createdAt: string;
  updatedAt: string;
}

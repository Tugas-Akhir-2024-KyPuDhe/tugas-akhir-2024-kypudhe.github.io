// Interface untuk data umum user
interface BaseUser {
  id: number;
  uuid: string;
  name: string;
  birthPlace?: string;
  address?: string;
  phone?: string;
  email?: string;
  mediaId?: number | null;
  createdAt: string;
  updatedAt: string;
  photo?: string | null;
}

// Interface khusus untuk STUDENT
export interface StudentDetails extends BaseUser {
  nis: string;
  nisn: string;
  startYear: string;
  endYear?: string | null;
}

// Interface khusus untuk STAFF
export interface StaffDetails extends BaseUser {
  nip: string;
  type: string;
  position?: string | null;
  startDate: string;
  endDate?: string | null;
}

// Interface umum untuk respons user
export interface UserResponse {
  role: "STUDENT" | "STAFF";
  details: StudentDetails[] | StaffDetails[];
}

// Interface untuk respons login
export interface LoginData {
  username: string;
  password: string;
}

export interface LoginUserResponse {
  name: string;
  role: string;
}

export interface LoginResponse {
  status: number;
  message: string;
  token: string;
  user: LoginUserResponse;
}

// Interface untuk validasi token
export interface TokenValidationResponse {
  valid: boolean;
  user?: LoginUserResponse;
}

// Interface untuk respons `getUser`
export interface GetUserResponse {
  status: number;
  message: string;
  role?: string;
  user: UserResponse;
}

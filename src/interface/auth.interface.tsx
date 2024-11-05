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
  
  export interface TokenValidationResponse {
    valid: boolean;
    user?: LoginUserResponse;
  }
  
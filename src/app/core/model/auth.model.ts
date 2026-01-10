export interface SignupRequest {
  username: string;
  password: string;
  role: string;
}

export interface SigninRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

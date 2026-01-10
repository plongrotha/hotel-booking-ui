export interface UserResponse {
  id: number;
  publicId: string;
  username: string;
  firstName: string;
  lastName: string;
  image: string;
  dateOfBirth: string;
  age: number;
  role: string;
  isLogin: boolean;
  enabled: boolean;
}

export interface UserUpdate {
  username?: string;
  firstName?: string;
  lastName?: string;
  birthDate?: string;
  password?: string;
}

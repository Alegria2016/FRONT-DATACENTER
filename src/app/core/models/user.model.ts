export interface UserRegisterData {
  name: string;
  lastName: string;
  email: string;
  password: string;
}

export interface UserLoginData {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  lastName: string;
  email: string;
  role: string;
  status: string;
}
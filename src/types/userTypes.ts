// src/types/userTypes.d.ts
export interface UserData {
  auth0Id: string;
  email: string;
  name?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AxiosErrorResponse {
  message: string;
}

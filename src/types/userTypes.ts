// src/types/userTypes.d.ts
export interface UserData {
  auth0Id: string;
  email: string;
  name?: string;
}

export interface AxiosErrorResponse {
  message: string;
}

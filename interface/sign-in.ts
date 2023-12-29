import type { CommonError } from './error';

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInResponse extends CommonError {
  accessToken: string;
  refreshToken: string;
}

export interface SendOtpToEmailRequest {
  email: string;
}

export interface SendOtpToEmailResponse extends CommonError {
  sent: boolean;
}

export interface VerifyOtpRequest {
  email: string;
  code: string;
}

export interface VerifyOtpResponse {
  valid: boolean;
}

export interface UpdatePasswordRequest extends SignInRequest {}

export interface UpdatePasswordResponse {
  ok: boolean;
}

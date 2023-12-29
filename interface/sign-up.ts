import type { CommonError } from './error';

export interface SignUpRequest {
  name: string;
  email: string;
  password: string;
}

export interface SignUpResponse extends CommonError {}

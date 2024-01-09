import type { AxiosInstance } from 'axios';

import type {
  SendOtpToEmailRequest,
  SendOtpToEmailResponse,
  ServerResponse,
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
  UpdatePasswordRequest,
  UpdatePasswordResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
} from '~/interface';

class AuthApi {
  axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  signIn(params: SignInRequest): Promise<ServerResponse<SignInResponse>> {
    return this.axios.post('/auth/authentication/sign-in', {
      email: params.email,
      password: params.password,
      role: 'Buyer',
    });
  }

  sendOTPToEmail(params: SendOtpToEmailRequest): Promise<ServerResponse<SendOtpToEmailResponse>> {
    return this.axios.post('auth/authentication/send-otp-to-email', {
      role: 'Buyer',
      email: params.email,
      isSignUp: params.isSignUp,
    });
  }

  updatePassword(params: UpdatePasswordRequest): Promise<ServerResponse<UpdatePasswordResponse>> {
    return this.axios.post('auth/authentication/update-password', {
      password: params.password,
      email: params.email,
      role: 'Buyer',
    });
  }

  verifyOTP(params: VerifyOtpRequest): Promise<ServerResponse<VerifyOtpResponse>> {
    return this.axios.post('/auth/authentication/verify-otp', {
      email: params.email,
      code: params.otp,
    });
  }

  signUp(params: SignUpRequest): Promise<ServerResponse<SignUpResponse>> {
    return this.axios.post('/auth/authentication/sign-up', {
      name: params.name,
      otp: params.otp,
      email: params.email,
      password: params.password,
      role: 'Buyer',
    });
  }
}

export default AuthApi;

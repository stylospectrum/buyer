import { VerifyOtpRequest, VerifyOtpResponse } from '~/interface';
import { axios } from '~/lib/axios';

export default defineEventHandler(async (event) => {
  const body = await readBody<VerifyOtpRequest>(event);

  try {
    const response = await axios.post<VerifyOtpResponse>('/authentication/verify-otp', body);
    return response;
  } catch (err: any) {
    return err.response.data;
  }
});

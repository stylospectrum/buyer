import { SendOtpToEmailRequest, SendOtpToEmailResponse } from '~/interface';
import { axios } from '~/lib/axios';

export default defineEventHandler(async (event) => {
  const body = await readBody<SendOtpToEmailRequest>(event);

  try {
    const response = await axios.post<SendOtpToEmailResponse>('/authentication/send-otp-to-email', {
      ...body,
      role: 'Seller',
    });

    return response;
  } catch (err: any) {
    return err.response.data;
  }
});

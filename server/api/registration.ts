import { SignUpRequest, SignUpResponse } from '~/interface';
import { axios } from '~/lib/axios';

export default defineEventHandler(async (event) => {
  const body = await readBody<SignUpRequest>(event);

  try {
    const response = await axios.post<SignUpResponse>('/authentication/sign-up', {
      ...body,
      role: 'Seller',
    });

    return response;
  } catch (err: any) {
    return err.response.data;
  }
});

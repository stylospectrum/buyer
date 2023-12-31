import { SignInRequest, SignInResponse } from '~/interface';
import { axios } from '~/lib/axios';

export default defineEventHandler(async (event) => {
  const body = await readBody<SignInRequest>(event);

  try {
    const response = await axios.post<SignInResponse>('/authentication/sign-in', {
      ...body,
      role: 'Seller',
    });

    return response;
  } catch (err: any) {
    return err.response.data;
  }
});

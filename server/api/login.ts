import { SignInRequest, SignInResponse } from '~/interface';
import { axios } from '~/lib/axios';

export default defineEventHandler(async (event) => {
  const body = await readBody<SignInRequest>(event);

  return axios.post<SignInResponse>('/authentication/sign-in', {
    ...body,
    role: 'Seller',
  });
});

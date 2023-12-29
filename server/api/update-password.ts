import { UpdatePasswordRequest, UpdatePasswordResponse } from '~/interface';
import { axios } from '~/lib/axios';

export default defineEventHandler(async (event) => {
  const body = await readBody<UpdatePasswordRequest>(event);

  try {
    const response = await axios.post<UpdatePasswordResponse>('/users/update-password', {
      ...body,
      role: 'Seller',
    });

    return response;
  } catch (err: any) {
    return err.response.data;
  }
});

import type { AxiosInstance } from 'axios';

import type { ServerResponse } from '~/interface';
import { User } from '~/model';

class UserApi {
  axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async getUser(): Promise<User> {
    const res: ServerResponse<User> = await this.axios.get('/auth/users');

    return new User({
      id: res.data.id,
      name: res.data.name,
      email: res.data.email,
    });
  }
}

export default UserApi;

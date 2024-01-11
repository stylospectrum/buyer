import type { AxiosInstance } from 'axios';

import type { GetMessageRequest, GetMessageResponse, ServerResponse } from '~/interface';
import { Message } from '~/model';

class ChatApi {
  axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  getConversations() {
    return this.axios.get('/chat/conversations');
  }

  async getMessages(params: GetMessageRequest): Promise<Message[]> {
    const messages: ServerResponse<GetMessageResponse[]> = await this.axios.get(`/chat/messages`, {
      params: {
        conversationId: params.conversationId,
        limit: params.limit || 10,
      },
    });

    return messages.data.map(
      (message) =>
        new Message({ id: message.id, content: message.content, senderId: message.senderId }),
    );
  }
}

export default ChatApi;

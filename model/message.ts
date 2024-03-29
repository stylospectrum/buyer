class Message {
  id: string;
  content: string;
  senderId: string;
  typing?: boolean;

  constructor(message: Message) {
    this.id = message.id;
    this.content = message.content;
    this.senderId = message.senderId;
    this.typing = message.typing;
  }
}

export default Message;

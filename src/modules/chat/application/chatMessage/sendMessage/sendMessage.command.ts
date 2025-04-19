import { SendMessageRequestBody } from './sendMessage.request-body';

export class SendMessageCommand {
  constructor(public readonly body: SendMessageRequestBody) {}
}

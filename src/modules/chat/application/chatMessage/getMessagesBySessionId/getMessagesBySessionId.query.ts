import { GetMessagesBySessionIdRequestQuery } from './getMessagesBySessionId.request-query';
export class GetMessagesBySessionIdQuery {
  constructor(public readonly sessionId: string, public readonly query: GetMessagesBySessionIdRequestQuery) {}
}

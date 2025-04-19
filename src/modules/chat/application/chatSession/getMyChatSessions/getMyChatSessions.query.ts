import { GetMyChatSessionsRequestQuery } from './getMyChatSessions.request-query';
export class GetMyChatSessionsQuery {
  constructor(public readonly userId: string, public readonly query: GetMyChatSessionsRequestQuery) {}
}

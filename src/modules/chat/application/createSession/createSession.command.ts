import { CreateSessionRequestBody } from './createSession.request-body';

export class CreateSessionCommand {
  constructor(public readonly body: CreateSessionRequestBody) {}
}

import { UpdateSessionByIdRequestBody } from './updateSessionById.request-body';

export class UpdateSessionByIdCommand {
  constructor(
    public readonly id: string,
    public readonly body: UpdateSessionByIdRequestBody,
  ) {}
}

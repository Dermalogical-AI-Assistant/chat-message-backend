import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class GetMessagesBySessionIdRequestParam {
  @ApiProperty({
    description: 'Search by session id',
    example: '073bdc58-5a58-4293-a5c9-51a31643d1b8',
  })
  @IsUUID()
  sessionId: string;
}

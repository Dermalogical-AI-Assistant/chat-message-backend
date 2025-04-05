import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import * as services from './services';
import { DatabaseModule } from 'src/database';
const Services = [...Object.values(services)];

@Module({
  imports: [
    CqrsModule, 
    DatabaseModule, 
  ],
  controllers: [],
  providers: [...Services],
  exports: [...Services],
})
export class UserModule {}

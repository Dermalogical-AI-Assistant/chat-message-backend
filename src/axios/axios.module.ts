import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import * as services from './services';

const Services = Object.values(services);

@Module({
  imports: [HttpModule],
  providers: [...Services],
  exports: [...Services],
})
export class AxiosModule {}

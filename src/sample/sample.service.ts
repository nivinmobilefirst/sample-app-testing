import { Injectable } from '@nestjs/common';

@Injectable()
export class SampleService {
  getMessage(): string {
    return 'Hello from Sample Service!';
  }
}

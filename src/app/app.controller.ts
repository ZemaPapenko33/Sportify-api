import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Hello world' })
  @ApiResponse({ status: 201, description: 'Hello world' })
  getHello(): string {
    return this.appService.getHello();
  }
}

import { Controller, Get } from '@nestjs/common';
import { InfluxService } from './influx.service';

@Controller('data')
export class InfluxController {
  constructor(private readonly influxService: InfluxService) {}

  @Get('query')
  async getQuery(): Promise<any> {
    try {
      const result = await this.influxService.queryData('°C');
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      return { error: error };
    }
  }
}

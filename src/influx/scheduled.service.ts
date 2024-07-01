// scheduled.service.ts

import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InfluxService } from './influx.service';

@Injectable()
export class ScheduledService {
  constructor(private readonly influxService: InfluxService) {}

  jobs = [
    '%',
    '% available',
    'floors',
    'g/m³',
    'hPa',
    'm',
    'm/s',
    'mV',
    'state',
    'step',
    '°C',
  ];

  interval = '5m';

  @Cron('*/10 * * * * *')
  async handleScheduledTask() {
    try {
      this.jobs.map(async (mapJob) => {
        await this.influxService.queryData(mapJob);
      });
      // Handle the result as needed
    } catch (error) {
      console.error('Error querying data:', error);
      // Handle error
    }
    //set last_time and next_time
    this.influxService.writeFile({ latest_time: this.influxService.next_time });
    this.influxService.latest_time = this.influxService.next_time;
    const date = new Date(this.influxService.next_time);
    date.setMinutes(date.getMinutes() + 5);

    const formattedTimestamp = date.toISOString();
    this.influxService.next_time = formattedTimestamp;
  }
}

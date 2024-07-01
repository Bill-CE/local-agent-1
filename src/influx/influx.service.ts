import { Injectable, OnModuleInit } from '@nestjs/common';
import { InfluxDB } from 'influx';
import axios from 'axios';
import * as fs from 'fs';

@Injectable()
export class InfluxService implements OnModuleInit {
  private readonly influx: InfluxDB;
  public latest_time = '';
  public next_time = '';

  constructor() {
    this.influx = new InfluxDB({
      host: 'smartbed.local',
      database: 'smartbed',
      port: 8086,
      username: 'smartbed',
      password: 'smartbed',
    });
  }

  extractTimeAndValue = (data: any) => {
    return data.map((entry: any) => ({
      time: entry[0],
      value: entry[1],
      reading_type: entry[2],
    }));
  };

  readFile(filePath: string) {
    try {
      const data = fs.readFileSync(filePath, 'utf8');
      const parsed = JSON.parse(data);
      const parsedDate = parsed.latest_time;

      // Set last_time
      const date = new Date(parsedDate);
      // Add 5 minutes
      date.setMinutes(date.getMinutes() + 5);

      const formattedTimestamp = date.toISOString();
      this.latest_time = parsedDate;
      this.next_time = formattedTimestamp;
    } catch (err) {
      console.error(`Failed to read or parse the file at ${filePath}:`, err);
    }
  }

  writeFile(data: any) {
    try {
      fs.writeFileSync('data.json', JSON.stringify(data));
      console.log('The file has been saved!');
    } catch (err) {
      console.error('Failed to write data to file:', err);
    }
  }

  async queryData(measurement: string) {
    console.log(this.latest_time, this.next_time);
    if (!this.latest_time) {
      console.log('check the data file');
      return;
    }

    const query = `SELECT time, value, entity_id FROM "home_assistant"."autogen"."${measurement}" where time>= '${this.latest_time}' and time <= '${this.next_time}' order by time asc`;

    try {
      // Query the database
      const result = await this.influx.queryRaw(query);
      if (result.results[0].series) {
        const rawData = result.results[0].series[0].values;
        // Process queried data
        const extracted = this.extractTimeAndValue(rawData);
        const uploadData = {
          hw_id: 1,
          data: extracted,
        };
        console.log('upload data', measurement);

        await axios.post('http://localhost:3001/sensor/data', uploadData);
      } else {
        console.log(measurement, 'no data');
      }
    } catch (err) {
      console.error('Failed to query InfluxDB or post data:', err);
    }
  }

  //module init
  onModuleInit() {
    this.readFile('data.json');
  }
}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HttpModule } from '@nestjs/axios';
import { ChairController } from './chair/chair.controller';
import { InfluxController } from './influx/influx.controller';
import { InfluxService } from './influx/influx.service';
import { ScheduledService } from './influx/scheduled.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MQTT_SERVICE',
        transport: Transport.MQTT,
        options: {
          url: 'tcp://broker.mqtt.cool:1883', // Replace with your MQTT broker URL
        },
      },
    ]),
    HttpModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController, ChairController, InfluxController],
  providers: [AppService, InfluxService, ScheduledService],
})
export class AppModule {}

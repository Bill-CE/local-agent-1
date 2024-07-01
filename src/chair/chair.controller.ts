import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { smartChairCmd } from './smartchair-command';
import axios from 'axios';
//import { error } from 'console';

@Controller('smatbed')
export class BedController {
  constructor(@Inject('MQTT_SERVICE') private client: ClientProxy) {}

  @MessagePattern('smartbed')
  async handleSmartbed(@Payload() message: string) {
    const spitString = message.split('/', 5);
    const token = spitString[0];
    const deviceHost = spitString[1];
    const deviceType = spitString[2];
    const deviceName = spitString[3];
    const cmd = spitString[4];
    const url = smartChairCmd(deviceHost, deviceType, deviceName, cmd, token);
    console.log(url);
    if (url) {
      await axios
        .post(url, {
          timeout: 5000,
        })
        .then((response) => {
          // náº¿u chuá»—i tráº£ láº¡i lÃ  rá»—ng=> Ä‘iá»u khiá»ƒn khÃ´ng thÃ nh cÃ´ng
          //   if (!response.data) {
          //     console.log('retry');
          //   }
          //  console.log(response);
          //    else
          console.log('done!');
        })
        .catch((error) => {
          if (error.code === 'ENCONABORTED') {
            console.log('please check led connection');
          } else {
            console.log('something wrong');
          }
        });
    } else {
      console.warn(`Received unknown message: ${message}`);
    }
  }
}

import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { smartchairCmd } from './smartchair-command';
import axios from 'axios';

@Controller('chair')
export class ChairController {
  constructor(@Inject('MQTT_SERVICE') private client: ClientProxy) {}

  //chair
  @MessagePattern('smartchair')
  async handleSmartchair(@Payload() message: string) {
    const spitString = message.split('/', 5);
    const deviceHost = spitString[0];
    const deviceType = spitString[1];
    const deviceName = spitString[2];
    const cmd = spitString[3];
    const token = spitString[4];
    const url = smartchairCmd(deviceHost, deviceType, deviceName, cmd);
    if (token == 'tokenxyz' && url) {
      console.log(url);
      //send command
      await axios
        .get(url, {
          timeout: 5000,
        })
        .then((res) => {
          console.log('success: ', res);
          axios.post('http://localhost:3001/history/create', {
            hw_id: 1,
            cmd: cmd,
          });
        })
        .catch((error) => {
          if (error.code === 'ECONNABORT') {
            console.log('timed out');
          }
        });
    } else {
      console.warn(`Received unknown message: ${message}`);
    }
  }
}

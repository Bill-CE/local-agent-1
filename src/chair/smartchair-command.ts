export function smartChairCmd(
  host: string,
  type: string,
  name: string,
  cmd: string,
  token: string,
) {
  const chairHost = `http://${host}.local`;
  const chairType = type;
  const chairName = name;
  if (token == 'tokenxyz') {
    //console.log(`${bedHost}/${bedType}/${bedName}/${cmd}`);
    return `${chairHost}/${chairType}/${chairName}/${cmd}`;
  } else {
    console.log('wrong token');
    //break;
  }
  // switch (entity) {
  //   case 'bed':
  //     const bedHost = `http://${host}.local`;
  //     const bedType = type;
  //     const bedName = name;
  //     if (token == 'tokenxyz') {
  //       return `${bedHost}/${bedType}/${bedName}/${cmd}`;
  //     } else {
  //       console.log('wrong token');
  //       break;
  //     }
  //   case 'chair':
  //     const chairHost = `http://${host}.local`;
  //     const chairType = type;
  //     const chairName = name;
  //     if (token == 'tokenxyz') {
  //       return `${chairHost}/${chairType}/${chairName}/${cmd}`;
  //     } else {
  //       console.log('wrong token');
  //       break;
  //     }
  // case 'desk':
  //   const deskHost = ' http://desk-frame.local';
  //   const deskType = type;
  //   const deskName = name;
  //   if (token == 'tokenxyz') {
  //     return `${glassesHost}/${glassesType}/${glassesName}/${cmd}`;
  //   } else {
  //     console.log('wrong token');
  //     break;
  //   }
  // case 'bed':
  //   const bedHost = ' http://bed-frame.local';
  //   const bedType = type;
  //   const bedName = name;
  //   if (token == 'tokenxyz') {
  //     return `${glassesHost}/${glassesType}/${glassesName}/${cmd}`;
  //   } else {
  //     console.log('wrong token');
  //     break;
  //   }
  // case 'light':
  //   const lightHost = ' http://control-light.local/';
  //   const lightType = type;
  //   const lightName = name;
  //   if (token == 'tokenxyz') {
  //     return `${glassesHost}/${glassesType}/${glassesName}/${cmd}`;
  //   } else {
  //     console.log('wrong token');
  //     break;
  //   }
  // case 'air':
  //   const airHost = ' http://control-air.local/';
  //   const airType = type;
  //   const airName = name;
  //   if (token == 'tokenxyz') {
  //     return `${glassesHost}/${glassesType}/${glassesName}/${cmd}`;
  //   } else {
  //     console.log('wrong token');
  //     break;
  //   }
  // case 'topper':
  //   const topperHost = ' http://smart-topper.local/';
  //   const topperType = type;
  //   const topperName = name;
  //   if (token == 'tokenxyz') {
  //     return `${glassesHost}/${glassesType}/${glassesName}/${cmd}`;
  //   } else {
  //     console.log('wrong token');
  //     break;
  //   }
  //http://air-test.local/climate/thermostat_climate_controller/set?mode=OFF
  //http://air-test.local/switch/block_stt/turn_off
  //http://air-test.local/climate/thermostat_climate_controller/set?target_temperature=26.3
  // case 'led':
  //   const ledHost = 'http://control-led.local';
  //   const ledType = type;
  //   const ledName = name;
  //   return `${ledHost}/${ledType}/${ledName}/${cmd}`;
  //default:
  //}
}

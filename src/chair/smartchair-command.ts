export function smartchairCmd(
  entity: string,
  type: string,
  name: string,
  cmd: string,
) {
  const hosts = {
    glasses: 'http://control-glassess.local',
    desk: 'http://desk-frame.local',
    chair: 'http://chair-frame.local',
  };

  const host = hosts[entity];
  if (host) {
    return `${host}/${type}/${name}/${cmd}`;
  }
  throw new Error(`Invalid entity: ${entity}`);
}

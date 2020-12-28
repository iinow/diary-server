import { createLogger } from 'bunyan'
import { InfluxDB } from 'influx'
import { createSyslogStream, SYSLOG_SCHEMA } from 'influx-syslog'

const influx = new InfluxDB({
  host: '192.168.0.24',
  port: 8101,
  database: 'ha',
  schema: [SYSLOG_SCHEMA],
})

export const log = createLogger({
  name: 'DiaryLogger',
  streams: [
    {
      stream: process.stdout,
      level: 'debug',
    },
  ],
})
log.addStream({
  stream: createSyslogStream(influx),
  level: 'debug',
  type: 'raw',
})

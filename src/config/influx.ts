import { InfluxDB } from 'influx'
import { SYSLOG_SCHEMA } from 'influx-syslog'

type BASE_SCHEMA = typeof SYSLOG_SCHEMA
type DIARY_SCHEMA = BASE_SCHEMA

const SCHEMA: DIARY_SCHEMA = {
  ...SYSLOG_SCHEMA,
}

export const influx = new InfluxDB({
  host: process.env.influx.host,
  port: process.env.influx.port,
  database: process.env.influx.database,
  schema: [SCHEMA],
})

import { createLogger } from 'bunyan'
import {
  BunyanLogObject,
  getSyslogSeverityLevel,
} from 'influx-syslog/lib/adapters/bunyan'
import { SEVERITY_LEVEL_VALUES } from 'influx-syslog/lib/adapters/syslog'
import stripAnsi from 'strip-ansi'
import { InfluxDB } from 'influx'
import { obj } from 'through2'
import { influx } from '@/config/influx'

type BunyanLogObjectWithQuery = BunyanLogObject & {
  query?: string
}

export const log = createLogger({
  name: 'DiaryLogger',
  streams: [
    {
      stream: process.stdout,
      level: 'debug',
    },
  ],
  src: true,
})

const createLogMessage = (logObj: BunyanLogObjectWithQuery) => {
  if (logObj.query) {
    return stripAnsi(`query: ${logObj.query}, ${logObj.msg}`)
  }
  return stripAnsi(logObj.msg)
}

const createLogObject = (logObj: BunyanLogObjectWithQuery) => {
  const { time, level, name, pid, hostname } = logObj
  const { appname = process.env.server.profiles, facility = name } = logObj
  const severity = getSyslogSeverityLevel(level)
  const tags = { severity, appname, facility, hostname, host: hostname }
  const timestamp = `${time.getTime()}000000`
  const fields = {
    version: 1,
    severity_code: SEVERITY_LEVEL_VALUES[severity],
    facility_code: 14,
    timestamp,
    procid: pid,
    message: createLogMessage(logObj),
  }

  return {
    measurement: 'syslog',
    tags,
    fields,
  }
}

const createMyStream = (influxdb: InfluxDB) =>
  obj(
    (logObj: BunyanLogObjectWithQuery, _enc: string, callback: () => void) => {
      const syslogPoint = createLogObject(logObj)
      influxdb.writePoints([syslogPoint])
      callback()
    }
  )

log.addStream({
  stream: createMyStream(influx),
  level: 'debug',
  type: 'raw',
})

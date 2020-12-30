import * as Bunyan from 'bunyan'
import { Logger } from 'typeorm'

export class TypeOrmLoggerAdapter implements Logger {
  private readonly logger: Bunyan

  constructor(logger: Bunyan) {
    this.logger = logger.child({ component: 'TypeORM' })
  }

  logQuery(
    query: string,
    parameters?: any[] | undefined,
    queryRunner?: import('typeorm').QueryRunner | undefined
  ) {
    this.logger.debug({ query }, parameters, 'SQL query')
  }

  logQueryError(
    error: string,
    query: string,
    parameters?: any[] | undefined,
    queryRunner?: import('typeorm').QueryRunner | undefined
  ) {
    this.logger.error({ query }, error)
  }

  logQuerySlow(
    time: number,
    query: string,
    parameters?: any[] | undefined,
    queryRunner?: import('typeorm').QueryRunner | undefined
  ) {
    this.logger.warn({ time, query })
  }

  logSchemaBuild(
    message: string,
    queryRunner?: import('typeorm').QueryRunner | undefined
  ) {
    this.logger.info({ schema: true }, message)
  }

  logMigration(
    message: string,
    queryRunner?: import('typeorm').QueryRunner | undefined
  ) {
    this.logger.info({ migration: true }, message)
  }

  log(
    level: 'log' | 'info' | 'warn',
    message: any,
    queryRunner?: import('typeorm').QueryRunner | undefined
  ) {
    switch (level) {
      case 'log':
      case 'info':
        this.logger.info(message)
        break
      case 'warn':
        this.logger.warn(message)
        break
      default:
        break
    }
  }
}

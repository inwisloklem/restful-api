/*
 * Logger
 *
 */

const convertDate = require('./lib/convert-date')
const composeFactory = require('../helpers/compose-factory')
const executeProviders = require('./lib/providers')

const appendFile = require('./fs/append-file')
const { logs: { file, loggerProviders } } = require('../.config/init')

const addLogFile = (target = {}, { file = './.log' } = {}) => {
  const date = new Date().toLocaleString('ru')
  const processedFile = convertDate(file)

  target.logFile = (message, level = 'info') => {
    switch (level) {
      case 'info':
        appendFile(processedFile, `${date}. INFO. ${message}\n`)
        break
      case 'error':
        appendFile(processedFile, `${date}. ERROR. ${message}\n`)
        break
      default:
        throw Error('No valid log level provided')
    }
  }

  return target
}

const addLogStdout = (target = {}) => {
  const date = new Date().toLocaleString('ru')

  target.logStdout = (message, level = 'info') => {
    switch (level) {
      case 'info':
        console.info(`${date}. INFO. ${message}`)
        break
      case 'error':
        console.error(`${date}. ERROR. ${message}`)
        break
      default:
        throw Error('No valid log level provided')
    }
  }

  return target
}

const executeLogger = (target = {}, { loggerProviders = ['logStdout'] }) => {
  target.log = ({ message, level }) => {
    executeProviders({ target, loggerProviders, message, level })
  }

  target.info = message => {
    executeProviders({ target, loggerProviders, message, level: 'info' })
  }

  target.error = message => {
    executeProviders({ target, loggerProviders, message, level: 'error' })
  }

  return target
}

const decorateLogger = (target = {}, { loggerProviders = ['logStdout'] }) => {
  target.decorate = (func, { message, level }) => {
    if (typeof func !== 'function') {
      throw Error('No function provided')
    }

    return (...args) => {
      executeProviders({ target, loggerProviders, message, level })
      return func(...args)
    }
  }

  return target
}

const createLogger = composeFactory(addLogStdout, addLogFile, decorateLogger, executeLogger)
const logger = createLogger({ file, loggerProviders })

module.exports = logger

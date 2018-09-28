/*
 * Logger
 *
 */

const appendFile = require('../fs/append-file')

const convertDate = require('./convert-date')
const composeFactory = require('../helpers/compose-factory')
const executeProviders = require('./poviders')

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
        throw new Error('No valid log level provided')
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
        throw new Error('No valid log level provided')
    }
  }

  return target
}

const executeLogger = (target = {}, { loggerProviders = ['logStdout'] }) => {
  target.log = function ({ message, level }) {
    executeProviders({ target, loggerProviders, message, level })
  }

  return target
}

const decorateLogger = (target = {}, { loggerProviders = ['logStdout'] }) => {
  target.decorate = function (func, { message, level }) {
    if (typeof func !== 'function') {
      throw new Error('No function provided')
    }

    return function (...args) {
      executeProviders({ target, loggerProviders, message, level })
      return func(...args)
    }
  }

  return target
}

const createLogger = composeFactory(addLogStdout, addLogFile, decorateLogger, executeLogger)

module.exports = createLogger

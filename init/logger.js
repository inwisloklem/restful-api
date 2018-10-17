const createLogger = require('../logger')
const { logs: { file, loggerProviders } } = require('../.config/init')

const logger = createLogger({ file, loggerProviders })

module.exports = logger

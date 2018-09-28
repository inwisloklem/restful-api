/*
 * Primary API file
 *
 */

const http = require('http')
const config = require('./.config/init')
const requestHandler = require('./lib/request-handler')

const createLogger = require('./logger')
const { file, loggerProviders } = config.logs

const logger = createLogger({ file, loggerProviders })

const server = http.createServer(requestHandler)

server.listen(config.http.port, function afterStart () {
  logger.info({ message: `The server is listening now at port ${config.http.port}` })
})

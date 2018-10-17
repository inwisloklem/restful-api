/*
 * Primary API file
 *
 */

const http = require('http')
const config = require('./.config/init')
const requestHandler = require('./http/request-handler')
const logger = require('./init/logger')

const server = http.createServer(requestHandler)

server.listen(config.http.port, function afterStart () {
  logger.info(`The server is listening now at port ${config.http.port}`)
})

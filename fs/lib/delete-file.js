const { promises: fs } = require('fs')
const logger = require('../init/logger')

async function deleteFile (file) {
  try {
    fs.unlink(file)
  } catch (err) {
    logger.error(err.message)
  }
}

module.exports = deleteFile

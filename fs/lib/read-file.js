const { promises: fs } = require('fs')
const logger = require('../../init/logger')

async function readFile (file) {
  let filehandle, data

  try {
    filehandle = await fs.open(file, 'r')
    data = await filehandle.readFile({ encoding: 'utf-8' })
  } catch (err) {
    logger.error(err.message)
  } finally {
    if (filehandle) {
      await filehandle.close()
    }
  }

  return data
}

module.exports = readFile

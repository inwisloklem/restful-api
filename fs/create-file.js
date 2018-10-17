const { promises: fs } = require('fs')
const logger = require('../init/logger')

async function createFile (file, data) {
  let filehandle

  try {
    filehandle = await fs.open(file, 'wx')
    await filehandle.writeFile(data, { encoding: 'utf-8' })
  } catch (err) {
    logger.error(err.message)
  } finally {
    if (filehandle) {
      await filehandle.close()
    }
  }
}

module.exports = createFile

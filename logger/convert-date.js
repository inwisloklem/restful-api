const path = require('path')

const convertDate = filePath => {
  const normalized = path.normalize(filePath)
  const parsed = path.parse(normalized)
  const { base } = parsed

  if (/{{ *date *}}/.test(base)) {
    parsed.base = new Date().toISOString().substr(0, 10)
    return path.format(parsed)
  }

  return normalized
}

module.exports = convertDate

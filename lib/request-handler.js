/*
 * Request handler
 *
 */

const url = require('url')
const { StringDecoder } = require('string_decoder')

function requestHandler (req, res) {
  const decoder = new StringDecoder('utf-8')

  let buffer = ''
  function receive (chunk) {
    buffer += decoder.write(chunk)
  }

  function complete () {
    buffer += decoder.end()

    const parsed = url.parse(req.url, true)
    const { headers, method } = req

    const requestParameters = {
      headers,
      method,
      payload: buffer,
      query: parsed.query,
      route: parsed.pathname.replace(/^\/+|\/+$/g, '')
    }

    console.info(requestParameters)
    res.end()
  }

  req.on('data', receive).on('end', complete)
}

module.exports = requestHandler

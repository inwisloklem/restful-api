const executeProviders = ({ target, loggerProviders, message, level }) => {
  let count
  loggerProviders.forEach(providerName => {
    if (target[providerName]) {
      count += 1
      target[providerName](message, level)
    }
  })
  if (count < 1) {
    throw new Error('Minimum one logger provider required')
  }
}

module.exports = executeProviders

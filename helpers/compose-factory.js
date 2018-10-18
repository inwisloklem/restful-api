function composeFactory (...funcs) {
  return function factory (...args) {
    let instance = {}

    funcs.forEach(func => {
      instance = func(instance, ...args)
    })

    return instance
  }
}

module.exports = composeFactory

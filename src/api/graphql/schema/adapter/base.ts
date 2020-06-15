const stringify = require('./_stringify')

class Base {
  constructor(
    source,
    { defaultValue = {}, serialize = stringify, deserialize = JSON.parse } = {}
  ) {
    this.source = source
    this.defaultValue = defaultValue
    this.serialize = serialize
    this.deserialize = deserialize
  }
}

export default Base
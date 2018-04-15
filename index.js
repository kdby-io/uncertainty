const pick = arr => arr[Math.floor(Math.random() * arr.length)]

class Uncertainty {
  constructor(resolver = () => pick([true, false]), dependency) {
    this._value = 'superposed'
    this.chain = dependency ? dependency.chain : []
    this.chain.push(this)

    Object.defineProperty(this, 'value', {
      get: () => {
        if (this._value === 'superposed') {
          this._value = resolver(dependency ? dependency.value : null)
          this.chain.map(e => e.value)
        }

        return this._value
      },
    })
  }
  
  peek() { return this._value }
  valueOf() { return this.value }
  toString() { return this.value }
  inspect() { return `[Uncertainty: ${this.value}]` }

  then(func) {
    return new Uncertainty(func, this)
  }
}

exports.Uncertainty = Uncertainty
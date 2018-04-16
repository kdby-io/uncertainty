const pick = arr => arr[Math.floor(Math.random() * arr.length)]

const State = Object.freeze({
  SUPERPOSED: 'Superposed',
  OBSERVED: 'Observed',
})

class Uncertainty {
  constructor(resolver = () => pick([true, false]), dependency) {
    this._state = State.SUPERPOSED
    this._value = null
    this._chain = dependency ? dependency._chain : []
    this._chain.push(this)

    Object.defineProperty(this, 'value', {
      get: () => {
        if (this._state === State.SUPERPOSED) {
          this._value = resolver(dependency ? dependency.value : null)
          this._state = State.OBSERVED
          this._chain.map(e => e.value)
        }

        return this._value
      },
    })
  }
  
  peek() { return this._state }
  valueOf() { return this.value }
  toString() { return this.value }
  inspect() { return `[Uncertainty: ${this.value}]` }

  then(func) {
    return new Uncertainty(func, this)
  }
}

exports.Uncertainty = Uncertainty
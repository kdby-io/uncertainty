const pick = arr => () => arr[Math.floor(Math.random() * arr.length)]

const State = Object.freeze({
  Uncertain: 'Uncertain',
  Measured: 'Measured',
})

class Uncertainty {
  constructor(arg = [true, false], dependency) {
    this._dependency = dependency
    this._resolver = (() => {
      if (arg instanceof Array) {
        return pick(arg)
      } else if (arg instanceof Function) {
        return arg
      } else {
        throw TypeError(`Uncertainty resolver ${arg} is not an array`)
      }
    })()
    this._state = State.Uncertain
    this._value = null
    this._chain = dependency ? dependency._chain : []
    this._chain.push(this)

    Object.defineProperty(this, 'value', {
      get: () => {
        if (this._state === State.Uncertain) {
          this._chain.map(e => e._collapse())
          this._chain.length = 0  //  Remove references explicitly
        }
        return this._value
      },
    })
  }

  _collapse() {
    this._value = this._resolver(this._dependency ? this._dependency.value : null)
    this._state = State.Measured
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
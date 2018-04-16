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
          while(this._chain.length > 0) {
            const e = this._chain.pop()
            e._value = e._resolver(e._dependency ? e._dependency.value : null)
            e._state = State.Measured
          }
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
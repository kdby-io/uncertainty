const { Uncertainty } = require('.')

const a = new Uncertainty()
const b = a.then(trigger => trigger)
const c = b.then(trigger => Number(trigger))
const d = new Uncertainty()
console.log(a.peek())
console.log(b.peek())
console.log(c.peek())
console.log(d.peek())

console.log(b)

console.log(a.peek())
console.log(b.peek())
console.log(c.peek())
console.log(d.peek())
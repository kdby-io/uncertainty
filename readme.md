# uncertainty

The Uncertainty object is an uncertain data having a definite value when measured. It is inspired by quantum machanics and borrows a concept that an observation collapses a wave function and reduces to a state of particles of [Copenhagen interpretation](https://en.wikipedia.org/wiki/Copenhagen_interpretation).

## Getting Started

```
npm i -S uncertainty
```

```js
const { Uncertainty } = require('uncertainty');

const isBottleBroken = new Uncertainty()
const cat = isBottleBroken.then(bool => bool ? 'dead' : 'alive')

console.log(isBottleBroken.peek()) // Uncertain
console.log(cat.peek()) // Uncertain
console.log(cat)  // dead or alive
console.log(isBottleBroken.peek()) // Measured
console.log(cat.peek()) // Measured
```

## API

### `new Uncertainty(arg?: any[])`

An Uncertainty constructor creates new Uncertainty object. It receives a range of probable values as an array.

```js
const a = new Uncertainty()
console.log(a)  // true or false

const b = new Uncertainty([1, 2, 3])
console.log(b)  // 1, 2 or 3
```

### `.then(cb: Function)`

`.then()` receives a callback function which is run when the value is measured. The function will always be run before a measuring code.

```js
const a = new Uncertainty([1, 2])
a.then(() => {
  console.log('Hello, world!')
})
console.log(a + 1)

// Hello, world!
// 2
```

`.then()` also creates a new Uncertainty object entangled with the object. The callback function receives the entangled object as an input, and returns new Uncertainty object value. When one of the entangled objects are measured, the other are also measured.

```js
const a = new Uncertainty()
const b = a.then(a => !a)
const c = b.then(b => Number(b))
console.log(a.peek()) // Uncertain
console.log(b.peek()) // Uncertain
console.log(c.peek()) // Uncertain
console.log(b)  // false or true
console.log(a.peek()) // Measured
console.log(b.peek()) // Measured
console.log(c.peek()) // Measured
```

### `.peek()`

`.peek()` peeks the data state whether it is uncertain or measured. It does not measure the value.

```js
const a = new Uncertainty()
console.log(a.peek()) // Uncertain
console.log(a)  //  true or false
console.log(a.peek()) // Measured
```

## Measurement

Measurement means access to a data value. If it does not have to access a value, it is considered unmeasured. For example, in a conditional statement, an Uncertainty object has same characteristics as a JavaScript object.

```js
const a = new Uncertainty()

a           // Not measured.
!a          // Not measured. An object in JavsScript is always trusty.
a + 1       // Measured.
a == true   // Measured. It is calcuated after type casting.
a === true  // Not measured. It does not have to measure a value because of different types.
```

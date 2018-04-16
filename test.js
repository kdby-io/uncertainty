const test = require('ava')
const { Uncertainty } = require('.')

test('initial state', t => {
  const a = new Uncertainty()
  t.is(a.peek(), 'Uncertain')
})

test('state after measured', t => {
  const a = new Uncertainty()
  a.value
  t.is(a.peek(), 'Measured')
})

test('default probable values', t => {
  const a = new Uncertainty()
  t.is(typeof a.value, 'boolean')
})

test('probable values', t => {
  const a = new Uncertainty([1, 2, 3])
  t.is(typeof a.value, 'number')
})

test('then() callback function', t => {
  let spy = false
  const a = new Uncertainty()
  a.then(() => { spy = true })
  a.value
  t.true(spy)
})

test('vertical entangled objects', t => {
  const a = new Uncertainty()
  const b = a.then(a => a)
  const c = b.then(b => b)
  const d = c.then(c => c)
  const e = new Uncertainty()
  t.is(a.peek(), 'Uncertain')
  t.is(b.peek(), 'Uncertain')
  t.is(c.peek(), 'Uncertain')
  t.is(d.peek(), 'Uncertain')
  c.value
  t.is(a.peek(), 'Measured')
  t.is(b.peek(), 'Measured')
  t.is(c.peek(), 'Measured')
  t.is(d.peek(), 'Measured')
  t.is(typeof a.value, 'boolean')
  t.is(typeof b.value, 'boolean')
  t.is(typeof c.value, 'boolean')
  t.is(typeof d.value, 'boolean')
  t.is(e.peek(), 'Uncertain')
})

test('horizontal entangled objects', t => {
  const a = new Uncertainty()
  const b1 = a.then(a => a)
  const b2 = a.then(a => a)
  const c1 = b1.then(b1 => b1)
  const c2 = b1.then(b1 => b1)
  const c3 = b2.then(b2 => b2)
  const c4 = b2.then(b2 => b2)
  const d1 = c2.then(c2 => c2)
  const d2 = c2.then(c2 => c2)
  const e = new Uncertainty()
  c3.value
  t.is(a.peek(), 'Measured')
  t.is(b1.peek(), 'Measured')
  t.is(b2.peek(), 'Measured')
  t.is(c1.peek(), 'Measured')
  t.is(c2.peek(), 'Measured')
  t.is(c3.peek(), 'Measured')
  t.is(c4.peek(), 'Measured')
  t.is(d1.peek(), 'Measured')
  t.is(d2.peek(), 'Measured')
  t.is(typeof a.value, 'boolean')
  t.is(typeof b1.value, 'boolean')
  t.is(typeof b2.value, 'boolean')
  t.is(typeof c1.value, 'boolean')
  t.is(typeof c2.value, 'boolean')
  t.is(typeof c3.value, 'boolean')
  t.is(typeof c4.value, 'boolean')
  t.is(typeof d1.value, 'boolean')
  t.is(typeof d2.value, 'boolean')
  t.is(e.peek(), 'Uncertain')
})

var Sub = require('../subscription')
var assert = require('assert')
var Bus = require('@nichoth/events')
var Store = require('@nichoth/state')

var DemoStore = Store.extend({
    _state: { hello: 'world' },
    foo: function (data) {
        this._state.hello = data
    },
    bar: function (data) {
        this._state.hello = data
    }
})

var bus = Bus()
var demoStore = DemoStore()
var sub = Sub(demoStore, bus)
    .on('example', 'foo')
    .on('woo', demoStore.bar)

bus.emit('example', 'again')
console.log(demoStore.state().hello)
assert.equal(demoStore.state().hello, 'again')

bus.emit('woo', 'moo')
console.log(demoStore.state().hello)
assert.equal(demoStore.state().hello, 'moo')

sub.close()
bus.emit('example', 'test')
console.log(demoStore.state().hello)
assert.equal(demoStore.state().hello, 'moo')



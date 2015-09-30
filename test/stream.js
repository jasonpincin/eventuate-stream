var test            = require('tape'),
    eventuate       = require('eventuate'),
    eventuateStream = require('..')

test('eventuate-stream should produce a stream', function (t) {
    t.plan(2)

    var event = eventuate()
    var stream = eventuateStream(event)

    t.equal(typeof stream.on, 'function', 'has on function')
    t.equal(typeof stream.pipe, 'function', 'has pipe function')
})

test('produced events should be streamed', function (t) {
    t.plan(1)

    var event = eventuate()
    var stream = eventuateStream(event)

    stream.on('data', function (data) {
        t.equal(data, 'hello', 'streamed')
    })
    event.produce('hello')
})

test('streamed events should be produced and passed through', function (t) {
    t.plan(2)

    var event = eventuate()
    var stream = eventuateStream(event)

    event(function (data) {
        t.equal(data, 'hello', 'produced')
    })
    stream.on('data', function (data) {
        t.equal(data, 'hello', 'streamed through')
    })

    stream.write('hello')
})

test('closed streams should clean up eventuate consumers', function (t) {
    t.plan(2)

    var event = eventuate()
    var stream = eventuateStream(event)

    t.equal(event.consumers.length, 1, '1 consumer before stream end')
    stream.end()
    t.equal(event.consumers.length, 0, '0 consumers after stream end')
})

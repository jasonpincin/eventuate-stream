var through2 = require('through2')

module.exports = function createEventuateStream (eventuate) {
    var stream = through2.obj(function produceChunk (chunk, enc, cb) {
        eventuate.produce(chunk)
        cb()
    })

    eventuate(streamConsumer)
    stream.on('finish', cleanup)
    stream.on('end', cleanup)
    stream.on('error', cleanup) // should signalError here too

    return stream

    function streamConsumer (data) {
        stream.push(data)
    }

    function cleanup () {
        eventuate.removeConsumer(streamConsumer)
    }
}

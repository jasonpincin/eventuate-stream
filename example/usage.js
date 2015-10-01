var eventuate       = require('eventuate'),
    eventuateStream = require('..'),
    jsonstream      = require('jsonstream')

var request = eventuate()
var requestStream = eventuateStream(request)

requestStream.pipe(jsonstream.stringify(false)).pipe(process.stdout)

request(function onRequest (req) {
    console.log('\nGot a request for resource: ' + req.resource)
})

requestStream.write({ resource: '/something' })
requestStream.write({ resource: '/something/else' })

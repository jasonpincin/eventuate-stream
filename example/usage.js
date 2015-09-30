var jsonstream      = require('jsonstream'),
    eventuate       = require('eventuate'),
    eventuateStream = require('..')

var request = eventuate()
eventuateStream(request).pipe(jsonstream.stringify(false)).pipe(process.stdout)

request.produce({ resource: '/something' })
request.produce({ resource: '/something/else' })

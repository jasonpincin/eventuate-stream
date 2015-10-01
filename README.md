# eventuate-stream

[![NPM version](https://badge.fury.io/js/eventuate-stream.png)](http://badge.fury.io/js/eventuate-stream)
[![Build Status](https://travis-ci.org/jasonpincin/eventuate-stream.svg?branch=master)](https://travis-ci.org/jasonpincin/eventuate-stream)
[![Coverage Status](https://coveralls.io/repos/jasonpincin/eventuate-stream/badge.png?branch=master)](https://coveralls.io/r/jasonpincin/eventuate-stream?branch=master)

Create a node-style duplex stream from an eventuate

## example

```javascript
var eventuate       = require('eventuate'),
    eventuateStream = require('eventuate-stream'),
    jsonstream      = require('jsonstream')

var request = eventuate()
var requestStream = eventuateStream(request)

requestStream.pipe(jsonstream.stringify(false)).pipe(process.stdout)

request(function onRequest (req) {
    console.log('\nGot a request for resource: ' + req.resource)
})

requestStream.write({ resource: '/something' })
requestStream.write({ resource: '/something/else' })
```

## api

```
var eventuateStream = require('eventuate-stream'),
    event           = require('eventuate')()
```

### var stream = eventuateStream(event)

Create a duplex object-mode stream. Anything written to the stream will be produced by the eventuate, and anything produced by the eventuate will be readable/emitted via the stream.

## install

With [npm](https://npmjs.org) do:

```
npm install eventuate-stream
```

## testing

`npm test [--dot | --spec] [--grep=pattern]`

Specifying `--dot` or `--spec` will change the output from the default TAP style. 
Specifying `--grep` will only run the test files that match the given pattern.

### coverage

`npm run coverage [--html]`

This will output a textual coverage report. Including `--html` will also open 
an HTML coverage report in the default browser.

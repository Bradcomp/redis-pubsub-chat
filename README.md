# Redis Pub / Sub Server Sent Events chat

This started as an experiment with server sent events.  The library was rather
straightforward, so I'm building out a chat app around it.  

Right now the code consists of 5 pieces:
* An initial [redis](https://redis.io/) pub / sub hello-world test (`/simple-demo`)
* A server side library (`/msg-bus`)
* A client side library (`/msg-bus/client.js`)
* A chat server (`/server`, `start-server.js`)
* A chat client (`/client`, `/assets/index.html`)


## The library
The goal is to have a dead simple API that can be dropped into a project for
simple SSE connectivity.

See the source code and example app for details.  

On the server you can `emit` events, and `subscribe` to those events from an
HTTP request.

On the client you can subscribe to a stream and then listen for events that are
emitted on that stream.

Note that redis is completely unnecessary if you are dealing with a single
server, but makes it much easier when you want more than one server to be
able to subscribe to the same channel.

Also note that while express is used for the example
server, the only methods used by the library are ones that exist on the base
response object from Node's HTTP module (`write`, `writeHead`, and `end`, along
with the `close` event).

## The chat app
Initially it was a simple vanilla JS application on the front end, with an
[express](http://expressjs.com/)  server backing it.  In the interests of
learning and just because it's fun, we're now using [React](https://facebook.github.io/react/)
as our view library and [Rollup](http://rollupjs.org/) as our build tool.  

Markdown support is provided by [marked](https://github.com/chjj/marked), Async
Futures by [Fluture](https://github.com/Avaq/Fluture), and of course
[Ramda](http://ramdajs.com/) for the functional toolkit.

### `//TODO: `
* Loading previous messages from server on connect.
* Multiple rooms.
* Whitelist the `<marquee>` tag (maybe via markdown extension).
* Emoji support.
* Local storage to remember nicknames.
* Multi line messages. 

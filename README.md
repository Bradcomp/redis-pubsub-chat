# Redis Pub / Sub Server Sent Events

I'm experimenting with server sent events using redis as a message bus.
Right now the code consists of 5 pieces:
* An initial redis pub / sub hello-world test (`simple-demo`)
* A server side library (`/msg-bus`)
* A client side library (`/public/js/event-client.js`)
* An example server (`app.js`, `routes.js`, `start-server.js`)
* An example client (`/public/js/app.js`, `/assets/index.html`)

Eventually, the libraries may be pulled into their own project.

The goal is to have a dead simple API that can be dropped into a project for
simple SSE connectivity.

Note that redis is completely unnecessary if you are dealing with a single
server, but makes it much easier when you want more than one server to be
able to subscribe to the same channel.

Also note that while express is used for the example server, the only methods
used by the library are ones that exist on the base response object from Node's
HTTP module (`write`, `writeHead`, and `end`, along with the `close` event).

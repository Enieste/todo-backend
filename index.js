'use strict';

const Hapi = require('hapi');
const _ = require('lodash');
const todoDb = require('./todoDb');

const server = new Hapi.Server();
server.connection({
  port: 3000,
  routes: {
    cors: true
  }
});

server.route({
  method: 'GET',
  path: '/todos',
  handler(request, reply) {
    todoDb.list().then((todos) => {
      reply(todos);
    });
  }
});

server.route({
  method: 'POST',
  path: '/todos',
  handler(request, reply) {
    todoDb.add(request.payload).then((todoInstance) => reply({status: 'ok', id: todoInstance.get().id}));
  }
});

server.route({
  method: 'DELETE',
  path: '/todos/{id}',
  handler(request, reply) {
    const id = request.params.id;
    todoDb.remove(id).then(() => reply({status: 'ok'}));
  }
});

server.route({
  method: 'DELETE',
  path: '/todos',
  handler(request, reply) {
    todoDb.removeAll().then(() => reply({status: 'ok'}));
  }
});

// Start the server
server.start((err) => {
  if (err) {
  throw err;
}
console.log('Server running at:', server.info.uri);
});
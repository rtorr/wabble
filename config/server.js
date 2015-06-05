var http = require('http');
var path = require('path');
var Hapi = require('hapi');
var server = new Hapi.Server();
var conf = require('./conf');
server.connection({
    port: '8281'
});
server.views({
    engines: {
        jade: require('jade')
    },
    isCached: false,
    path: path.join(__dirname, './../server_templates'),
    compileOptions: {
        pretty: true
    }
});

var routes = [
    {
        method: 'GET',
        path: '/',
        handler: function(request, reply){
            return reply.view('index', {
                host: reply.request.info.hostname,
                port: conf.get('webpack_port')
            });
        }
    },
    {
        method: 'GET',
        path: '/favicon.ico',
        handler: { file: './favicon.ico' },
        config: {
            cache: {
                expiresIn: 86400000,
                privacy: 'public'
            }
        }
    }
];
server.route(routes);
server.start(function (err) {
    if (err) {
        throw new Error(err.message);
    }
    console.log('Server running at:', server.info.uri);
});
var path = require('path');
var webpack = require('webpack');
var Hapi = require('hapi');
var conf = require('./conf');

var plugins = [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
];

var entry = ['./src/index'];
var loaders = [
    { test: /\.scss$/, loader: "style!css!sass" },
    { test: /\.css$/, loader: "style!css" }
];
var output = {
    path: path.join(__dirname, './public/dist/js/'),
    filename: '_bundle.js'
};

if (process.env.NODE_ENV === 'PRODUCTION') {
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        })
    );
    loaders.push(
        { test: /\.js?$/, exclude: /node_modules/, loaders: ['babel?optional[]=runtime&stage=0'] }
    );
}

module.exports = {

    entry: entry,

    output: output,

    module: {
        loaders: loaders
    },

    node: {
        Buffer: false
    },

    plugins: plugins,

    //This is used to hack some issues I have had with other peoples localhost being fucked
    dev_server: function(callback){
        var _this = this;
        var server = new Hapi.Server();
        server.connection({ port: 3223 });
        server.start(function () {
            _this.host = server.info.host;
            _this.plugins.push(
                new webpack.HotModuleReplacementPlugin(),
                new webpack.NoErrorsPlugin()
            );
            _this.entry.push(
                'webpack-dev-server/client?http://'+server.info.host+':'+conf.get('webpack_port'),
                'webpack/hot/only-dev-server'
            );
            _this.module.loaders.push(
                { test: /\.js?$/, exclude: /node_modules/, loaders: ['react-hot', 'babel?optional[]=runtime&stage=0'] }
            );
            _this.output = {
                path: path.join(__dirname, './public/dist/js/'),
                filename: '_bundle.js',
                publicPath: 'http://'+server.info.host+':'+conf.get('webpack_port')+'/public/dist/js'
            };
            callback(_this);
        });
        server.stop({}, function () {
            console.log('temp server stopped');
        });
    }

};
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpack_config = require('./webpack.config');
var conf = require('./conf');

//This is used to hack some issues I have had with other peoples localhost being fucked
webpack_config.dev_server(function(wp_conf){
    new WebpackDevServer(webpack(wp_conf), {
        headers: { 'Access-Control-Allow-Origin': '*' },
        publicPath: wp_conf.output.publicPath,
        hot: true,
        historyApiFallback: true,
        info: true, //  --no-info option
        hot: true,
        inline: true,
        colors: true
    }).listen(conf.get('webpack_port'), wp_conf.host, function(err, result){
            if(err){
                console.log(err);
            }
            console.log('webpack server listening on '+ wp_conf.host +':'+ conf.get('webpack_port'));
        });
});

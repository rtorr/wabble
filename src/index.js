require('es5-shim/es5-shim');
require('es5-shim/es5-sham');
var React = require('react/addons');
var App = require('./App');

[].forEach.call(document.getElementsByClassName('js-app'), function(el) {
    React.render(<App />, el);
});
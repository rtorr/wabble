require('es5-shim/es5-shim');
require('es5-shim/es5-sham');
var React = require('react/addons');

var TestController = React.createClass({
    render(){
        return (
            <div>
                <p>hello world</p>
            </div>
        );
    }
});

[].forEach.call(document.getElementsByClassName('js-app'), function(el) {
    React.render(<TestController />, el);
});
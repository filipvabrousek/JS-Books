//many libraries needed !!!!!!
var HelloWorld = React.createClass({
  render: function() {
    return (
      <p>
        It is {this.props.date.toTimeString()}
      </p>
    );
  }
});

setInterval(function() {
  ReactDOM.render(
    <HelloWorld date={new Date()} />,
    document.getElementById('e')
  );
}, 500);

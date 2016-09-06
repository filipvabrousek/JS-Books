/*many libraries needed !!!!!!
https://npmcdn.com/react@15.3.1/dist/react.js
https://npmcdn.com/react-dom@15.3.1/dist/react-dom.js
https://npmcdn.com/babel-core@5.8.38/browser.min.js
*/

var Avatar = React.createClass({
  render: function() {
    return (
      <div>
        <PagePic pagename={this.props.pagename} />
        <PageLink pagename={this.props.pagename} />
      </div>
    );
  }
});

var PagePic = React.createClass({
  render: function() {
    return (
      <img src={'https://graph.facebook.com/' + this.props.pagename + '/picture'} />
    );
  }
});

var PageLink = React.createClass({
  render: function() {
    return (
      <a href={'https://www.facebook.com/' + this.props.pagename}>
        {this.props.pagename}
      </a>
    );
  }
});

ReactDOM.render(
  <Avatar pagename="Facebook" />,
  document.getElementById('ex')
);

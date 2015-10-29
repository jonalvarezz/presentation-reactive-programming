
var React = require('react');
var ReactDom = require('react-dom');
var Rx = require('rx');
var http = require('jquery').ajax;

function queryWikipedia(term) {
  return Rx.Observable.fromPromise(
    http({
      url: 'https://en.wikipedia.org/w/api.php',
      dataType: 'jsonp',
      data: {
        action: 'opensearch',
        format: 'json',
        search: encodeURI(term)
      }
    })
    .promise()
  );
}

var App = React.createClass({

  getInitialState: function () {
    return {
      inputText: '',
      results: []
    };
  },

  componentDidMount: function () {
    var _this = this;

    var keyup = Rx.Observable.fromEvent(this.refs.searchInput, 'keyup')
      .pluck('target', 'value')
      .filter(function (text) {
        return text.length > 2;
      })
      .distinctUntilChanged();

    // /* Now debounce the input for 500ms */
    // var debounced = keyups
    //   .debounce(500 /* ms */);

    //  Now get only distinct values, so we eliminate the arrows and other control characters
    // var distinct = debounced
    //   ;

    var suggestions = keyup.flatMapLatest(queryWikipedia);

    suggestions.subscribe(function (data) {
      console.log(data);
    }.bind(this));

  },

  render: function () {
    return (
      <div className="Input-app">
         <input
          type="text"
          value={this.state.inputText}
          placeholder="Search in Wikipedia"
          ref='searchInput'
          onChange={this._onChange}
        />
        <div>
          {this.state.inputText}
        </div>
      </div>
    );
  },

  _onChange: function (event) {
    this.setState({inputText: event.target.value})
  }

});

ReactDom.render(
  <App />,
  document.getElementById('appMount')
);

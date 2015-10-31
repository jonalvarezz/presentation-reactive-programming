
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
      .debounce(200)
      .distinctUntilChanged();

    var suggestions = keyup.flatMapLatest(queryWikipedia);

    suggestions.subscribe(function (data) {
      console.log(data);
      var results = [];
      data[1].forEach(function (result, index) {
        results.push({
          'id': index,
          'keyword': result,
          'description': data[2][index],
          'url': data[3][index]
        });
      });
      this.setState({results: results});
    }.bind(this), function (err) {
      console.log('Something goes wrong.');
    });

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
        <div className="app__contents">
          <ul className="app__list">
            {this.state.results.map(function (result) {
              return (
                <li className="app__item" key={result.id}>
                  <a href={result.url} className="app__item-wrapper" target="_blank">
                    <div>
                      <h4>{result.keyword}</h4>
                      <div className="app__item-desc">
                        {result.description}
                      </div>
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>
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

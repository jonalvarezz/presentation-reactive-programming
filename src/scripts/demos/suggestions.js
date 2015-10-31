
/**
 * Querying the Wikipedia - Suggestion like App
 * This is a simple but powerfull demo that is used as case study featuring
 * some aync problems that sometimes are ignored by developers when building stuff
 * such as unnecesary server request, making so many request and race conditions,
 * leading to potential memory leaks. Jafar Hussain made a great work explaining
 * this here https://youtu.be/XRYN2xt11Ek?t=20m40s
 *
 * I used React to build this Demo but any JS framework o Vanilla JS can be used
 *
 * Highlights
 *  – Creating observables objects from ajax -> promises
 *  – Using operators to transform the input term in a `safe` request
 *  – flatMapLatest(): Transform Observable into Observables. Emmits the most
      recently transformed Observable. Thank you André Staltz
      https://github.com/Reactive-Extensions/RxJS/issues/423#issuecomment-66353152
 */

var React = require('react');
var ReactDom = require('react-dom');
var Rx = require('rx');
var http = require('jquery').ajax;

// Make the Wikipedia query an Observable
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
      // Keep only the values from the event
      .pluck('target', 'value')
      // Just take care if the input text is longer than 2 chars
      .filter(function (text) {
        return text.length > 2;
      })
      // Reduce getting new values to 200ms each
      .debounce(200)
      // Do not emit a change if the value remains the same
      // i.e. user press any other key that is not alphanumeric: nav keys, control, shift...
      .distinctUntilChanged();

    // Transform observable term to Observables promises.
    // flatMapLatest() ensure the rendered response matches the most recently
    // input term.
    var suggestions = keyup.flatMapLatest(queryWikipedia);

    // Process each response.
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

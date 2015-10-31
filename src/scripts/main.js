// Require Node modules in the browser thanks to Browserify: http://browserify.org
var bespoke = require('bespoke'),
  nebula = require('bespoke-theme-nebula'),
  keys = require('bespoke-keys'),
  touch = require('bespoke-touch'),
  backdrop = require('bespoke-backdrop'),
  hash = require('bespoke-hash');

// Bespoke.js
bespoke.from('article', [
  nebula(),
  keys(),
  touch(),
  backdrop(),
  hash()
]);

// Prism syntax highlighting
// This is actually loaded from "bower_components" thanks to
// debowerify: https://github.com/eugeneware/debowerify
require('prism');

// Drag and Drop Example
// s/drop/rolo
require('./demos/drag-and-rolo');

// Wikipedia Demo
require('./demos/suggestions');

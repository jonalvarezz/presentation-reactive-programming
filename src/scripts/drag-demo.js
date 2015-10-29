
// JSBin
// https://jsbin.com/nakuyuyepi/edit?js,output

var Rx = require('rx');

module.exports = (function () {
  var container = document.getElementById('drag-container');
  var drag = document.getElementById('drag-element');

  var containerMouseMove = Rx.Observable.fromEvent(container, 'mousemove');
  var containerMouseUp = Rx.Observable.fromEvent(container, 'mouseup');
  var dragMouseDown = Rx.Observable.fromEvent(drag, 'mousedown');

  var dragging = dragMouseDown
    .flatMap(function (contactPoint) {
      return containerMouseMove.takeUntil(containerMouseUp);
    });

  dragging.subscribe(function (point) {
    drag.style.top = point.pageY + 'px';
    drag.style.left = point.pageX + 'px';
  });


})();

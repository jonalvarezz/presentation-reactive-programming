var Rx = require('rx');

module.exports = (function () {
  var container = document.getElementById('drag-container');
  var drag = document.getElementById('drag-element');

  var containerMouseMove = Rx.Observable.fromEvent(container, 'mousemove');
  var containerMouseUp = Rx.Observable.fromEvent(container, 'mouseup');

  var dragMouseDown = Rx.Observable.fromEvent(drag, 'mousedown');

  var dragging = dragMouseDown
    .flatMap(function (contactPoint) {
      return containerMouseMove
        .map(function (event) {
          event.preventDefault();

          return {
            x: event.clientX,
            y: event.clientY
          }
        })
        .takeUntil(containerMouseUp);
    });

  dragging.subscribe(function (point) {
    console.log(point);
    drag.style.top = point.y + 'px';
    drag.style.left = point.x + 'px';
  });


})();

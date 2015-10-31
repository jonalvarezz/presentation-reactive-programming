
// JSBin Workshop
// https://jsbin.com/nakuyuyepi/edit?js,output

/**
 * Drag & Rolo
 * This demo show how to build a simple Drag&Drop using Reactive Programming
 * with RxJS library.
 *
 * Markup
 * Slide #demo2
 *
 * Highlights
 *  – Creating observables objects from events
 *  – No control variables needed (state machines).
 *  – No if no else
 *  – The code describes what exactly needs to be done: get mouse positions
 *    from mouse down UNTIL mouse up
 *
 * Disclaimer
 * The mouse pointer doesn't match exactly the drag element. It's not the subject
 * of the demo to show how to positioning elements in the viewport.
 */

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

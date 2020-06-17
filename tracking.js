var theta = 0,
  phi = 0,
  lastX1 = 0,
  lastY1 = 0,
  lastX2 = 0,
  lastY2 = 0;
window.onload = function() {
  var video = document.getElementById('video');
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  
  var tracker = new tracking.ColorTracker(['magenta', 'cyan', 'yellow']);
  /*
  var tracker = new tracking.ObjectTracker('face');
  tracker.setInitialScale(4);
  tracker.setStepSize(1);
  tracker.setEdgesDensity(0.1);
  */
  tracking.track('#video', tracker, {
    camera: true
  });
  tracker.on('track', function(event) {
    context.clearRect(0, 0, canvas.width, canvas.height);

    event.data.forEach(function(rect) {
      context.strokeStyle = '#a64ceb';
      context.strokeRect(rect.x, rect.y, rect.width, rect.height);
      context.font = '16px Helvetica';
      context.fillStyle = "#fff";
      context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
      context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
      ///for color
      deg = (((rect.x + lastX1 + lastX2) / 3) - 260) * 0.3461;
      theta = -(Math.PI / 180) * deg;
      deg = (((rect.y + lastY1 + lastY2) / 3) - 200) * 0.45;
      phi = -(Math.PI / 180) * deg;

      ///for face
      /*deg = ( ((rect.x + lastX1 + lastX2)/3) - 120)*0.75;
      theta = -(Math.PI/180)*deg;
      deg = ( ((rect.y + lastY1 + lastY2)/3) -70)*1.28571428571;
      phi = -(Math.PI/180)*deg;*/

      lastX2 = lastX1;
      lastY2 = lastY1;

      lastX1 = rect.x;
      lastY1 = rect.y;

    });
  });
  /*var gui = new dat.GUI();
  gui.add(tracker, 'edgesDensity', 0.1, 0.5).step(0.01);
  gui.add(tracker, 'initialScale', 1.0, 10.0).step(0.1);
  gui.add(tracker, 'stepSize', 1, 5).step(0.1);*/
};

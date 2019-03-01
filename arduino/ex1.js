var five = require("johnny-five"),
  board, potentiometer;

board = new five.Board();

board.on("ready", function() {

  // Create a new `potentiometer` hardware instance.
  potentiometer = new five.Sensor({
    pin: "A3",
    freq: 50
  });

  var servo = new five.Servo(10);

  // Inject the `sensor` hardware into
  // the Repl instance's context;
  // allows direct command line access
  board.repl.inject({
    pot: potentiometer,
    servo: servo
  });

  // "data" get the current reading from the potentiometer
  potentiometer.on("data", function() {
    
    //sev code

    var deg = this.value * 180 / 1023;

    servo.to( deg );


  });
});
var start = 0;
var stop = 0;
var interval = 0;
var fcInterval = 0;
var timerRunning = 0;
var firstCrack = 0;

$("#start-button").click(function() {
  if (interval == 0) {
    start = new Date().getTime();
  }

  if (timerRunning == 1) {
    timerRunning = 2;
    stop = new Date().getTime();
    $(this).text("Reset");
    $(this).removeClass("btn-danger");
    $(this).addClass("btn-warning");

    clearInterval(interval);
    clearInterval(fcInterval);
  } else if (timerRunning == 2) {
    start = 0;
    stop = 0;
    interval = 0;
    fcInterval = 0;
    timerRunning = 0;
    firstCrack = 0;
    $(this).text("Start");
    $(this).removeClass("btn-warning");
    $(this).addClass("btn-primary");
    $(".jumbotron h1#timer").text("00:00:000");
    $("#first-crack").text("First Crack: ");
    $("#development-time").text("Development Time: ");
    $("#development-time").removeClass("label-warning");
    $("#development-time").removeClass("label-danger");
    $("#low").text("20.0%: ");
    $("#mid").text("22.5%: ");
    $("#high").text("25.0%: ");
  } else {
    timerRunning = 1;
    $(this).text("Stop");
    $(this).removeClass("btn-primary");
    $(this).addClass("btn-danger");

    interval = setInterval(function() {
      $(".jumbotron h1#timer").text(timeToString(new Date().getTime() - start));
    }, 15)
  }
});

$("#first-crack-button").click(function() {
  if (start != 0 && timerRunning == 1) {
    firstCrack = new Date().getTime();
    $("#first-crack").addClass("label-success");
    $("#first-crack").text("First Crack: " + timeToString(firstCrack - start));
    $("#firstCrackButtons").toggle();
    $("#development-time").removeClass("label-warning");
    $("#development-time").removeClass("label-danger");

    fcInterval = setInterval(function() {
      var firstCrackMillis = firstCrack - start;
      var firstCrackSeconds = Math.floor(firstCrackMillis / 1000);
      var currentTimeMillis = new Date().getTime() - start;
      var currentTimeSeconds = Math.floor(currentTimeMillis / 1000);
      var developmentTime = ((1 - (firstCrackSeconds / currentTimeSeconds)) * 100).toFixed(2);

      $("#development-time").text("Development Time: " + developmentTime);
      if (developmentTime > 15) {
        $("#development-time").addClass("label-warning");
      }
      if (developmentTime > 20) {
        $("#development-time").addClass("label-danger");
      }
    }, 1000)

    var developmentTimeMillis = firstCrack - start;
    $("#low").text("20.0%: " + timeToString(developmentTimeMillis / .8));
    $("#mid").text("22.5%: " + timeToString(developmentTimeMillis / .775));
    $("#high").text("25.0%: " + timeToString(developmentTimeMillis / .75));
  }
});

function timeToString(millis) {
  millis = Math.round(millis);
  var timeSeconds = Math.floor(millis / 1000);
  var timeMinutes = Math.floor(timeSeconds / 60);
  var timeMillis = millis.toString().slice(-3);

  if (timeMillis < 10) {
    timeMillis = "0" + timeMillis;
  }
  if (timeMillis > 999) {
    timeMillis = "000";
  }
  if (timeSeconds > 59) {
    timeSeconds = timeSeconds - (timeMinutes * 60);
  }
  if (timeSeconds < 10) {
    timeSeconds = "0" + timeSeconds;
  }
  if (timeMinutes < 10) {
    timeMinutes = "0" + timeMinutes;
  }

  return timeMinutes + ":" + timeSeconds + ":" + timeMillis;
}
var numOfPomodoros = 1;

function initialize() {
    document.getElementById("pauseButton").style.display = "inline-block";
    document.getElementById("pauseButton").style.display = "none";
    document.getElementById("continueButton").style.display = "none";
    document.getElementById("stopButton").style.display = "none";
}

function startMainTimer() {
    document.getElementById("timer").innerHTML = "25:00";

    var initialTime = Date.now();

    var tick = setInterval(function countdown() {
        var timePassed = 10 - ((Date.now() - initialTime) / 1000 | 0);

        var minutes = (timePassed / 60) | 0;
        var seconds = (timePassed % 60) | 0;

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        document.getElementById("timer").innerHTML = minutes + ":" + seconds;

        if (timePassed == 0 && numOfPomodoros < 2) {
            clearInterval(tick);
            startShortBreakTimer();
        } else if (timePassed == 0) {
            clearInterval(tick);
            startLongBreakTimer();  
        } 

    }, 1000);
}

function startShortBreakTimer() {

    var initialTime = Date.now();
    var tick = setInterval(function countdown() {
        document.getElementById("timer").innerHTML = "5:00";

        var timePassed = 6 - ((Date.now() - initialTime) / 1000 | 0);

        var minutes = (timePassed / 60) | 0;
        var seconds = (timePassed % 60) | 0;

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        document.getElementById("timer").innerHTML = minutes + ":" + seconds;

        if (timePassed == 0) {
            clearInterval(tick);
            numOfPomodoros++;
            startMainTimer();
        }

    }, 1000);
}

function startLongBreakTimer() {

    var initialTime = Date.now();
    var tick = setInterval(function countdown() {
        document.getElementById("timer").innerHTML = "5:00";

        var timePassed = 16 - ((Date.now() - initialTime) / 1000 | 0);

        var minutes = (timePassed / 60) | 0;
        var seconds = (timePassed % 60) | 0;

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        document.getElementById("timer").innerHTML = minutes + ":" + seconds;

        if (timePassed == 0) {
            clearInterval(tick);
            numOfPomodoros = 0;
            startMainTimer();
        }

    }, 1000);
}

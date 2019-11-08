var numOfPomodoros = 1;
var timeRemainingGlobal = 0;
var tick;

function initialize() {
    document.getElementById("task").style.display = "inline-block";
    document.getElementById("timer").style.display = "none";
    document.getElementById("startButton").style.display = "none";
    document.getElementById("pauseButton").style.display = "none";
    document.getElementById("continueButton").style.display = "none";
    document.getElementById("stopButton").style.display = "none";
}

function enterTask() {
    if (event.keyCode === 13) {
        setupTimer();
    }
}

function setupTimer() {
    document.getElementById("task").disabled = true;
    document.getElementById("timer").innerHTML = "25:00";
    document.getElementById("startButton").style.display = "inline-block";
    document.getElementById("pauseButton").style.display = "none";
    document.getElementById("continueButton").style.display = "none";
    document.getElementById("task").style.display = "inline-block";
    document.getElementById("timer").style.display = "inline-block";
}

function startTimer(timeSet) {
    document.getElementById("startButton").style.display = "none";
    document.getElementById("pauseButton").style.display = "inline-block";
    var initialTime = Date.now() + 1000;

    tick = setInterval(function countdown() {
        var timePassed = timeSet - ((Date.now() - initialTime) / 1000 | 0);

        var minutes = (timePassed / 60) | 0;
        var seconds = (timePassed % 60) | 0;

        timeRemainingGlobal = minutes * 60 + seconds;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        document.getElementById("timer").innerHTML = minutes + ":" + seconds;

        // 25 IS MAIN
        // 15 IS LONG
        // 5 IS SHORT
        if (timePassed == 0) {
            if (timeSet == 15) {
                // LONG BREAK
                clearInterval(tick);
                numOfPomodoros = 0;
                startTimer(25);
            } else if (timeSet == 5) {
                // SHORT BREAK
                clearInterval(tick);
                numOfPomodoros++;
                startTimer(25);
            } else {
                // MAIN 
                clearInterval(tick);
                if (numOfPomodoros < 2) {
                    startTimer(5);
                } else {
                    startTimer(15);
                }
            }
        }
    }, 1000);
}

function pauseTimer() {
    document.getElementById("pauseButton").style.display = "none";
    document.getElementById("continueButton").style.display = "inline-block";
    document.getElementById("stopButton").style.display = "inline-block";
    clearInterval(tick);
}

function continueTimer() {
    document.getElementById("pauseButton").style.display = "inline-blank";
    document.getElementById("continueButton").style.display = "none";
    document.getElementById("stopButton").style.display = "none";
    startTimer(timeRemainingGlobal);
}

function stopTimer() {
    document.getElementById("task").disabled = false;
    document.getElementById("task").value="";
    initialize();
    clearInterval(tick);
}

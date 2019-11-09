var numOfPomodoros = 1;
var timeRemainingGlobal = 0;
var tick;

/*Stolen from stackoverflow
var asparagusNodeList = document.querySelectorAll(".asparagus");
var classes = Array.prototype.map.call(asparagusNodeList, function(element) {
    return element.value;
});
*/

const LONG_BREAK_TIME = 15; 
const SHORT_BREAK_TIME = 5;
const WORK_TIME = 10;

var asparaguses = document.getElementsByClassName("asparagus");

function clearPomodoroNumber() {
    for (asparagusNum = 1; asparagusNum < asparaguses.length; asparagusNum++) {
        asparaguses[asparagusNum].style.display = "none";
    }
}
function initialize() {
    clearPomodoroNumber();
    document.getElementById("checkboxInput").style.display = "none";
    document.getElementById("checkbox").checked = false;
    document.getElementById("task").style.display = "inline-block";
    document.getElementById("timer").style.display = "none";
    document.getElementById("startButton").style.display = "none";
    document.getElementById("pauseButton").style.display = "none";
    document.getElementById("continueButton").style.display = "none";
    document.getElementById("stopButton").style.display = "none";
}

function enterTask() {
    if (event.keyCode === 13) {
        document.getElementById("checkboxInput").style.display = "inline-block";
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

        // 10 IS MAIN
        // 15 IS LONG
        // 5 IS SHORT
        if (timePassed == 0) {
            if (timeSet == LONG_BREAK_TIME) {
                // LONG BREAK
                clearInterval(tick);
                numOfPomodoros = 1;
                clearPomodoroNumber();
                startTimer(WORK_TIME);
            } else if (timeSet == SHORT_BREAK_TIME) {
                // SHORT BREAK
                clearInterval(tick);
                numOfPomodoros++;
                asparaguses[numOfPomodoros-1].style.display = "inline-block";
                startTimer(WORK_TIME);
            } else {
                // MAIN 
                clearInterval(tick);
                if (numOfPomodoros < 5) {
                    startTimer(SHORT_BREAK_TIME);
                } else {
                    startTimer(LONG_BREAK_TIME);
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
    clearPomodoroNumber();
    document.getElementById("task").disabled = false;
    document.getElementById("task").value = "";
    initialize();
    clearInterval(tick);
}

var numOfPomodoros = 1;

function initialize() {
    document.getElementById("timer").innerHTML = "25:00";
    document.getElementById("startButton").style.display = "inline-block";
    document.getElementById("pauseButton").style.display = "none";
    document.getElementById("continueButton").style.display = "none";
    document.getElementById("stopButton").style.display = "none";
}

function startTimer(timeSet) {
    document.getElementById("startButton").style.display = "none";
    document.getElementById("pauseButton").style.display = "inline-block";
    var initialTime = Date.now() + 1000;

    var tick = setInterval(function countdown() {
        var timePassed = timeSet - ((Date.now() - initialTime) / 1000 | 0);

        var minutes = (timePassed / 60) | 0;
        var seconds = (timePassed % 60) | 0;

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




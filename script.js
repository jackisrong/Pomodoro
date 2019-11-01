function initialize() {
    document.getElementById("pauseButton").style.display = "inline-block";
    document.getElementById("pauseButton").style.display = "none";
    document.getElementById("continueButton").style.display = "none";
    document.getElementById("stopButton").style.display = "none";
}

function startTimer() {
    var initialTime = Date.now();

    var tick = setInterval(function countdown() {
        var timePassed = 25 * 60 - ((Date.now() - initialTime) / 1000 | 0);

        var minutes = (timePassed / 60) | 0;
        var seconds = (timePassed % 60) | 0;

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        document.getElementById("timer").innerHTML = minutes + ":" + seconds;

        if (timePassed == 0) {
            clearInterval(tick);
            console.log("End of time!");
        }

    }, 1000);
}



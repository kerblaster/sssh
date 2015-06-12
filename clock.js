var stop = false;
var endingText;

function startTimer(duration, display) {
	var timer = duration, minutes, seconds;
    var clock = setInterval(function () {
    	if (stop){
    		clearInterval(clock);
    	}
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;
        
        if (endingText == "DISQUALIFIED" && minutes <= 4){	//for dq.html; 4 bc it counts 4:59
            setTimeout(function(){
            	display.textContent = "One Match Loss"
            }, 500)
        }

        if (timer <= 0){
        	endText();
        	clearInterval(clock);
        }
        else{
            timer--;
        }
    }, 1000);
}

function endText(){
	setInterval(function(){
		var textDiv = document.getElementById("time").style;	//save div
		document.getElementById("time").innerHTML = endingText;
		var background = document.getElementById("clock").style; //was main div before
		if (textDiv.color == "red"){
			textDiv.color = "white";
			background.background = "red";
			//console.log("1-font="+textDiv.color+"| bg="+background.background);
		}
		else {//textDiv.color == white
			textDiv.color = "red";
			background.background = "white";
			//console.log("2-font="+textDiv.color+"| bg="+background.background);
		}
	}, 500);
}

function countdown(seconds, msg) {
	endingText = msg;	//constructor
	document.getElementById("timerButton").style.display="none";
    display = document.querySelector('#time');
    stop = false;
    startTimer(seconds, display);
}

function resetTimer(){
	parent.location='';	//refresh
	/*stop = true;				
	setTimeout(function(){
		document.querySelector('#time').textContent = "00:00";
	}, 1000);*/
}
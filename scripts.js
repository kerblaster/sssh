/*Cookie list:
title = smash64,melee,brawl,pm,smash4
headerText = text in header/status
bestOf = BO1/BO3...
event=SINGLES/DOUBLES
left_character = playing character name
right_character = playing character name
left_winsLeft = int wins left (count down; stops when 0)
right_winsLeft = int wins left (count down; stops when 0)
left_stagesWon = array of stages won
right_stagesWon = array of stages won
saveData = array of data
winner = string winner (left/right)
gameCounter = start at 1; 1++ for every game
game_1 = game data
game_2 = in format: FOX vs falco in Final Destination
game_3 = winner in caps
game_4 = left on left side of vs (vice versa)
game_5 = title of map after in
chooser = person's turn to choose stage/port etc
stage = name of stage currently playing on
ban = what stage was banned previously
time = int of sec of time elapsed
*/

var version = "v.2.0.0";
var lastModified = "7/22/15"

function credits(){
	alert("Smash Set Helper "+getVersion()+"\n\nCreated by: Renard Tumbokon\nTag: Kerblaster\n\nLast Modified: "+ getLastModified());
}

function getVersion(){	//<span id="version" onload="getVersion()"></span>
	document.getElementById("version").innerHTML=version;	//update strings
	//console.log(version);
	return version;	
}
function getLastModified(){	//<span id="lastModified" onload="getLastModified()"></span>
	document.getElementById("lastModified").innerHTML=lastModified;
	//console.log(lastModified);
	return lastModified;
}

function home(){
	if (confirm("Confirm to main screen?\nAll current set data will be lost") == true){// ok pressed
		clearListCookies('../index.html');	//clear all cookies and send to index
	}
}

function counterpickAlert(){
	alert("This is a counterpick (not a neutral) stage,\nmeaning it is automatically banned and is not available to be picked unless mutually agreed upon during the Stage Striking phase.");
}

function rng() {	//returns string
	var rand = Math.floor((Math.random()*2)+1);	//1 or 2
	//alert("random 1 or 2: " + rand);	//debug
	if (rand == 1){
		return "left";
	}
	else{
		return "right";
	}
}

function vsCharacter(opponent){	//tells other player what character other player chose
	var cookieWinner = getCookie("winner");
	var gameCounter = getCookie("gameCounter");
	if (gameCounter > 1){ //display info after game 1
		var text = document.getElementById('instructions').innerHTML;
		if (cookieWinner == opponent){	//display winner's character and stage + highlight char
			if (cookieWinner == "left"){
				var leftChar = getCookie("left_character");
				document.getElementById('instructions').innerHTML = "<b>Game: " + getCookie("gameCounter") +" - vs. " + leftChar +"<br>on "+ getCookie("stage") +"</b><hr>"+ text;
				//highlight borders
				var event = getCookie("event");
				if (event == "SINGLES"){
					document.getElementById(leftChar).style.border = "5px solid red";	//highlight opponent
				}
				else if (event == "DOUBLES"){
					var leftCharArray = leftChar.split("/");	//make array into both opponents
					document.getElementById(leftCharArray[0]).style.border = "5px solid red";	//highlight opponent
					document.getElementById(leftCharArray[1]).style.border = "5px solid red";	//highlight opponent
				}
				else{alert("vsCharacter(); event="+event);}
			}
			else if (cookieWinner == "right"){
				var rightChar = getCookie("right_character");
				document.getElementById('instructions').innerHTML = "<b>Game: " + getCookie("gameCounter") +" - vs. " + rightChar +"<br>on "+ getCookie("stage") +"</b><hr>"+ text;
				//highlight borders
				var event = getCookie("event");
				if (event == "SINGLES"){
					document.getElementById(rightChar).style.border = "5px solid red";	//highlight opponent
				}
				else if (event == "DOUBLES"){
					var rightCharArray = rightChar.split("/");	//make array into both opponents
					document.getElementById(rightCharArray[0]).style.border = "5px solid red";	//highlight opponent
					document.getElementById(rightCharArray[1]).style.border = "5px solid red";	//highlight opponent
				}
				else{alert("vsCharacter(); event="+event);}
			}
		}
		else{	//if (cookieWinner != opponent) => display stage ONLY
			document.getElementById('instructions').innerHTML = "<b>Game: " + getCookie("gameCounter") +" - <br>on "+ getCookie("stage") +"</b><hr>"+ text;
		}
	}//else cookieWinner == null => leave default be

}

function getMatchup(){	//return string of "x vs y"
	var left = getCookie("left_character");
	var right = getCookie("right_character");
	return left + " vs. " + right;
}

function switchChooser(){ 	 //returns opposite chooser
	var initial = getCookie("chooser"); 
	if (initial == "left"){
		setCookie("chooser","right");	//switch
		return "right";
	}
	else if (initial == "right"){
		setCookie("chooser","left"); //switch
		return "left";
	}
	else{
		alert("error: switchChooser()");
	}
}

function opposite(way){	//returns left or right
	if (way == "left"){
		return "right";
	}
	else if (way == "right"){
		return "left";
	}
	else{
		alert("error: opposite("+way+")");
	}
}

function matchDetails(){
	var gameCounter = getCookie("gameCounter");
	var stage = getCookie("stage");
	var leftChar = getCookie("left_character");	//checks if char exists (not matter if left or right)
	if (leftChar == "null" && stage == "null"){
		return "<b>Game: " + gameCounter + "</b><hr>";
	}
	else if (leftChar != "null" && stage == "null"){	//stage NOT declared
		return "<b>Game: " + gameCounter + " - " + getMatchup() +"</b><hr>";
	}
	else if (leftChar == "null" &&  stage != "null"){	//characters not declared
		return "<b>Game: " + gameCounter +"<br>on "+stage+"</b><hr>";
	}
	else{	//has stage info + char info
		return "<b>Game: " + gameCounter + " - " + getMatchup() +"<br>on "+stage+"</b><hr>";
	}	//note: <hr> auto line breaks

}

function mutual(){//when mutual agreement on stage is pressed
	var otherPlayer = getCookie("chooser");	//find other player to add to confirm message
	if (otherPlayer == "left"){
		otherPlayer = "right";
	}
	else if (otherPlayer == "right"){
		otherPlayer = "left";
	}
	else{
		alert("error: mutualAgreement(); otherPlayer = "+otherPlayer);	//error
	}
	if (confirm("Mention what banned stage you propose to play on.\nDoes the " + otherPlayer +" "+ teamPlayer() + " approve of mentioned stage?") == true){// ok pressed
		setCookie("stage","Mutual Agreement");
		var gameCounter = getCookie("gameCounter");
		var prevWinner = getCookie("winner");
		if (gameCounter == 1){	//game1
			parent.location='game.html';
		}
		else if (gameCounter > 1){	//game2+ from stageStriking() on stagePick.html
			//send to character select
			if (prevWinner == "left"){	//prev winner chooses character first
				parent.location='characterSelectLeft.html';
			}
			else if (prevWinner == "right"){
				parent.location='characterSelectRight.html';
			}
			else{
				alert("error: mutualAgreement(); winner="+winner);	//error
			}
		}
		else{
			alert("error: mutualAgreement(); gameCounter = "+gameCounter); //error
		}
	}
}

////////////////////////////
//Onload functions 
////////////////////////////

function iscroll(){	//scroll gracefully
	var myScroll;
	loaded();
	function loaded () {
		myScroll = new IScroll('#wrapper', { scrollX: true, mouseWheel: true, click: true });
	}
	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
}

function refreshHeader(){	//onLoad
	//change header
	var headerText = getCookie("headerText");
	document.getElementById('status').innerHTML=headerText;		
	//Change body color
	var title = getCookie("title");
	var bgColor = "black";
	if (title == "smash64"){
		bgColor = "#181818";
	}
	else if (title == "melee"){
		bgColor = "#000a18";
	}
	else if (title == "brawl"){
		bgColor = "#dfdfdf";	
	}
	else if (title == "pm"){
		bgColor = "#0b0a44";
	}
	else if (title == "smash4"){
		bgColor = "#dcdbfd";
	}
	document.body.style.backgroundColor = bgColor;	//bg for body
	document.getElementById('wrapper').style.backgroundColor = bgColor;	//bg for main
	var charBorder = document.getElementsByClassName('buttonChar'); //array //bg for char
	for (var x = 0; x < charBorder.length; x++){
		charBorder[x].style.borderColor = bgColor;
	}	
	var stageBorder = document.getElementsByClassName('buttonStage'); //array	//bg for stage
	for (var x = 0; x < stageBorder.length; x++){
		stageBorder[x].style.borderColor = bgColor;
	}	
	
	//onload advertisement for $$$$$
	//onLoadAd();	//make sure html page has access to admob.js
	
	//make all "back" history url redirect.html
	history.replaceState(null, "Redirect", "versus.html");	
}
	
function refreshScore(){	//refresh left and right score div
	var leftScore = getCookie("left_winsLeft");
	var rightScore = getCookie("right_winsLeft");
	var bestOf = getCookie("bestOf");
	if (bestOf == "BO1"){
		leftScore = 1-leftScore;
		rightScore = 1-rightScore;
	}
	else if (bestOf == "BO3"){
		leftScore = 2-leftScore;
		rightScore = 2-rightScore;
	}
	else if (bestOf == "BO5"){
		leftScore = 3-leftScore;
		rightScore = 3-rightScore;
	}
	else{
		alert("refreshScore();bestOf="+bestOf);	//error
	}
	document.getElementById('leftScore').innerHTML = leftScore;
	document.getElementById('rightScore').innerHTML = rightScore; 
}

function squarify(element, numFitInRow){						//for characterSelect
	main();
	function main(){
		var width = window.innerWidth;
		width = (Math.floor(width/numFitInRow));	//-(getScrollBarWidth()/numFitInRow)
		var nodes = document.querySelectorAll(element);				//loop all buttonChar
		for (var i = 0; i < nodes.length; i++){
			nodes[i].style.height = width+"px";
			nodes[i].style.width = width+"px";
		}
	}
	window.addEventListener("resize",function(){
		main();
	});
	//alert("width/height: "+width+" element: "+css);
}

function rectanglify(element, numFitInRow){						//for characterSelect
	main();
	function main(){
		var width = window.innerWidth;
		width = (Math.floor(width/numFitInRow));	//-(getScrollBarWidth()/numFitInRow)
		var nodes = document.querySelectorAll(element);				//loop all buttonChar
		for (var i = 0; i < nodes.length; i++){
			nodes[i].style.height = (width/2)+"px";
			nodes[i].style.width = width+"px";
		}
	}
	window.addEventListener("resize",function(){ 	//listen for resize
		main();
	});
	//alert("width/height: "+width+" element: "+css);
}

function turnBoxPoint(){	//makes turnBox arrows point way=left/right
	var way = getCookie("chooser");
	document.getElementById('turnBox').innerHTML = "<font style='text-transform: capitalize;'>" +way+" "+ teamPlayer()+": </font>";
	if (way == "left"){
		document.getElementById('turnBox').style.backgroundImage = "url('../images/pointerLeft.png')";
	}
	else if (way == "right"){
		document.getElementById('turnBox').style.backgroundImage = "url('../images/pointerRight.png')";
	}
	else{
		alert("error: turnBoxPoint("+way+")");
	}
}

function boxPoint(way){	//makes turnBox arrows point to way=left/right
	var chooser = getCookie("chooser");
	setCookie("chooser",way); //make chooser cookie reflect pointer; not affect anything below
	document.getElementById('turnBox').innerHTML = "<font style='text-transform: capitalize;'>" +way+" "+teamPlayer()+": </font>";
	if (way == "left"){
		document.getElementById('turnBox').style.backgroundImage = "url('../images/pointerLeft.png')";
	}
	else if (way == "right"){
		document.getElementById('turnBox').style.backgroundImage = "url('../images/pointerRight.png')";
	}
	else{
		alert("error: turnBoxPoint("+way+")");
	}
}

function flashingText(element, color1, color2){	//flash ACTIVE GAME during game.html
	//color1 = text, color2 = bgcolor
	setInterval(function(){
		var textDiv = document.getElementById(element).style;	//save div
		var background = document.getElementById(element).style; //was main div before
		if (textDiv.color == color1){
			textDiv.color = color2;
			background.background = color1;
			//console.log("1-font="+textDiv.color+"| bg="+background.background);
		}
		else {//textDiv.color == color2
			textDiv.color = color1;
			background.background = color2;
			//console.log("2-font="+textDiv.color+"| bg="+background.background);
		}
	},500);
}

function time(){	//gets cookie in seconds and returns to min:sec
	var time = getCookie("time");
	setInterval(function(){ 
		time++;	//add second
		//console.log("time="+time);
		setCookie("time",time);
	}, 1000);
}
function getTime(){	//return string of XX:XX
	var time = getCookie("time"); 
	var min = Math.floor(time/60);	//round down to the minute
	var sec = time-(60*min);
	if (sec < 10){
		sec = "0"+sec;
	}
	return min+":"+sec;
}
function secToMin(seconds){	//return string of XX:XX
	var time = seconds;
	var min = Math.floor(time/60);	//round down to the minute
	var sec =  time-(60*min);
	if (sec < 10){
		sec = "0"+sec;
	}
	return min+":"+sec;
}
////////////////////////////
//segue functions that save
////////////////////////////
function saveSmashTitle(title){
	setCookie("title",title);
	setCookie("headerText",title.toUpperCase());
	refreshHeader();
}

function saveEvent(event){
	setCookie("event",event);							//save info
	var title = document.getElementById('status').innerHTML; //update header
	setCookie("headerText",title+">"+event); 
	parent.location='bestOf.html';								//next segue
}

function saveBestOf(bestOf){
	setCookie("bestOf",bestOf); 	//save info
	var textTemp = getCookie("headerText") + ">" + bestOf; //update header
	setCookie("headerText",textTemp);	
	
	setCookie("winner","null");	//create variables
	setCookie("stage","null");
	setCookie("ban","null");
	setCookie("left_character","null");	
	setCookie("right_character","null");	
	setCookie("left_stagesWon","null");
	setCookie("right_stagesWon","null");
	setCookie("gameCounter","1");
	setCookie("time","0");
	setCookie("chooser","left");	//left picks character first
	if (bestOf == "BO1"){	//has to win 1 (decreases)
		setCookie("left_winsLeft","1");
		setCookie("right_winsLeft","1");
		setCookie("game_1","null");	
	}
	if (bestOf == "BO3"){ 	//has to win 2 (decreases)
		setCookie("left_winsLeft","2");
		setCookie("right_winsLeft","2");	
		setCookie("game_1","null");
		setCookie("game_2","null");
		setCookie("game_3","null");
	}
	if (bestOf == "BO5"){	//has to win 3 (decreases)
		setCookie("left_winsLeft","3");
		setCookie("right_winsLeft","3");
		setCookie("game_1","null");
		setCookie("game_2","null");
		setCookie("game_3","null");
		setCookie("game_4","null");
		setCookie("game_5","null");
	}
	
	parent.location='characterSelectLeft.html';	//next segue
	//start with leftPlayer->rightPlayer, not matter bc  both picks are blind
}

function saveLeftChar(character){
	if (confirm("Choose: "+character+"?") == true){// ok pressed
		document.getElementById(character).style.border = "5px solid #00EE00"; //turn border green
		//save array/character
		var savedChar = getCookie("left_character");
		if (savedChar != "null"){	//if has another char saved
			setCookie("left_character",savedChar+"/"+character);	//add array of cookie
		}
		else {	//savedChar == null //no other char saved
			setCookie("left_character",character);	//add cookie
		}
		//if teams
		var event = getCookie("event");
		var characterArray = getCookie("left_character").split("/");	//make array
		if (event == "DOUBLES"){
			if (characterArray.length == 1){	//only 1 char chosen
				location.href = "#top"; 	//scroll to top
				return;	//stop function; force another char to be chosen
			}
			else if (characterArray.length == 2){	//2 characters chosen (complete)
				var cookieWinner = getCookie("winner");	
				switchChooser();
				if (cookieWinner == "right"){	//confirmation screen (not cookie(rightPlayer) to prevent next game overlap
					//right already chose character
					parent.location='game.html';	//start game
				}
				else{ //if null(bc initial picks) or if left is prev winner
					//right not choose character yet
					parent.location='characterSelectRight.html';
				}
			}
		}
		//if singles
		else if(event == "SINGLES"){
			var cookieWinner = getCookie("winner");	
			switchChooser();
			if (cookieWinner == "right"){	//confirmation screen (not cookie(rightPlayer) to prevent next game overlap
				//right already chose character
				parent.location='game.html';	//start game
			}
			else{ //if null(bc initial picks) or if left is prev winner
				//right not choose character yet
				parent.location='characterSelectRight.html';
			}
		}
		else{
			alert("error: saveLeftChar("+character+")");
		}	
	}
}

function saveRightChar(character){
	if (confirm("Choose: "+character+"?") == true){// ok pressed
		document.getElementById(character).style.border = "5px solid #00EE00"; //turn border green
		//save array/character
		var savedChar = getCookie("right_character");
		if (savedChar != "null"){	//if has another char saved
			setCookie("right_character",savedChar+"/"+character);	//add array of cookie
		}
		else {	//savedChar == null //no other char saved
			setCookie("right_character",character);	//add cookie
		}
		//if teams
		var event = getCookie("event");
		var characterArray = getCookie("right_character").split("/");	//make array
		if (event == "DOUBLES"){
			if (characterArray.length == 1){	//only 1 char chosen
				location.href = "#top"; 	//scroll to top
				return;	//stop function; force another char to be chosen
			}
			else if (characterArray.length == 2){	//2 characters chosen (complete)
				var cookieWinner = getCookie("winner");	
				if (cookieWinner == "null"){	//game 1 ONLY
					//left already chose character
					parent.location='electPort.html';	//rps
				}
				else if (cookieWinner == "left"){ //game 2+
					switchChooser();
					parent.location='game.html';	//start game
				}
				else{//if right is prev winner, left not choose yet
					switchChooser();
					parent.location='characterSelectLeft.html';
				}
			}
		}
		else if(event == "SINGLES"){
			var cookieWinner = getCookie("winner");	
			if (cookieWinner == "null"){	//game 1 ONLY
				//left already chose character
				parent.location='electPort.html';	//rps
			}
			else if (cookieWinner == "left"){ //game 2+
				switchChooser();
				parent.location='game.html';	//start game
			}
			else{//if right is prev winner, left not choose yet
				switchChooser();
				parent.location='characterSelectLeft.html';
			}
		}
		else{
			alert("error: saveLeftChar("+character+")");
		}	
	}
}

function savePort(choice){
	var chooser = getCookie("chooser");
	if (choice == "stage"){
		//rps stage pick
		parent.location='stageBansInitial.html';
	}
	else if (choice == "port"){
		//opponent of rps stage pick
		switchChooser();
		parent.location='stageBansInitial.html';
	}
	else{
		alert("error: savePort("+choice+")");
	}
}

function winGame(winner,startTime){
	//hide to prevent 2 wins in 1 game bug
	document.getElementById('leftCharacter').style.display = "none";
	document.getElementById('rightCharacter').style.display = "none";
	//set winner cookie
	setCookie("winner",winner);	
	//add stages won array
	if (winner == "left"){
		stagesWon = getCookie("left_stagesWon");
		currStage = getCookie("stage");
		if (stagesWon == "null"){	//if first time winning
			setCookie("left_stagesWon",currStage);
		}
		else{	//if 2nd+ time winning
			setCookie("left_stagesWon",stagesWon+","+currStage);
		}
	}
	else if (winner == "right"){
		stagesWon = getCookie("right_stagesWon");
		currStage = getCookie("stage");
		if (stagesWon == "null"){	//if first time winning
			setCookie("right_stagesWon",currStage);
		}
		else{	//if 2nd+ time winning
			setCookie("right_stagesWon",stagesWon+","+currStage);
		}		
	}
	else{
		alert("error: winGame("+winner+") #1");	//error
	}
	//save data into comma'd array cookie
	var leftCharacter = getCookie("left_character");
	var rightCharacter = getCookie("right_character");
	var stage = getCookie("stage");
	var ban = getCookie("ban");
	var gameDuration = getCookie("time");	//time data
	gameDuration = gameDuration-startTime; //get time difference from start to end game
	var gameCounter = getCookie("gameCounter");	
	var gameData = leftCharacter+","+rightCharacter+","+winner+","+stage+","+gameDuration+","+ban;	//**array of save data
		//console.log("Game data array = "+gameData);
	if (gameCounter == "1"){ //save data: game_1=left,right,winner,stage,gameDuration,banned stage
		setCookie("game_1",gameData);	
	}
	else if (gameCounter == "2"){
		setCookie("game_2",gameData);	
	}
	else if (gameCounter == "3"){
		setCookie("game_3",gameData);	
	}
	else if (gameCounter == "4"){
		setCookie("game_4",gameData);	
	}
	else if (gameCounter == "5"){
		setCookie("game_5",gameData);	
	}
	else{
		alert("error: winGame(); gameCounter="+gameCounter);
	}
	//clear data
	setCookie("stage","null");
	setCookie("ban","null");
	setCookie("left_character","null");
	setCookie("right_character","null");
	//check if set is over
	var leftWinsLeft = getCookie("left_winsLeft");
	var rightWinsLeft = getCookie("right_winsLeft");
	if (winner == "left"){
		leftWinsLeft--;
	}
	else if (winner = "right"){
		rightWinsLeft--;
	}
	else{
		alert("error: winGame("+winner+") #2");	//error
	}
	if (leftWinsLeft == 0 || rightWinsLeft == 0){	//***set is won***
		setCookie("left_winsLeft",leftWinsLeft);
		setCookie("right_winsLeft",rightWinsLeft);
		parent.location='postGame.html';	//NTS: make this page with info: winner, game_1/2/3
	}
	else{
	//else, update win cookies,game counter + go to stage pick
		gameCounter++;
		setCookie("gameCounter",gameCounter);
		setCookie("left_winsLeft",leftWinsLeft);
		setCookie("right_winsLeft",rightWinsLeft);
		parent.location='stagePick.html';
	}
}

////////////////////
//Translating text functions
////////////////////

function teamPlayer(){	//returns string "Player" or "Team"
	var event = getCookie("event");
	if (event == "SINGLES"){
		return "Player";
	}
	else if (event == "DOUBLES"){
		return "Team";
	}
	else{
		alert("error: teamPlayer(); event="+event);
	}
}

function translateStage(stage){
	var translated;
	var title = getCookie("title");
	if (title == "smash64"){
		if (stage == "cj"){		//initials -> name
			translated="Congo Jungle";	
		}
		else if (stage == "dl"){
			translated="Dream Land";
		}
		else if (stage == "hc"){
			translated="Hyrule Castle";
		}
		else if (stage == "pc"){
			translated="Peach's Castle"
		}
		else if (stage == "ma"){
			translated="Mutual Agreement";
		}
		else{//name -> initials
			if (stage == "Congo Jungle"){		//initials -> name
				translated="cj";	
			}
			else if (stage == "Dream Land"){
				translated="dl";
			}
			else if (stage == "Hyrule Castle"){
				translated="hc";
			}
			else if (stage == "Peach's Castle"){
				translated="pc";
			}
			else if (stage == "Mutual Agreement"){
				translated="ma";
			}
		}
	}
	else if (title == "melee"){
		if (stage == "bf"){		//initials -> name
			translated="Battlefield";	
		}
		else if (stage == "dl"){
			translated="Dream Land";
		}
		else if (stage == "fd"){
			translated="Final Destination";
		}
		else if (stage == "fod"){
			translated="Fountain of Dreams";
		}
		else if (stage == "kj"){
			translated="Kongo Jungle";
		}
		else if (stage == "ps"){
			translated="Pokemon Stadium";
		}
		else if (stage == "ys"){
			translated="Yoshi's Story";
		}
		else if (stage == "ma"){
			translated="Mutual Agreement";
		}
		else{//name -> initials
			if (stage == "Battlefield"){		//initials -> name
				translated="bf";	
			}
			else if (stage == "Dream Land"){
				translated="dl";
			}
			else if (stage == "Final Destination"){
				translated="fd";
			}
			else if (stage == "Fountain of Dreams"){
				translated="fod";
			}
			else if (stage == "Kongo Jungle"){
				translated="kj";
			}
			else if (stage == "Pokemon Stadium"){
				translated="ps";
			}
			else if (stage == "Yoshi's Story"){
				translated="ys";
			}
			else if (stage == "Mutual Agreement"){
				translated="ma";
			}
			else{
				alert("error: translateStage("+stage+")");
			}
		}
	}
	else if (title == "brawl"){
		if (stage == "bf"){		//initials -> name
			translated="Battlefield";	
		}
		else if (stage == "cs"){
			translated="Castle Siege";
		}
		else if (stage == "dp"){
			translated="Delfino Plaza";
		}
		else if (stage == "fd"){
			translated="Final Destination";
		}
		else if (stage == "hb"){
			translated="Halberd";
		}
		else if (stage == "lc"){
			translated="Lylat Cruise";
		}
		else if (stage == "sv"){
			translated="Smashville";
		}
		else if (stage == "yi"){
			translated="Yoshi's Island";
		}
		else if (stage == "ps"){
			translated="Pokemon Stadium";
		}
		else if (stage == "ma"){
			translated="Mutual Agreement";
		}
		else{//name -> initials
			if (stage == "Battlefield"){		//initials -> name
				translated="bf";	
			}
			else if (stage == "Castle Siege"){
				translated="cs";
			}
			else if (stage == "Delfino Plaza"){
				translated="dp";
			}
			else if (stage == "Final Destination"){
				translated="fd";
			}
			else if (stage == "Halberd"){
				translated="hb";
			}
			else if (stage == "Lylat Cruise"){
				translated="lc";
			}
			else if (stage == "Smashville"){
				translated="sv";
			}
			else if (stage == "Yoshi's Island"){
				translated="yi";
			}
			else if (stage == "Pokemon Stadium"){
				translated="ps";
			}
			else if (stage == "Mutual Agreement"){
				translated="ma";
			}
			else{
				alert("error: translateStage("+stage+")");
			}
		}
		
	}
	else if (title == "pm"){
		if (stage == "bf"){		//initials -> name
			translated="Battlefield";	
		}
		else if (stage == "dl"){
			translated="Dream Land";
		}
		else if (stage == "dp"){
			translated="Distant Planet";
		}
		else if (stage == "fd"){
			translated="Final Destination";
		}
		else if (stage == "fod"){
			translated="Fountain of Dreams";
		}
		else if (stage == "ghz"){
			translated="Green Hill Zone";
		}
		else if (stage == "lc"){
			translated="Lylat Cruise";
		}
		else if (stage == "nf"){
			translated="Norfair";
		}
		else if (stage == "ps1"){
			translated="Pokemon Stadium 1";
		}
		else if (stage == "ps2"){
			translated="Pokemon Stadium 2";
		}
		else if (stage == "sv"){
			translated="Smashville";
		}
		else if (stage == "ys"){
			translated="Yoshi's Story";
		}
		else if (stage == "ww"){
			translated="Wario Ware";
		}
		else if (stage == "yi"){
			translated="Yoshi's Island";
		}
		else if (stage == "ma"){
			translated="Mutual Agreement";
		}
		else{//name -> initials
			if (stage == "Battlefield"){		
				translated="bf";	
			}
			else if (stage == "Dream Land"){
				translated="dl";
			}
			else if (stage == "Distant Planet"){
				translated="dp";
			}
			else if (stage == "Final Destination"){
				translated="fd";
			}
			else if (stage == "Fountain of Dreams"){
				translated="fod";
			}
			else if (stage == "Green Hill Zone"){
				translated="ghz";
			}
			else if (stage == "Lylat Cruise"){
				translated="lc";
			}
			else if (stage == "Norfair"){
				translated="nf";
			}
			else if (stage == "Pokemon Stadium 1"){
				translated="ps1";
			}
			else if (stage == "Pokemon Stadium 2"){
				translated="ps2";
			}
			else if (stage == "Smashville"){
				translated="sv";
			}
			else if (stage == "Yoshi's Story"){
				translated="ys";
			}
			else if (stage == "Wario Ware"){
				translated="ww";
			}
			else if (stage == "Yoshi's Island"){
				translated="yi";
			}
			else if (stage == "Mutual Agreement"){
				translated="ma";
			}
		}
	}
	else if (title == "smash4"){
		if (stage == "bf"){	
			translated = "Battlefield";	//names must be exact for game.html conversion
		}
		else if (stage == "cs"){
			translated = "Castle Siege";
		}
		else if (stage == "dh"){
			translated = "Duck Hunt";
		}
		else if (stage == "dl"){
			translated = "Dream Land";
		}
		else if (stage == "dp"){
			translated = "Delfino Plaza";
		}
		else if (stage == "fd"){
			translated = "Final Destination";
		}
		else if (stage == "hb"){
			translated = "Halberd";
		}
		else if (stage == "kj"){
			translated="Kongo Jungle";
		}
		else if (stage == "lc"){
			translated = "Lylat Cruise";
		}
		else if (stage == "sv"){
			translated = "Smashville";
		}
		else if (stage == "tc"){
			translated = "Town and City";
		}
		else if (stage == "ma"){
			translated = "Mutual Agreement";
		}
		else{
			if (stage == "Battlefield"){		//initials -> name
				translated="bf";	
			}
			else if (stage == "Castle Siege"){
				translated="cs";
			}
			else if (stage == "Duck Hunt"){
				translated="dh";
			}
			else if (stage == "Dream Land"){
				translated="dl";
			}
			else if (stage == "Delfino Plaza"){
				translated="dp";
			}
			else if (stage == "Final Destination"){
				translated="fd";
			}
			else if (stage == "Halberd"){
				translated="hb";
			}
			else if (stage == "Kongo Jungle"){
				translated="kj";
			}
			else if (stage == "Lylat Cruise"){
				translated="lc";
			}
			else if (stage == "Smashville"){
				translated="sv";
			}
			else if (stage == "Town and City"){
				translated="tc";
			}
			else if (stage == "Mutual Agreement"){
				translated="ma";
			}
			else{
				alert("error: translateStage("+stage+")");
			}			
		}
	}
	return translated;
}

function translateChar(char){
	//add char code and char real name
}

function getRuleset(){ //for game.html make table of ruleset
	var title = getCookie("title");
	var event = getCookie("event"); //singles or doubles
	if (title == "smash64"){
		if (event == "SINGLES"){
			return	"<center><table><tr><td>Stocks: <b>5</b></td><td><b>Stock</b></td></tr>" +
					"<tr><td>Items: <b>OFF</b></td><td>Damage: <b>100%</b></td></tr></table></center>";
		}
		else if (event == "DOUBLES"){	
			return	"<center><table><tr><td>Stocks: <b>5</b></td><td><b>Stock Team</b></td></tr>" +
					"<tr><td>Items: <b>OFF</b></td><td>Team Attack: <b>ON</b></td></tr></table></center>";			
		}
	}
	else if (title == "melee"){
		if (event == "SINGLES"){
			return	"<center><table><tr><td>Stocks: <b>4</b></td><td>Items: <b>OFF</b></td></tr>" +
					"<tr><td>Time: <b>8 min</b></td><td>Pause: <b>OFF</b></td></tr></table></center>";
		}
		else if (event == "DOUBLES"){	
			return	"<center><table><tr><td>Stocks: <b>4</b></td><td>Items: <b>OFF</b></td></tr>" +
					"<tr><td>Time: <b>8 min</b></td><td>Team Attack: <b>ON</b></td></tr></table></center>";			
		}
	}
	else if (title == "brawl"){
		if (event == "SINGLES"){
			return	"<center><table><tr><td>Stocks: <b>3</b></td><td>Items: <b>OFF</b></td></tr>" +
					"<tr><td>Time: <b>8 min</b></td><td>LGL: <b>35</b></td></tr></table></center>";
		}
		else if (event == "DOUBLES"){	
			return	"<center><table><tr><td>Stocks: <b>3</b></td><td>Team Attack: <b>ON</b></td></tr>" +
					"<tr><td>Time: <b>8 min</b></td><td>LGL <b>35</b></td></tr></table></center>";			
		}
	}
	else if (title == "pm"){
		if (event == "SINGLES"){
			return	"<center><table><tr><td>Stocks: <b>4</b></td><td>Items: <b>OFF</b></td></tr>" +
					"<tr><td>Time: <b>8 min</b></td><td>Pause: <b>OFF</b></td></tr></table></center>";
		}
		else if (event == "DOUBLES"){	
			return	"<center><table><tr><td>Stocks: <b>4</b></td><td>Items: <b>OFF</b></td></tr>" +
					"<tr><td>Time: <b>8 min</b></td><td>Team Attack: <b>ON</b></td></tr></table></center>";			
		}
	}
	else if (title == "smash4"){
		if (event == "SINGLES"){
			return	"<center><table><tr><td>Stocks: <b>2</b></td><td>Items: <b>OFF</b></td></tr>" +
					"<tr><td>Time: <b>6 min</b></td><td>Pause: <b>OFF</b></td></tr></table></center>";
		}
		else if (event == "DOUBLES"){	//3 stocks in doubles
			return	"<center><table><tr><td>Stocks: <b>3</b></td><td>Items: <b>OFF</b></td></tr>" +
					"<tr><td>Time: <b>6 min</b></td><td>Team Attack: <b>ON</b></td></tr></table></center>";			
		}

	}
}

function help(url){	//was reset()
	if (url == "versus"){
		alert("There are two competitive game modes:\n" +
				"Singles, which is a one versus one raw experience\n" +
				"Doubles, which you pair with a friend and go against another pair");
	}
	else if (url == "bestOf"){
		alert("Best of 1 is a winner takes all\n" +
				"Best of 3 (first to two wins) is the standard competitive set\n" +
				"Best of 5 (first to three wins) is the standard for top 8 play in tournaments or money matches");
	}
	else if (url == "characterSelectLeft"){
		alert("Left players selects a character from the cast below.\n" +
				"The red border represents the opponent's character after losing\n" +
				"The green border represents your friend's character in doubles");
	}
	else if (url == "characterSelectRight"){
		alert("Right players selects a character from the cast below.\n" +
				"The red border represents the opponent's character after losing to him/her.\n" +
				"The green border represents your friend's character in doubles");
	}
	else if (url == "electPort"){
		alert("Choosing port enables gives players the right to choose what port (1-4) to insert their controller.\n" +
				"The stage strike option grants the players the last ban out of two stages.\n" +
				"If you are chosen randomly and don't want first pick, select 'Choose Port.'\n" +
				"Player/Team who has port priority can always opt to pick Port 2, 3 or 4 (not necessarily port 1).");
	}
	else if (url == "stageBansInitial"){
		alert("This is the stage striking phase.\n" +
				"Note that some maps will be initially banned because they are not neutral stages.\n" +
				"Ban a stage if it is your turn to ban.\n" +
				"It does not matter who picks the last stage because there will only be one available in the end.");
	}
	else if (url == "game"){
		alert("Play out your game with the following rules below.\n" +
				"Select the left character if left won.\n" +
				"Select the right character if right won.");
	}
	else if (url == "stagePick"){
		alert("If the game and best-of series ruleset supports it, the winner may ban stage(s). The loser, no matter what, picks a stage.\n" +
				"Counterpick stages are now available.\n" +
				"Note: DSR states players may not choose a stage they already won on in the same set, unless mutually agreed to.");
	}
	else if (url == "postGame"){
		alert("Congratulations to the winner!\n" +
				"Coin indicates winner of the set\n" +
				"Green border indicates winner of the game\n" +
				"Red border indicates loser of the game");
	}
}

////////////////////
//cookie functions
////////////////////
function getCookie(name){
	var cookie = window.sessionStorage.getItem(name);
	//console.log("getting cookie: "+ name +" <= "+cookie);
	return cookie;
}

function setCookie(cname, cvalue) {
	//console.log("setting cookie: "+ cname +" => "+cvalue);
    window.sessionStorage.setItem(cname, cvalue);
}

function clearListCookies(redirect) {   //clears all cookies
	window.sessionStorage.clear();
    window.location = redirect; // TO REFRESH THE PAGE
}

function testCookieSend(){
	setCookie("test","true");
}
function testCookieRecieve(name){
	var cookie = getCookie(name);
	if (cookie == "undefined" || cookie == "null"){
		alert("Cookies are disabled! Please enable...");
	}
	console.log("cookies enabled!");
}

///////////////////
//Helper functions
///////////////////
function getScrollBarWidth() {
	//document.querySelector(".main").style.overflowY = "scroll"
	var inner = document.createElement('p');
	inner.style.width = "100%";
	inner.style.height = "200px";

	var outer = document.createElement('div');
	outer.style.position = "absolute";
	outer.style.top = "0px";
	outer.style.left = "0px";
	outer.style.visibility = "hidden";
	outer.style.width = "200px";
	outer.style.height = "150px";
	outer.style.overflow = "hidden";
	outer.appendChild (inner);

	document.body.appendChild (outer);
	var w1 = inner.offsetWidth;
	outer.style.overflow = 'scroll';
	var w2 = inner.offsetWidth;
	if (w1 == w2) w2 = outer.clientWidth;

	document.body.removeChild (outer);
	return (w1 - w2);
	
}

function capitalize(str){
    return str.replace(/\w\S*/g, function(txt){
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		});
}

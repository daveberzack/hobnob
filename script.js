var view = new View(this)
var characters = new Characters(12,20);
var players = new Players(5);

//testing for now
characters.getUnnamedCharacter();
characters.log();
var prompt = characters.getFactPrompt();
characters.setFact(1);
characters.log();

players.log();

/*
/////////////////////////////////////// TURN CONTROL


	var currentlyInChallenge = false;
	var currentlyInRetry = false;

function startNextTurn(){
	getCharacter();
	currentPlayerIndex = (currentPlayerIndex+1) % players.length;
	startTurn(currentPlayerIndex, currentCharacter, false, false);
}

function startTurn(playerIndex, character, isChallenge, isRetry){
  addToTurnHistory(playerIndex, character, isChallenge, isRetry);
	activePlayer = players[playerIndex];
	currentlyInChallenge = isChallenge;
	currentlyInRetry = isRetry
	$(".player").removeClass("active");
	$("#player"+playerIndex).addClass("active");
	$("#character h2").html(currentCharacter.picId);

	if (currentCharacter.facts.length>0){
		 showGuess();
	}
	else {
		showAddInfo()
	}
}

function addToTurnHistory(playerIndex, character, isChallenge, isRetry){
	turnHistory.push({"playerIndex":playerIndex, "character": character, "isChallenge":isChallenge, "isRetry":isRetry});
}

function showGuess(){
	$("#guess").show();
	$("#addInfo").hide();
	$("#guessChallenge").toggle(!currentlyInChallenge && !currentlyInRetry);
}

function showAddInfo(){
	$("#guess").hide();
	$("#addInfo").show();

	promptForNewFact();
}

function promptForNewFact(){
	//------------- get a new random fact type that isn't used (choose name if none used yet)
	factTypeUsed=true;
	if (currentCharacter.facts.length<1){
		currentFactType=0;
		factTypeUsed=false;
	}
	while (factTypeUsed){
		currentFactType = Math.floor(Math.random()*FACT_TYPES.length);
		factTypeUsed=false
		for (var f=0; f<currentCharacter.facts.length; f++){
			if (currentFactType == currentCharacter.facts[f].type){
				factTypeUsed=true;
			}
		}
		console.log(factTypeUsed+":"+currentFactType);
	}
  //------------- prompt 
  $("#fact").val("");
  $("#factLabel").html(FACT_TYPES[currentFactType].prompt);
}

function submitFact(factString){
	var newFact = {
		type:currentFactType,
		value:factString
	};
	currentCharacter.facts.push(newFact);

	startNextTurn();
}

function submitCorrect(){
	activePlayer.score++;
	updateScores();
	activePlayer = players[currentPlayerIndex];
	showAddInfo();
}

function submitIncorrect(){
	if (currentlyInChallenge) {
		startTurn(currentPlayerIndex, false, true);
	}
	else {
		startNextTurn();
	}
}

function showChallengeOptions(){
	submitChallenge(0); //always pick the first player, for now
}
function submitChallenge(playerIndex){
	startTurn(playerIndex, true, false);
}
function checkInfo(){
	
}

function updateScores(){
	for (var p=0; p<players.length; p++){
		$("#player"+p+" .score").html(players[p].score);
	}
}


//////////// click handlers

$("#addFactLink").click(function(){
	submitFact( $("#fact").val() );
});
$('#fact').keypress(function (e) {
  if (e.which == 13) {
	submitFact( $("#fact").val() );
  }
});

$("#guessCorrect").click(submitCorrect);
$("#guessIncorrect").click(submitIncorrect);
$("#guessChallenge").click(showChallengeOptions);
$("#guessCheck").click(checkInfo);


startNextTurn();



*/

/////////////////////////////////////// HELPER FUNCTIONS


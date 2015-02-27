var Model = function(){

	var currentlyInChallenge;
	var characters;
	var view;
	var system;
	var players;
	var initFacts=0;
	var maxScore;

  this.init = function(){
  	debug("INIT");
		characters = new Characters();
		players = new Players();
		system = new System();
		view = new View(this);
		view.hideContinueLinks();
		view.showMenu();
		//this.startGame(6,3,1,5,20,.7,4,"photo");
  }

  this.startPlayingTheme = function(){
  	system.startPlayingTheme();
  }
  this.stopPlayingTheme = function(duration){
  	system.stopPlayingTheme(duration);
  }
  //  ======================================== PRIMARY GAMEPLAY ========================================

	this.startGame = function(numPlayers, maxS, initF, initChars, maxChars, chanceOfUnnamed, playerIconType){
		view.showContinueLinks();
		this.maxScore=maxS;
		players.setPlayers(numPlayers);
		characters = new Characters();
	  characters.setValues(initChars, maxChars, chanceOfUnnamed);
		view.startGame(players.getNumberOfPlayers(), this.maxScore, playerIconType);
		currentlyInChallenge = false;
		initFacts=initF;
		this.startTurn();
	}

	this.startTurn = function(){
	  currentlyInChallenge = false;
		players.changeCurrentPlayer();

		if ( characters.getIfStillInitialNaming() ) {
			characters.changeCharacter(true);
			characters.updateFactIndex();
			view.showIntro(players.getActivePlayerIndex(), characters.getCurrentCharacterIndex(), characters.getFactPrompt());
		}
		else {
			characters.changeCharacter(false);
			view.showGuess(players.getActivePlayerIndex(), characters.getCurrentCharacterIndex(), characters.getCurrentCharacterNumberOfFacts(), false);
		}


	}

	this.introComplete = function(){
		if (characters.getCurrentCharacterNumberOfFacts()<initFacts) {
			characters.updateFactIndex();
			view.showIntro(players.getActivePlayerIndex(), characters.getCurrentCharacterIndex(), characters.getFactPrompt());
		}
		else {
			this.startTurn();
		}
	}

	this.submitCorrect = function(){
		players.giveActivePlayerAPoint();
		view.updatePlayersScore( players.getPlayerScores() );
		
		if ( players.getActivePlayerScore() < this.maxScore ){ 	
			if ( characters.showUnnamed() ){
				characters.changeCharacter(true);
			}
			characters.updateFactIndex();
			view.showIntro(players.getActivePlayerIndex(), characters.currentCharacter.index, characters.getFactPrompt());
			view.hideContinueLinks();
		}
		else {
			view.showWinScreen(players.getActivePlayerIndex());
			view.showContinueLinks();
		}
	}

	this.submitIncorrect = function(){
		if (currentlyInChallenge) {
			players.giveCurrentPlayerAPoint();
		  view.updatePlayersScore(players.all);
		}
		this.startTurn();
	}

	this.showChallengePlayers = function(){
		view.showChallengePlayers(players.getCurrentPlayerIndex());
	}
	this.submitChallenge = function(playerIndex){
		players.setActivePlayer(playerIndex);
		currentlyInChallenge = true;
		view.showGuess(players.getActivePlayerIndex(), characters.getCurrentCharacterIndex(), characters.getCurrentCharacterNumberOfFacts(), true);
	}


  //  ======================================== AUDIO ========================================

	this.startRecordingCharacterFact = function(){
		var characterIndex = characters.currentCharacter.index;
		var factIndex = characters.getCurrentFactIndex();
		system.startRecordingCharacterFact(characterIndex, factIndex, this.characterFactCallback);
	}

	this.stopRecordingCharacterFact = function(){
		system.stopRecordingCharacterFact();
	}

	this.characterFactCallback = function(filename){
		characters.setFact(filename);
	}

	this.startPlayingCharacterFact = function(characterIndex, factIndex, callback){
		system.startPlayingCharacterFact(characterIndex, factIndex, callback, this);
	}
	this.startPlayingCurrentCharacterFact = function(callback){
		var characterIndex = characters.currentCharacter.index;
		var factIndex = characters.getCurrentFactIndex();
		system.startPlayingCharacterFact(characterIndex, factIndex, callback, this);
	}


	var factIndexesToPlay = [];
	this.playAllFactsForCurrentCharacter = function(){
		factIndexesToPlay = characters.getFactIndexesForCurrentCharacter();
		this.playNextFactForCurrentCharacter();
	}
	this.playNextFactForCurrentCharacter = function(){
		if (factIndexesToPlay.length<1) return;
		var ind = factIndexesToPlay.shift();
		system.startPlayingCharacterFact( characters.getCurrentCharacterIndex(), ind, this.playNextFactForCurrentCharacter, this );
	}

  //  ======================================== CAMERA ========================================

	this.takePlayerPhoto = function(cameraPlayerIndex){
		system.takePlayerPhoto(cameraPlayerIndex, view.setPlayerPicture);
	}

/*
	var tempVal=0;
	this.testStoreData = function(){
		tempVal++;
		system.storeData("testkey", tempVal);
	}
	this.testRetrieveData = function(){
		tempVal = system.retrieveData("testkey");
	}
*/
}
var model = new Model();
document.addEventListener("deviceready", function(){ model.init() }, false);
//setTimeout(function(){ model.init() },500);



//  ======================================== HELPERS ========================================

var debugMode = "console";//popup, console, none
function debug(message) {
  if (debugMode=="popup") $("#debug").show().append("<br/>"+message);
  else console.log(message);
}
function logError(message) {
  $("#debug").show().append("<br/><b style='color:#990000'>*** "+message+"</b>");
}
$("#debug").hide().click(function(){ $(this).hide().html(""); });


	var factor = 20;
	var data = []; //no automation
	/*
	data = [ //options screen
		["#menuLinks .newGameLink",2]
	]
	
	data = [ //gameplay to init
		["#introRecord",2], ["#introRecord",5], ["#introNext",2], 
		["#introRecord",2], ["#introRecord",5], ["#introNext",2], 
		["#introRecord",2], ["#introRecord",5], ["#introNext",2], 
		["#introRecord",2], ["#introRecord",5], ["#introNext",2], 
		["#introRecord",2], ["#introRecord",5], ["#introNext",2]
	]
	
	data = [ //gameplay to end
		["#introRecord",22], ["#introRecord",5], ["#introNext",2], 
		["#introRecord",2], ["#introRecord",5], ["#introNext",2], 
		["#introRecord",2], ["#introRecord",5], ["#introNext",2], 
		["#introRecord",2], ["#introRecord",5], ["#introNext",2], 
		["#introRecord",2], ["#introRecord",5], ["#introNext",2], 
		["#guessCorrect",2], ["#introRecord",2], ["#introRecord",5], ["#introNext",2],
		["#guessCorrect",2], ["#introRecord",2], ["#introRecord",5], ["#introNext",2],
		["#guessCorrect",2], ["#introRecord",2], ["#introRecord",5], ["#introNext",2],
		["#guessCorrect",2], ["#introRecord",2], ["#introRecord",5], ["#introNext",2],
		["#guessCorrect",2], ["#introRecord",2], ["#introRecord",5], ["#introNext",2],
		["#guessCorrect",2], ["#introRecord",2], ["#introRecord",5], ["#introNext",2],
		["#guessCorrect",2], ["#introRecord",2], ["#introRecord",5], ["#introNext",2],
		["#guessCorrect",2], ["#introRecord",2], ["#introRecord",5], ["#introNext",2],
		["#guessCorrect",2], ["#introRecord",2], ["#introRecord",5], ["#introNext",2],
		["#guessCorrect",2], ["#introRecord",2], ["#introRecord",5], ["#introNext",2],
		["#guessCorrect",2], ["#introRecord",2], ["#introRecord",5], ["#introNext",2],
		["#guessCorrect",2], ["#introRecord",2], ["#introRecord",5], ["#introNext",2]
	]
/* */

	var delay=0;
	for (var i=0; i<data.length; i++){
		delay+=data[i][1]*factor;
		setTimeout(function(d){ $(d).click() }, delay, data[i][0] );
	}
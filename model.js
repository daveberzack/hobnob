var Model = function(){
	var isInitialized;
	var currentlyInChallenge;
	var characters;
	var view;
	var system;
	var players;
	var initFacts=0;
	var maxScore;

  this.init = function(){
	  try {
	  	if (isInitialized) return;
	  	isInitialized=true;
			characters = new Characters();
			players = new Players();
			system = new System();
			view = new View(this);
			view.hideContinueLinks();
			view.showMenu();
			view.init();
			if (inBrowser) {
				 $("#splash").hide();
			}
			else {
				setTimeout(function(){ $("#splash img").attr("src","img/splash2.jpg")},1200);
				setTimeout(function(){ $("#splash").hide()},4000);
			}
		}
		catch (err) {
			logError("init",arguments, err);
		}
  }

  this.startPlayingTheme = function(){
  	system.startPlayingTheme();
  }
  this.stopPlayingTheme = function(duration){
  	system.stopPlayingTheme(duration);
  }
  //  ======================================== PRIMARY GAMEPLAY ========================================

	this.startGame = function(numPlayers, maxS, initF, initChars, playerIconType){
		try {
			debug("start p:"+numPlayers+", s:"+maxS+", f:"+initF+", c:"+initChars+", a:"+playerIconType);
			view.showContinueLinks();
			this.maxScore=maxS;
			players.setPlayers(numPlayers);
			characters = new Characters();
		  characters.setValues(initChars, 20, .75);
			view.startGame(players.getNumberOfPlayers(), this.maxScore, playerIconType);
			currentlyInChallenge = false;
			initFacts=initF;
			this.startTurn();
    }
    catch (err) {
      logError("model.startGame",arguments, err);
    }
	}

	this.startTurn = function(){
		try {
		  currentlyInChallenge = false;
			players.changeCurrentPlayer();
			
			view.showNextPlayerPrompt(players.getActivePlayerIndex(), false);

			if ( characters.getIfStillInitialNaming() ) {
				characters.changeCharacter(true, players.getActivePlayerIndex() );
				characters.updateFactIndex();
				view.showIntro(players.getActivePlayerIndex(), characters.getCurrentCharacterIndex(), characters.getFactPrompt());
			}
			else {
				characters.changeCharacter(false, players.getActivePlayerIndex());
				view.showGuess(players.getActivePlayerIndex(), characters.getCurrentCharacterIndex(), characters.getCurrentCharacterNumberOfFacts(), false);
			}
    }
    catch (err) {
      logError("startTurn",arguments, err);
    }
	}

	this.introComplete = function(){
		try{
			if (characters.getCurrentCharacterNumberOfFacts()<initFacts) {
				characters.updateFactIndex();
				view.showIntro(players.getActivePlayerIndex(), characters.getCurrentCharacterIndex(), characters.getFactPrompt());
			}
			else {
				this.startTurn();
			}
    }
    catch (err) {
      logError("introComplete",arguments, err);
    }
	}

	this.submitCorrect = function(){
		try {
			players.giveActivePlayerAPoint();
			view.updatePlayersScore( players.getPlayerScores() );
			
			if ( players.getActivePlayerScore() < this.maxScore ){ 	
				if ( characters.showUnnamed() ){
					characters.changeCharacter(true, players.getActivePlayerIndex());
				}
				characters.updateFactIndex();
				view.showIntro(players.getActivePlayerIndex(), characters.currentCharacter.index, characters.getFactPrompt());
				view.hideContinueLinks();
			}
			else {
				view.showWinScreen(players.getActivePlayerIndex());
				view.hideContinueLinks();
			}
    }
    catch (err) {
      logError("submitCorrect",arguments, err);
    }
	}

	this.submitIncorrect = function(){
		if (currentlyInChallenge) {
			players.giveCurrentPlayerAPoint();
		  view.updatePlayersScore( players.getPlayerScores() );
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
		view.showNextPlayerPrompt(players.getActivePlayerIndex(), true);
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
		characters.setFact(filename, players.getActivePlayerIndex());
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
}

var model;

if (typeof model == "undefined") model = new Model();
document.addEventListener("deviceready", function(){ model.init() }, false);





//  ======================================== HELPERS ========================================

var inBrowser = true;
var autoMode = "options";//empty,start,init,win
var debugMode = "console";//popup, console, none


if (inBrowser) model.init();

function debug(message) {
  if (debugMode=="popup") $("#debug").show().append("<br/>"+message);
  else console.log(message);
}

function logError(f, p, e) {
	var pString="";
	for (var i=0; i<p.length; i++){
		pString=pString+p[i];
		if (i<p.length-1) pString = pString+",";
	}
	console.log("...ERROR F:"+f+", P:"+pString+" *** E:"+e);
}


$("#debug").hide().click(function(){ $(this).hide().html(""); });

//AUTOMATION

	var factor = 20;
	var delay=0;
	var data = []; //no automation

	if (autoMode!="") {
		model.startGame(6,3,1,5,20,.7,4,"photo");
		data = [
			["#nextPlayerPrompt",5]
		]
	}
	if (autoMode=="options"){
		data = [ //show photo screen
			[".newGameLink",5]
		]
	}
	if (autoMode=="photos"){
		data = [ //show photo screen
			[".cameraLink",5]
		]
	}
	if (autoMode=="init"){
		data = [ //gameplay to init
			["#introRecord",2], ["#introRecord",5], ["#introNext",2], 
			["#introRecord",2], ["#introRecord",5], ["#introNext",2], 
			["#introRecord",2], ["#introRecord",5], ["#introNext",2], 
			["#introRecord",2], ["#introRecord",5], ["#introNext",2], 
			["#introRecord",2], ["#introRecord",5], ["#introNext",2], 
			["#nextPlayerPrompt",5]
		]
	}
	else if (autoMode=="win"){
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
	}

	for (var i=0; i<data.length; i++){
		delay+=data[i][1]*factor;
		setTimeout(function(d){ $(d).click() }, delay, data[i][0] );
	}

///// START IT UP

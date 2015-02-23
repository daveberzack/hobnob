var Model = function(){

	var currentlyInChallenge;
	var characters;
	var view;
	var media;
	var players;
	var initFacts=0;
	var maxScore;

  this.init = function(){
		characters = new Characters();
		players = new Players();
		media = new Media();
		view = new View(this);

		//view.showMenu();
		this.startGame(6,7,1,5,20,.7,4,"photo");
  }

  //  ======================================== PRIMARY GAMEPLAY ========================================

	this.startGame = function(numPlayers, maxS, initF, initChars, maxChars, chanceOfUnnamed, turnsBeforeRepeat, playerIconType){
		view.showContinueLinks();
		this.maxScore=maxS;
		players.setPlayers(numPlayers);
		characters = new Characters();
	  characters.setValues(initChars, maxChars, chanceOfUnnamed, turnsBeforeRepeat);
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
		debug("introComplete:"+characters.getCurrentCharacterNumberOfFacts()+","+initFacts);
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
			view.showWin(players.getActivePlayerIndex());
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
		view.showGuess(players.activePlayer.index, characters.getCurrentCharacterIndex(), getCurrentCharacterNumberOfFacts(), true);
	}


  //  ======================================== AUDIO ========================================

	this.startRecordingCharacterFact = function(){
		var characterIndex = characters.currentCharacter.index;
		var factIndex = characters.getCurrentFactIndex();
		media.startRecordingCharacterFact(characterIndex, factIndex, this.characterFactCallback);
	}

	this.stopRecordingCharacterFact = function(){
		media.stopRecordingCharacterFact();
	}

	this.characterFactCallback = function(filename){
		characters.setFact(filename);
	}

	this.startPlayingCharacterFact = function(characterIndex, factIndex, callback){
		media.startPlayingCharacterFact(characterIndex, factIndex, callback);
	}
	this.startPlayingCurrentCharacterFact = function(callback){
		var characterIndex = characters.currentCharacter.index;
		var factIndex = characters.getCurrentFactIndex();
		media.startPlayingCharacterFact(characterIndex, factIndex, callback);
	}

	this.stopPlayingCharacterFact = function(){
		media.stopPlayingCharacterFact();
	}

	/*
	this.playCurrentFactForCurrentCharacter = function(){
		var characterIndex = characters.getCurrentCharacterIndex();
		var factIndex = characters.getCurrentFactIndex();
		console.log("play audio for character fact "+characterIndex+"_"+factIndex);
	}
*/

	var factIndexToPlay = 0;
	this.playAllFactsForCurrentCharacter = function(){
		factIndexToPlay = -1;
		this.playNextFactForCurrentCharacter();
	}
	this.playNextFactForCurrentCharacter = function(){
		factIndexToPlay++;
		var character = characters.currentCharacter;
		if (factIndexToPlay>=characters.getFactTypesLength() ){
			return;
		} 
		else if (!character.facts[factIndexToPlay] || character.facts[factIndexToPlay]==""){
			this.playNextFactForCurrentCharacter();
		}
		else {
			this.startPlayingCurrentCharacterFact(character.index, factIndexToPlay, this.playNextFactForCurrentCharacter);
		}
	}

  //  ======================================== CAMERA ========================================

	this.takePlayerPhoto = function(cameraPlayerIndex){
		media.takePlayerPhoto(cameraPlayerIndex, view.setPlayerPicture);
	}

}
var model = new Model();
model.init();



//  ======================================== HELPERS ========================================

var debugMode = "popup";//popup, console, none
function debug(message) {
  if (debugMode=="popup") $("#debug").show().append("<br/>"+message);
  else console.log(message);
}
function logError(message) {
  $("#debug").show().append("<br/><b style='color:#990000'>*** "+message+"</b>");
}
$("#debug").hide().click(function(){ $(this).hide().html(""); });

if (false){
	//initial characters
	var factor = 50;
	var data = [
		["#introRecord",2], ["#introRecord",5], ["#introNext",2], 
		["#introRecord",2], ["#introRecord",5], ["#introNext",2], 
		["#introRecord",2], ["#introRecord",5], ["#introNext",2], 
		["#introRecord",2], ["#introRecord",5], ["#introNext",2], 
		["#introRecord",2], ["#introRecord",5], ["#introNext",2]
	]
	var delay=0;
	for (var i=0; i<data.length; i++){
		delay+=data[i][1]*factor;
		setTimeout(function(d){ $(d).click() }, delay, data[i][0] );
	}
}
var Model = function(){

	var currentlyInChallenge;
	var characters;
	var view;
	var media;
	var players;
	var initFacts=0;
	var maxScore;
	this.isGameInProgress=false;

  this.init = function(){
		characters = new Characters();
		players = new Players();
		media = new Media(this);
		view = new View(this);
		view.showMenu();
		//this.startGame(3,7,1,5,20,.7,4,"photo");
		//view.showChallengePlayers(1);
  }

	///////////////////// TURN MANAGEMENT 
	this.startGame = function(numPlayers, maxS, initF, initChars, maxChars, chanceOfUnnamed, turnsBeforeRepeat, playerIconType){
		this.isGameInProgress=true;
		this.maxScore=maxS;
		players.setPlayers(numPlayers);
		characters = new Characters();
	  characters.setValues(initChars, 79, maxChars, chanceOfUnnamed, turnsBeforeRepeat);
		view.startGame(players.all, this.maxScore, playerIconType);
		currentlyInChallenge = false;
		initFacts=initF;
		this.startTurn();
	}

	this.startTurn = function(){
	  currentlyInChallenge = false;
		players.changeCurrentPlayer();
		if ( characters.stillInitialNaming() ) {
			characters.changeCharacter(true);
			view.showIntro(players.activePlayer.index, characters.currentCharacter.index, characters.getFactPrompt());
		}
		else {
			characters.changeCharacter(false);
			view.showGuess(players.activePlayer.index, characters.currentCharacter, false);
		}
	}

	this.introComplete = function(){
		if (characters.getNumberOfFacts()<initFacts) {
			view.showIntro(players.activePlayer.index, characters.currentCharacter.index, characters.getFactPrompt());
		}
		else {
			this.startTurn();
		}
	}

	this.submitCorrect = function(){
		players.giveActivePlayerAPoint();
		view.updatePlayersScore(players.all);
		
		this.isGameInProgress = !this.checkForWin();
		if (this.isGameInProgress){	
			if ( characters.showUnnamed() ){ //show unnamed
				characters.changeCharacter(true);
			}
			view.showIntro(players.activePlayer.index, characters.currentCharacter.index, characters.getFactPrompt());
		}
		else {
			view.showWin(players.activePlayer.index);
		}
	}

	this.submitIncorrect = function(){
		if (currentlyInChallenge) {
			players.giveCurrentPlayerAPoint();
		  view.updatePlayersScore(players.all);
		}
		this.startTurn();
	}
	this.checkForWin = function(){
		var out = players.activePlayer.score>=this.maxScore;
		console.log("check:"+players.activePlayer.score+":"+out);
		return out;
	}

	this.showChallengePlayers = function(){
		view.showChallengePlayers(players.currentPlayer.index);
	}
	this.submitChallenge = function(playerIndex){
		players.setActivePlayer(playerIndex);
		currentlyInChallenge = true;
		view.showGuess(players.activePlayer.index, characters.currentCharacter, true);
	}

	this.playCurrentFactForCurrentCharacter = function(){
		var characterIndex = characters.currentCharacter.index;
		var factIndex = characters.getCurrentFactIndex();
		this.playFact(characterIndex, factIndex);
	}

	this.playAllFactsForCurrentCharacter = function(){
		var characterIndex = characters.currentCharacter.index;
		console.log("play audio for character :"+characterIndex);
	}
	this.playFact = function(characterIndex, factIndex){
		console.log("play audio for character fact "+characterIndex+"_"+factIndex);
	}

	this.takePlayerPhoto = function(cameraPlayerIndex){
		media.takePlayerPhoto(cameraPlayerIndex, view.setPlayerPicture);
	}

	this.startRecordingCharacterFact = function(){
		media.startRecordingCharacterFact();
	}
	this.stopRecordingCharacterFact = function(callback){
		var characterIndex = characters.currentCharacter.index;
		var factIndex = characters.getCurrentFactIndex();
		media.stopRecordingCharacterFact(characterIndex, factIndex, function(){
			var factRef = "*"+characters.currentCharacter.index +":"+characters.getCurrentFactIndex()+"*";
			characters.setFact(factRef);
			callback();
		});
	}
}
var model = new Model();
model.init();

if (navigator.device.capture){
	alert("audio");
}
else {
	alert("no audio");
}

function getParam(name, defaultVal) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? defaultVal : decodeURIComponent(results[1].replace(/\+/g, " "));
}


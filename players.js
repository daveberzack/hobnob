var Players = function(){

	////////////////// FOR NOW, JUST PREDEFINE THIS ...TODO: PLAYER SELECT SCREEN
	var all = [];
	var activePlayer;
	var currentPlayer;

	this.setPlayers = function(numPlayers){
		all=[];
		for (var p=0; p<numPlayers; p++){
			all.push({index:p, score:0});
		};
		currentPlayer = all[ all.length-1 ]; //the player whose turn it is (persists during a challenge)
		activePlayer = currentPlayer; //the player with the device (changes for a challenge)
	}

	this.changeCurrentPlayer = function(){
		var newPlayerIndex = (currentPlayer.index+1) % all.length;
		currentPlayer = all[newPlayerIndex];
		activePlayer = currentPlayer;
	}

	this.setActivePlayer = function(playerIndex){
		activePlayer = all[playerIndex];
	}

	this.giveActivePlayerAPoint = function(){
		activePlayer.score = activePlayer.score+1;
	}

	this.giveCurrentPlayerAPoint = function(){
		currentPlayer.score = currentPlayer.score+1;
	}




	this.getNumberOfPlayers = function(){
		return all.length;
	}

	this.getCurrentPlayerIndex = function(){
		return currentPlayer.index;
	}

	this.getActivePlayerIndex = function(){
		return activePlayer.index;
	}

	this.getActivePlayerScore = function(){
		return activePlayer.score;
	}

	this.getPlayerScores = function(){
		var scores = [];
		for (var p=0; p<all.length; p++){
			scores.push(all[p].score);
		};
		return scores;
	}


}
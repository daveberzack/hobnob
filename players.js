var Players = function(model_in){
	var model=model_in;

	////////////////// FOR NOW, JUST PREDEFINE THIS ...TODO: PLAYER SELECT SCREEN
	var all = [];
	var activePlayer; //the player whose turn it is (persists during a challenge)
	var currentPlayer; //the player with the device (changes for a challenge)


	this.initPlayers = function(numPlayers){
		all=[];
		for (var p=0; p<numPlayers; p++){
			all.push({index:p, score:0, name:"Player "+(p+1) });
		};
		currentPlayer = all[ all.length-1 ];
		activePlayer = currentPlayer;
	}

	this.setPlayerName = function(playerIndex, playerName){
		console.log("asdfset "+playerIndex+","+playerName, all);
		all[playerIndex].name = playerName;
		console.log("aaaa");
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

	this.getActivePlayerName = function(){
		return activePlayer.name;
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



  this.toString = function() {
  	var out="Players String Error";
  	try {
	  	out=""
	  	if (activePlayer && currentPlayer){
		  	out += "Players: activePlayer="+activePlayer.index;
		  	out += " currentPlayer:"+currentPlayer.index;
		  }
	  	out += " all:";
	  	for (var i=0; i<all.length; i++){
	  		out+="{i:"+all[i].index+" s:"+all[i].score+"} ";
	  	}
  	}
		catch (err) {
			//do nothing
		}
  	return out;
  }
}
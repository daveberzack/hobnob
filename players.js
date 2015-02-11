var Players = function(){

	////////////////// FOR NOW, JUST PREDEFINE THIS ...TODO: PLAYER SELECT SCREEN
	this.all = [];

	this.setPlayers = function(numPlayers){
		this.all=[];
		for (var p=0; p<numPlayers; p++){
			this.all.push({index:p, score:0});
		};
		this.currentPlayer = this.all[ this.all.length-1 ]; //the player whose turn it is (persists during a challenge)
		this.activePlayer = this.currentPlayer; //the player with the device (changes for a challenge)
	}

	this.changeCurrentPlayer = function(){
		console.log("...."+this.all + "..."+this.all.length);
		var newPlayerIndex = (this.currentPlayer.index+1) % this.all.length;
		this.currentPlayer = this.all[newPlayerIndex];
		this.activePlayer = this.currentPlayer;
	}

	this.setActivePlayer = function(playerIndex){
		this.activePlayer = this.all[playerIndex];
	}

	this.giveActivePlayerAPoint= function(){
		this.activePlayer.score= this.activePlayer.score+1;
	}
	this.giveCurrentPlayerAPoint= function(){
		this.currentPlayer.score= this.currentPlayer.score+1;
	}

}
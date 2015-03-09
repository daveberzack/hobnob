
var Characters = function(){
	var NUMBER_OF_CHARACTERS=79;
	var minimumTurnsBeforeRepeat=4;
	var maxCharacters;
	var chanceOfUnnamed;
	var initialCharactersNamed;
	FACT_TYPES = [
		{prompt:"What's My Name?"},
		{prompt:"What's My Job?"},
		{prompt:"What's My Favorite Hobby?"},
		{prompt:"What's My Biggest Pet Peeve?"},
		{prompt:"What's My Best Achievement?"},
		{prompt:"What's My Guilty Pleasure?"},
		{prompt:"What's My Personal Flaw?"},
		{prompt:"What's My Secret?"},
		{prompt:"What's My Mood, Right Now?"},
		{prompt:"What's My Life Goal?"}
	]
  currentFactIndex = 0;
	this.unnamed = [];
	for (var i=1; i<=NUMBER_OF_CHARACTERS; i++){ 
		this.unnamed.push({index:i, facts:["","","","",""], player:-1}); 
	}
	this.named = [];
	this.currentCharacter;


	this.setValues = function(initChars, maxChars, chance){
		initialCharactersNamed = initChars;
		maxCharacters = maxChars;
		chanceOfUnnamed = chance;
	}



  this.changeCharacter = function(getUnnamed, currentPlayer){ //pull a character from 
  	debug("Change Char:"+getUnnamed)
	  if (getUnnamed){
	  	pos = Math.floor(Math.random()*this.unnamed.length);
			this.currentCharacter = this.unnamed.splice(pos,1)[0];
	  }
	  else {
	  	//get one of the three least recently seen characters
			var pos = Math.floor(Math.random()*3);
	  	//if this player introduced that character, just get the oldest one that they didn't
	  	if ( this.named[pos].player == currentPlayer ){
	  		pos=0;
	  		while (this.named[pos].player == currentPlayer) {
		  		pos++;
		  	}
	  	}

	  	debug("before:"+this.getNamedLog() +" ... "+pos)

			this.currentCharacter = this.named.splice(pos,1)[0];
	  }
		this.named.push(this.currentCharacter);
	  	debug("...... "+this.getNamedLog()+" : "+this.currentCharacter.index )
	}

	this.getNamedLog = function(){
		out="";
		for (var i=0; i<this.named.length; i++){ 
			out += this.named[i].index+",";
		}
		return out;
	}

	this.showUnnamed = function(){
		var reduceProbability = 1 - (this.named.length/maxCharacters);
		var rand = Math.random();
		var prob = chanceOfUnnamed*reduceProbability
		console.log("UNNAMED? "+(prob>rand)+" named:"+this.named.length+" chance:"+chanceOfUnnamed+" reduce:"+reduceProbability +" rand:"+rand );
		return prob>rand;
	}
  
  this.updateFactIndex = function(){
  	currentFactIndex=0;
  	while (this.currentCharacter.facts[currentFactIndex]!=""){
  		currentFactIndex = Math.floor( Math.random()*FACT_TYPES.length);
  	}
  }

	this.setFact = function(val, player){
		this.currentCharacter.facts[currentFactIndex] = val;
		if (currentFactIndex==0) this.currentCharacter.player = player;
	}

	this.getCurrentCharacterNumberOfFacts = function(){ //including name
		var numFacts=0;
		for (var i=0; i<this.currentCharacter.facts.length; i++){
			if (this.currentCharacter.facts[i]!="") numFacts++;
		}
		return numFacts;
	}
	this.getFactIndexesForCurrentCharacter = function(){ //including name
		var facts = [];
		for (var i=0; i<this.currentCharacter.facts.length; i++){
			if (this.currentCharacter.facts[i]!="") facts.push(i);
		}
		return facts;
	}

  this.getFactPrompt = function(){
  	return FACT_TYPES[ currentFactIndex ].prompt;
  }

  this.getCurrentFactIndex = function(){ 
	  return currentFactIndex; 
	}

	this.getCurrentCharacterIndex = function(){
		return this.currentCharacter.index;
	}

  this.getFactTypesLength = function(){
  	return FACT_TYPES.length;
  }

	this.getIfStillInitialNaming = function() {
		return this.named.length<initialCharactersNamed;
	}

}

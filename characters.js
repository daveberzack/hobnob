
var Characters = function(model_in){
	var model=model_in;

	var NUMBER_OF_CHARACTERS=79;
	var maxCharacters=20;
	var chanceOfUnnamed=.75;
	var initialCharactersNamed;
	var FACT_TYPES = [
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
  var currentFactIndex = 0;
	var unnamed = [];
	for (var i=1; i<=NUMBER_OF_CHARACTERS; i++){ 
		unnamed.push({index:i, facts:["","","","",""], player:-1}); 
	}
	var named = [];
	var currentCharacter;

	this.init = function(initChars){
		initialCharactersNamed = initChars;
	}



  this.changeCharacter = function(getUnnamed, currentPlayer){ 
	  try {
		  if (getUnnamed){
		  	pos = Math.floor(Math.random()*unnamed.length);
				this.currentCharacter = unnamed.splice(pos,1)[0];
		  }
		  else {
		  	//get one of the three least recently seen characters
				var pos = Math.floor(Math.random()*3);
		  	//if this player introduced that character, just get the oldest one that they didn't
		  	if ( named[pos].player == currentPlayer ){
		  		pos=0;
		  		while (named[pos].player == currentPlayer) {
			  		pos++;
			  	}
		  	}

				this.currentCharacter = named.splice(pos,1)[0];
		  }
			named.push(this.currentCharacter);
		}
		catch (err) {
			model.logError(err, arguments);
		}
  }
 

	this.getNamedLog = function(){
		out="";
		for (var i=0; i<named.length; i++){ 
			out += named[i].index+",";
		}
		return out;
	}

	this.showUnnamed = function(){
		var reduceProbability = 1 - (named.length/maxCharacters);
		var rand = Math.random();
		var prob = chanceOfUnnamed*reduceProbability
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
		return named.length<initialCharactersNamed;
	}


  this.toString = function() {
  	var out="Character String Error";
  	try {
	  	out = "Characters: initialCharactersNamed="+initialCharactersNamed;
	  	out += " currentFactIndex:"+currentFactIndex;
	  	out += " currentCharacter:"+this.currentCharacter.index;
	  	out += " named:";
	  	for (var i=0; i<named.length; i++){
	  		out+="{i:"+named[i].index+" f:"+named[i].facts+" p:"+named[i].player+"} ";
	  	}
	  }
		catch (err) {
			//do nothing
		}
  	return out;
  }

}

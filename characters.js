
var Characters = function(){
	var NUMBER_OF_CHARACTERS=79;
	var minimumTurnsBeforeRepeat=4;
	var maxCharacters;
	var chanceOfUnnamed;
	var initialCharactersNamed;
	FACT_TYPES = [
		{prompt:"Name", size:"3"},
		{prompt:"Job", size:"3"},
		{prompt:"Hobby", size:"2.5"},
		{prompt:"Pet Peeve", size:"2"},
		{prompt:"Secret", size:"2.5"},
		{prompt:"Goal", size:"3"}
	]
  currentFactIndex = 0;
	this.unnamed = [];
	for (var i=1; i<=NUMBER_OF_CHARACTERS; i++){ 
		this.unnamed.push({index:i, facts:["","","","",""]}); 
	}
	this.named = [];
	this.currentCharacter;


	this.setValues = function(initChars, maxChars, chance){
		initialCharactersNamed = initChars;
		maxCharacters = maxChars;
		chanceOfUnnamed = chance;
	}



  this.changeCharacter = function(getUnnamed){ //pull a character from 
	  if (getUnnamed){
	  	pos = Math.floor(Math.random()*this.unnamed.length);
			this.currentCharacter = this.unnamed.splice(pos,1)[0];
	  }
	  else {
			pos = Math.floor( this.named.length-minimumTurnsBeforeRepeat );
			if (pos<0) pos = 0;
			this.currentCharacter = this.named.splice(pos,1)[0];
	  }
		this.named.push(this.currentCharacter);
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

	this.setFact = function(val){
		this.currentCharacter.facts[currentFactIndex] = val;
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
  	return FACT_TYPES[ currentFactIndex ];
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

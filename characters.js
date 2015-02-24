
var Characters = function(){
	var NUMBER_OF_CHARACTERS=79;
	var minimumTurnsBeforeRepeat;
	var maxCharacters;
	var chanceOfUnnamed;
	var initialCharactersNamed;
	FACT_TYPES = [
		{label:"Name",prompt:"Name"},
		{label:"Job",prompt:"Job"},
		{label:"Hobby",prompt:"Hobby"},
		{label:"Peeve",prompt:"Pet Peeve"},
		{label:"Goal",prompt:"Goal"},
		{label:"Thing",prompt:"Favorite Thing"},
		{label:"Skill",prompt:"Special Skill"}
	]
  currentFactIndex = 0;
	this.unnamed = [];
	for (var i=1; i<=NUMBER_OF_CHARACTERS; i++){ 
		this.unnamed.push({index:i, facts:["","","","",""]}); 
	}
	this.named = [];
	this.currentCharacter;


	this.setValues = function(initChars, maxChars, chance, turnsBeforeRepeat){
		initialCharactersNamed = initChars;
		maxCharacters = maxChars;
		chanceofUnnamed = chance;
		minimumTurnsBeforeRepeat = turnsBeforeRepeat;
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
		return prob>rand;
	}
  
  this.updateFactIndex = function(){
  	currentFactIndex=0;
  	while (this.currentCharacter.facts[currentFactIndex]!=""){
  		currentFactIndex = Math.floor( Math.random()*4 +1);
  	}
  }

	this.setFact = function(val){
		this.currentCharacter.facts[currentFactIndex] = val;
		debug("ADD FACT:"+this.currentCharacter.facts);
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

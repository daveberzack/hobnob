
var Characters = function(){
	var numberOfCharacters=79;
	var minimumTurnsBeforeRepeat = 4;
	var maxCharacters=20;
	var chanceOfUnnamed=.7;
	var initialCharactersNamed=4;

	//////// THE TYPES OF FACTS THAT CAN BE INTRODUCED
	var FACT_TYPES = [
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
	for (var i=1; i<=numberOfCharacters; i++){ 
		this.unnamed.push({index:i, facts:["","","","",""]}); 
	}
	this.named = [];
	this.currentCharacter;

	this.setValues = function(initChars, totalChars, maxChars, chance, turnsBeforeRepeat){
		initialCharactersNamed = initChars;
		numberOfCharacters = totalChars;
		maxCharacters = maxChars;
		chanceofUnnamed = chance;
		minimumTurnsBeforeRepeat = turnsBeforeRepeat;
	}
  this.getCurrentFactIndex = function(){ return currentFactIndex; } //prob not needed except dev

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
  
  this.getFactPrompt = function(){
  	currentFactIndex=0;
  	while (this.currentCharacter.facts[currentFactIndex]!=""){
  		currentFactIndex = Math.floor( Math.random()*4 +1);
  	}
  	return FACT_TYPES[ currentFactIndex ].prompt;
  }

  this.getNumberOfFacts = function(){
  	var factCount=0;
  	for (var i=0; i<this.currentCharacter.facts.length; i++){
  		if (this.currentCharacter.facts[i]!="") factCount++
  	}
  	return factCount;
  }

	this.setFact = function(val){
		this.currentCharacter.facts[currentFactIndex] = val;
	}

	this.showUnnamed = function(){
		var reduceProbability = 1 - (this.named.length/maxCharacters);
		var rand = Math.random();
		var prob = chanceOfUnnamed*reduceProbability
		return prob>rand;
	}

	this.stillInitialNaming = function() {
		return (this.named.length<initialCharactersNamed);
	}

	//////////////////// HELPER FUNCTION TO RANDOMIZE AN ARRAY
	function shuffle(o){
	    for(var j, x, i=o.length; i; j=Math.floor(Math.random()*i), x = o[--i], o[i] = o[j], o[j] = x);
	    return o;
	};
}

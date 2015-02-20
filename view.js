var View = function(model_in){

	var playerColors = [
		{light:"#fdb765", dark:"#462600"},
		{light:"#b993f7", dark:"#1b044f"},
		{light:"#a8e3a9", dark:"#124313"},
		{light:"#fca9b5", dark:"#58000c"},
		{light:"#deeb86", dark:"#5c4100"},
		{light:"#b7e6f4", dark:"#043543"},
		{light:"#b7b7b7", dark:"#3d3d3d"},
		{light:"#f0f1d7", dark:"#353119"}
	];

	var model = model_in;
	var view = this;
  var maxPoints;
  var numPlayers=4;
  var playerIconType="number";
  var isRecording=false;
  var cameraPlayerIndex;

	/////////// updating view

  doResize = function(){
  	var winW = $(window).innerWidth();
  	var winH = $(window).innerHeight();
  	console.log("resize:"+winW+","+winH);

  	var gutter = Math.round(winW/100);
  	var scoreGutter = Math.round(gutter/2);
  	var widePlayerTabs = numPlayers<6;

  	var tabWidth = (winW-gutter*10)/numPlayers - gutter;
  	var tabInnerWidth = tabWidth - gutter*2;	  
	  var topButtonWidth = winW - (tabWidth+gutter)*numPlayers - gutter*2;

	  $("#addInfo, #guess").css("height","");
	  $("body").css("font-size",gutter*5);

	  $("#addInfo >.inner").css("padding-top", gutter*2 );
	  var controlHeight = Math.max($("#addInfo").height(), $("#guess").height() )
	  $("#addInfo, #guess").height(controlHeight);

		if (widePlayerTabs) {
			scoreHtml = "";
			for (var i=maxPoints; i>=1; i--){ scoreHtml += '<div class="point point'+i+' pointOf'+maxPoints+'"></div>'; }
			$(".score").html('<div class="scoreInner"><div class="scoreInner2">'+scoreHtml+'</div></div>');

			var tabPictureWidth = tabInnerWidth*.7-gutter;
	  	var tabPictureHeight = tabPictureWidth/.75;
			var tabScoreWidth = tabInnerWidth*.3;
			var tabScoreHeight = tabPictureHeight;
			var scoreMarginTop = gutter;
			var pointWidth = tabScoreWidth-scoreGutter*2;
			var pointHeight = (tabScoreHeight-scoreGutter)/maxPoints - scoreGutter;
			var lastPointWidth = pointWidth;
			var lastPointHeight = pointHeight*2;
			var pointMarginBottom = scoreGutter;
			var pointMarginRight = 0;
			var playersPaneHeight = tabPictureHeight+gutter*4;
			var scoreInner2Width = "100%";
			var scoreInner2Height = "150%";

	  	topButtonWidth = Math.min( topButtonWidth, (tabPictureHeight+gutter)/2 );
		}
		else  {
			scoreHtml = "";
			for (var i=1; i<=maxPoints; i++){ scoreHtml += '<div class="point point'+i+' pointOf'+maxPoints+'"></div>'; }
			$(".score").html('<div class="scoreInner"><div class="scoreInner2">'+scoreHtml+'</div></div>');

			var tabPictureWidth = tabInnerWidth;
	  	var tabPictureHeight = tabPictureWidth/.75;	
			var tabScoreWidth = tabInnerWidth;
			var tabScoreHeight = gutter*5;
			var scoreMarginTop = 0;
			var pointWidth = (tabScoreWidth-scoreGutter)/maxPoints - scoreGutter;
			var pointHeight = tabScoreHeight-scoreGutter*2;
			var lastPointWidth = pointWidth*2;
			var lastPointHeight = pointHeight;
			var pointMarginBottom = 0;
			var pointMarginRight = scoreGutter;
			var playersPaneHeight = tabPictureHeight+tabScoreHeight+ gutter*5;
			var scoreInner2Width = "150%";
			var scoreInner2Height = "100%";
		}
		var characterHeight = winH - playersPaneHeight - gutter*12 - controlHeight;
		
		var challengePlayerHeight = (winH - playersPaneHeight - gutter*10) / (Math.ceil((numPlayers-1)/2)) - gutter*6; 
		$(".challengePlayer").css({"width":challengePlayerHeight*.75, "margin":gutter*2});
		
		$(".players").height(playersPaneHeight);
		$(".playerTab").css({"width":tabWidth, "margin-left":gutter, "margin-top":gutter});  	
		$(".playerTab .picture").css({"width":tabPictureWidth, "margin-top":gutter, "margin-left":gutter, "margin-bottom":gutter});
		$(".playerTab .score").css({"width":tabScoreWidth, "height":tabScoreHeight, "margin-top":scoreMarginTop, "margin-left":gutter, "margin-bottom":gutter});
		$(".playerTab .scoreInner").css({"margin":scoreGutter, "height":tabScoreHeight-scoreGutter*2, "width":tabScoreWidth-scoreGutter*2});
		$(".playerTab .scoreInner2").css({"width":scoreInner2Width, "height":scoreInner2Height});
		
		$(".playerTab .point").css({"width":pointWidth, "height":pointHeight, "margin-bottom":pointMarginBottom, "margin-right":pointMarginRight});
		$(".playerTab .point:last-child").css({"width":lastPointWidth, "height":lastPointHeight});
		corner( $(".playerTab"), gutter*2);
		corner( $(".playerTab .picture, .playerTab .score"), gutter*1.5);
		corner( $(".playerTab .scoreInner"), gutter);

		$("#topButtons").width(topButtonWidth+gutter);
		$("#topButtons >img").css({"margin-top":gutter, "height":topButtonWidth, "width":topButtonWidth});
		corner( $("#topButtons img"), gutter*1.5);

		$(".characterHolder").css({"margin-top":gutter*2, "margin-bottom":gutter*4, "border-width":gutter, "height":characterHeight, "margin-left":gutter*2, "margin-right":gutter*2});
		corner( $(".characterHolder"), gutter*4);

    var cameraPicWidth = (winW-gutter*6)/2;
    var cameraPicHeight = (winH - gutter*20) / Math.ceil(numPlayers/2) - gutter*2;
		$("#cameraScreen .pic").css({"margin-left":gutter*2, "margin-top":gutter*2, "width": Math.min(cameraPicWidth, cameraPicHeight), "height": Math.min(cameraPicWidth, cameraPicHeight) })

		$("#control").css({"border-width":gutter, "margin-left":gutter*2, "margin-right":gutter*2});		
		corner( $("#control .title"), gutter*2);
		corner( $("#control"), gutter*4);
	  $("#addInfo >.inner").css("padding-top", (controlHeight-$("#addInfo >.inner"))/2  );
	  $("#control .title").css({"top":(-3)*gutter, "left":gutter});
	  /*
	  $("p").css("font-size",gutter*4);
	  $("h3").css("font-size",gutter*11);
	  $("h5").css("font-size",gutter*4);
	  $("h6").css("font-size",gutter*3);
	  */


		corner( $("#optionsScreen a"), gutter*2);
		corner( $(".challengePlayer"), gutter*4);
  }
  $(window).resize(doResize);

	this.startGame = function(players, maxPointsIn, playerIconTypeIn){
		numPlayers = players.length;
		maxPoints = maxPointsIn;
		playerIconType = playerIconTypeIn;
		
		setPlayerHtml();

		showScreen("game");
		$("#challenge").hide();

		doResize();
	}

	this.updatePlayersScore = function(players){
		for (var i=0; i<players.length; i++){
			$("#gameScreen .playerTab"+i+" .score").removeClass().addClass("score s"+players[i].score);
		}
	}

	this.showGuess = function(playerIndex, character, isChallenge){
		showScreen("game");
		$("#challenge").hide();
		$("#character").show();
		$("#guess").show();
		$("#addInfo").hide();

		var numFacts=-1;//compensate for including name in array
		for (var i=0; i<character.facts.length; i++){
			if (character.facts[i]!="") numFacts++;
		}
		if (numFacts<1) $("#guess h3").html("Recall: Name");
		else if (numFacts==1) $("#guess h3").html("Recall: Name & 1 fact");
		else $("#guess h3").html("Recall: Name & "+numFacts+" facts");

		$("#gameScreen").removeClass().addClass("screen player"+playerIndex);
		$("#guessChallenge").toggle(!isChallenge);
		highlightPlayer(playerIndex);
		showCharacter(character.index);
	}


	this.showIntro = function(playerIndex, characterId, prompt){
		showScreen("game");
		$("#challenge").hide();
		$("#character").show();
		$("#guess").hide();
		$("#addInfo").show();

		highlightPlayer(playerIndex);
		showCharacter(characterId);
  	$("#factLabel2").html(prompt+"?");	
	}

	this.showWin = function(playerIndex){
		$("#winScreen h3").html("Player "+(playerIndex+1)+" won!");
		showScreen("win");
	}

	this.showIntro = function(playerIndex, characterId, prompt){
		showScreen("game");
		$("#challenge").hide();
		$("#character").show();
		$("#guess").hide();
		$("#addInfo").show();

		highlightPlayer(playerIndex);
		showCharacter(characterId);
  	$("#factLabel2").html(prompt+"?");	
	}

	function showCharacter(id){
		if (!id) id=1;
		$(".characterHolder img").attr("src", "img/characters/c"+id+".jpg");
	}

	function toggleRecording(){
		if (isRecording){
			model.stopRecordingCharacterFact();
			$("#introRecord img").attr("src","img/record.jpg");
			isRecording=false;
		}
		else  {
			$("#introRecord img").attr("src","img/stop.jpg");
			isRecording=true;
			model.startRecordingCharacterFact();
		}
	}

	function setPlayerHtml(){
		var playersHtml="";
		var challengeHtml="";
		var cameraHtml="";
		for (var p=0; p<numPlayers; p++){
			var img = "img/players_numbers/player"+p+".jpg";
			if (playerIconType=="animal") img = "img/players_animals/player"+p+".jpg";
			if (playerIconType=="photo") img = "img/players_temp/player"+p+".jpg";
			playersHtml+='<div class="playerTab playerTab'+p+'"><img class="picture" src="'+img+'"/><div class="score"></div></div>';
			challengeHtml+='<a href="#" class="challengePlayer challengePlayer'+p+'" data-index="'+p+'"><img src="'+img+'"></a>';
  		cameraHtml += '<a href="#" class="pic" id="pic'+p+'" data-index="'+p+'"><img src="img/cameraTemp.jpg"/></a>';
  		if (p%2!=0) cameraHtml += '<br/>';
		}
		$(".players").html(playersHtml);
		$("#challengeOptions").html(challengeHtml);
		$("#cameraOptions").html(cameraHtml);

		$("#challenge .challengePlayer").click(function(){ model.submitChallenge( $(this).attr("data-index") ); });
		$("#cameraScreen .pic").click( function(){ takePlayerPhoto( $(this).data("index") ) });

		this.doResize();
	}

	this.showGame = function(){
		showScreen("game");
	}
	this.showOptions = function(){
		optionClick( $() );
		showScreen("options");
	}
	this.showInstructions = function(){
		showScreen("instructions")
	}
	this.showHints = function(){
		showScreen("hints")
	}
	this.showCamera = function(){
		numPlayers = $("#optionsPlayers .chosen").attr("data-value");
		showScreen("camera");
		setPlayerHtml();
	}
	this.showMenu = function(){
		toggleContinueLinks();
		showScreen("menu");
	}

	function takePlayerPhoto(playerIndex){
		model.takePlayerPhoto(playerIndex);
	}
	this.setPlayerPicture = function(playerIndex, imageReference){
		model.debug("setPlayerPicture:"+playerIndex+":"+imageReference);
		$("#cameraOptions #pic"+playerIndex).attr("src", imageReference);
	}

	this.showChallengePlayers = function(currentPlayerIndex){
		showScreen("game");
		$("#challenge").show();
		$("#character").hide();
		$(".challengePlayer").show();
		$(".challengePlayer"+currentPlayerIndex).hide();
	}

	function toggleContinueLinks(){
		console.log("toggle:"+this.model.isGameInProgress, this.model);
		if (this.model.isGameInProgress) $(".continueGameLink").show();
		else $(".continueGameLink").hide();
	}

	function highlightPlayer(playerIndex){

		$("#gameScreen").removeClass().addClass("screen player"+playerIndex);

		$(".playerTab").removeClass("active");
		$("#gameScreen .playerTab"+playerIndex).addClass("active");
	}

	function showScreen(label){
		$(".screen").hide();
		$("#"+label+"Screen").show();
	}

	function startGameClicked(){
		var numPlayers = $("#optionsPlayers .chosen").attr("data-value");
		var maxScores = [0,13,9,8,6,5,4,3,3];
		var maxScores = [0,2,2,2,2,2,2,2,2];
		var maxScore = maxScores[numPlayers];
		
		var initFacts = 1;
		if ( $("#optionsDifficulty .chosen").attr("data-value")>1) initFacts=2;

		var initChars = 5;
		if ( $("#optionsDifficulty .chosen").attr("data-value")>1) initChars=7;

		var maxChars=26;
		var chanceOfUnnamed=.75;
		if ( $("#optionsDepth .chosen").attr("data-value")==2){
			maxChars=20;
			chanceOfUnnamed=.7;
		}
		else if ( $("#optionsDepth .chosen").attr("data-value")==3){
			maxChars=15;
			chanceOfUnnamed=.65;
		}

		var turnsBeforeRepeat = 4;

		model.startGame(numPlayers, maxScore, initFacts, initChars, maxChars, chanceOfUnnamed, turnsBeforeRepeat);
	}

	function optionClick(me){
		me.siblings().removeClass("chosen");
		me.addClass("chosen");

		if ( $("#optionsIcons1").hasClass("chosen") ){
			$("#optionsScreen .startGameLink").hide();
			$("#optionsScreen .cameraLink").show();
		}
		else {
			$("#optionsScreen .startGameLink").show();
			$("#optionsScreen .cameraLink").hide();
		}
	}
  
	///////////////////// click handlers
	$(".newGameLink").click( function(){ view.showOptions() });
	$(".continueGameLink").click( function(){ view.showGame() });
	$(".startGameLink").click( function(){ startGameClicked() });
	$(".menuLink").click( function(){ view.showMenu() });
	$(".instructionsLink").click( function(){ view.showInstructions() });
	$(".cameraLink").click( function(){ view.showCamera() });
	$(".hintsLink").click( function(){ view.showHints() });
	$("#introRecord").click( function(){ toggleRecording() });
	$("#introPlay").click( function(){ model.startPlayingCurrentCharacterFact() });
	$("#introNext").click( function(){ $(this).hide(); model.introComplete(); }); 
	$("#guessCheck").click( function(){ model.playAllFactsForCurrentCharacter() });
	$("#guessCorrect").click( function(){ model.submitCorrect() });
	$("#guessIncorrect").click( function(){ model.submitIncorrect() });
	$("#guessChallenge").click( function(){ model.showChallengePlayers() });
	$("#optionsScreen a").click(function(){ optionClick( $(this) ) });
	
}

function corner(target, val){
	if (typeof val == "number"){
		target.css({ 
			"-webkit-border-radius":val, "-moz-border-radius":val, "border-radius":val
		});
	}
	/*
	else {
		target.css({ 
			"-webkit-border-radius":val, "-moz-border-radius":val, "border-radius":val
		});
	}*/
}

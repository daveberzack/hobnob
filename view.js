var View = function(model_in){

  var playerPhotos = [];

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
  var cameraPlayerIndex;

	/////////// updating view

  doResize = function(){
  	var winW = $(window).innerWidth();
  	var winH = $(window).innerHeight();
  	var x1 = Math.round(winW/100);
  	var x2 = Math.round(x1/2);
  	var widePlayerTabs = numPlayers<6;
  	var tabWidth = (winW-x1*10)/numPlayers - x1;
  	var tabInnerWidth = tabWidth - x1*2;	  
	  var topButtonWidth = winW - (tabWidth+x1)*numPlayers - x1*2;

	  $("#addInfo, #guess").css("height","");
	  $("body").css("font-size",x1*5);


	  $("#control .title").width("auto");
	  var titleW = $("#control .title").width()+x1*8;
	  if (titleW<120) titleW = winW*.7;
	  $("#control .title").css({"top":(-8)*x1, "left": (winW - titleW - x1*2)/2, "width":titleW, "border-width":x1, "padding-top":x1, "padding-bottom":x1});
	  $("#control").css({"padding-top":6*x1, "padding-bottom":2*x1});
	  var controlButtonWidth = (winW-x1*4)/4-x1*5;

		$("#control .labelBlock").css({"width":controlButtonWidth*2+x1*12, "padding-top":x1*3});
		$("#factLabel2").css({"margin-top":x1*0, "margin-left":x1*4, "margin-top":x1});
		$("#control a").css({"width":controlButtonWidth, "border-width":x1, "margin-bottom":x1*2, "margin-left":x1*2, "margin-right":x1*2});
		$("#control a:last-child").css({"margin-right":0});
		$("#control a img").css({"margin-top":x1, "width":controlButtonWidth-x1*4});
		$("#control a h5").css({"margin-bottom":x1*2});
		$("#control a h5").css({"margin-bottom":x1*2});
	  var controlHeight = Math.max($("#addInfo").height(), $("#guess").height() )
	  $("#addInfo, #guess").height(controlHeight);
		corner( $("#control .title"), x1*3);
		corner( $("#control a"), x1*4);


// menu
		$("#menuScreen a").css({"margin-bottom":x1*2, "padding":x1*2 });
		var menuW = winW-x1*12;
		$("#menuScreen a").css({"width":menuW-x1*2, "margin-left":x1*2, "margin-right":x1*2, "border-width":x1 });
		$("#menuScreen a.narrow.left").css({"width":menuW/2-x1*5, "margin-right":x1 });
		$("#menuScreen a.narrow.right").css({"width":menuW/2-x1*5, "margin-left":x1 });
		var splashH = winH - $("#menuLinks").height() - x1*10;
		var splashAspect = 882/1122;
		var splashW = Math.min( winW*1.16, splashH*splashAspect );
		$("#menuSplash").css({"width":splashW ,"margin-bottom":splashH*-.18 });


//options 
		var optionLinkW = winW/7;
		var optionLinkW2 = ( (optionLinkW+x1*2)*3 +x1*6)/8-x1*2;
		$("#optionsTitle").css({"margin-top":x1*8, "margin-left":x1*2, "margin-bottom":x1*8 });
		$(".optionGroup").css({"margin":x1*2, "padding-top":x1*2, "padding-bottom":x1*2, "border-width":x1 });
		$(".optionGroup a").css({"width":optionLinkW, "margin-right":x1*2, "border-width":x1 });
		$("#optionsPlayers a").css({"width":optionLinkW2, "height":optionLinkW*1.33, "margin-right":x1*2, "border-width":0 });
		corner( $("#optionsScreen >div"), x1*4);
		corner( $(".optionGroup a"), x1*2);
		$("#optionsScreen >a").css({"border-width":x1, "margin-top":x1*6, "padding":x1*2 });

//camera
    var cameraPicWidth = (winW-x1*6)/2;
    var cameraPicHeight = (winH - x1*20) / Math.ceil(numPlayers/2) - x1*2;
		$("#cameraScreen .pic").css({"margin-left":x1*2, "margin-top":x1*2, "width": Math.min(cameraPicWidth, cameraPicHeight), "height": Math.min(cameraPicWidth, cameraPicHeight) })
		

//winScreen 
		$("#winScreen a").css({"border-width":x1, "margin-top":x1*2, "padding":x1*2 });
		$("#winLinks").css({"border-top-width":x1, "padding-top":x1*4, "padding-bottom":x1*4 });
		corner( $("#winImage"), x1*8);
		console.log(":"+$("#winLinks").height() +"-"+ $("#winScreen h2").height() );
		var winImageH = winH - $("#winLinks").height() - $("#winScreen h2").height() - x1*32;
		$("#winScreen img").css({"border-width":x1*2, "margin-top":x1*8, "margin-bottom":x1*6, "width":winImageH*.75 });

//player tabs
		if (widePlayerTabs) {
			scoreHtml = "";
			for (var i=maxPoints; i>=1; i--){ scoreHtml += '<div class="point point'+i+' pointOf'+maxPoints+'"></div>'; }
			$(".score").html('<div class="scoreInner"><div class="scoreInner2">'+scoreHtml+'</div></div>');

			var tabPictureWidth = tabInnerWidth*.7-x1;
	  	var tabPictureHeight = tabPictureWidth/.75 - x2;
			var tabScoreWidth = tabInnerWidth*.3;
			var tabScoreHeight = tabPictureHeight;
			var scoreMarginTop = x1;
			var pointWidth = tabScoreWidth-x2*2;
			var pointHeight = (tabScoreHeight-x2)/maxPoints - x2;
			var lastPointWidth = pointWidth;
			var lastPointHeight = pointHeight*2;
			var pointMarginBottom = x2;
			var pointMarginRight = 0;
			var playersPaneHeight = tabPictureHeight+x1*4;
			var scoreInner2Width = "100%";
			var scoreInner2Height = "150%";

	  	topButtonWidth = Math.min( topButtonWidth, (tabPictureHeight+x1)/2 );
		}
		else  {
			scoreHtml = "";
			for (var i=1; i<=maxPoints; i++){ scoreHtml += '<div class="point point'+i+' pointOf'+maxPoints+'"></div>'; }
			$(".score").html('<div class="scoreInner"><div class="scoreInner2">'+scoreHtml+'</div></div>');

			var tabPictureWidth = tabInnerWidth;
	  	var tabPictureHeight = tabPictureWidth/.75;	
			var tabScoreWidth = tabInnerWidth;
			var tabScoreHeight = x1*5;
			var scoreMarginTop = 0;
			var pointWidth = (tabScoreWidth-x2)/maxPoints - x2;
			var pointHeight = tabScoreHeight-x2*2;
			var lastPointWidth = pointWidth*2;
			var lastPointHeight = pointHeight;
			var pointMarginBottom = 0;
			var pointMarginRight = x2;
			var playersPaneHeight = tabPictureHeight+tabScoreHeight+ x1*5;
			var scoreInner2Width = "150%";
			var scoreInner2Height = "100%";
		}

		$(".players").height(playersPaneHeight);
		$(".playerTab").css({"width":tabWidth, "margin-left":x1, "margin-top":x1});  	
		$(".playerTab .picture").css({"width":tabPictureWidth-x2*2, "border-width":x2, "margin-top":x1, "margin-left":x1, "margin-bottom":x1});
		$(".playerTab .score").css({"width":tabScoreWidth, "height":tabScoreHeight, "margin-top":scoreMarginTop, "margin-left":x1, "margin-bottom":x1});
		$(".playerTab .scoreInner").css({"margin":x2, "height":tabScoreHeight-x2*2, "width":tabScoreWidth-x2*2});
		$(".playerTab .scoreInner2").css({"width":scoreInner2Width, "height":scoreInner2Height});
		
		$(".playerTab .point").css({"width":pointWidth, "height":pointHeight, "margin-bottom":pointMarginBottom, "margin-right":pointMarginRight});
		$(".playerTab .point:last-child").css({"width":lastPointWidth, "height":lastPointHeight});
		corner( $(".playerTab"), x1*2);
		corner( $(".playerTab .picture, .playerTab .score"), x1*1.5);
		corner( $(".playerTab .scoreInner"), x1);

		$("#topButtons").width(topButtonWidth+x1);
		$("#topButtons >img").css({"margin-top":x1, "height":topButtonWidth, "width":topButtonWidth});
		corner( $("#topButtons img"), x1*1.5);




		var characterHeight = winH - playersPaneHeight - x1*10 - controlHeight;
		
		var challengePlayerHeight = (winH - playersPaneHeight - x1*10) / (Math.ceil((numPlayers-1)/2)) - x1*16; 
		$(".challengePlayer").css({"margin":x1*2});
		$(".challengePlayer >img").css({"max-width":winW/2-x1*14, "max-height":challengePlayerHeight});
		corner( $(".challengePlayer"), x1*4);
		


		$(".characterHolder").css({"margin-top":x1*2, "border-width":x1, "height":characterHeight, "margin-left":x1*2, "margin-right":x1*2});
		corner( $(".characterHolder"), x1*4);

  }

  $(window).resize(doResize);



	this.startGame = function(numPlayers_in, maxPointsIn, playerIconTypeIn){
		numPlayers = numPlayers_in;
		maxPoints = maxPointsIn;
		playerIconType = playerIconTypeIn;
		
		setPlayerHtml();
		$("#challenge").hide();
		$("#guess").hide();
		toggleIntro("Record");
		showScreen("game");
	}

	this.updatePlayersScore = function(playerScores){
		for (var i=0; i<playerScores.length; i++){
			$("#gameScreen .playerTab"+i+" .score").removeClass().addClass("score s"+playerScores[i]);
		}
	}

	this.showGuess = function(playerIndex, characterIndex, numFacts, isChallenge){
		showScreen("game");
		$("#challenge").hide();
		$("#character").show();
		$("#guess").show();
		$("#addInfo").hide();

		$("#gameScreen").removeClass().addClass("screen player"+playerIndex);
		$("#guessChallenge").toggle(!isChallenge);
		highlightPlayer(playerIndex);
		showCharacter(characterIndex);
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
		$("#winScreen").removeClass().addClass("screen player"+playerIndex);
		$("#winImage").attr("src","img/players_numbers/player"+playerIndex+".jpg");
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
  	$("#introNext").addClass("disabled");
		toggleIntro("Record");
	}

	function showCharacter(id){
		if (!id) id=1;
		$(".characterHolder img").attr("src", "img/characters/c"+id+".png");
	}

	function toggleIntro(which){
		$("#introRecord, #introStop, #introPlay").addClass("hidden");
		$("#intro"+which).removeClass("hidden");
	}
	function startRecording(){
		toggleIntro("Stop");
		model.startRecordingCharacterFact();
	}
	function stopRecording(){
		toggleIntro("Play");
		model.stopRecordingCharacterFact();
  	$("#introNext").removeClass("disabled");
	}
	function playRecording(){
		toggleIntro("Record");
		model.startPlayingCurrentCharacterFact();
	}

	function setPlayerHtml(){
		var playersHtml="";
		var challengeHtml="";
		var cameraHtml="";
		
		for (var p=0; p<numPlayers; p++){
			var img = "img/players_numbers/player"+p+".jpg";
			if (playerIconType=="animal") img = "img/players_animals/player"+p+".jpg";
			if (playerIconType=="photo") {
				if (playerPhotos[p]) img = playerPhotos[p];
				else img = "img/players_numbers/player"+p+".jpg";
			}
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
		showScreen("menu");
	}

	function takePlayerPhoto(playerIndex){
		model.takePlayerPhoto(playerIndex);
	}
	this.setPlayerPicture = function(playerIndex, imageReference){
		$("#cameraOptions #pic"+playerIndex).attr("src", imageReference);
		playerPhotos[playerIndex] = imageReference;
	}

	this.showChallengePlayers = function(currentPlayerIndex){
		showScreen("game");
		$("#challenge").show();
		$("#character").hide();
		$(".challengePlayer").show();
		$(".challengePlayer"+currentPlayerIndex).hide();
	}

	this.showContinueLinks = function(){
		$(".continueGameLink").show();
		$(".newGameLink").addClass("narrow right");
	}
	this.hideContinueLinks = function(){
		$(".continueGameLink").hide();
		$(".newGameLink").removeClass("narrow right");
	}

	function highlightPlayer(playerIndex){

		$("#gameScreen").removeClass().addClass("screen player"+playerIndex);

		$(".playerTab").removeClass("active");
		$("#gameScreen .playerTab"+playerIndex).addClass("active");
	}

	function showScreen(label){
		$(".screen").hide();
		$("#"+label+"Screen").show();
		doResize();
	}

	var optionLabels = [
		["One","Two","Three","Four","Five","Six","Seven","Eight"],
		["Easy","Medium","Hard"],
		["More Faces","Medium","More Detail"],
		["Selfies","Numbers","Animals"]
	];
	var optionValues = [3,0,1,0];


	function updateOptions(){
		$("#optionsScreen .option").removeClass("chosen");

		for (var i=0; i<optionValues.length;i++){
			if (i==0){
				for(var j=0; j<=optionValues[0]; j++){  $("#options0_"+j).addClass("chosen");  }
			}
			else {
				$("#options"+i+"_"+optionValues[i]).addClass("chosen");	
			}
			$("#optionValue"+i).html( optionLabels[i][ optionValues[i] ] );
		}

		if ( optionValues[3]==0 ){//OMG, selfie
			$("#optionsScreen .startGameLink").hide();
			$("#optionsScreen .cameraLink").show();
		}
		else {
			$("#optionsScreen .startGameLink").show();
			$("#optionsScreen .cameraLink").hide();
		}
	}

	function optionClick(me){
		optionValues[me.data("set")] = me.data("value");
		updateOptions();
	}
	updateOptions();
  
	function startGameClicked(){
		var npl = optionValues[0];
		var lvl = optionValues[1];
		var dep = optionValues[2];
		var tkn = optionValues[3];

		var initFactsByLevel = [1,2,2];
		var initCharsByLevel = [5,5,7];
		var maxScoresByPlayer = [18,13,9,8,6,5,4,3,3];
		var maxCharsByDepth=[26,20,15];
		var chanceOfUnnamedByDepth=[.75,.7,.65];

		model.startGame(npl+1, maxScoresByPlayer[npl]+lvl, initFactsByLevel[lvl], initCharsByLevel[lvl], maxCharsByDepth[dep], chanceOfUnnamedByDepth[dep], tkn);
	}
	

	///////////////////// click handlers
	$(".newGameLink").click( function(){ view.showOptions() });
	$(".continueGameLink").click( function(){ view.showGame() });
	$(".startGameLink").click( function(){ startGameClicked() });
	$(".menuLink").click( function(){ view.showMenu() });
	$(".instructionsLink").click( function(){ view.showInstructions() });
	$(".cameraLink").click( function(){ view.showCamera() });

	//$(".hintsLink").click( function(){ view.showHints() });
	$("#introRecord").click( function(){ startRecording() });
	$("#introStop").click( function(){ stopRecording() });
	$("#introPlay").click( function(){ playRecording() });
	$("#introNext").click( function(){ model.introComplete(); });
	$("#guessCheck").click( function(){ model.playAllFactsForCurrentCharacter() });
	$("#guessCorrect").click( function(){ model.submitCorrect() });
	$("#guessIncorrect").click( function(){ model.submitIncorrect() });
	$("#guessChallenge").click( function(){ view.showChallengePlayers() });
	$("#optionsScreen a").click(function(){ optionClick( $(this) ) });
	
	/*$("#menuSplash").click( function(){ model.testStoreData() });
	$("#splashTagline").click( function(){ model.testRetrieveData() });*/
}

function corner(target, val){
	if (typeof val == "number"){
		target.css({ 
			"-webkit-border-radius":val, "-moz-border-radius":val, "border-radius":val
		});
	}
	//might later add option for array, for asymmetrical corners
}

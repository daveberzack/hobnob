var View = function(model_in){
	var model = model_in;
	var view = this;
	var MAX_PLAYERS = 8;
  var maxPoints;
  var numPlayers=4;
  

  var playerIconType="number";
  var cameraPlayerIndex;

  var winW,winH,x1,x2,playersPaneHeight;

	resizeMenu = function(){
		try {
			var logoH = winH - x1*52;
			var logoAspect = 882/1122;
			var logoW = Math.min( winW*1.16, logoH*logoAspect );
			var menuW = winW-x1*12;
			$("#menuScreen a").css({"margin-bottom":x1*2, "padding":x1*2 });
			$("#menuScreen a").css({"width":menuW-x1*2, "margin-left":x1*2, "margin-right":x1*2, "border-width":x1 });
			$("#menuScreen a.narrow.left").css({"width":menuW/2-x1*5, "margin-right":x1 });
			$("#menuScreen a.narrow.right").css({"width":menuW/2-x1*5, "margin-left":x1 });
			$("#menuLogo").css({"width":logoW ,"margin-bottom":logoH*-.18 });
    }
    catch (err) {
      model.logError(err, arguments);
    }
	}
	resizeOptions = function(){
		try {
			var optionLinkW = winW/7;
			var optionLinkW2 =  optionLinkW*3/8 -x1/2;
			$("#optionsTitle").css({"margin-top":x1*4, "margin-left":x1*2, "margin-bottom":x1*6 });
			$(".optionGroup").css({"margin":x1*2, "padding-top":x1*2, "padding-bottom":x1*2, "border-width":x1 });
			$(".optionGroup a").css({"width":optionLinkW, "margin-right":x1*2, "border-width":x1 });
			$("#optionsPlayers a").css({"width":optionLinkW2, "height":optionLinkW, "margin-right":x1*2, "border-width":0 });
			corner( $("#optionsScreen >div"), x1*4);
			corner( $(".optionGroup a"), x1*2);
			$("#optionsGeneral").css({"margin-bottom":x1*5 });
			$("#optionsScreen >a").css({"border-width":x1, "margin-top":x1*2, "padding":x1*2 });
    }
    catch (err) {
      model.logError(err, arguments);
    }
	}
	resizeNext = function(){
		try {
			$(".nextPlayerPhoto").css({"margin-top":x1*14, "margin-left":winW*.15, "height":winW*.7-x1*2, "width":winW*.7-x1*2, "border-width":x1*2});
			$("#nextPlayerLabel").css({"margin-top":x1*4});
			$("#nextPlayerLabel2").css({"margin-top":x1*4});
			$("#nextPlayerLabel2 h3").css({"padding":x1*2});
			$("#nextPlayerPrompt").css({"top":playersPaneHeight, "height":winH-playersPaneHeight+x1*10})
			corner( $(".nextPlayerPhoto"), x1*8);
			corner( $("#nextPlayerLabel2 h3"), x1*5);
    }
    catch (err) {
      model.logError(err, arguments);
    }
	}
	resizeWin = function(){
		try {
			$("#winScreen a").css({"border-width":x1, "margin-top":x1*2, "padding":x1*2 });
			$("#winLinks").css({"border-top-width":x1, "padding-top":x1*4, "padding-bottom":x1*4 });
			corner( $(".winImage"), x1*8);
			var winImageH = winH - x1*75;
			$(".winImage").css({"border-width":x1*2, "margin-top":x1*8, "width":winImageH*.75 });	
			$("#winScreen h2").css({"margin-top":x1*4});			
			$("#winScreen h3").css({"margin-top":x1*4, "padding":x1});			
    }
    catch (err) {
      model.logError(err, arguments);
    }
	}
	resizeCamera = function(){
		try {
	    var cameraPicWidth = (winW-x1*44)/2;
	    var cameraPicHeight = (winH - x1*8*numPlayers) / Math.ceil(numPlayers/2) - x1*2;
			$("#cameraScreen .pic").css({"border-width":x1, "margin-left":x1*2, "margin-top":x1*2, "width": Math.min(cameraPicWidth, cameraPicHeight), "height": Math.min(cameraPicWidth, cameraPicHeight) })
			$("#cameraTitle").css({"margin-top":x1*4, "margin-bottom":x1*6 });
			$("#cameraScreen .mainButton").css({ "border-width":x1, "padding":x1*2, "margin-top":x1*5 });
			corner( $("#cameraScreen .pic"), x1*4);
    }
    catch (err) {
      model.logError(err, arguments);
    }
	}
	resizeChallenge = function(){
		try {
			var challengePlayerAvailableHeight = winH - playersPaneHeight - x1*10;
			var challengePlayerHeight = (challengePlayerAvailableHeight)/(Math.ceil(numPlayers/2)) - x1*16; 
			var challengePlayerWidth = winW/2-x1*14;
			var cph = Math.min(challengePlayerWidth, challengePlayerHeight);
			$(".challengePlayer").css({"margin":x1*2,"border-width":x1});
			$(".challengePlayer .photoHolder").css({"width":cph, "height":cph});
			corner( $(".challengePlayer"), x1*4);
			$("#challengeTitle").css({"margin":x1*5});
			$("#challenge").css({"height":winH});
    }
    catch (err) {
      model.logError(err, arguments);
    }
	}
	resizeMain = function(){
		try {
		  $(".guessPrompt").css({"top":(-4)*x1, "left": winW/2, "width":0});
			$("#guessPrompt1").css({"width":winW*.36, "right":0, "padding-right":x1*7, "padding-top":x1*2, "padding-bottom":x1*2});
			$("#guessPrompt2").css({"width":x1*8, "top":-x1*6, "right":-x1*6, "padding":x1*2});
			$("#guessPrompt3").css({"width":winW*.36, "left":0, "padding-left":x1*7, "padding-top":x1*2, "padding-bottom":x1*2});
		  $("#guessCheck").css({"width":x1*6, "margin-bottom":x1});
		  $("#guessBlock, #challengeBlock").css({"width":winW*.36, "margin":x1*5});
		  $("#undoBlock, #nextBlock").css({"width":winW*.2, "margin":x1*4});
		  $("#undoBlock").css({"margin-left":winW*.15});
		  $("#nextBlock").css({"margin-right":winW*.15});
		  $("#guessOr").css({"bottom":x1*12});
			corner( $("#guessBlock, #challengeBlock, #undoBlock, #nextBlock"), x1*4);
			corner( $("#guessBlock a, #challengeBlock a, #undoBlock a, #nextBlock a"), x1*3);

		  $("#control").css({"padding-top":3*x1, "padding-bottom":2*x1});
		  var controlButtonWidth = x1*15;
			$("#factLabel2").css({"margin-top":x1*0, "margin-left":x1*4, "margin-top":x1});
			$(".controlButton").css({ "margin-top":x1*2, "margin-left":x1*2});
			$(".controlButton:last-child").css({"margin-right":0});
			$(".controlButton img").css({"width":controlButtonWidth-x1*3});
			$(".controlButton h5").css({"margin-bottom":x1*2});
			$(".controlLabel").css({ "margin-bottom":x1*2});
			corner( $(".controlButton"), x1*4);

		  $(".introPrompt").css({"top":(-5)*x1, "left": winW/2, "width":0});
			$("#introPrompt1").css({"width":winW*.84, "left":-winW*.42, "padding-top":x1*2, "padding-bottom":x1*2});
			$("#introButton").css({"width":x1*22, "left":-x1*11, "padding-top":x1*13, "padding-bottom":x1*4});
			$("#introButton a img").css({"width":x1*16});

			var characterHeight = winH - playersPaneHeight - x1*37;
			$(".characterHolder").css({"margin-top":x1*2, "border-width":x1, "height":characterHeight, "margin-left":x1*2, "margin-right":x1*2});
			corner( $(".characterHolder"), x1*4);
    }
    catch (err) {
      model.logError(err, arguments);
    }
	}
	resizeTabs = function(){
		try {
	  	var widePlayerTabs = numPlayers<6 && numPlayers>1;
	  	var tabWidth = (winW-x1*10)/numPlayers - x1;
	  	var tabInnerWidth = tabWidth - x1*2;	  
		  var topButtonWidth = winW - (tabWidth+x1)*numPlayers - x1*2;

			if (widePlayerTabs) {
				scoreHtml = "";
				for (var i=maxPoints; i>=1; i--){ scoreHtml += '<div class="point point'+i+' pointOf'+maxPoints+'"></div>'; }
				$(".score").html('<div class="scoreInner"><div class="scoreInner2">'+scoreHtml+'</div></div>');

				var tabPictureWidth = Math.min( tabInnerWidth*.7-x1, x1*15);
		  	var tabPictureHeight = tabPictureWidth;
				var tabScoreWidth = tabInnerWidth*.3;
				var tabScoreHeight = tabPictureHeight;
				var scoreMarginTop = x1;
				var pointWidth = tabScoreWidth-x2*2;
				var pointHeight = (tabScoreHeight-x2)/maxPoints - x2;
				var lastPointWidth = pointWidth;
				var lastPointHeight = pointHeight*2;
				var pointMarginBottom = x2;
				var pointMarginRight = 0;
				playersPaneHeight = tabPictureHeight+x1*4;
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
				playersPaneHeight = tabPictureHeight+tabScoreHeight+ x1*2;
				var scoreInner2Width = "150%";
				var scoreInner2Height = "100%";
			}

			if (numPlayers==1){
				scoreMarginTop=x1*2;
				tabScoreHeight=x1*12;
				var pointHeight = tabScoreHeight-x2*2;
				var lastPointHeight = pointHeight*2;
				$(".playerTab .photoHolder").hide();
			}
			else {
				$(".playerTab .photoHolder").show();
			}
			
			$(".players").height(playersPaneHeight);
			$(".playerTab").css({"width":tabWidth, "margin-left":x1, "margin-top":x1});  	
			$(".playerTab .photoHolder").css({"width":tabPictureWidth-x2*2,"height":tabPictureWidth-x2*2, "border-width":x2, "margin-top":x1, "margin-left":x1, "margin-bottom":x1});
			$(".playerTab .score").css({"width":tabScoreWidth, "height":tabScoreHeight, "margin-top":scoreMarginTop, "margin-left":x1, "margin-bottom":x1});
			$(".playerTab .scoreInner").css({"margin":x2, "height":tabScoreHeight-x2*2, "width":tabScoreWidth-x2*2});
			$(".playerTab .scoreInner2").css({"width":scoreInner2Width, "height":scoreInner2Height});
			
			$(".playerTab .point").css({"width":pointWidth, "height":pointHeight, "margin-bottom":pointMarginBottom, "margin-right":pointMarginRight});
			$(".playerTab .point:last-child").css({"width":lastPointWidth, "height":lastPointHeight});
			corner( $(".playerTab"), x1*2);
			corner( $(".playerTab .photoHolder, .playerTab .score"), x1*1.5);
			corner( $(".playerTab .scoreInner"), x1);

			$("#topButtons").width(topButtonWidth+x1);
			$("#topButtons >img").css({"margin-top":x1, "height":topButtonWidth, "width":topButtonWidth});
			corner( $("#topButtons img"), x1*1.5);
    }
    catch (err) {
			model.logError(err, arguments);    
		}
	}

  doResize = function(){
	  try {
	  	winW = $(window).innerWidth();
	  	winH = $(window).innerHeight();
	  	x1 = Math.round(winW/100);
	  	x2 = Math.round(x1/2);

		  $("body").css("font-size",x1*5);

		  resizeTabs();
		  resizeMain();
			resizeMenu();
			resizeOptions();
			resizeCamera();
			resizeWin();
			resizeNext();
			resizeChallenge();
    }
    catch (err) {
      model.logError(err, arguments);
    }
  }

  $(window).resize(doResize);
  this.init = function(){
  	doResize();
	}

	this.startGame = function(numPlayers_in, maxPointsIn, playerIconTypeIn){
		try {
			numPlayers = numPlayers_in;
			maxPoints = maxPointsIn;
			playerIconType = playerIconTypeIn;
			this.togglePlayers();

			$("#challenge").hide();
			$("#guess").hide();
			toggleIntro("Record");
			this.showGame();
	  	model.stopPlayingTheme(1000);
	  	var scores = [];
	  	for (var i=0; i<numPlayers; i++){ scores.push(0); }
	  	this.updatePlayersScore(scores);
	  	doResize();
    }
    catch (err) {
      model.logError(err, arguments);
    }
	}

	this.togglePlayers = function(){
		try {
	  	for (var i=0; i<MAX_PLAYERS; i++){
	  		var showPlayer = (i<numPlayers);
				$("#cameraOptions #pic"+i).toggle(showPlayer);
				$(".playerTab"+i).toggle(showPlayer);
				$(".challengePlayer"+i).toggle(showPlayer);
	  	}
    }
    catch (err) {
      model.logError(err, arguments);
    }
	}
	this.updatePlayersScore = function(playerScores){
		try {
			for (var i=0; i<playerScores.length; i++){
				$("#gameScreen .playerTab"+i+" .score").removeClass().addClass("score s"+playerScores[i]);
			}
    }
    catch (err) {
      model.logError(err, arguments);
    }
	}

	this.showNextPlayerPrompt = function(nextPlayerIndex, isChallenge){
		$("#nextPlayerLabel").html("Player "+(nextPlayerIndex+1));
		$("#nextPlayerPrompt").show().removeClass().addClass("player"+nextPlayerIndex);
		$(".nextPlayerPhoto").hide();
		$("#nextPlayerPhoto"+nextPlayerIndex).show();
		$("#nextTurnLabel").toggle(!isChallenge);
		$("#nextChallengeLabel").toggle(isChallenge);
	}

	this.showGuess = function(playerIndex, characterIndex, numFacts, isChallenge){
		this.showGame();
		$("#challenge").hide();
		$("#character").show();
		$("#guess").show();
		$("#addInfo").hide();
		$("#gameScreen").removeClass().addClass("screen player"+playerIndex);
		if (isChallenge){
			$("#challengeBlock").addClass("disabled");
			$("#guessOr").addClass("hidden");
		}
		else {
			$("#challengeBlock").removeClass("disabled");
			$("#guessOr").removeClass("hidden");
		}
		$("#guessPrompt2 h2").html(numFacts);
		if (numFacts>1) $("#guessPrompt3").html("Things About Me?");
		else $("#guessPrompt3").html("Thing About Me?");
		highlightPlayer(playerIndex);
		showCharacter(characterIndex);
	}

	this.showIntro = function(playerIndex, characterId, prompt){
		this.showGame();
		$("#challenge").hide();
		$("#character").show();
		$("#guess").hide();
		$("#addInfo").show();

		highlightPlayer(playerIndex);
		showCharacter(characterId);
  	$("#introPrompt1").html(prompt);
  	$("#nextBlock, #undoBlock").addClass("disabled");
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
  	$("#nextBlock, #undoBlock").addClass("disabled");
		model.startRecordingCharacterFact();
	}
	function stopRecording(){
		toggleIntro("Play");
		model.stopRecordingCharacterFact();
  	$("#nextBlock, #undoBlock").removeClass("disabled");
	}
	function playRecording(){
		model.startPlayingCurrentCharacterFact();
	}
	function undoRecording(){
		toggleIntro("Record");
  	$("#nextBlock, #undoBlock").addClass("disabled");
	}

	this.showGame = function(){
		showScreen("game");
  	model.stopPlayingTheme(1000);
	}
	this.showOptions = function(){
		optionClick( $() );
		showScreen("options");
	}
	this.showInstructions = function(){
		showScreen("instructions")
	}
	this.showCamera = function(){
		numPlayers = optionValues[0]+1;
  	resizeCamera();
		showScreen("camera");
		this.togglePlayers();
	}
	this.showMenu = function(){
  	model.startPlayingTheme();
  	resizeMenu();
		showScreen("menu");
	}

	this.showWinScreen = function(playerIndex){
		$("#winPlayer").html("Player "+(playerIndex+1));
		$("#winScreen").removeClass().addClass("screen player"+playerIndex);
		//$("#winImage").attr("src","img/players_numbers/player"+playerIndex+".jpg");
		$(".winImage").addClass("hidden");
		$("#winImage"+playerIndex).removeClass("hidden");
		showScreen("win");
  	model.startPlayingTheme();
	}

	this.setAvatar = function(playerIndex, url, aspectRatio, setCameraScreen){
	 model.debug("setphoto i:"+playerIndex+", u:"+url+", a:"+aspectRatio)
		try {
			var imgH, imgW, imgL, imgT;
			if (aspectRatio>1){ //wide
				imgH="100%";
				imgW="auto";
				imgT=0;
				imgL= (1-aspectRatio)/2 *100 +"%";
			}
			else { //tall
				imgH="auto";
				imgW="100%";
				imgT=(1-1/aspectRatio)/2 *100 +"%";
				imgL=0;
			}
			var imageSelector = ".playerTab"+playerIndex+" img, #winImage"+playerIndex+" img, .challengePlayer"+playerIndex+" img, #nextPlayerPhoto"+playerIndex+" img";
			if (setCameraScreen) imageSelector +=", #cameraOptions #pic"+playerIndex+" img";
			//console.log("... "+setCameraScreen+" ... "+imageSelector);
			$(imageSelector).attr("src",url).css({"width":imgW, "height":imgH, "top":imgT, "left":imgL});
    }
    catch (err) {
      model.logError(err, arguments);
    }
	}

	this.setAllAvatars = function() {
		model.debug("setAllAvatars")
		if (optionValues[2]==1) type="animals";
		else if (optionValues[2]==2) type="numbers";
		else return;

		for (var i=0; i<8; i++){
			this.setAvatar(i, "img/players_"+type+"/player"+i+".jpg", 1, false);
		}
	}

	this.showChallengePlayers = function(currentPlayerIndex){
		this.showGame();
		$("#challenge").show();
		$("#character").hide();
		$(".challengePlayer").removeClass("hidden");
		$(".challengePlayer"+currentPlayerIndex).addClass("hidden");
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
	}

	var optionLabels = [
		["One","Two","Three","Four","Five","Six","Seven","Eight"],
		["Easy","Medium","Hard"],
		["Selfies","Animals","Numbers"]
	];
	var optionValues = [3,0,0];


	function updateOptions(){
		try {
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

			if ( optionValues[2]==0 ){//OMG, selfie
				$("#optionsScreen .startGameLink").hide();
				$("#optionsScreen .cameraLink").show();
			}
			else {
				$("#optionsScreen .startGameLink").show();
				$("#optionsScreen .cameraLink").hide();
			}
    }
    catch (err) {
      model.logError(err, arguments);
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
		var chanceOfUnnamedByDepth=[.85,.75,.65];

		model.startGame(npl+1, maxScoresByPlayer[npl]+lvl, initFactsByLevel[lvl], initCharsByLevel[lvl], maxCharsByDepth[dep], chanceOfUnnamedByDepth[dep], tkn);
	}
	

	///////////////////// click handlers SHOULD BE ON TOUCH START
	$(".newGameLink").click(  function(){ view.showOptions() });
	$(".continueGameLink").click( function(){ view.showGame() });
	$(".startGameLink").click( function(){ startGameClicked() });
	$(".menuLink").click( function(){ view.showMenu() });
	$(".instructionsLink").click( function(){ view.showInstructions() });
	$(".cameraLink").click( function(){ view.showCamera() });

	$("#introRecord").click( function(){ startRecording() });
	$("#introStop").click( function(){ stopRecording() });
	$("#introPlay").click( function(){ playRecording() });
	$("#introNext").click( function(){ model.introComplete(); });
	$("#introUndo").click( function(){ undoRecording(); });
	$("#guessCheck").click( function(){ model.playAllFactsForCurrentCharacter() });
	$("#guessCorrect").click( function(){ model.submitCorrect() });
	$("#guessIncorrect").click( function(){ model.submitIncorrect() });
	$("#guessChallenge").click( function(){ model.showChallengePlayers() });
	$(".optionGroup a").click(function(){ optionClick( $(this) ) });
	$("#optionsIcons a").click( function(){ view.setAllAvatars(); });

	$("#nextPlayerPrompt").click( function(){ $(this).hide(); });
	$("#challenge .challengePlayer").click(function(){ model.submitChallenge($(this).data("index")); });
	$("#cameraScreen .pic").click( function(){ model.takePlayerPhoto($(this).data("index")); });
}

function corner(target, val){
	if (typeof val == "number"){
		target.css({ 
			"-webkit-border-radius":val, "-moz-border-radius":val, "border-radius":val
		});
	}
	else {
		target.css({ 
			"-webkit-border-top-left-radius":val[0], "-moz-border-radius-topleft":val[0], "border-top-left-radius":val[0],
			"-webkit-border-top-right-radius":val[1], "-moz-border-radius-topright":val[1], "border-top-right-radius":val[1],
			"-webkit-border-bottom-right-radius":val[2], "-moz-border-radius-bottomright":val[2], "border-bottom-right-radius":val[2],
			"-webkit-border-bottom-left-radius":val[3], "-moz-border-radius-bottomleft":val[3], "border-bottom-left-radius":val[3]
		});
	}
}

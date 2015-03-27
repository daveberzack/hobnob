var View = function(model_in){
	var model = model_in;
	var view = this;
	var MAX_PLAYERS = 8;
  var maxPoints;
  var avatarType;
  var numPlayers=4;
  var playerSetupIndex=0;



	this.startGame = function(numPlayers_in, maxPointsIn){
		try {
			numPlayers = numPlayers_in;
			maxPoints = maxPointsIn;
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




	this.showNextPlayerPrompt = function(nextPlayerIndex, nextPlayerName, isChallenge){
		$("#nextPlayerLabel").html(nextPlayerName);
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

	this.showGame = function(){
		showScreen("game");
  	model.stopPlayingTheme(1000);
	}
	this.showOptions = function(){
		optionClick( $() );
		showScreen("options");
	}
	this.showInstructions = function(){
		showScreen("instructions");
		this.showInstructionsPage(0);
	}
	var currentInstructionsIndex=0;
	this.showInstructionsPage = function(index){
		currentInstructionsIndex=index;
		$("#instructionsScreen .page").hide();
		$("#instructionsPage"+index).show();
		$("#instructionsScreen .infoPage").removeClass("current");
		$("#instructionsScreen .infoPage:eq("+index+")").addClass("current");

		if (index<=0) $("#instructionsScreen .infoPrev").addClass("disabled");
		else $("#instructionsScreen .infoPrev").removeClass("disabled");
		if (index>=3) $("#instructionsScreen .infoNext").addClass("disabled");
		else $("#instructionsScreen .infoNext").removeClass("disabled");
	}
	this.changeInstructionsPage = function(change){
		this.showInstructionsPage(currentInstructionsIndex+change);
	}

	this.showPlayers = function(index_in){
		if (typeof index_in == "undefined") index_in=-1;
		playerSetupIndex=index_in+1;

		numPlayers = optionValues[0]+1;
		avatarType = optionValues[2];
		model.initPlayers(numPlayers);
		$("#playerNameInput").val("Player "+(playerSetupIndex+1));
		if (avatarType==0) {
			$("#avatarSelect").attr("src","img/players_numbers/"+playerSetupIndex+".jpg");
			$("#avatarSelect").addClass("inactive");
		}
		else if (avatarType==1){
			$("#avatarSelect").attr("src","img/avatar_default.jpg");
			$("#avatarOptions .animal").hide();
			$("#avatarOptions .icon").show();
			$("#playersScreen .mainButton").addClass("disabled");
			$("#avatarSelect").removeClass("inactive");
		}
		else  {
			$("#avatarSelect").attr("src","img/avatar_default.jpg");
			$("#avatarOptions .animal").show();
			$("#avatarOptions .icon").hide();
			$("#playersScreen .mainButton").addClass("disabled");
			$("#avatarSelect").removeClass("inactive");
		}

		if (playerSetupIndex+1>=numPlayers) {
			$("#playersScreen .startGameLink").show();
			$("#playersScreen .nextPlayerLink").hide();
		}
		else {
			$("#playersScreen .startGameLink").hide();
			$("#playersScreen .nextPlayerLink").show();
		}
  	resizePlayers();
		$("#avatarOptions").hide();
		showScreen("players");
		this.togglePlayers();
		$("#playersScreen").removeClass().addClass("screen p"+playerSetupIndex);
	}

	this.setPlayer = function(){
		try {
			var i = playerSetupIndex;
			var url = $("#avatarSelect").attr("src");
			var imageSelector = ".playerTab"+i+" img, #winScreen .avatar"+i+", .challengePlayer"+i+" img, #nextPlayerPhoto"+i+" img, #playersScreen .player"+i+" img";
			$(imageSelector).attr("src",url);//.css({"width":"100%", "top":0, "left":0});
			model.setPlayerName(i, $("#playerNameInput").val());
    }
    catch (err) {
      model.logError(err, arguments);
    }
	}
	function showAvatarOptions(){
		$("#avatarOptions").show();
	}
	function selectAvatar(src){
		$("#avatarOptions").hide();
		$("#avatarSelect").attr("src", src);
			$("#playersScreen .mainButton").removeClass("disabled");
	}


	this.showMenu = function(){
  	model.startPlayingTheme();
  	resizeMenu();
		showScreen("menu");
	}

	this.showWinScreen = function(playerIndex){
		$("#winPlayer").html("Player "+(playerIndex+1));
		$("#winScreen").removeClass().addClass("screen p"+playerIndex);
		$("#winScreen .avatar").addClass("hidden");
		$("#winScreen .avatar"+playerIndex).removeClass("hidden");
		showScreen("win");
  	model.startPlayingTheme();
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
		["Numbers","Icons","Animals"]
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

		model.startGame(npl+1, maxScoresByPlayer[npl]+lvl, initFactsByLevel[lvl], initCharsByLevel[lvl], maxCharsByDepth[dep], chanceOfUnnamedByDepth[dep]);
	}

	///////////////////// click handlers SHOULD BE ON TOUCH START

	$(".newGameLink").click(  function(){ view.showOptions() });
	$(".continueGameLink").click( function(){ view.showGame() });
	$(".startGameLink").click( function(){ startGameClicked() });
	$(".menuLink").click( function(){ view.showMenu() });
	$(".instructionsLink").click( function(){ view.showInstructions() });
	$(".playersLink").click( function(){ view.showPlayers(-1) });
	$(".nextPlayerLink").click( function(){ view.setPlayer(); view.showPlayers(playerSetupIndex) });
	$("#playersScreen .startGameLink").click( function(){ view.setPlayer(); });

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
	$("#avatarSelect").click( function(){ showAvatarOptions(); });
	$("#avatarOptions img").click( function(){ selectAvatar( $(this).attr("src") ); });

	$("#nextPlayerPrompt").click( function(){ $(this).hide(); });
	$("#challenge .challengePlayer").click(function(){ model.submitChallenge($(this).data("index")); });

	$("#instructionsScreen .infoPage").click( function(){ view.showInstructionsPage($(this).data("index")); });
	$("#instructionsScreen .infoPrev, #instructionsScreen .infoNext").click( function(){ view.changeInstructionsPage($(this).data("change")); });











  var winW,winH,x1,x2,playersPaneHeight;

	resizeMenu = function(){
		try {
			var logoH = winH - x1*52;
			var logoAspect = 882/1122;
			var logoW = Math.min( winW*1.16, logoH*logoAspect );
			var menuW = winW-x1*12;
			$("#menuScreen a").css({"margin-bottom":x1*2, "padding":x1*2, "width":menuW-x1*2, "margin-left":x1*2, "margin-right":x1*2, "border-width":x1 });
			$("#menuScreen a.narrow.left").css({"width":menuW/2-x1*5, "margin-right":x1 });
			$("#menuScreen a.narrow.right").css({"width":menuW/2-x1*5, "margin-left":x1 });
			$("#menuLogo").css({"width":logoW ,"margin-bottom":logoH*-.18 });
    }
    catch (err) {
      model.logError(err, arguments);
    }
	}
	resizeInfo = function(){
		try {
			$(".infoScreen .menuLink").css({"width":x1*7, "top":x1, "right":x1 });
			$(".pageCopy .topImage").css({"border-width":x1 });
			corner( $(".infoScreen .pageCopy"), x1*4);
			corner( $(".pageCopy .topImage"), x1*3);
			$(".infoScreen h3").css({"margin-top":x1*3, "margin-bottom":x1*3 });
			$(".infoPage").css({"border-width":x1 });
			$("#instructionsScreen .pageCopy").css({"height":winH-x1*48, "margin-bottom":x1*3});
			$(".infoNav a").css({"width":x1*8, "height":x1*8 })
			$(".infoPage").css({"width":x1*6, "height":x1*6 })

			$(".infoScreen .menuLink").css({"padding":x1*2, "width":"50%", "border-width":x1 });
			
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
			corner( $("#winScreen .avatar"), x1*8);
			var winImageH = winH - x1*75;
			$("#winScreen .avatar").css({"border-width":x1*2, "margin-top":x1*8, "width":winImageH*.75 });	
			$("#winScreen h2").css({"margin-top":x1*4});			
			$("#winScreen h3").css({"margin-top":x1*4, "padding":x1});			
    }
    catch (err) {
      model.logError(err, arguments);
    }
	}
	resizePlayers = function(){
		try {
			$("#playersTitle").css({"margin-top":x1*4});
	    $("#avatarSelect").css({ "width":"60%", "border-width":x1, "margin-top":x1*8, "margin-bottom":x1*4 });
	    $("#avatarOptions").css({ "width":winW*.8, "border-width":x1, "top":winH*.25, "left":winW*.1, "padding-bottom":x1*2 });
	    $("#avatarOptions img").css({ "border-width":x1, "margin-top":x1*2, "margin-left":x1*2 });
	    $("#avatarOptions .animal").css({ "width":(winW*.8-x1*2)/4 -x1*4 });
	    $("#avatarOptions .icon").css({ "width":(winW*.8-x1*2)/6 -x1*4 });

			corner( $("#avatarSelect"), x1*6);
			corner( $("#avatarOptions"), x1*4);
			corner( $("#avatarOptions img"), x1*2);
	    $("#playerNameInput").css({ "width":"60%", "border-width":x1, "padding":x1*2});
			$("#playersScreen .mainButton").css({"padding":x1*2, "width":"50%", "border-width":x1, "margin-top":x1*8 });
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
			$(".challengePlayer .avatar").css({"width":cph, "height":cph});
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
				$(".playerTab .avatar").hide();
			}
			else {
				$(".playerTab .avatar").show();
			}
			
			$(".players").height(playersPaneHeight);
			$(".playerTab").css({"width":tabWidth, "margin-left":x1, "margin-top":x1});  	
			$(".playerTab .avatar").css({"width":tabPictureWidth-x2*2,"height":tabPictureWidth-x2*2, "border-width":x2, "margin-top":x1, "margin-left":x1, "margin-bottom":x1});
			$(".playerTab .score").css({"width":tabScoreWidth, "height":tabScoreHeight, "margin-top":scoreMarginTop, "margin-left":x1, "margin-bottom":x1});
			$(".playerTab .scoreInner").css({"margin":x2, "height":tabScoreHeight-x2*2, "width":tabScoreWidth-x2*2});
			$(".playerTab .scoreInner2").css({"width":scoreInner2Width, "height":scoreInner2Height});
			
			$(".playerTab .point").css({"width":pointWidth, "height":pointHeight, "margin-bottom":pointMarginBottom, "margin-right":pointMarginRight});
			$(".playerTab .point:last-child").css({"width":lastPointWidth, "height":lastPointHeight});
			corner( $(".playerTab"), x1*2);
			corner( $(".playerTab .avatar, .playerTab .score"), x1*1.5);
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
		  resizeInfo();
		  resizeMain();
			resizeMenu();
			resizeOptions();
			resizePlayers();
			resizeWin();
			resizeNext();
			resizeChallenge();
    }
    catch (err) {
      model.logError(err, arguments);
    }
  }

  $(window).resize(doResize);
  this.init = function(inBrowser){
		this.hideContinueLinks();
		this.showMenu();
  	doResize();

		if (inBrowser) {
			 $("#splash").hide();
		}
		else {
			setTimeout(function(){ $("#splash img").attr("src","img/splash2.jpg")},1200);
			setTimeout(function(){ $("#splash").hide()},4000);
		}
	}

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

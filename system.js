var System = function(){

  // ========================= CAMERA / IMAGE CAPTURE ========================= 

	this.takePlayerPhoto = function(playerIndex, callback){
    debug("TAKE PICTURE:"+playerIndex);
    if (isCameraEnabled()){
      var options = { quality: 50, destinationType: Camera.DestinationType.FILE_URI, sourceType:1, encodingType:0, allowEdit:false, cameraDirection:1, saveToPhotoAlbum:false, correctOrientation:true };
      navigator.camera.getPicture(
        function(imageReference) {
          //debug('Success taking picture: '+playerIndex+" ... "+imageReference, 'Success'); 
          $("#pic"+playerIndex+" img").attr('src', imageReference);
          callback(playerIndex, imageReference);
        },
        function() { 
          logError('Error taking picture'); 
        }, 
        options
      );
    }
    else {
      var ars = [.75, 2, 1, .5, .75, .75, .75, .75];
      callback(playerIndex, "img/players_test/player"+playerIndex+".jpg", ars[playerIndex]);
    }
  }

  // ========================= AUDIO RECORDING AND PLAYBACK ========================= 

  var mediaRec;
	this.startRecordingCharacterFact = function(characterIndex, factIndex, callback){
    var filename = "fact"+characterIndex+"_"+factIndex+".mp3";
    //debug("RECORD START:"+filename+" ..."+isMediaEnabled());

    if ( isMediaEnabled() ){
      mediaRec = new Media(
        filename,
        function() { // success callback
            //debug("recordAudio():Audio Success:"+mediaRec.src);
            if (callback) callback(filename);
        },
        function(err) { // error callback
            logError("recordAudio():Audio Error: "+ err.code);
        }
      );
      mediaRec.startRecord();
    }
    else {
      callback(filename); //for testing, just callback here
    }
	}

  this.stopRecordingCharacterFact = function(){
    //debug("RECORD STOP:"+mediaRec);
    if (isMediaEnabled() ){
      setTimeout(function(temp){ temp.stopRecord(); }, 500, mediaRec );
    }
    //otherwise, do nothing; callback is handled on record for debugging
  }

  this.startPlayingCharacterFact = function(characterIndex, factIndex, callback, scope){
    var filename = "fact"+characterIndex+"_"+factIndex+".mp3";
    //debug("PLAY:"+filename);
    if (isMediaEnabled()){
      var mediaPlay = new Media(
        filename,
        function() { // success callback
          //debug("Play Success: ");
          if (typeof callback=="function") callback.call(scope, filename);
        },
        function(err) {  // error callback
          logError("Play Error: "+ err.code);
        }
      );
      mediaPlay.play();
    }
    else {
      if (typeof callback=="function") callback.call(scope, filename);
    }
  }
  /*
  this.stopPlayingCharacterFact = function(characterIndex, factIndex){
    //debug("STOP:"+characterIndex+","+factIndex);
    if ( isMediaEnabled() ){
      mediaPlay.stop();
    }
  }
*/
  this.startPlayingTheme = function(){
    if (isThemePlaying) {
      debug("THEME ALREADY PLAYING");
      return;
    }
    isThemePlaying=true;
    var path = window.location.pathname;
    var filename = path.substring(0, path.lastIndexOf('/'))+"/theme.mp3";
    debug("START THEME:"+filename);
    if (isMediaEnabled()){
      themePlay = new Media(
        filename,
        function() { // success callback
          //do nothing
        },
        function(err) {  // error callback
          logError("Theme Error: "+ err.code);
        }
      );
      themeVolume=.5;
      themePlay.setVolume(themeVolume);
      themePlay.play();
    }
    else {
      if (typeof callback=="function") callback.call(scope, filename);
    }
  }


  this.stopPlayingTheme = function(duration){
    //debug("STOP THEME");
    if (!isThemePlaying) {
      return;
    }
    isThemePlaying=false;
    if ( isMediaEnabled() ){

      themeStopInterval = setInterval(function(){
        themeVolume = themeVolume-.01;
        themePlay.setVolume(themeVolume);
        if (themeVolume<.05) {
          themePlay.stop();
          clearInterval(themeStopInterval);
        }
      }, duration/( 50 ) );
      
    }
  }

  document.addEventListener("pause", this.stopPlayingTheme, false);

  function isMediaEnabled(){
    var out = ( typeof navigator.camera != "undefined" );
    return out;
  }

  function isCameraEnabled(){
    var out = ( typeof navigator.camera != "undefined" );
    return out;
  }
}

  var isThemePlaying;
  var themeStopInterval;
  var themePlay;
  var themeVolume;
var System = function(){

  // ========================= CAMERA / IMAGE CAPTURE ========================= 

	this.takePlayerPhoto = function(playerIndex, callback){
    try {
      if (isCameraEnabled()){
        var options = { quality: 50, destinationType: Camera.DestinationType.FILE_URI, sourceType:1, encodingType:0, allowEdit:false, cameraDirection:1, saveToPhotoAlbum:false, correctOrientation:true };
        navigator.camera.getPicture(
          function(imageReference) {
            $("#pic"+playerIndex+" img").attr('src', imageReference);
            callback(playerIndex, imageReference);
          },
          function() { 
            logError('takePlayerPhoto:getPicture', arguments); 
          }, 
          options
        );
      }
      else {
        var ars = [.75, 2, 1, .5, .75, .75, .75, .75];
        callback(playerIndex, "img/players_test/player"+playerIndex+".jpg", ars[playerIndex]);
      }
    }
    catch (err) {
      logError("takePlayerPhoto",arguments, err);
    }
  }

  // ========================= AUDIO RECORDING AND PLAYBACK ========================= 

  var mediaRec;
	this.startRecordingCharacterFact = function(characterIndex, factIndex, callback){
    try {
      var filename = "fact"+characterIndex+"_"+factIndex+".mp3";

      if ( isMediaEnabled() ){
        mediaRec = new Media(
          filename,
          function() { // success callback
              if (callback) callback(filename);
          },
          function(err) { // error callback
            logError('startRecordingCharacterFact:startRecord', arguments); 
          }
        );
        mediaRec.startRecord();
      }
      else {
        callback(filename); //for testing, just callback here
      }

    }
    catch (err) {
      logError("startRecordingCharacterFact",arguments, err);
    }
	}

  this.stopRecordingCharacterFact = function(){
    if (isMediaEnabled() ){
      setTimeout(function(temp){ temp.stopRecord(); }, 500, mediaRec );
    }
  }

  this.startPlayingCharacterFact = function(characterIndex, factIndex, callback, scope){
    try {
      var filename = "fact"+characterIndex+"_"+factIndex+".mp3";
      if (isMediaEnabled()){
        var mediaPlay = new Media(
          filename,
          function() { // success callback
            if (typeof callback=="function") callback.call(scope, filename);
          },
          function(err) {  // error callback
            logError('startPlayingCharacterFact:play', arguments); 
          }
        );
        mediaPlay.play();
      }
      else {
        if (typeof callback=="function") callback.call(scope, filename);
      }
    }
    catch (err) {
      logError("startPlayingCharacterFact",arguments, err);
    }
  }

  this.startPlayingTheme = function(){
    try {
      if (isThemePlaying) {
        return;
      }
      isThemePlaying=true;
      var path = window.location.pathname;
      var filename = path.substring(0, path.lastIndexOf('/'))+"/theme.mp3";
      if (isMediaEnabled()){
        themePlay = new Media(
          filename,
          function() { // success callback
            //do nothing
          },
          function(err) {  // error callback
            logError('startPlayingTheme:play', arguments); 
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
    catch (err) {
      logError("startPlayingTheme",arguments, err);
    }
  }


  this.stopPlayingTheme = function(duration){
    try {
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
    catch (err) {
      logError("stopPlayingTheme",arguments, err);
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
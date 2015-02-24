var System = function(){


  // ========================= PERSISTENT DATA STORAGE ========================= 

  this.storeData = function(key, val){
    debug("STORE DATA:"+key+">"+val);
    window.localStorage.setItem(key, val);
  }
  this.retrieveData = function(key){
    var val = window.localStorage.getItem(key);
    debug("RETRIEVE DATA:"+key+">"+val);
    return val;
  }


  // ========================= CAMERA / IMAGE CAPTURE ========================= 

	this.takePlayerPhoto = function(playerIndex, callback){
    //debug("TAKE PICTURE:"+playerIndex);
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
      callback(playerIndex, "playerImage"+playerIndex+".jpg");
    }
  }

  // ========================= AUDIO RECORDING AND PLAYBACK ========================= 

  var mediaRec;
	this.startRecordingCharacterFact = function(characterIndex, factIndex, callback){
    var filename = "fact"+characterIndex+"_"+factIndex+".mp3";
    debug("RECORD START:"+filename+" ..."+isMediaEnabled());

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
    debug("RECORD STOP:"+mediaRec);
    if (isMediaEnabled() ){
      setTimeout(function(temp){ temp.stopRecord(); }, 500, mediaRec );
    }
    //otherwise, do nothing; callback is handled on record for debugging
  }

  this.startPlayingCharacterFact = function(characterIndex, factIndex, callback, scope){
    var filename = "fact"+characterIndex+"_"+factIndex+".mp3";
    debug("PLAY:"+filename);
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
  this.stopPlayingCharacterFact = function(characterIndex, factIndex){
    debug("STOP:"+characterIndex+","+factIndex);
    if ( isMediaEnabled() ){
      mediaPlay.stop();
    }
  }

  function isMediaEnabled(){
    var out = ( typeof navigator.camera != "undefined" );
    return out;
  }

  function isCameraEnabled(){
    var out = ( typeof navigator.camera != "undefined" );
    return out;
  }
}
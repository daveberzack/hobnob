var Media = function(){

  //take a picture, then callback when complete
	this.takePlayerPhoto = function(playerIndex, callback){

    showAlert("TAKE PICTURE:"+playerIndex);
    if (isCameraEnabled()){
      var options = { quality: 50, destinationType: Camera.DestinationType.FILE_URI, sourceType:1, encodingType:0, allowEdit:false, cameraDirection:1, saveToPhotoAlbum:false, correctOrientation:true };
      navigator.camera.getPicture(
        function(imageReference) {
          showAlert('Success taking picture: '+playerIndex+" ... "+imageReference, 'Success'); 
          $("#pic"+playerIndex+" img").attr('src', imageReference);
          callback(playerIndex, imageReference);
        },
        function() { 
          showAlert('Error taking picture'); 
        }, 
        options
      );
    }
    else {
      callback(playerIndex, "playerImage"+playerIndex+".jpg");
    }
  }

  var mediaRec;
	this.startRecordingCharacterFact = function(characterIndex, factIndex, callback){
    var filename = "fact"+characterIndex+"_"+factIndex+".mp3";
    //showAlert("RECORD START:"+filename);

    if ( isMediaEnabled() ){
      mediaRec = new Media(
        filename,
        function() { // success callback
            showAlert("recordAudio():Audio Success:"+mediaRec.src);
            if (callback) callback(filename);
        },
        function(err) { // error callback
            showAlert("recordAudio():Audio Error: "+ err.code);
        }
      );
      mediaRec.startRecord();
    }
    else {
      callback(filename); //for testing, just callback here
    }
	}

  this.stopRecordingCharacterFact = function(){
    //showAlert("RECORD STOP");
    if (isMediaEnabled() ){
      mediaRec.stopRecord();
    }
    //otherwise, do nothing; callback is handled on record for debugging
  }

  this.startPlayingCharacterFact = function(characterIndex, factIndex, callback){
    var filename = "fact"+characterIndex+"_"+factIndex+".mp3";
    showAlert("PLAY:"+filename);
    if (isMediaEnabled()){
      var mediaPlay = new Media(
        filename,
        function() { // success callback
          showAlert("Play Success: ");
          if (callback) callback(filename);
        },
        function(err) {  // error callback
          showAlert("Play Error: "+ err.code);
        }
      );
      mediaPlay.play();
    }
  }
  this.stopPlayingCharacterFact = function(characterIndex, factIndex){
    showAlert("STOP:"+filename);
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
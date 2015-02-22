var Media = function(model_in){
  var model=model_in;

  //take a picture, then callback when complete
	this.takePlayerPhoto = function(playerIndex, callback){

    model.showAlert("TAKE PICTURE:"+playerIndex);
    if (isCameraEnabled()){
      var options = { quality: 50, destinationType: Camera.DestinationType.FILE_URI, sourceType: 1, encodingType: 0 };  // sournce: 0:Photo Library, 1=Camera, 2=Saved Photo Album  // encoding: 0=JPG 1=PNG
      navigator.camera.getPicture(
        function(imageReference) {
          model.showAlert('Success taking picture: '+playerIndex+" ... "+imageReference, 'Success'); 
          $("#pic"+playerIndex+" img").attr('src', imageReference);
          callback(playerIndex, imageReference);
        },
        function() { 
          model.showAlert('Error taking picture'); 
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
    model.showAlert("RECORD START:"+filename);

    if ( isMediaEnabled() ){
      mediaRec = new Media(
        filename,
        function() { // success callback
            model.showAlert("recordAudio():Audio Success:"+mediaRec.src);
            if (callback) callback(filename);
        },
        function(err) { // error callback
            model.showAlert("recordAudio():Audio Error: "+ err.code);
        }
      );
      mediaRec.startRecord();
    }
    else {
      callback(filename); //for testing, just callback here
    }
	}

  this.stopRecordingCharacterFact = function(){
    model.showAlert("RECORD STOP");
    if (isMediaEnabled() ){
      mediaRec.stopRecord();
    }
    //otherwise, do nothing; callback is handled on record for debugging
  }

  this.startPlayingCharacterFact = function(characterIndex, factIndex, callback){
    var filename = "fact"+characterIndex+"_"+factIndex+".mp3";
    model.showAlert("PLAY:"+filename);
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
    model.showAlert("STOP:"+filename);
    if ( isMediaEnabled() ){
      mediaPlay.stop();
    }
  }

  function isMediaEnabled(){
    var out = ( typeof Media.startRecord != "undefined" );
    model.showAlert("MEDIA?"+out);
    return out;
  }

  function isCameraEnabled(){
    var out = ( typeof navigator.camera != "undefined" );
    model.showAlert("CAMERA?"+out);
    return out;
  }
}
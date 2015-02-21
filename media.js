var Media = function(model_in){
  var model=model_in;

	this.takePlayerPhoto = function(playerIndex, callback){

    if (!navigator.camera) {
      model.showAlert("Camera API problem", "Error");
      return;
    }

    var options = { quality: 50, destinationType: Camera.DestinationType.FILE_URI, sourceType: 1, encodingType: 0 };  // sournce: 0:Photo Library, 1=Camera, 2=Saved Photo Album  // encoding: 0=JPG 1=PNG
    model.showAlert("Take picture", "Log");

    navigator.camera.getPicture(
      function(imageReference) {
        model.showAlert('Success taking picture: '+playerIndex+" ... "+imageReference, 'Success'); 
        $("#pic"+playerIndex+" img").attr('src', imageReference);
        callback(playerIndex, imageReference);
      },
      function() { 
        model.showAlert('Error taking picture', 'Error'); 
      }, 
      options
    );
  }


  var mediaRec;
	this.startRecordingCharacterFact = function(characterIndex, factIndex, callback){

    mediaRec = new Media(
      "fact"+characterIndex+"_"+factIndex+".mp3",
      function() { // success callback
          model.showAlert("recordAudio():Audio Success:"+mediaRec.src);
          if (callback) callback(filename);
      },
      function(err) {        // error callback
          model.showAlert("recordAudio():Audio Error: "+ err.code);
      }
    );

    model.showAlert("AUDIO START:"+mediaRec+":"+mediaRec.startRecord );
    // Record audio
    mediaRec.startRecord();
	}
  this.stopRecordingCharacterFact = function(){
    model.showAlert("recordAudio():Stop");
    mediaRec.stopRecord();

  }
  //var mediaPlay;
  this.startPlayingCharacterFact = function(characterIndex, factIndex, callback){
    var filename = "fact"+characterIndex+"_"+factIndex+".mp3";
    model.showAlert("playAudio():"+filename);
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
  this.stopPlayingCharacterFact = function(characterIndex, factIndex){
    mediaPlay.stop();
  }

}
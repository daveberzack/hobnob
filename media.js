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
          callback();
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
  this.startPlayingCharacterFact = function(characterIndex, factIndex){
    model.showAlert("playAudio():"+characterIndex+"_"+factIndex);
    var mediaPlay = new Media(
      "fact"+characterIndex+"_"+factIndex+".mp3",
      function() { // success callback
        showAlert("Play Success: ");
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


 /*   var mediaRec = null;
    var mediaFileReference;
    function recordAudio(filename) {
    //alert("Inside Record Audio"+filename);
      mediaRec = new Media(
      filename,
      function() { // success callback
        showAlert("Record Success: "+mediaRec.src);
        mediaFileReference = mediaRec.src;
      },
      function(err) {  // error callback
        showAlert("Record Error: "+ err.code);
      }
    );
      showAlert("Record Start: "+mediaRec.src+","+mediaRec.startRecord );
      mediaRec.startRecord();
    }

  function stopRecordAudio(){
    showAlert("Record Stop");
    mediaRec.stopRecord();
  }

  function playAudio(filename) {
   showAlert("Play Start: "+filename);
    var newmediaRec = new Media(
      filename,
      function() { // success callback
        showAlert("Play Success: ");
      },
      function(err) {  // error callback
        showAlert("Play Error: "+ err.code);
      }
    );
    newmediaRec.play();
  }
*/
	
}
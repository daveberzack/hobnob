var Media = function(model_in){
  var model=model_in;

  function showAlert(message, title) {
    $("#debug").append("<br/>"+title+":"+message);
    //if (navigator.notification) navigator.notification.alert("*Native*:"+message, null, title, 'OK');
    //else alert("*Alert*:"+title + " - " + message);
  }

	this.takePlayerPhoto = function(playerIndex, callback){

    if (!navigator.camera) {
      showAlert("Camera API problem", "Error");
      return;
    }

    var options = { quality: 50, destinationType: Camera.DestinationType.FILE_URI, sourceType: 1, encodingType: 0 };  // sournce: 0:Photo Library, 1=Camera, 2=Saved Photo Album  // encoding: 0=JPG 1=PNG
    showAlert("Take picture", "Log");

    navigator.camera.getPicture(
      function(imageReference) {
        showAlert('Success taking picture: '+playerIndex+" ... "+imageReference, 'Success'); 
        $("#pic"+playerIndex+" img").attr('src', imageReference);
        callback(playerIndex, imageReference);
      },
      function() { 
        showAlert('Error taking picture', 'Error'); 
      }, 
      options
    );
  }


  var audioCallback;
	this.startRecordingCharacterFact = function(callback){
    showAlert("AUDIO START:"+navigator.device.capture);
    navigator.device.capture.captureAudio(captureSuccess, captureError, {limit:1, duration:10});
    audioCallback = callback;
	}

  function audioError(){
    showAlert("AUDIO ERROR");
  }
  function audioSuccess(audioFile){
    showAlert( "AUDIO SUCCESS:"+audioFile.fullPath );
    audioCallback();
  }

	this.stopRecordingCharacterFact = function(characterIndex, factIndex, callback){
		console.log("stop recording audio and save it in an accessible folder as fact"+characterIndex+"_"+factIndex+".mp3");
		callback();
	}
	
}

/*

    var pictureSource;   // picture source
    var destinationType; // sets the format of returned value

    // Wait for device API libraries to load
    document.addEventListener("deviceready",onDeviceReady,false);

    // device APIs are available
    function onDeviceReady() {
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
    }

    // Called when a photo is successfully retrieved
    function onPhotoDataSuccess(imageData) {
      console.log("onphotosuccess",imageData);

      // Get image handle
      var smallImage = document.getElementById('smallImage');

      // Unhide image elements
      smallImage.style.display = 'block';

      // Show the captured photo   // The in-line CSS rules are used to resize the image
      smallImage.src = "data:image/jpeg;base64," + imageData;
    }

    function onFail(message) {
      alert('Failed because: ' + message);
    }


    // A button will call this function      // Take picture using device camera and retrieve image as base64-encoded string
    function capturePhoto() {
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50, destinationType: destinationType.DATA_URL });
    }

*/
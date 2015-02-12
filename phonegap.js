var Phonegap = function(){

	this.takePlayerPhoto = function(playerIndex, callback){
		console.log("take photo with camera and save it in an accessible folder as player"+playerIndex+".jpg");
		callback();
	}

	this.startRecordingCharacterFact = function(){
		console.log("start recording audio")
	}

	this.stopRecordingCharacterFact = function(characterIndex, factIndex, callback){
		console.log("stop recording audio and save it in an accessible folder as fact"+characterIndex+"_"+factIndex+".mp3");
		callback();
	}
	
}



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

    // Called when a photo is successfully retrieved
    function onPhotoURISuccess(imageURI) {
      console.log(imageURI);

      // Get image handle
      var largeImage = document.getElementById('largeImage');

      // Unhide image elements
      largeImage.style.display = 'block';

      // Show the captured photo ... The in-line CSS rules are used to resize the image
      largeImage.src = imageURI;
    }

    // A button will call this function      // Take picture using device camera and retrieve image as base64-encoded string
    function capturePhoto() {
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
        destinationType: destinationType.DATA_URL });
    }

    // A button will call this function      // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
    function capturePhotoEdit() {

      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true,
        destinationType: destinationType.DATA_URL });
    }

    // A button will call this function // Retrieve image file location from specified source
    function getPhoto(source) {
      navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
        destinationType: destinationType.FILE_URI,
        sourceType: source });
    }

    function onFail(message) {
      alert('Failed because: ' + message);
    }

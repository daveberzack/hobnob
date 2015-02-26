var System = function(){


  // ========================= PERSISTENT DATA STORAGE ========================= 
  /*
  this.db;
  this.confirmData = function(){
    debug("INIT DATA: new?"+ !(this.db) );
    if (!this.db) {
      this.db = window.openDatabase("Database", "1.0", "HobnobDatabase", 200000);
      db.transaction(initDatabase, this.errorCallback, this.successCallback);
    }
  }
  this.initDatabase = function(tx){
    tx.executeSql('CREATE TABLE IF NOT EXISTS data(key unique, val)');
  }

  var valTemp;
  var keyTemp;
  this.storeData = function(key, val){
    this.confirmData();
    valTemp=val;
    keyTemp=key;
    debug("STORE DATA:"+key+">"+val);
    db.transaction(updateDatabase, this.errorCallback, this.successCallback);
  }
  this.updateDatabase = function(tx){
    tx.executeSql('UPDATE data SET val="'+valTemp+'" WHERE key="'+keyTemp+'";');
  }

  this.retrieveData = function(key){
    this.confirmData();
    keyTemp=key;
    db.transaction(selectDatabase, this.errorCallback, this.selectCallback);
    return val;
  }
  this.selectDatabase = function(tx){
    tx.executeSql('SELECT val FROM data WHERE key="'+keyTemp+'";');
  }
  this.selectCallback = function(tx){
    $.each(result.rows,function(index){
      debug("RETRIEVE DATA:"+keyTemp+">"+result.rows.item(index) );
    });
  }
  */

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
    debug("STOP THEME");
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
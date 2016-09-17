window.onload = function() {

  //-------------------- Video--------------------
  var video = document.querySelector("#video");

  // --------------------Other variables--------------------
  var playButton = document.querySelector("#play-pause");
  var muteButton = document.querySelector("#mute");
  var fullScreenButton = document.querySelector("#full-screen");
  var seekBar = document.querySelector("#seek-bar");
  var volumeBar = document.querySelector("#volume-bar");

  // --------------------Play/pause video after button click--------------------
  playButton.addEventListener("click", function() {
    
    if (video.paused == true) {
      video.play();
      playButton.innerHTML = "Pause";
    } else {
      video.pause();
      playButton.innerHTML = "Play";
    }
  });

  // --------------------Mute video after click--------------------
  muteButton.addEventListener("click", function() {
    
    if (video.muted == false) {
      video.muted = true;
      muteButton.innerHTML = "Unmute";
    } else {
      video.muted = false;
      muteButton.innerHTML = "Mute";
    }
  });

  // --------------------make video fullscreen after click--------------------
  fullScreenButton.addEventListener("click", function() {
    
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.webkitRequestFullScreen) {
      video.webkitRequestFullScreen();
    } else if (video.mozRequestFullScreen) {
      video.mozRequestFullScreen();
    }
  });

  //--------------------Forward video to desired time--------------------
  seekBar.addEventListener("change", function() {
    var time = video.duration * (seekBar.value / 100);
    video.currentTime = time;
  });

  video.addEventListener("timeupdate", function() {
    var value = (100 / video.duration) * video.currentTime;
    seekBar.value = value;
  });

  //--------------------Pause vide when dragging--------------------
  seekBar.addEventListener("mousedown", function() {
    video.pause();
  });

  seekBar.addEventListener("mouseup", function() {
    video.play();
  });

  //--------------------change volume after value change--------------------
  volumeBar.addEventListener("change", function() {
    video.volume = volumeBar.value;
  });
}

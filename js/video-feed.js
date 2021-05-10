function runVideo() {
  video = document.querySelector("#videoElement");

  var localStream;
  function stopVideo() {
    console.log(document.querySelector("#videoElement"));
    localStream.getTracks()[0].stop();
  }
  if (navigator.mediaDevices.getUserMedia) {
    console.log(video)

    const videoConstraints = {};
    videoConstraints.facingMode = 'environment';
    const constraints = {
      video: videoConstraints,
      audio: false
    };
    video.setAttribute('autoplay', '');
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    navigator.mediaDevices.getUserMedia(constraints)
      .then(function(stream) {
        // localStream = stream
        console.log('started experience');
        video.srcObject = stream;
        setTimeout(() => {
          document.getElementById('permissions-bg').style.zIndex = -1
          document.getElementById('intro-overlay').style.zIndex = 1
          document.getElementById('portal-overlay').style.animationName = 'fadein'
          document.getElementById('portal-overlay').style.animationDuration = '0.5s'
          document.getElementById('portal-overlay').style.animationFillMode = 'forwards'
          // document.getElementById('walls-door').addEventListener('animationcomplete', stopVideo())

        }, 2000)
        document.getElementById('debug-text').innerHTML = 'cam changed'
        document.getElementById('permissions-bg').style.animationName = 'fadeout'
        document.getElementById('permissions-bg').style.animationDuration = '1s'
        document.getElementById('permissions-bg').style.animationDelay = '1s'
        document.getElementById('permissions-bg').style.animationFillMode = 'forwards'
        document.getElementById('intro-overlay').style.animationName = 'fadein'
        document.getElementById('intro-overlay').style.animationDuration = '0.5s'
        document.getElementById('intro-overlay').style.animationDelay = '2s'
        document.getElementById('intro-overlay').style.animationFillMode = 'forwards'
      })
      .catch(function(err) {
        console.log("Something went wrong! " + err);
      });
  }
}

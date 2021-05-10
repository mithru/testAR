function runVideo() {
  // video-feed-alt.js is the place-door.js functions merged into runVideo
  console.log("STARTING THE SCENE");
  // this.camera = document.getElementById('camera')
  // this.camParent = document.getElementById('cam-parent')
  // this.camFinal = document.getElementById('camFinalPos')
  // this.camWorldPosition = new THREE.Vector3();
  // this.finalWorldPosition = new THREE.Vector3();

  // this.welcomeAudio = document.getElementById('welcome');


  // this.camFinal.object3D.getWorldPosition(this.camWorldPosition)
  // this.finalWorldPosition.x = this.camParent.object3D.position.x - this.camWorldPosition.x
  // // this.finalWorldPosition.y = this.camWorldPosition.y - this.camParent.object3D.position.y
  // this.finalWorldPosition.z = this.camParent.object3D.position.z - this.camWorldPosition.z
  // this.startRotY = -(this.camera.object3D.rotation.y)
  //
  document.getElementById('tap-to-enter-world-text').style.animationName = 'fadein'
  document.getElementById('tap-to-enter-world-text').style.animationDuration = '1s'
  document.getElementById('tap-to-enter-world-text').style.animationFillMode = 'forwards'
  document.getElementById('tap-to-enter-world-text').style.zIndex = 50

  document.getElementById('permissions-bg').addEventListener("click", startExp);
}

function startExp() {
  document.getElementById('permissions-bg').removeEventListener("click", startExp);
  // CHANGE THIS


  document.getElementById('tap-to-enter-world-text').style.animationName = 'fadeout'
  document.getElementById('tap-to-enter-world-text').style.animationDuration = '1s'
  document.getElementById('tap-to-enter-world-text').style.animationFillMode = 'forwards'
  document.getElementById('debug-text').innerHTML = 'cam changed'
  document.getElementById('permissions-bg').style.animationName = 'fadeout'
  document.getElementById('permissions-bg').style.animationDuration = '1s'
  // document.getElementById('permissions-bg').style.animationDelay = '1s'
  document.getElementById('permissions-bg').style.animationFillMode = 'forwards'


  document.getElementById('intro-overlay').style.display = 'none'

  console.log("playing bgm")
  document.getElementById('background').src = 'https://dky5neca2x8co.cloudfront.net/Kohler-Studio/assets/sounds/desert/awakening-desert.mp3'
  document.getElementById('background').play()

  console.log("playing intro")
  document.getElementById('intro').src = "https://dky5neca2x8co.cloudfront.net/Kohler-Studio/assets/sounds/desert/desertVO3s.mp3"
  document.getElementById('intro').play()

  console.log('play intro')

  setTimeout(() => {
    document.getElementById('permissions-bg').style.zIndex = -1
    // document.getElementById('intro-overlay').style.zIndex = 1
    document.getElementById('portal-overlay').style.animationName = 'fadein'
    document.getElementById('portal-overlay').style.animationDuration = '0.5s'
    document.getElementById('portal-overlay').style.animationFillMode = 'forwards'

  }, 1000)

  setTimeout(() => {
    document.getElementById('intro-cap-1').style.display = 'block'
    setTimeout(() => {
      document.getElementById('intro-cap-1').style.display = 'none'
      document.getElementById('intro-cap-2').style.display = 'block'
    }, 4000)
    setTimeout(() => {
      document.getElementById('intro-cap-1').style.display = 'none'
      document.getElementById('intro-cap-2').style.display = 'none'
      document.getElementById('caption-button').style.animationName = 'fadeout'
      document.getElementById('caption-button').style.animationDuration = '0.5s'
      document.getElementById('caption-button').style.animationFillMode = 'forwards'

    }, 8000)
  }, 4500)


  console.log('started experience');

  // intro text is shown
  setTimeout(() => {
    // console.log('move parent to default position')
    // document.getElementById('parent').object3D.position.set(0,-6,12)
    console.log("2000");
    document.getElementById('debug-text').innerHTML = 'look around intro texts shown'
    document.getElementById('title-1').style.animationName = 'fadeInOutAuto'
    document.getElementById('title-1').style.animationDuration = '4s'
    document.getElementById('title-1').style.animationDelay = '5.5s'
    document.getElementById('title-1').style.animationFillMode = 'forwards'
    document.getElementById('title-2').style.animationName = 'fadeInOutAuto'
    document.getElementById('title-2').style.animationDuration = '4s'
    document.getElementById('title-2').style.animationDelay = '0s'
    document.getElementById('title-2').style.animationFillMode = 'forwards'
  }, 5000)

  // model enters
  setTimeout(() => {
    // document.getElementById('test-glass').setAttribute('animation-mixer', 'clip:Glass_Circle_Intro; timeScale:2; loop:once; clampWhenFinished: true')

    // document.getElementById('intro').components.sound.playSound()
    document.getElementById('debug-text').innerHTML = 'main model coming in'
    // document.getElementById('sculpture-item').setAttribute('animation-mixer', 'clip:*intro; timeScale:1; loop:once; clampWhenFinished: true')
    // setTimeout(() => {
    // }, 2000)

    // document.getElementById('sculpture-item5').setAttribute('visible', 'false')
    // document.getElementById('sculpture-item6').setAttribute('visible', 'false')

    document.getElementById('sculpture-item1').setAttribute('animation-mixer', 'clip:*intro; timeScale:1; loop:once; clampWhenFinished: true')

    document.getElementById('sculpture-item2').setAttribute('animation-mixer', 'clip:*intro; timeScale:1; loop:once; clampWhenFinished: true')
    document.getElementById('sculpture-item3').setAttribute('animation-mixer', 'clip:*intro; timeScale:1; loop:once; clampWhenFinished: true')
    document.getElementById('sculpture-item4').setAttribute('animation-mixer', 'clip:*intro; timeScale:1; loop:once; clampWhenFinished: true')
    document.getElementById('sculpture-item5').setAttribute('animation-mixer', 'clip:*intro; timeScale:1; loop:once; clampWhenFinished: true')
    document.getElementById('sculpture-item6').setAttribute('animation-mixer', 'clip:*intro; timeScale:1; loop:once; clampWhenFinished: true')
    // document.getElementById('sculpture-item7').setAttribute('animation-mixer', 'clip:B.Item.07.intro; timeScale:1; loop:once; clampWhenFinished: true')
    document.getElementById('sculpture-parent').setAttribute('animation__scale', 'property: scale; to: 2.5 2.5 2.5; easing: easeInOutQuad; loop: false; dur: 1000')
    document.getElementById('sculpture-parent').setAttribute('animation__pos', 'property: position; to: 0 0 -10; easing: easeInOutQuad; loop: false; dur: 2000')
  }, 14000) // 12000
}

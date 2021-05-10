AFRAME.registerComponent('place-door', {
  schema: {
    recenterActive: {
      type: 'boolean',
      default: true
    },
  },
  init() {
    this.camera = document.getElementById('camera')
    this.camParent = document.getElementById('cam-parent')
    this.camFinal = document.getElementById('camFinalPos')
    this.camWorldPosition = new THREE.Vector3();
    this.finalWorldPosition = new THREE.Vector3();

    this.startRotY = this.camera.object3D.rotation.y
    this.welcomeAudio = document.getElementById('welcome');

    // const context = new AudioContext();
    // let welcomeBuffer, bgmBuffer, introBuffer;

    // this.play = (audioBuffer) => {
    //   const source = context.createBufferSource();
    //   source.buffer = audioBuffer;
    //   source.connect(context.destination);
    //   source.start();
    // }

    this.hoveredOn = () => {
      document.getElementById('tap-icon-container').style.animationName = 'fadein'
      document.getElementById('tap-icon-container').style.animationDuration = '0.5s'
      document.getElementById('tap-icon-container').style.animationFillMode = 'forwards'
      document.getElementById('tap-to-enter-text').style.animationName = 'fadein'
      document.getElementById('tap-to-enter-text').style.animationDuration = '0.5s'
      document.getElementById('tap-to-enter-text').style.animationFillMode = 'forwards'
      document.getElementById('tap-icon-container').addEventListener('click', this.enterSpace)
    }

    this.hoveredOff = () => {
      document.getElementById('tap-icon-container').style.animationName = 'fadeout'
      document.getElementById('tap-icon-container').style.animationDuration = '0.5s'
      document.getElementById('tap-icon-container').style.animationFillMode = 'forwards'
      document.getElementById('tap-to-enter-text').style.animationName = 'fadeout'
      document.getElementById('tap-to-enter-text').style.animationDuration = '0.5s'
      document.getElementById('tap-to-enter-text').style.animationFillMode = 'forwards'
      document.getElementById('tap-icon-container').removeEventListener('click', this.enterSpace)
    }

    this.startExperience = () => {
      document.getElementById('intro-cta').removeEventListener('click', this.startExperience)
      document.getElementById('background').components.sound.playSound()

      console.log("start");
      this.camParent.object3D.rotation.y = this.startRotY
      this.data.recenterActive = false;
      document.getElementById('door-collider').setAttribute('scale', '1 1 1')
      document.getElementById('door-collider').addEventListener('mouseenter', this.hoveredOn)
      document.getElementById('door-collider').addEventListener('mouseleave', this.hoveredOff)

      // this.camParent.setAttribute('animation', 'property: position; delay: 3000; to: ' + this.camWorldPosition.x + ' 0 ' + this.camWorldPosition.z + '; easing: easeInOutQuad; loop: false; delay:1000; dur: 3000')
      // this.doorplaceholder.object3D.visible = false
      // this.camera.object3D.rotation.y -= this.camera.object3D.rotation.y;
      document.getElementById('doorshadow').setAttribute('animation', 'property: scale; to: 5 5 5; easing: easeInOutQuad; loop: false; delay:1000; dur: 1000')
      document.getElementById('intro-overlay').style.animationName = 'fadeout'
      document.getElementById('intro-overlay').style.animationDelay = '0s'
      document.getElementById('intro-overlay').style.animationDuration = '0.5s'
      document.getElementById('intro-overlay').style.animationFillMode = 'forwards'
      document.getElementById('debug-text').innerHTML = 'experience has begun'

    }

    this.enterSpace = () => {
      setTimeout(() => {
        this.welcomeAudio.components.sound.playSound() // Command for audio player
        console.log('play welcome')
        document.getElementById('welcome-cap-1').style.display = 'block'
      }, 1000)
      setTimeout(() => {
        document.getElementById('welcome-cap-1').style.display = 'none'
        document.getElementById('welcome-cap-2').style.display = 'block'
      }, 4700)

      setTimeout(() => {
        document.getElementById('welcome-cap-1').style.display = 'none'
        document.getElementById('welcome-cap-2').style.display = 'none'
      }, 9000)

      document.getElementById('door-collider').setAttribute('scale', '0 0 0')

      document.getElementById('door-collider').removeEventListener('mouseenter', this.hoveredOn)

      document.getElementById('door-collider').removeEventListener('mouseleave', this.hoveredOff)

      this.hoveredOff()

      document.getElementById('debug-text').innerHTML = 'entering space'
      document.getElementById('parent').setAttribute('animation', 'property: position; delay: 3000; to: ' + this.finalWorldPosition.x + ' -6 ' + this.finalWorldPosition.z + '; easing: easeInOutQuad; loop: false; delay:1000; dur: 3000')

      document.getElementById('parent').addEventListener('animationcomplete', this.startScene)
    }


    this.doorGoAway = () => {
      document.getElementById('door-collider').removeEventListener('mouseenter', this.doorGoAway)
      document.getElementById('walls-door').setAttribute('animation', 'property: position; to: 0 0 25; easing: easeInOutQuad; loop: false; delay: 3000; dur: 2000')
      document.getElementById('walls-door').setAttribute('animation__scale', 'property: scale; to: 0 0 0; easing: easeInOutQuad; loop: false; delay: 3000; dur: 2000')
    }
    this.startScene = () => {

      document.getElementById('main-scene').removeAttribute('place-door')

      document.getElementById('parent').removeEventListener('animationcomplete', this.startScene)
      document.getElementById('walls-door').setAttribute('animation', 'property: position; to: 0 0 7; easing: easeInOutQuad; loop: false; dur: 500')
      document.getElementById('walls-other').object3D.visible = false
      document.getElementById('door-collider').setAttribute('scale', '1 1 1')
      document.getElementById('door-collider').setAttribute('rotation', '0 180 0')

      document.getElementById('door-collider').addEventListener('mouseenter', this.doorGoAway)
      setTimeout(() => {
        document.getElementById('debug-text').innerHTML = 'starting'
        console.log("1000");

        // document.getElementById('door-collider').classList.add('hoverable')
        // document.getElementById('door-collider').addEventListener('mouseenter', this.disappearWalls)
        // document.getElementById('welcome').components.sound.playSound()
      }, 1000)

      // intro text is shown
      setTimeout(() => {
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
      }, 0)

      // model enters
      setTimeout(() => {
        document.getElementById('intro').components.sound.playSound()

        console.log('play intro')
        console.log("8000");
        document.getElementById('intro-cap-1').style.display = 'block'
        setTimeout(() => {
          document.getElementById('intro-cap-1').style.display = 'none'
          document.getElementById('intro-cap-2').style.display = 'block'
        }, 4000)
        setTimeout(() => {
          document.getElementById('intro-cap-1').style.display = 'none'
          document.getElementById('intro-cap-2').style.display = 'none'
          document.getElementById('caption-button').style.animationName = 'fadeout'
          document.getElementById('caption-button').style.animationDuration = '1s'
          document.getElementById('caption-button').style.animationDelay = '3s'
          document.getElementById('caption-button').style.animationFillMode = 'forwards'
        }, 8000)
        // document.getElementById('test-glass').setAttribute('animation-mixer', 'clip:Glass_Circle_Intro; timeScale:2; loop:once; clampWhenFinished: true')

        document.getElementById('debug-text').innerHTML = 'main model coming in'
        // document.getElementById('sculpture-item').setAttribute('animation-mixer', 'clip:*intro; timeScale:1; loop:once; clampWhenFinished: true')
        // setTimeout(() => {
        // }, 2000)

        document.getElementById('sculpture-item5').setAttribute('visible', 'false')
        document.getElementById('sculpture-item6').setAttribute('visible', 'false')

        document.getElementById('sculpture-item1').setAttribute('animation-mixer', 'clip:B.Item.01.intro; timeScale:1; loop:once; clampWhenFinished: true')

        document.getElementById('sculpture-item2').setAttribute('animation-mixer', 'clip:*intro; timeScale:1; loop:once; clampWhenFinished: true')
        document.getElementById('sculpture-item3').setAttribute('animation-mixer', 'clip:*intro; timeScale:1; loop:once; clampWhenFinished: true')
        document.getElementById('sculpture-item4').setAttribute('animation-mixer', 'clip:*intro; timeScale:1; loop:once; clampWhenFinished: true')
        document.getElementById('sculpture-item5').setAttribute('animation-mixer', 'clip:*intro; timeScale:1; loop:once; clampWhenFinished: true')
        document.getElementById('sculpture-item6').setAttribute('animation-mixer', 'clip:*intro; timeScale:1; loop:once; clampWhenFinished: true')
        document.getElementById('sculpture-item7').setAttribute('animation-mixer', 'clip:B.Item.07.intro; timeScale:1; loop:once; clampWhenFinished: true')
        document.getElementById('sculpture-parent').setAttribute('animation__scale', 'property: scale; to: 2.5 2.5 2.5; easing: easeInOutQuad; loop: false; dur: 1000')
        document.getElementById('sculpture-parent').setAttribute('animation__pos', 'property: position; to: 0 0 -18; easing: easeInOutQuad; loop: false; dur: 2000')
      }, 8000) // 12000
    }

    document.getElementById('intro-cta').addEventListener('click', this.startExperience)
  },
  tick() {
    if (this.data.recenterActive) {
      // console.log(this.camera.object3D.rotation.y);
      // console.log(this.startRotY);
      document.getElementById('debug-text').innerHTML = 'recentering'
      console.log('recentering');
      // might need to stagger this on every 2nd or 3rd frame
      // document.getElementById('parent').object3D.rotation.y = this.camera.object3D.rotation.y;
      this.camFinal.object3D.getWorldPosition(this.camWorldPosition)
      this.finalWorldPosition.x = this.camParent.object3D.position.x - this.camWorldPosition.x
      // this.finalWorldPosition.y = this.camWorldPosition.y - this.camParent.object3D.position.y
      this.finalWorldPosition.z = this.camParent.object3D.position.z - this.camWorldPosition.z
      this.startRotY = -(this.camera.object3D.rotation.y)

      this.camera.object3D.rotation.y = 0
    }
  },
});

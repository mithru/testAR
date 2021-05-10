const test = () => {
  // document.getElementById('debug-text').innerHTML = 'Model Viewer closed'
}

setTimeout(() => {
  const pgmrk1 = document.getElementById('li-1')
  // const pgmrk2 = document.getElementById('li-2')
  const pgmrk3 = document.getElementById('li-3')
  const nextBtn1 = document.getElementById('btn-next1')
  // const nextBtn2 = document.getElementById('btn-next2')
  const ctaBtn = document.getElementById('intro-cta')
  const desc1 = document.getElementById('desc1')
  // const desc2 = document.getElementById('desc2')
  const desc3 = document.getElementById('desc3')
  const audioBtn = document.getElementById('audio-button')
  const audioIcon = document.getElementById('audio-icon')
  const ccBtn = document.getElementById('caption-button')
  const ccIcon = document.getElementById('caption-icon')
  let cc_on = false;

  const audioPlayers = [
    document.getElementById('intro'),
    document.getElementById('background'),
    // document.getElementById('welcome'),
  ]
  const captionsContainer = document.getElementById('welcome-captions')
  const subtitlesPlayer = document.getElementById('welcome')

  nextBtn1.addEventListener('click', () => {

    // document.getElementById('main-scene').sceneEl.renderer.autoClearDepth = false;
    // document.getElementById('main-scene').sceneEl.renderer.clearDepth()
    // document.getElementById('test').object3D.renderOrder = 999;
    // document.getElementById('floor').object3D.renderOrder = 999;
    // document.getElementById('floor').object3D.el.object3DMap.mesh.renderOrder = 999;

    // document.getElementById('floor').object3D.el.object3DMap.mesh.onBeforeRender = function(renderer ) {
    //   renderer.clearDepth();
    //   console.log('ininin');
    // };
    // console.log(document.getElementById('floor').object3D.el.object3DMap.mesh);
    // console.log(document.getElementById('test').object3D);
    // console.log(document.getElementById('main-scene').sceneEl.renderer);
    console.log('NEXT button clicked')
    nextBtn1.style.display = 'none'
    pgmrk1.style.borderColor = 'gray'
    desc1.style.display = 'none'

    ctaBtn.style.display = 'block'
    pgmrk3.style.borderColor = 'white'
    desc3.style.display = 'block'
    desc3.style.animationName = 'fadein'
    desc3.style.animationDuration = '0.5s'
  })

  audioBtn.addEventListener('click', () => {
    if (audioPlayers[0].volume === 0) {
      audioPlayers.forEach(ap => ap.volume=1)
      // subtitlesPlayer.muted = false;
      audioIcon.setAttribute('src', 'assets/icons/Audio.svg')
      console.log('audio players unmuted')
    } else {
      audioPlayers.forEach(ap => ap.volume=0)
      // subtitlesPlayer.muted = true;
      audioIcon.setAttribute('src', 'assets/icons/Audio_Off.svg')
      console.log('audio players muted')
    }
  })

  ccBtn.addEventListener('click', () => {
    if (cc_on) {
      ccIcon.setAttribute('src', 'assets/icons/ClosedCaptioning.svg')
      captionsContainer.style.display = 'none'
      // welcomeCloseCaptions.style.display = 'none'
      cc_on = false
      console.log('Closed Captions Off')
    } else {
      ccIcon.setAttribute('src', 'assets/icons/ClosedCaptioning_On.svg')
      captionsContainer.style.display = 'block'
      // welcomeCloseCaptions.style.display = 'block'
      cc_on = true
      console.log('Closed Captions On')
    }
  })

  // document.getElementById('close-button').addEventListener('click', test)
}, 2000)

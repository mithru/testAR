AFRAME.registerComponent('door-hover', {
  schema: {
    name: {
      type: 'string',
      default: ''
    },
    bgID: {
      type: 'string',
      default: ''
    },
    initScale: {
      type: 'number',
      default: 1.5
    },
    finalScale: {
      type: 'number',
      default: 3
    },
    rot: {
      type: 'number',
      default: -90
    },
    dist: {
      type: 'number',
      default: 5
    },
  },
  init() {
    const {
      data
    } = this
    const {
      el
    } = this
    this.toRadians = angle => angle * (Math.PI / 180)

    data.x = data.dist * Math.cos(this.toRadians(data.rot))
    data.y = 6
    data.z = data.dist * Math.sin(this.toRadians(data.rot))
    data.endx = 0.8 * Math.cos(this.toRadians(data.rot))
    data.endy = 5
    data.zoomy = 4.5
    data.endz = 0.8 * Math.sin(this.toRadians(data.rot))

    const startPosString = `${data.x} ${data.y} ${data.z}`
    const endPosString = `${data.endx} ${data.endy} ${data.endz}`

    const temp = -1 * (data.rot + 90)
    const startRot = {
      x: 0,
      y: temp,
      z: 0
    }
    const startRotString = `${startRot.x} ${startRot.y} ${startRot.z}`
    el.setAttribute('rotation', startRotString)
    el.setAttribute('position', startPosString)
    const portalChangeText = document.getElementById('portal-change-text');
    const pointer = document.getElementById('tap-icon-container')
    console.log("test ready");
    this.hoveredOn = () => {
      console.log(data.y + ' ' + data.endy);
      document.getElementById("space-name").innerHTML = `${this.data.name}`
      document.getElementById("other-title-2-2").innerHTML = `${this.data.name}`
      this.el.setAttribute('animation', `property: scale; to: 3 3 3; easing: easeInOutSine; dur: 1000; delay:500`)
      this.el.setAttribute('animation__pos', `property: position; to: ${data.x} ${data.zoomy} ${data.z}; easing: easeInOutSine; dur: 1000; delay:500`)
      pointer.style.animationFillMode = 'forwards'
      pointer.style.animationDuration = '0.5s'
      pointer.style.animationName = 'fadein'
      const elementById = document.getElementById('portal-change-text');
      portalChangeText.style.visibility = 'visible'
      portalChangeText.style.animationName = 'fadein'
      portalChangeText.style.animationDuration = '0.5s'
      portalChangeText.style.animationFillMode = 'forwards'
      console.log("test ready in ");
      pointer.addEventListener('click', this.changeScene)
    }
    this.hoveredOff = () => {
      this.el.setAttribute('animation__pos', `property: position; to: ${data.x} ${data.y} ${data.z}; easing: easeInOutSine; dur: 1000; delay:500`)
      this.el.setAttribute('animation', `property: scale; to: 1.5 1.5 1.5; easing: easeInOutSine; dur: 1000; delay:500`)
      console.log("test ready out ");
      pointer.style.animationFillMode = 'forwards'
      pointer.style.animationDuration = '0.5s'
      pointer.style.animationName = 'fadeout'
      portalChangeText.style.animationName = 'fadeout'
      portalChangeText.style.animationDuration = '0.5s'
      portalChangeText.style.animationFillMode = 'forwards'
      portalChangeText.style.visibility = 'hidden'

      pointer.removeEventListener('click', this.changeScene)
    }

    this.changeScene = () => {
      console.log("changing scene");
      this.el.removeEventListener('mouseenter', this.hoveredOn)
      this.el.removeEventListener('mouseleave', this.hoveredOff)
      pointer.removeEventListener('click', this.changeScene)

      document.getElementById('background').setAttribute('animation', `property: position; to: 1 1 -200; easing: easeInOutSine; dur: 1000; delay:500`)
      document.getElementById(`${this.data.bgID}`).style.zIndex = '12'
      document.getElementById(`${this.data.bgID}`).style.animationName = 'fadein'
      document.getElementById(`${this.data.bgID}`).style.animationDuration = '1s'
      document.getElementById(`${this.data.bgID}`).style.animationDelay = '0.8s'
      document.getElementById(`${this.data.bgID}`).style.animationFillMode = 'forwards'

      document.getElementById('other-portal-text').style.zIndex = '12'
      document.getElementById('other-portal-text').style.animationName = 'fadein'
      document.getElementById('other-portal-text').style.animationDuration = '1s'
      document.getElementById('other-portal-text').style.animationDelay = '0.8s'
      document.getElementById('other-portal-text').style.animationFillMode = 'forwards'

      pointer.style.animationFillMode = 'forwards'
      pointer.style.animationDuration = '0.5s'
      pointer.style.animationName = 'fadeout'
      document.getElementById('portal-change-text').style.animationName = 'fadeout'
      document.getElementById('portal-change-text').style.animationDuration = '0.5s'
      document.getElementById('portal-change-text').style.animationFillMode = 'forwards'
      this.el.setAttribute('animation__comecloser', `property: position; to: ${endPosString}; easing: easeInOutSine; dur: 1000; delay:500`)
      this.el.addEventListener('animationcomplete__comecloser', this.switchScene)
    }

    this.switchScene = () => {
      console.log("done");
    }

    this.el.addEventListener('mouseenter', this.hoveredOn)
    this.el.addEventListener('mouseleave', this.hoveredOff)
    // pointer.addEventListener('click', this.changeScene)

  }
});

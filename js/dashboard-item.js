AFRAME.registerComponent('dashboard-item', {
  schema: {
    name: {
      type: 'string',
      default: ''
    },
    itemFinish: {
      type: 'string',
      default: ''
    },
    infoText: {
      type: 'string',
      default: ''
    },
    collider: {
      type: 'string',
      default: ''
    },
    dist: {
      type: 'number',
      default: 35
    },
    final: {
      type: 'number',
      default: 25
    },
    rot: {
      type: 'number',
      default: -90
    },
    x: {
      type: 'number',
      default: 0
    },
    y: {
      type: 'number',
      default: 7
    },
    z: {
      type: 'number',
      default: -10
    },
    middlePos: {
      type: 'boolean',
      default: false
    },
    delayIn: {
      type: 'number',
      default: 100
    },
    delayOut: {
      type: 'number',
      default: 100
    },
    autoRotate: {
      type: 'boolean',
      default: true
    },
    transitionReady: {
      type: 'boolean',
      default: false
    },
  },
  init() {
    const {
      data
    } = this
    const {
      el
    } = this
    const pointer = document.getElementById('tap-icon-container')
    const closeBtn = document.getElementById('close-button')

    // this.camera = document.getElementById('camera')
    // this.recenterActive = false
    // this.debugText = document.getElementById('debug-text')
    // this.debugText.innerHTML = `db item ${data.collider} initialized`
    // document.getElementById('debug-text').innerHTML = "good"
    // this.affectedElement1 = document.getElementById('sculpture1')
    // this.transformIcon = document.getElementById('transform')
    // this.tapIcon = document.getElementById('tap-icon-container')
    // this.portalIcons = document.getElementById('portal-overlay')
    // this.portalReform = document.getElementById('portal-reform')
    // this.itemInfo = document.getElementById('info-button')
    // this.itemDesc = document.getElementById('item-desc')
    // this.productName = document.getElementById('prod-name')

    this.data.frameCount = 0

    this.toRadians = angle => angle * (Math.PI / 180)
    data.x = data.dist * Math.cos(this.toRadians(data.rot))
    data.z = data.dist * Math.sin(this.toRadians(data.rot))

    this.finalX = data.final * Math.cos(this.toRadians(data.rot))
    this.finalZ = data.final * Math.sin(this.toRadians(data.rot))

    // let interactionAllowed = false
    // let clickAllowed = false
    const element = this.el
    const temp = -1 * (data.rot + 90)
    const startRot = {
      x: 0,
      y: temp,
      z: 0
    }

    // const hidePosString = `${data.hideX} ${data.hideY} ${data.hideZ}`
    const startPosString = `${data.x} ${data.y} ${data.z}`
    const endPosString = `${this.finalX} ${data.y} ${this.finalZ}`

    // swap in @todo
    const startScale = {
      x: 1,
      y: 1,
      z: 1
    }

    const startRotString = `${startRot.x} ${startRot.y} ${startRot.z}`
    const endRotString = `${startRot.x} ${startRot.y + 360} ${startRot.z}`
    const startSwayRotString = `${startRot.x} ${startRot.y-30} ${startRot.z}`
    const endSwayRotString = `${startRot.x} ${startRot.y + 30} ${startRot.z}`

    const startScaleString = `${startScale.x} ${startScale.y} ${startScale.z}`
    const endScaleString = `${startScale.x * 2.5} ${startScale.y * 2.5} ${startScale.z * 2.5}`

    const hidePosString = `${el.getAttribute('position').x} ${el.getAttribute('position').y} ${el.getAttribute('position').z}`
    const hideScaleString = `${el.getAttribute('scale').x} ${el.getAttribute('scale').y} ${el.getAttribute('scale').z}`
    const hideRotString = `${el.getAttribute('rotation').x} ${el.getAttribute('rotation').y} ${el.getAttribute('rotation').z}`

    this.inDelay = data.delayIn
    this.outDelay = data.delayOut

    // swap these @todo
    // el.setAttribute('rotation', `0 ${-1 * (data.rot + 90)} 0`)
    el.setAttribute('rotation', hideRotString)

    // const startScale = el.getAttribute('scale')
    el.setAttribute('scale', hideScaleString)

    el.setAttribute('position', hidePosString)
    // el.setAttribute('position', '0 6 -3')
    el.setAttribute('visible', 'false')

    this.data.itemOpacity = 0;
    this.data.riseUp = false
    this.data.riseDown = false
    // console.log(el.object3DMap);
    setTimeout(() => {
      // console.log(el.object3DMap);

      el.object3DMap.mesh.traverse(n => {
        if (n.isMesh) {
          // n.material.opacity = 0.0
          // n.material.transparent = true
        }
      });
      // console.log(el);
    }, 10000)


    // this.interactionAllowed = false
    // this.waitingForTap = false

    // this.revealed = false
    // el.setAttribute('animation', `property: rotation; dir:alternate; from: ${startSwayRotString}; to: ${endSwayRotString}; easing: easeInOutSine; dur: 5000; loop: true`)

    this.resetAnimations = () => {
      console.log('reset animations');

      el.removeEventListener('animationcomplete', this.resetAnimations)
      el.removeAttribute('animation')
      el.removeAttribute('animation__comecloser')
      el.removeAttribute('animation__scale')
      // el.setAttribute('animation', `property: rotation; dir:alternate; from: ${startSwayRotString}; to: ${endSwayRotString}; easing: linear; dur: 5000; delay:1000; loop: true`)

      document.getElementById('debug-text').innerHTML = 'animations reset'
    }

    this.addHoverListeners = () => {
      console.log('add hover listeners');

      el.removeEventListener('animationcomplete', this.addHoverListeners)
      el.children[0].addEventListener('mouseenter', this.hoveredOn)
      el.children[0].addEventListener('mouseleave', this.hoveredOff)
    }

    this.hide = () => {
      console.log('hide');

      el.removeEventListener('animationcomplete', this.hide)

      setTimeout(() => {
        el.setAttribute('visible', 'false')
        setTimeout(() => {
          el.setAttribute('rotation', hideRotString)
          el.setAttribute('scale', hideScaleString)
          el.setAttribute('position', hidePosString)
        }, 1000)
      }, 1500)

    }

    this.resetToOrigin = () => {
      console.log('reset to origin');
      el.setAttribute('animation__comecloser', `property: position; to: ${startPosString}; easing: easeInOutSine; dur: 1000; delay:500`)
      el.setAttribute('animation__scale', `property: scale; to: ${startScaleString}; easing: easeInOutSine; dur: 1000; delay:500`)
      el.setAttribute('animation', `property: rotation; to: ${startSwayRotString}; easing: easeInOutSine; dur: 1000; delay:500`)

      el.addEventListener('animationcomplete', this.modelReadyToInteract)
      el.addEventListener('animationcomplete', this.addHoverListeners)
      el.addEventListener('animationcomplete', this.startSway)
    }

    this.startSway = () => {
      console.log("start sway");
      el.removeEventListener('animationcomplete', this.startSway)
      el.setAttribute('animation', `property: rotation; dir:alternate; from: ${startSwayRotString}; to: ${endSwayRotString}; easing: linear; dur: 5000; delay:1000; loop: true`)
    }

    this.resetToOriginSlow = () => {
      console.log('reset to origin slow');
      this.data.riseUp = true

      if (data.middlePos === true) {
        el.setAttribute('animation__comecloser', `property: position; to: 0 10 -10; easing: easeInOutSine; dur: 2000;`)
        setTimeout(() => {
          el.setAttribute('animation__comecloser', `property: position; to: ${startPosString}; easing: easeInOutSine; dur: 3000;`)
        }, 2000);

      } else {
        el.setAttribute('animation__comecloser', `property: position; to: ${startPosString}; easing: easeInOutSine; dur: 5000;`)
      }
      el.setAttribute('animation__scale', `property: scale; to: ${startScaleString}; easing: easeInOutSine; dur: 5000;`)
      el.setAttribute('animation', `property: rotation; to: ${startSwayRotString}; easing: easeInOutSine; dur: 5000;`)
      // el.setAttribute('animation', `property: rotation; dir:alternate; from: ${startSwayRotString}; to: ${endSwayRotString}; easing: linear; dur: 5000; delay:1000; loop: true`)
      el.addEventListener('animationcomplete', this.resetAnimations)

      setTimeout(() => {
        el.addEventListener('animationcomplete', this.addHoverListeners)
        el.addEventListener('animationcomplete', this.startSway)
      }, 4000);

    }

    this.resetToHidden = () => {
      console.log('reset to hidden');
      this.data.riseDown = true

      el.setAttribute('animation__scale', `property: scale; to: 0 0 0; easing: easeInOutSine; dur: 500;`)
      setTimeout(() => {
        // @todo - test these timings
        document.getElementById('portal-reform').removeEventListener('click', this.resetToHidden)
        element.children[0].removeEventListener('mouseenter', this.hoveredOn)
        element.children[0].removeEventListener('mouseleave', this.hoveredOff)

        el.removeAttribute('animation__scale')
        el.removeAttribute('animation__comecloser')
        el.removeAttribute('animation')
        if (data.middlePos === true) {
          el.setAttribute('animation__comecloser', `property: position; to: 0 10 -12; easing: easeInOutSine; dur: 500;`)
          setTimeout(() => {
            el.setAttribute('animation__comecloser', `property: position; to: ${hidePosString}; easing: easeInOutSine; dur: 850;`)
          }, 500);

        } else {
          el.setAttribute('animation__comecloser', `property: position; to: ${hidePosString}; easing: easeInOutSine; dur: 1350;`)
        }
        el.setAttribute('animation__scale', `property: scale; to: ${hideScaleString}; easing: easeInOutSine; dur: 1350;`)
        el.setAttribute('animation', `property: rotation; to: ${hideRotString}; easing: easeInOutSine; dur: 1500;`)
        el.addEventListener('animationcomplete', this.resetAnimations)
        el.addEventListener('animationcomplete', this.hide)
      }, 500);

      document.getElementById('sculpture-item2').addEventListener('animation-finished', this.switchToConfig)
    }

    this.hoveredOn = () => {
      console.log('hovered on');

      el.setAttribute('animation__comecloser', `property: position; to: ${endPosString}; easing: easeInOutSine; dur: 1000`)
      el.addEventListener('animationcomplete__comecloser', this.showPointer)
      document.getElementById('debug-text').innerHTML = 'hovered on object'
    }

    this.hoveredOff = () => {
      console.log('hovered off');
      el.removeEventListener('animationcomplete__comecloser', this.showPointer)
      this.resetToOrigin()
      document.getElementById('debug-text').innerHTML = 'hovered off object'
      pointer.style.animationName = 'fadeout'
      pointer.style.animationFillMode = 'forwards'
      document.getElementById('tap-item-text').style.animationName = 'fadeout'
      document.getElementById('tap-item-text').style.animationFillMode = 'forwards'
      pointer.removeEventListener('click', this.switchToMV)
    }

    this.closeMV = () => {
      console.log('closeMV');
      document.getElementById('portal-overlay').style.marginTop = '0'

      document.getElementById('debug-text').innerHTML = 'Model Viewer closed'
      element.setAttribute('drag-rotate-component', 'active:false')
      element.removeAttribute('drag-rotate-component')
      document.getElementById('portal-reform').style.animationName = 'fadein'
      document.getElementById('portal-reform').style.animationDuration = '0.5s'
      document.getElementById('portal-reform').style.animationFillMode = 'forwards'

      // XR8.resume()
      this.resetToOrigin()
      document.getElementById('item-overlay').style.animationName = 'fadeout'
      document.getElementById('item-overlay').style.animationFillMode = 'forwards'
      document.getElementById('item-overlay').style.display = 'none'
      // item-overlay display none
      pointer.removeEventListener('click', this.switchToMV)
      // document.getElementById('item-overlay').style.zIndex = 15
    }

    this.switchToMV = () => {
      console.log('switched to MV');
      document.getElementById('portal-overlay').style.marginTop = '4em'

      pointer.removeEventListener('click', this.switchToMV)
      el.removeAttribute('animation')

      document.getElementById('prod-name').innerHTML = this.data.name
      // document.getElementById('item-desc-2').innerHTML = "Shown in Brushed Nickel"
      document.getElementById('item-desc-2').innerHTML = this.data.itemFinish
      document.getElementById('info-text').innerHTML = this.data.infoText

      document.getElementById('debug-text').innerHTML = 'Model Viewer open'
      // XR8.pause()
      element.setAttribute('drag-rotate-component', 'active:true')
      element.children[0].removeEventListener('mouseenter', this.hoveredOn)
      element.children[0].removeEventListener('mouseleave', this.hoveredOff)
      document.getElementById('item-overlay').style.display = 'block'
      // item-overlay display block
      document.getElementById('item-overlay').style.animationName = 'fadein'
      document.getElementById('item-overlay').style.animationFillMode = 'forwards'

      // document.getElementById('item-overlay.style').style.zIndex = 15000
      // closeBtn.style.zIndex = 200000

      document.getElementById('portal-reform').style.animationName = 'fadeout'
      document.getElementById('portal-reform').style.animationDuration = '0.5s'
      document.getElementById('portal-reform').style.animationFillMode = 'forwards'

      // pointer.style.animationFillMode = 'forwards'
      pointer.style.animationName = 'drag'

      document.getElementById('tap-item-text').style.animationName = 'fadeout'
      document.getElementById('tap-item-text').style.animationFillMode = 'forwards'
      closeBtn.addEventListener('click', this.closeMV)
    }

    this.showPointer = () => {
      console.log('show pointer');

      el.removeEventListener('animationcomplete__comecloser', this.showPointer)
      document.getElementById('debug-text').innerHTML = 'showing pointer on object'

      document.getElementById('tap-item-text').style.animationFillMode = 'forwards'
      document.getElementById('tap-item-text').style.animationDuration = '0.5s'
      document.getElementById('tap-item-text').style.animationName = 'fadein'
      pointer.style.animationFillMode = 'forwards'
      pointer.style.animationDuration = '0.5s'
      pointer.style.animationName = 'fadein'
      pointer.addEventListener('click', this.switchToMV)

      // el.setAttribute('animation__comecloser', `property: position; to: ${startPosString}; easing: easeInOutSine; dur: 1000`)
    }

    this.switchToConfig = () => {
      setTimeout(() => {
        if (el.getAttribute('visible') === true) {
          el.object3DMap.mesh.traverse(n => {
            if (n.isMesh) {
              n.material.opacity = 0.0
              n.material.transparent = true
            }
          });
          console.log('starting model anim');
          document.getElementById('sculpture-item2').removeEventListener('animation-finished', this.switchToConfig)
          this.resetToOriginSlow()
          document.getElementById('portal-reform').addEventListener('click', this.resetToHidden)
        }
      }, 500);
    }

    // sculptureItem2.addEventListener('animation-finished', this.transformAnimOver)

    document.getElementById('sculpture-item2').addEventListener('animation-finished', this.switchToConfig)
  },
  tick() {
    this.data.frameCount += 1
    if (this.data.frameCount % 2 == 0) {
      if (this.data.riseUp === true) {
        if (this.data.itemOpacity < 1.0) {
          this.data.itemOpacity += 0.04;
        } else {
          this.data.riseUp = false
        }
        // console.log(this.data.itemOpacity);
        this.el.object3DMap.mesh.traverse(n => {
          if (n.isMesh) {
            n.material.opacity = this.data.itemOpacity
            n.material.transparent = true
          }
        });
      }
      if (this.data.riseDown === true) {
        if (this.data.itemOpacity > 0.0) {
          this.data.itemOpacity = 0.0;
        } else {
          this.el.setAttribute('visible', 'false')
          this.data.riseDown = false
        }
        // console.log(this.data.itemOpacity);
        this.el.object3DMap.mesh.traverse(n => {
          if (n.isMesh) {
            n.material.opacity = this.data.itemOpacity
            n.material.transparent = true
          }
        });
      }
    }
  },
});

AFRAME.registerComponent('drag-rotate-component', {
  schema: {
    speed: {
      default: 5
    },
    active: {
      type: 'boolean',
      default: false
    },
    xRotAllowed: {
      type: 'boolean',
      default: true
    },
    initScaleVal: {
      default: -11
    },
    maxZoomMult: {
      default: 2.5
    },
  },
  init() {
    const {
      el
    } = this
    // if (this.hasBeenInteracted === false) {
      document.getElementById('drag-icon-container').style.animationName = 'fadeInOutAuto'
      document.getElementById('drag-icon-container').style.animationDuration = '8s'
      document.getElementById('drag-icon-container').style.animationFillMode = 'forwards'
    // }
    // this.hasBeenInteracted = false;
    el.sceneEl.renderer.sortObjects = true;
    document.getElementById('skyElBlur').setAttribute('animation__fade', `property: opacity; to: 1; easing: easeInOutSine; dur: 500;`)
    const bgModel = document.getElementById('skyEl').object3DMap.mesh
    if(document.getElementById('all-walls') !== null){
      document.getElementById('all-walls').object3D.visible = false;
    }
    document.getElementById('floor').object3D.visible = false;
    if(document.getElementById('floor-water')!== null) {
      document.getElementById('floor-water').object3D.visible = false;
    }
    document.getElementById('sculpture-parent').object3D.visible = false;
    document.getElementById('item1').object3D.visible = false;
    document.getElementById('item2').object3D.visible = false;
    document.getElementById('item3').object3D.visible = false;
    document.getElementById('item4').object3D.visible = false;

    document.getElementById('collider-item1').setAttribute('scale', '0 0 0')
    document.getElementById('collider-item2').setAttribute('scale', '0 0 0')
    document.getElementById('collider-item3').setAttribute('scale', '0 0 0')
    document.getElementById('collider-item4').setAttribute('scale', '0 0 0')
    document.getElementById('sculpture-collider-2').setAttribute('scale', '0 0 0')
    el.object3D.visible = true;
    this.ifMouseDown = false
    this.scaling = false
    this.x_cord = 0
    this.y_cord = 0
    document.addEventListener('touchstart', this.OnDocumentMouseDown.bind(this))
    document.addEventListener('touchend', this.OnDocumentMouseUp.bind(this))
    document.addEventListener('touchmove', this.OnDocumentMouseMove.bind(this))
    console.log(`0 register drag-rotate-component: ${this.el.object3D.id}`)
  },
  OnDocumentMouseDown(event) {
    // console.log(event)
    if (event.touches.length === 2 && this.data.active) {
      this.scaling = true
    }
    document.getElementById('debug-text').innerHTML = 'mouseDownEvent'
    this.ifMouseDown = true
    this.x_cord = event.touches[0].pageX
    this.y_cord = event.touches[0].pageY
    // console.log(this.el.object3D)
    // console.log(this.name)
  },
  OnDocumentMouseUp() {
    if (this.hasBeenInteracted === false) {
      this.hasBeenInteracted = true;
      console.log("fading out drag icon");
      // document.getElementById('drag-icon-container').style.animationName = 'fadeout'
    }

    this.scaling = false

    // console.log(event)

    document.getElementById('debug-text').innerHTML = 'mouseUpEvent'

    this.ifMouseDown = false
  },
  OnDocumentMouseMove(event) {
    // console.log(event)

    if (this.scaling && this.data.active) {
      var dist = Math.hypot(
        event.touches[0].pageX - event.touches[1].pageX,
        event.touches[0].pageY - event.touches[1].pageY);
      console.log('position object : ' + dist);
      console.log(this.el.object3D.position)

      var scaleVal = (Math.min(Math.max(parseFloat(dist), 80), 300)) / 120.0;
      if (this.data.xRotAllowed) {
        this.el.object3D.scale.x = scaleVal
        this.el.object3D.scale.y = scaleVal
        this.el.object3D.scale.z = scaleVal
      } else {
        this.el.object3D.position.z = -this.data.initScaleVal + scaleVal * this.data.maxZoomMult
      }
    } else {
      console.log('moving 1');
      if (this.ifMouseDown && this.data.active) {
        console.log('moving active');

        var tempX = event.touches[0].pageX - this.x_cord
        var tempY = event.touches[0].pageY - this.y_cord
        // document.getElementById('debug-text').innerHTML = `${event.clientX} , ${event.clientY} - ${this.x_cord}, ${this.y_cord} : ${tempX}, ${tempY}`


        if (Math.abs(tempY) < Math.abs(tempX)) {

          if (this.data.xRotAllowed) {
            this.el.object3D.rotateY((tempX * this.data.speed) / 1000)
          } else {
            if (this.el.object3D.rotation.y >= -0.2 && this.el.object3D.rotation.y <= 1.3) {
              this.el.object3D.rotateY((tempX * this.data.speed) / 1000)

            }
            if (this.el.object3D.rotation.y <= -0.2) {
              this.el.object3D.rotation.y = -0.2
            }
            if (this.el.object3D.rotation.y >= 1.3) {
              this.el.object3D.rotation.y = 1.3
            }
          }

        } else {
          if (this.data.xRotAllowed) {
            this.el.object3D.rotateX((tempY * this.data.speed) / 1000)
          }
        }
        this.x_cord = event.touches[0].pageX
        this.y_cord = event.touches[0].pageY
        /*
        if (Math.abs(tempY) < Math.abs(tempX)) {
          console.log("moving X");
          if (this.data.xRotAllowed) {
            tempX = event.touches[0].pageX - this.x_cord
            console.log((tempX));
          } else {
            console.log(("config"));
            if (this.el.object3D.rotation.y >= -0.2 && this.el.object3D.rotation.y <= 1.3) {
              console.log(this.el.object3D.rotation.y);
              tempX = event.touches[0].pageX - this.x_cord
            } else {
              tempX = 0
            }
          }
          this.el.object3D.rotateY((tempX * this.data.speed) / 1000)
        } else {
          console.log("moving y");
          if (this.el.object3D.rotation.y < -0.2) {
            this.el.object3D.rotation.y = -0.2
          } else if (this.el.object3D.rotation.y > 1.3) {
            this.el.object3D.rotation.y = 1.3
          }
          if (this.data.xRotAllowed) {
            this.el.object3D.rotateX((tempY * this.data.speed) / 1000)
          }
        }
        this.x_cord = event.touches[0].pageX
        this.y_cord = event.touches[0].pageY
        */
      }
    }
  },
  remove() {
    const {
      data
    } = this
    const {
      el
    } = this

    const bgModel = document.getElementById('skyEl').object3DMap.mesh
    const model = el.object3DMap.mesh

    document.getElementById('skyElBlur').setAttribute('animation__fade', `property: opacity; to: 0; easing: easeInOutSine; dur: 200;`)
    document.removeEventListener('touchstart', this.OnDocumentMouseDown.bind(this))
    document.removeEventListener('touchend', this.OnDocumentMouseUp.bind(this))
    document.removeEventListener('touchsmove', this.OnDocumentMouseMove.bind(this))
    setTimeout(() => {
      if(document.getElementById('all-walls') !== null){
        document.getElementById('all-walls').object3D.visible = true;
      }
      document.getElementById('floor').object3D.visible = true;
      if(document.getElementById('floor-water')!== null) {
        document.getElementById('floor-water').object3D.visible = false;
      }
      document.getElementById('sculpture-parent').object3D.visible = true;
      document.getElementById('item1').object3D.visible = true;
      document.getElementById('item2').object3D.visible = true;
      document.getElementById('item3').object3D.visible = true;
      document.getElementById('item4').object3D.visible = true;
      document.getElementById('collider-item1').setAttribute('scale', '1 1 1')
      document.getElementById('collider-item2').setAttribute('scale', '1 1 1')
      document.getElementById('collider-item3').setAttribute('scale', '1 1 1')
      document.getElementById('collider-item4').setAttribute('scale', '1 1 1')
      document.getElementById('sculpture-collider-2').setAttribute('scale', '1 1 1')


    }, 100);
    // if (this.data.xRotAllowed) {
    //   bgModel.renderOrder = 0;
    //   bgModel.traverse((o) => {
    //     if (o.isMesh) {
    //       console.log('setting bgModel depthTest');
    //       o.material.depthWrite = true;
    //     }
    //   });
    //
    //   model.renderOrder = 0;
    //   model.traverse((o) => {
    //     if (o.isMesh) {
    //       console.log('setting main model depthTest');
    //       o.material.depthWrite = true;
    //     }
    //   });
    // }
    document.getElementById('debug-text').innerHTML = 'removed item inspector component'
    this.data.active = false
    console.log(`deregister drag-rotate-compenent: ${this.el.getAttribute('id')}`)
  },
});

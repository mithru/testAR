AFRAME.registerComponent('basic-env', {
  schema: {

  },
  init() {
    let scene = this.el.sceneEl.object3D; // THREE.Scene
    let renderer = this.el.sceneEl.renderer; // THREE.Scene
    let camera = this.el.sceneEl.camera; // THREE.Scene
    // create the 'cubecamera' objct
    var targetCube = new THREE.WebGLRenderTargetCube(512, 512);
    // var renderer = this.el.sceneEl.renderer;

    // wait until the model is loaded
    this.el.addEventListener("model-loaded", e => {
      let mesh = this.el.getObject3D("mesh");
      // load the texture
      var texture = new THREE.TextureLoader().load('assets/hdri/tranquility/360-offset.jpg',
        function() {
          // create a cube texture from the panorama
          var cubeTex = targetCube.fromEquirectangularTexture(renderer, texture);
          mesh.traverse(function(node) {
            // if a node has a material attribute - it can have a envMap
            // console.log(node.material);

            if (node.material) {

              node.material.envMap = cubeTex.texture;
              // node.material.reflectivity = 1

              node.material.envMap.rotation = 90;
              node.material.envMap.intensity = 3;
              node.material.needsUpdate = true;
            }
          });
          // renderer.toneMapping = THREE.ACESFilmicToneMapping;
          // renderer.toneMappingExposure = 1;
          // renderer.outputEncoding = THREE.GammaEncoding;
        })
    })
  }
});

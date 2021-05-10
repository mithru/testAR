import {
  EXRLoader
} from 'https://unpkg.com/three@0.127.0/examples/jsm/loaders/EXRLoader.js';
import {
  Water
} from 'https://unpkg.com/three@0.127.0/examples/jsm/objects/Water2.js';

AFRAME.registerComponent('custom-env', {
  schema: {

  },
  init() {
    let scene = this.el.sceneEl.object3D; // THREE.Scene
    let renderer = this.el.sceneEl.renderer; // THREE.Scene
    let camera = this.el.sceneEl.camera; // THREE.Scene
    let water;
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const textureLoader = new THREE.TextureLoader();

    new EXRLoader()
      .setDataType(THREE.UnsignedByteType)
      .load('assets/hdri/tranquility/exr-incex.exr', function(texture) {
        const envMap = pmremGenerator.fromEquirectangular(texture).texture;
        // scene.background = envMap;
        scene.environment = envMap;
        // renderer.render(scene, camera);

      }, );
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.outputEncoding = THREE.sRGBEncoding;
    pmremGenerator.compileEquirectangularShader();
    // console.log(renderer);


    const waterGeometry = new THREE.PlaneGeometry(20, 20);
    const flowMap = textureLoader.load('textures/water/Water_1_M_Flow.jpg');

    water = new Water(waterGeometry, {
      // scale: 1,
      textureWidth: 1024,
      textureHeight: 1024,
      flowMap: flowMap
    });

    water.position.x = -0.7;
    water.position.z = 0;
    water.rotation.x = Math.PI * -0.5;
    water.scale.x = 0.1;
    water.scale.y = 0.1;
    // water.scale.z = 0.3;
    document.getElementById('floor').object3D.add(water);
    console.log("Added Water");
  }
});

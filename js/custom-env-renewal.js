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
    let water, water2, water3;
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const textureLoader = new THREE.TextureLoader();

    new EXRLoader()
      .setDataType(THREE.UnsignedByteType)
      .load('assets/hdri/renewal/reflection.exr', function(texture) {
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


    const waterGeometry = new THREE.PlaneGeometry(2, 2);
    const flowMap = textureLoader.load('textures/water/Water_1_M_Flow.jpg');
    console.log(waterGeometry);
    water = new Water(waterGeometry, {
      // scale: 1,
      // textureWidth: 1024,
      // textureHeight: 1024,
      // flowMap: flowMap
    });

    console.log(water);
    water.position.x = 1;
    water.position.y = 0.05;
    water.position.z = 0;
    water.rotation.x = Math.PI * -0.5;
    water.scale.x = 2.25;
    water.scale.y = 0.8;

    water2 = new Water(waterGeometry, {});
    water2.position.x = -1.5;
    water2.position.y = 0.05;
    water2.position.z = 1.37;
    water2.rotation.x = Math.PI * -0.5;
    water2.scale.x = 1.42;
    water2.scale.y = 0.65;

    water3 = new Water(waterGeometry, {});
    water3.position.x = -0.9;
    water3.position.y = 0.05;
    water3.position.z = -1.58;
    water3.rotation.x = Math.PI * -0.5;
    water3.scale.x = 1.97;
    water3.scale.y = 0.65;
    // water.scale.z = 0.3;
    document.getElementById('floor').object3D.add(water);
    document.getElementById('floor').object3D.add(water2);
    document.getElementById('floor').object3D.add(water3);
    console.log("Added Water");
  }
});

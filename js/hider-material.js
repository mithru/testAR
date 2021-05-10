AFRAME.registerComponent('xrextras-hider-material', {
  init(){
      const e=new THREE.MeshStandardMaterial;
      e.colorWrite=!1;
      const n=n=>{
        n && (n.material&&(n.material=e),n.traverse(n=>
          {n.isMesh&&(n.material=e)}
        ))
      };
      n(this.el.getObject3D("mesh")),
      this.el.addEventListener("model-loaded",()=>n(this.el.getObject3D("mesh")))
    }
});

import {
    useFrame,
    useLoader
  } from '@react-three/fiber'
  import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
  import * as THREE from 'three';

  const Model = props =>{
      const model = useLoader(GLTFLoader,process.env.PUBLIC_URL+props.path);

      let mixer
      if (model.animations.length>0){
        console.log(model.animations)
        mixer = new THREE.AnimationMixer(model.scene);
        model.animations?.forEach(clip=>{
          const action = mixer.clipAction(clip);
          action.play();
        })
      }
      useFrame((scene,delta)=>{
        mixer?.update(delta);
      })
      model.scene.traverse(child=>{
        if (child.isMesh){
            child.castShadow=true;
            child.receiveShadow=true;
            child.material.side = THREE.FrontSide;
        }
      })
      return <primitive onClick={(e)=>{props.setFocusedObject()}} rotation={props.rotation} position={props.position} object={model.scene.clone()} scale={props.scale}></primitive>;
  }
  export default Model
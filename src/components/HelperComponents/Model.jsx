import { useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';
import { useRef } from 'react';

const Model = (props) => {
    const model = useLoader(GLTFLoader, process.env.PUBLIC_URL + props.path);
    const ref = useRef();

    let mixer;
    if (model.animations.length > 0) {
        console.log(model.animations);
        mixer = new THREE.AnimationMixer(model.scene);
        model.animations?.forEach((clip) => {
            const action = mixer.clipAction(clip);
            action.play();
        });
    }
    useFrame((scene, delta) => {
        mixer?.update(delta);
        ref.current.scale.copy(new THREE.Vector3(props.scale[0], props.scale[1], props.scale[2]));
        ref.current.rotation.copy(new THREE.Euler(props.rotation[0], props.rotation[1], props.rotation[2]));
    });
    model.scene.traverse((child) => {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            child.material.side = THREE.FrontSide;
        }
    });
    return (
        <primitive
            ref={ref}
            onClick={(e) => {
                props.setFocusedObject();
            }}
            rotation={props.rotation}
            position={props.position}
            object={model.scene.clone()}
            scale={props.scale}
        ></primitive>
    );
};
export default Model;

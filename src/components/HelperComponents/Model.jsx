import { useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react';

const Model = (props) => {
    const model = useLoader(GLTFLoader, process.env.PUBLIC_URL + props.path);
    const ref = useRef();
    const [texture, setTexture] = useState(null);

    // handle texture of object
    useEffect(() => {
        if (props.texture && props.texture.includes('video')) {
            console.log('DEBUG: create video texture');
            const vid = document.createElement('video');
            vid.src = props.texture;
            vid.crossOrigin = 'Anonymous';
            vid.loop = true;
            vid.muted = true;
            vid.play().then((r) => {
                console.log('video is running');
            });
            let texture = new THREE.VideoTexture(vid);
            texture.encoding = THREE.sRGBEncoding;
            setTexture(texture);
        }
    }, []);

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
        ref.current.rotation.copy(
            new THREE.Euler(
                props.rotation[0] + props.bufferRotation[0],
                props.rotation[1] + props.bufferRotation[1],
                props.rotation[2] + props.bufferRotation[2],
            ),
        );
    });
    model.scene.traverse((child) => {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            if (texture) {
                console.log('DEBUG: add material into object');
                // child.geometry.setAttribute('args', [3.2, 1.9])
                console.log('DEBUG: attribute ', child.geometry.getAttribute('position'));
                child.material = new THREE.MeshStandardMaterial({
                    map: texture,
                    emissiveMap: texture,
                });
            }
            // child.material.side = THREE.DoubleSide;
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
        />
    );
};
export default Model;

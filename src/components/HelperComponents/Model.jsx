import { useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react';
import {PlaneGeometry} from "three";

const Model = (props) => {
    const model = useLoader(GLTFLoader, process.env.PUBLIC_URL + props.path);
    console.log('DEBUG: GLTF model ', model);
    const ref = useRef();
    const [texture, setTexture] = useState(null);

    // handle texture of object
    useEffect(() => {
        if (props.texture && props.texture.includes('mp4')) {
            console.log('DEBUG: create video texture ');
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
        } else if (props.texture && (props.texture.includes('jpg') || props.texture.includes('png'))) {
            console.log('texture: ', texture)
            setTexture(props.texture);
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
            console.log('DEBUG: mesh child of model.scene ', child);
            const width = child.geometry.boundingBox.max.x - child.geometry.boundingBox.min.x;
            const height = child.geometry.boundingBox.max.y - child.geometry.boundingBox.min.y;
            // const position = child.geometry.attributes.position;
            // const rotation = child.geometry.attributes.rotation;

            child.castShadow = true;
            child.receiveShadow = true;

            if (texture) {
                // define the child of screen (GTFL model)
                if (child.name === 'Screen') {
                    new THREE.TextureLoader().load(
                        texture,
                        function ( texture ) {
                            console.log('texture: ', texture)
                            child.geometry = new PlaneGeometry(width, height);
                            // child.geometry.attributes.position = position;
                            // child.geometry.attributes.rotation = rotation;
                            child.position.z = 0;
                            child.rotation.y = Math.PI;
                            child.geometry.computeBoundingBox();
                            child.material = new THREE.MeshStandardMaterial({
                                map: texture,
                                side: THREE.DoubleSide
                            });
                        },

                        undefined,

                        function ( err ) {
                            console.error( 'An error happened.' );
                        }
                    );
                }
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

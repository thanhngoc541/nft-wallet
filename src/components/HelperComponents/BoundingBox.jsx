import React from 'react';
import * as THREE from 'three';
import { useBox } from '@react-three/cannon';
import { useFrame, useLoader } from '@react-three/fiber';
export default ({
    position = [0, 0, 0],
    offset = [0, 0, 0],
    dims = [1, 1, 1],
    visible = false,
    mass = 100,
    children,
    rotation = [0, 0, 0],
    isEditting = false,
    attachedWall,
}) => {
    console.log(dims);
    const [ref, api] = useBox(() => ({ mass: 0, args: dims, position: position }), null, []);
    useFrame((scene, delta) => {
        if (!!attachedWall?.isHiding) {
            ref.current.visible = false;
        } else {
            ref.current.visible = true;
        }
        if (isEditting) {
            api.position.copy(new THREE.Vector3(position[0], position[1], position[2]));
            ref.current.position.copy(new THREE.Vector3(position[0], position[1], position[2]));
            ref.current.children?.[0].scale.copy(new THREE.Vector3(dims[0], dims[1], dims[2]));
            ref.current.children?.[0].rotation.copy(new THREE.Euler(rotation[0], rotation[1], rotation[2]));
            ref.current.children?.[1].position.copy(new THREE.Vector3(offset[0], offset[1], offset[2]));
        }
    });
    return (
        <group ref={ref} api={api}>
            <mesh scale={dims} visible={visible} rotation={rotation}>
                <boxBufferGeometry/>
                <meshPhysicalMaterial wireframe/>
            </mesh>
            <group position={offset}>{children}</group>
        </group>
    );
};

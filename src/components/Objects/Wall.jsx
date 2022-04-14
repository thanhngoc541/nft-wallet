import React from 'react';
import { useBox } from '@react-three/cannon';
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
export default (props) => {
    const [ref, api] = useBox(() => ({ args: props.args, position: props.position }));
    let texture = props.texture != null ? useLoader(THREE.TextureLoader, process.env.PUBLIC_URL + props.texture) : null;
    return (
        <mesh
            castShadow
            onPointerDown={(e) => props.placeObject([e.point.x, e.point.y, e.point.z], props.args, props)}
            receiveShadow
            ref={ref}
            args={props.args}
            position={props.position}
        >
            <boxBufferGeometry args={props.args}></boxBufferGeometry>
            <meshPhysicalMaterial
                map={texture != null ? texture : null}
                color={props.color}
                // side={THREE.DoubleSide}
                transparent
                opacity={1}
            ></meshPhysicalMaterial>
        </mesh>
    );
};

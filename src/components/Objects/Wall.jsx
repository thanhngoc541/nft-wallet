import React, { useRef, useState } from 'react';
import { useBox } from '@react-three/cannon';
import * as THREE from 'three';
import { useLoader, useFrame } from '@react-three/fiber';
export default (props) => {
    const wall = props.wall;
    const [ref, api] = useBox(() => ({ args: wall.args, position: wall.position, rotation: wall.rotation }));
    const wallRef = useRef();
    const [color, setColor] = useState(wall.color);
    let texture = wall.texture != null ? useLoader(THREE.TextureLoader, process.env.PUBLIC_URL + wall.texture) : null;
    const getWallType = (wall) => {
        if (!wall) return 3;
        if (wall.args[0] < wall.args[1] && wall.args[0] < wall.args[2]) return 0;
        if (wall.args[1] < wall.args[2] && wall.args[1] < wall.args[0]) return 1;
        if (wall.args[2] < wall.args[1] && wall.args[2] < wall.args[0]) return 2;
    };
    useFrame((scene, delta) => {
        if (color != wall.color) setColor(wall.color);
    });
    var onBeforeRender = function (renderer, scene, camera, geometry, material, group) {
        // this is one way. adapt to your use case.

        var v = new THREE.Vector3();

        if (
            v
                .subVectors(camera.position, new THREE.Vector3(wall.position[0], wall.position[1], wall.position[2]))
                .dot(this.userData) < 0
        ) {
            wall.isHiding = true;
            geometry.setDrawRange(0, 0);
        } else {
            wall.isHiding = false;
        }
    };

    var onAfterRender = function (renderer, scene, camera, geometry, material, group) {
        geometry.setDrawRange(0, Infinity);
    };
    const type = getWallType(wall);
    if (type == 1)
        return (
            <mesh
                // castShadow
                onPointerDown={(e) => {
                    props.placeObject([e.point.x, e.point.y, e.point.z], wall.args, wall);
                    props.setFocusedWall();
                }}
                rotation={wall.rotation}
                receiveShadow
                ref={ref}
                args={wall.args}
                position={wall.position}
            >
                <boxBufferGeometry args={wall.args}></boxBufferGeometry>
                <meshPhysicalMaterial
                    map={texture}
                    color={wall.color}
                    // transparent
                    // side={THREE.FrontSide}
                    // opacity={0}
                ></meshPhysicalMaterial>
            </mesh>
        );
    return (
        <mesh
            // castShadow
            onPointerDown={(e) => {
                console.log('wall click');
                if (wall.isHiding) return;
                props.placeObject([e.point.x, e.point.y, e.point.z], wall.args, wall);
                props.setFocusedWall(wall);
            }}
            receiveShadow
            userData={
                new THREE.Vector3(
                    type != 0 ? 0 : wall.position[0] > 0 ? -1 : 1,
                    0,
                    type != 2 ? 0 : wall.position[2] > 0 ? -1 : 1,
                )
            }
            ref={wallRef}
            rotation={wall.rotation}
            args={wall.args}
            position={wall.position}
            onBeforeRender={onBeforeRender}
            onAfterRender={onAfterRender}
        >
            <boxBufferGeometry args={wall.args}></boxBufferGeometry>
            <meshPhysicalMaterial
                // map={texture}
                color={color}
                transparent={true}
                // side={THREE.BackSide}
                // opacity={1}
            ></meshPhysicalMaterial>
        </mesh>
    );
};

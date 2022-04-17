import React from 'react';
import { useBox } from '@react-three/cannon';
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
export default (props) => {
    const [ref, api] = useBox(() => ({ args: props.args, position: props.position, rotation: props.rotation }));
    let texture = props.texture != null ? useLoader(THREE.TextureLoader, process.env.PUBLIC_URL + props.texture) : null;
    const getWallType = (wall) => {
        if (!wall) return 3;
        if (wall.args[0] < wall.args[1] && wall.args[0] < wall.args[2]) return 0;
        if (wall.args[1] < wall.args[2] && wall.args[1] < wall.args[0]) return 1;
        if (wall.args[2] < wall.args[1] && wall.args[2] < wall.args[0]) return 2;
    };
    const type = getWallType(props);
    if (type == 1)
        return (
            <mesh
                // castShadow
                onPointerDown={(e) => {
                    props.placeObject([e.point.x, e.point.y, e.point.z], props.args, props);
                }}
                rotation={props.rotation}
                receiveShadow
                ref={ref}
                args={props.args}
                position={props.position}
            >
                <boxBufferGeometry args={props.args}></boxBufferGeometry>
                <meshPhysicalMaterial
                    map={texture}
                    color={props.color}
                    // transparent
                    // side={THREE.FrontSide}
                    // opacity={0}
                ></meshPhysicalMaterial>
            </mesh>
        );
    if (getWallType(props) != 2)
        return (
            <group>
                <mesh
                    // castShadow
                    onPointerDown={(e) => {
                        console.log('front');
                        // props.placeObject([e.point.x, e.point.y, e.point.z], props.args, props);
                    }}
                    // receiveShadow
                    ref={ref}
                    args={props.args}
                    position={props.position}
                    rotation={props.rotation}
                >
                    <boxBufferGeometry args={props.args}></boxBufferGeometry>
                    <meshPhysicalMaterial
                        map={texture}
                        color={props.color}
                        // transparent={false}
                        side={THREE.BackSide}
                        transparent
                        opacity={1}
                    ></meshPhysicalMaterial>
                </mesh>
                <mesh
                    // castShadow
                    rotation={props.rotation}
                    onPointerDown={(e) => {
                        console.log(e);
                        console.log(e.intersections);
                        console.log(ref.current);
                        console.log('back');
                        props.placeObject([e.point.x, e.point.y, e.point.z], props.args, props);
                    }}
                    receiveShadow
                    // ref={ref}
                    args={props.args}
                    position={props.position}
                >
                    <boxBufferGeometry args={props.args}></boxBufferGeometry>
                    <meshPhysicalMaterial
                        // map={texture}
                        color={props.color}
                        transparent
                        side={THREE.FrontSide}
                        opacity={1}
                    ></meshPhysicalMaterial>
                </mesh>
            </group>
        );
    return (
        <group>
            <mesh
                // castShadow
                // onPointerDown={(e) => props.placeObject([e.point.x, e.point.y, e.point.z], props.args, props)}
                // receiveShadow
                // ref={ref}
                rotation={props.rotation}
                args={props.args}
                position={props.position}
            >
                <boxBufferGeometry args={props.args}></boxBufferGeometry>
                <meshPhysicalMaterial
                    map={texture}
                    color={props.color}
                    transparent
                    side={THREE.BackSide}
                    opacity={1}
                ></meshPhysicalMaterial>
            </mesh>
            <mesh
                onPointerDown={(e) => {
                    console.log(e.intersections);
                    console.log(e.object);
                    props.placeObject([e.point.x, e.point.y, e.point.z], props.args, props);
                }}
                receiveShadow
                rotation={props.rotation}
                ref={ref}
                args={props.args}
                position={props.position}
            >
                <boxBufferGeometry args={props.args}></boxBufferGeometry>
                <meshPhysicalMaterial side={THREE.FrontSide} transparent opacity={1}></meshPhysicalMaterial>
            </mesh>
        </group>
    );
};

import React from 'react'
import {Shape} from "three";
import * as THREE from "three";
export default (props) => {
    const maskShape = new Shape(props.points);
    return (
        <mesh rotation={props.rotation}>
            <shapeBufferGeometry attach="geometry" args={[maskShape]}  />
            <meshPhysicalMaterial map={props.texture}
                               color={props.color} side={THREE.DoubleSide}
            />
        </mesh>
    )
}

import React, { useRef, useState, } from 'react'
import {
  useFrame,
  useLoader
} from '@react-three/fiber'
import * as THREE from 'three';
import {  useBox } from '@react-three/cannon'

export default function Box(props) {
    // This reference gives us direct access to the THREE.Mesh object
    const [ref,api] = useBox(()=>({mass:1,...props}));
    const texture = useLoader(THREE.TextureLoader, process.env.PUBLIC_URL+'/wood.jpg')
    // Hold state for hovered and clicked events
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => (ref.current.rotation.x += 0.01, ref.current.rotation.y += 0.01))
    // Return the view, these are regular Threejs elements expressed in JSX
    const onPointerDownHandle = e=>{
        e.object.active=true;
        if (window.activeMesh) window.activeMesh.active=false;
        window.activeMesh = e.object;
    }
    return (
      <mesh
        api={api}
        castShadow
        receiveShadow
        {...props}
        ref={ref}
        scale={clicked ? 1.5 : 1}
        onPointerDown={onPointerDownHandle}
        onClick={(event) => click(!clicked)}
        onPointerOver={(event) => hover(true)}
        onPointerOut={(event) => hover(false)}>
        <boxBufferGeometry args={[1, 1, 1]} />
        <meshPhysicalMaterial
          // transparent
          // transmission={0.7}
          // metalness={0}
          // roughness={0}
          // clearcoat={1}
          // reflectivity={1}
          map={texture}
          side={THREE.DoubleSide}
          color={hovered ? 'hotpink' : 'orange'}
        />
      </mesh>
    )
  }
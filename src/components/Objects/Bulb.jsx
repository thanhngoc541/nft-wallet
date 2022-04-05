import React, { useRef, useEffect, } from 'react'
import {
  useThree
} from '@react-three/fiber'
import * as THREE from 'three';
import {  useBox } from '@react-three/cannon'
export default props => {
  // const ref = useRef();
  // const {scene} = useThree();

  // useEffect(()=>{
  //   if (ref==null) return;
  //   if (scene.lights) scene.lights.push(ref)
  //     else scene.lights = [ref]
  // },[]);
    return (<mesh {...props}
    >
      <pointLight
      castShadow
      shadow-mapSize-height={2**10}
      shadow-mapSize-width={2**10}
      shadow-radius = {10}
      ></pointLight>
      <sphereBufferGeometry args={[0.2, 20, 20]}>
      </sphereBufferGeometry>
      <meshPhongMaterial emissive={'white'}></meshPhongMaterial>
    </mesh>)
  }
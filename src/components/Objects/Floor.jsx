import React from 'react'
import {  useBox } from '@react-three/cannon'
export default (props) => {
  const [ref,api] = useBox(()=>({args: [50,1,50],...props}));
    return (
      <mesh castShadow
       receiveShadow ref={ref} {...props} >
        <boxBufferGeometry args={[50, 1, 50]}></boxBufferGeometry>
        <meshPhysicalMaterial transparent opacity={1} ></meshPhysicalMaterial>
      </mesh>
 )
}
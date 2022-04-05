import React from 'react'
import {  useBox } from '@react-three/cannon'
export default ({
    position=[0,0,0],
    offset=[0,0,0],
    dims = [1,1,1],
    visible = true,
    mass = 100,
    children,
}) => {
  const [ref,api] = useBox(()=>({mass:mass,args:dims,position:position}));
    return (
        <group ref={ref} api={api}>
            <mesh scale={dims} visible={visible}>
                <boxBufferGeometry ></boxBufferGeometry>
                <meshPhysicalMaterial wireframe ></meshPhysicalMaterial>
            </mesh>
            <group position={offset}>
                {children}
            </group>
        </group>

 )
}
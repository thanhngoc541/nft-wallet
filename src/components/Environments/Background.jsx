import React,{useMemo} from 'react'
import {
  useLoader
} from '@react-three/fiber'
import * as THREE from 'three';
export default props => {
    const texture = useLoader(
      THREE.TextureLoader, process.env.PUBLIC_URL+'/autoshop.jpg')
    texture.encoding = useMemo(()=>THREE.sRGBEncoding,[]);
    texture.mapping = useMemo(()=>THREE.EquirectangularReflectionMapping,[]);
    return (
      <primitive
        attach='background'
        object={texture}>
      </primitive>
    )
  }
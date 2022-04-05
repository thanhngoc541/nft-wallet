import React from 'react'
import * as THREE from 'three';
import state from '../../state'
const handleClick = e => {
    if (!state.activeMesh) return;
    state.activeMesh.material.color = new THREE.Color(e.target.style.background)
  }
export default function ColorPicker(){
    return ( <div style={{
       position: 'absolute',
       zIndex: 2 ,
       left:0,
       right: 0,
       margin:'auto',
       display: 'flex',
       width: 'fit-content',
       top:'20px'
       }}>
    <div onClick={handleClick} style={{
      height: 50,
      width: 50,
      background: 'blue'
    }}></div>
    <div onClick={handleClick} style={{
      height: 50,
      width: 50,
      background: 'yellow'
    }}></div>
    <div onClick={handleClick} style={{
      height: 50,
      width: 50,
      background: 'white'
    }}></div>
  </div>);
}
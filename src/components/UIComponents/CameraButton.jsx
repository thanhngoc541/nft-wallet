import React from 'react'
import state from '../../state'
export default (props) => {
    const styles={ position:'absolute',
    background:'white',
    textAlign:'center',
    borderRadius:'100%',
    fontWeight:'bold',
    opacity:'0.7',
    border:'1px solid black',
    fontSize: 19,
    zIndex:1,
    cursor:'pointer',
    height:'30px',
    width:'30px',
    bottom:'30vh',}
    const sets=[
        {
            cameraPos:[9,3,4],
            target:[4,0,0],
            meshName:'Capot001_CAR_PAINT_0'
        },
        {
            cameraPos:[1,3,5],
            target:[-4,0,0],
            meshName:'object005_bod_0'
        }
    ]
const handleClick = (num)=>
{
    state.cameraPos.set(...sets[num].cameraPos)
    state.target.set(...sets[num].target)
    state.activeMeshName =sets[num].meshName
    state.shouldUpdate=true;
}
    return (
        <div>
            <div
            onClick={e=>handleClick(1)}
             style={{
                ...styles,
                left:'40vw'}}>
                {'<'}
            </div>
            <div
            onClick={e=>handleClick(0)}
             style={{
                ...styles,
                right:'40vw'}}>
                {'>'}
            </div>
        </div>

 )
}
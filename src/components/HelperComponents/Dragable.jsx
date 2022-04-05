import {DragControls} from 'three/examples/jsm/controls/DragControls.js';
import {extend,useThree} from '@react-three/fiber';
import {useRef,useEffect,useState} from 'react';
import { Vector3 } from 'three';
extend({ DragControls});
const Dragable = props =>{
    const groupRef = useRef();
    const controlRef = useRef();
    const {gl,camera,scene} = useThree();
    const [children,setChildren] = useState([]);
    let defaultPos=null;
    useEffect(()=>{
        setChildren(groupRef.current.children);
    },[])
    useEffect(()=>{
        controlRef.current.addEventListener('dragstart',
        e => {
                e.object.api?.mass.set(0);
                scene.orbitControls.enabled=false;
                if (defaultPos==null)  defaultPos=new Vector3(...e.object.position);
                console.log(defaultPos)
            })
        controlRef.current.addEventListener('dragend',
        e => {
                e.object.api?.mass.set(1);
                scene.orbitControls.enabled=true;
            })
        controlRef.current.addEventListener('drag',
        e => {
            console.log(e.object)
            let position = e.object.position;
             if (props.lockX) position.x=defaultPos.x+props.position[0]/2;
             if (props.lockY) position.y=props.position[1]/2;
             if (props.lockZ) position.z=props.position[2]/2;
            e.object.api?.position.copy(position);
            e.object.api?.velocity.set(0,0,0);
        })
    },[children])
    return(
        <group ref={groupRef}>
            <dragControls
             ref={controlRef}
             transformGroup={props.transformGroup}
             args={[children,camera,gl.domElement]}></dragControls>
            {props.children}
        </group>
    );
}
export default Dragable;
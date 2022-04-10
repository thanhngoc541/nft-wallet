import { DragControls } from 'three/examples/jsm/controls/DragControls.js';
import { extend, useThree } from '@react-three/fiber';
import { useRef, useEffect, useState } from 'react';
import { Vector3 } from 'three';
extend({ DragControls });
const Dragable = (props) => {
    const groupRef = useRef();
    const controlRef = useRef();
    const { gl, camera, scene } = useThree();
    const [children, setChildren] = useState([]);
    let defaultPos = null;
    let dims = props.dims;

    const getDims = () => {
        console.log(dims);
        return dims;
    };
    const handleDragStart = (e) => {
        e.object.api?.mass.set(0);
        scene.orbitControls.enabled = false;
        if (defaultPos == null) defaultPos = new Vector3(...e.object.position);
        console.log(defaultPos);
    };
    const handleDragEnd = (e) => {
        e.object.api?.mass.set(1);
        var pos = e.object.position;
        props.setPosition?.([pos.x, pos.y, pos.z]);
        scene.orbitControls.enabled = true;
    };
    const handleDrag = (e) => {
        console.log(e.object);
        console.log(props.dims);
        let position = e.object.position;
        let dims = getDims();
        if (props.lockX) position.x = defaultPos.x + dims[0] / 2;
        if (props.lockY) position.y = dims[1] / 2;
        if (props.lockZ) position.z = defaultPos.z + dims[2] / 2;
        e.object.api?.position.copy(position);
        e.object.api?.velocity.set(0, 0, 0);
    };
    useEffect(() => {
        dims = props.dims;
    }, [props.dims]);
    useEffect(() => {
        setChildren(groupRef.current.children);
        console.log('xxx');
    }, []);
    useEffect(() => {
        console.log('asdasdsa');

        controlRef.current.addEventListener('dragstart', handleDragStart, false);
        controlRef.current.addEventListener('dragend', handleDragEnd, false);
        controlRef.current.addEventListener('drag', handleDrag, false);
        return () => {
            controlRef.current?.removeEventListener('dragstart', handleDragStart, false);
            controlRef.current?.removeEventListener('dragend', handleDragEnd, false);
            controlRef.current?.removeEventListener('drag', handleDrag, false);
        };
    }, [children, props.dims]);
    return (
        <group ref={groupRef}>
            <dragControls
                ref={controlRef}
                transformGroup={props.transformGroup}
                args={[children, camera, gl.domElement]}
            ></dragControls>
            {props.children}
        </group>
    );
};
export default Dragable;

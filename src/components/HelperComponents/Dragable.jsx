import {DragControls} from 'three/examples/jsm/controls/DragControls.js';
import {extend, useThree} from '@react-three/fiber';
import {useRef, useEffect, useState} from 'react';
import {Vector3} from 'three';

extend({DragControls});
const Dragable = (props) => {
    const groupRef = useRef();
    const controlRef = useRef();
    const {gl, camera, scene} = useThree();
    const [children, setChildren] = useState([]);
    let defaultPos = null;
    let lastPos = null;

    const getWallType = (wall) => {
        if (!wall) return 3;
        if (wall.args[0] < wall.args[1] && wall.args[0] < wall.args[2]) return 0;
        if (wall.args[1] < wall.args[2] && wall.args[1] < wall.args[0]) return 1;
        if (wall.args[2] < wall.args[1] && wall.args[2] < wall.args[0]) return 2;
    };

    const getWallLimit = (wall, index) => {
        return {min: wall.position[index] - wall.args[index] / 2, max: wall.position[index] + wall.args[index] / 2};
    };

    const checkWallLimit = (wall, index, position, index2, dims) => {
        const {min, max} = getWallLimit(wall, index);
        if (position[index2] - dims[index2] / 2 < min || position[index2] + dims[index2] / 2 > max) return 1;
        return 0;
    };

    const handleDragStart = (e) => {
        e.object.api?.mass.set(0);
        scene.orbitControls.enabled = false;
        if (defaultPos == null) {
            defaultPos = new Vector3(...e.object.position);
            lastPos = [...e.object.position];
        }
    };
    const handleDragEnd = (e) => {
        e.object.api?.mass.set(1);
        props.setPosition?.(lastPos);
        scene.orbitControls.enabled = true;
    };
    const handleDrag = (e) => {
        // console.log(controlRef.current);
        // console.log(groupRef.current);
        let position = e.object.position;
        console.log(position);
        console.log(e.object);
        if (props.lockX) position.x = defaultPos.x;
        if (props.lockY) position.y = props.dims[1] / 2;
        if (props.lockZ) position.z = defaultPos.z;
        const dims = e.object.children?.[0]?.scale;
        if (getWallType(props.attachedWall) == 0) {
            if (
                checkWallLimit(props.attachedWall, 1, position, 'y', dims) ||
                checkWallLimit(props.attachedWall, 2, position, 'z', dims)
            )
                return;
        }
        if (getWallType(props.attachedWall) == 1) {
            if (
                checkWallLimit(props.attachedWall, 0, position, 'x', dims) ||
                checkWallLimit(props.attachedWall, 2, position, 'z', dims)
            )
                return;
        }
        if (getWallType(props.attachedWall) == 2) {
            if (
                checkWallLimit(props.attachedWall, 1, position, 'y', dims) ||
                checkWallLimit(props.attachedWall, 0, position, 'x', dims)
            )
                return;
        }
        lastPos = [position.x, position.y, position.z];
        console.log(lastPos);

        e.object.api?.position.copy(position);
        e.object.api?.velocity.set(0, 0, 0);
    };

    useEffect(() => {
        console.log('useEffect []');
        setChildren(groupRef.current.children);
    }, []);
    useEffect(() => {
        console.log('useeffect [children,dims]');
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
            />
            {props.children}
        </group>
    );
};
export default Dragable;

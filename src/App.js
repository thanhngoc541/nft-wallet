import './App.css';
import React, { Suspense, useEffect, useState, useMemo } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import Orbit from './components/HelperComponents/Orbit';
import Box from './components/Objects/Box';
import Lights from './components/Objects/Lights';
import ColorPicker from './components/UIComponents/ColorPicker';
import { Physics } from '@react-three/cannon';
import Dragable from './components/HelperComponents/Dragable';
import Model from './components/HelperComponents/Model';
import Wall from './components/Objects/Wall';
import FloatingButtons from './components/UIComponents/FloatingButtons';
import WallModel from './models/wall.js';
import BoundingBox from './components/HelperComponents/BoundingBox';
import ObjectDetails from './components/UIComponents/ObjectDetails';
function App() {
    const [walls, setWalls] = useState([
        new WallModel([16, 0.2, 10], [0, -0.1, 0], null, '/wood.jpg'),
        new WallModel([0.2, 6, 10], [-8.1, 3, 0], 'pink'),
        new WallModel([16, 6, 0.2], [0, 3, -5.1], 'pink'),
    ]);
    const [objects, setObjects] = useState([
        // new ObjectModel('/tesla_model_3/scene.gltf', [4, 1, 0], new Array(3).fill(0.01), [3, 1.8, 6], [0, -0.3, 0.9]),
        // new ObjectModel('/tesla_model_s/scene.gltf', [-4, 1, 0], new Array(3).fill(0.7), [3, 1.8, 6], [0, -0.7, 0.2]),
    ]);
    const [focusedObject, setFocusedObject] = useState(null);
    const [mode, setMode] = useState('');
    // const [currentObject, setCurrentObject] = useState(null);
    let currentObject = null;
    useEffect(() => {
        console.log(walls);
    }, []);
    const createWallHandle = (wall) => {
        console.log('create wall');
        setWalls([...walls, wall]);
    };
    const setPosition = (object, position) => {
        console.log(object.pos);

        object.pos = position;
        console.log(object.pos);
    };
    let addModel = (model) => {
        currentObject = model;
        // setCurrentObject(model);
        // setObjects([...objects, model]);
        console.log(model, objects);
    };
    let placeObject = (pos, args) => {
        if (currentObject != null) {
            currentObject.pos = pos;
            if (args[1] < args[0] && args[1] < args[2]) currentObject.pos[1] += currentObject.dims[1] / 2;
            if (args[0] < args[1] && args[0] < args[2]) {
                if (currentObject.dims[2] < currentObject.dims[0] && currentObject.dims[2] < currentObject.dims[1]) {
                    currentObject.rotation[1] += Math.PI / 2;
                    currentObject.dims[0] += currentObject.dims[2];
                    currentObject.dims[2] = currentObject.dims[0] - currentObject.dims[2];
                    currentObject.dims[0] = currentObject.dims[0] - currentObject.dims[2];
                    currentObject.offset[0] += currentObject.offset[2];
                    currentObject.offset[2] = currentObject.offset[0] - currentObject.offset[2];
                    currentObject.offset[0] = -currentObject.offset[0] + currentObject.offset[2];
                    currentObject.lockX = true;
                    currentObject.lockZ = false;
                }
                currentObject.pos[0] += currentObject.dims[0] / 2;
            }
            if (args[2] < args[0] && args[2] < args[1]) {
                if (currentObject.dims[0] < currentObject.dims[1] && currentObject.dims[0] < currentObject.dims[2]) {
                    currentObject.rotation[1] -= Math.PI / 2;
                    currentObject.dims[0] += currentObject.dims[2];
                    currentObject.dims[2] = currentObject.dims[0] - currentObject.dims[2];
                    currentObject.dims[0] = currentObject.dims[0] - currentObject.dims[2];
                    currentObject.offset[0] += currentObject.offset[2];
                    currentObject.offset[2] = currentObject.offset[0] - currentObject.offset[2];
                    currentObject.offset[0] = -currentObject.offset[0] + currentObject.offset[2];
                    currentObject.lockX = false;
                    currentObject.lockZ = true;
                }
                currentObject.pos[2] += currentObject.dims[2] / 2;
            }
            console.log(pos, currentObject);

            setObjects([...objects, currentObject]);
            // setCurrentObject(null);
            currentObject = null;
        }
    };
    const getScale = (scale, customScale) => {
        return [scale[0] * customScale, scale[1] * customScale, scale[2] * customScale];
    };
    const getRotation = (rotation, customRotationY) => {
        return [rotation[0], rotation[1] + (customRotationY * Math.PI) / 180, rotation[2]];
    };

    function arcctg(x) {
        return Math.PI / 2 - Math.atan(x);
    }

    const getOffset = (offset, customScale, angle = 0) => {
        let x = 1;
        if (offset[0] < 0 && offset[2] < 0) x = -1;
        if (offset[0] < 0 && offset[2] > 0) x = -1;
        const l = Math.sqrt(offset[0] * offset[0] + offset[2] * offset[2]);
        let a = arcctg(offset[2] / offset[0]);
        angle *= Math.PI / 180;
        angle += !!a ? a : 0;
        return [x * l * customScale * Math.sin(angle), offset[1] * customScale, x * l * customScale * Math.cos(angle)];
    };
    const getPosition = (position, dims, customScale) => {
        console.log(position, dims);
        return [position[0], (dims[1] * customScale) / 2, position[2]];
    };
    const getObjects = () => (
        <Suspense fallback={null}>
            {objects.map((object, index) => {
                if (mode == 'lock')
                    return (
                        <BoundingBox
                            key={'boundingBox' + object.createTime.toString()}
                            dims={object.calcDims}
                            mass={object.mass}
                            offset={getOffset(object.offset, object.customScale, object.customRotationY)}
                            position={getPosition(object.pos, object.dims, object.customScale)}
                            rotation={[0, (object.customRotationY * Math.PI) / 180, 0]}
                        >
                            <Model
                                setFocusedObject={() => {
                                    console.log(object);
                                    if (mode == 'edit') setFocusedObject(object);
                                }}
                                key={object.createTime.toString()}
                                rotation={getRotation(object.rotation, object.customRotationY)}
                                scale={getScale(object.scale, object.customScale)}
                                path={object.url}
                            ></Model>
                        </BoundingBox>
                    );
                return (
                    <Dragable
                        setPosition={(pos) => setPosition(object, pos)}
                        dims={object.calcDims}
                        lockX={object.lockX}
                        lockY={object.lockY}
                        lockZ={object.lockZ}
                        transformGroup
                        key={'dragable' + object.createTime.toString()}
                    >
                        <BoundingBox
                            key={'boundingBox' + object.createTime.toString()}
                            dims={object.calcDims}
                            mass={object.mass}
                            offset={getOffset(object.offset, object.customScale, object.customRotationY)}
                            position={getPosition(object.pos, object.dims, object.customScale)}
                            rotation={[0, (object.customRotationY * Math.PI) / 180, 0]}
                        >
                            <Model
                                setFocusedObject={() => {
                                    console.log(object);
                                    if (mode == 'edit') setFocusedObject(object);
                                }}
                                key={object.createTime.toString()}
                                rotation={getRotation(object.rotation, object.customRotationY)}
                                scale={getScale(object.scale, object.customScale)}
                                path={object.url}
                            ></Model>
                        </BoundingBox>
                    </Dragable>
                );
            })}
        </Suspense>
    );
    const getWalls = () => (
        <Suspense fallback={null}>
            {walls.map((wall, index) => (
                <Wall
                    placeObject={placeObject}
                    key={'wall' + index.toString()}
                    texture={wall.texture}
                    color={wall.color}
                    args={wall.args}
                    position={wall.pos}
                ></Wall>
            ))}
        </Suspense>
    );
    const clearFocused = () => setFocusedObject(null);
    console.log('APP RENDERING.......');

    return (
        <div style={{ height: '100vh', width: '100vw' }}>
            {/* <ColorPicker></ColorPicker> */}
            {/* <CameraButton></CameraButton> */}
            <FloatingButtons
                mode={mode}
                setMode={setMode}
                addModel={addModel}
                createWallHandle={createWallHandle}
            ></FloatingButtons>
            <ObjectDetails mode={mode} object={focusedObject} clearFocused={clearFocused}></ObjectDetails>
            <Canvas shadows style={{ background: 'black' }} camera={{ position: [7, 7, 7] }}>
                {/* <CameraControls></CameraControls> */}
                <Orbit></Orbit>
                <axesHelper args={[5]}></axesHelper>
                {/* <Suspense fallback={null}>
                    <Background></Background>
                </Suspense> */}
                <Lights></Lights>
                {/* <gridHelper args={[20, 20]} /> */}
                <Physics>
                    {/* <Car></Car> */}
                    <Dragable>
                        <Suspense fallback={null}>
                            <Box position={[-1.2, 0.5, -2]} />
                        </Suspense>
                        <Suspense fallback={null}>
                            <Box position={[1.2, 0.5, -2]} />
                        </Suspense>
                    </Dragable>
                    {getWalls()}
                    {getObjects()}
                </Physics>
            </Canvas>
        </div>
    );
}

export default App;

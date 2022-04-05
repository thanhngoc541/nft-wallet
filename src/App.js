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
    // const [currentObject, setCurrentObject] = useState(null);
    let currentObject = null;
    useEffect(() => {
        console.log(walls);
    }, []);
    const createWallHandle = (wall) => {
        console.log('create wall');
        setWalls([...walls, wall]);
    };
    let addModel = (model) => {
        currentObject = model;
        // setCurrentObject(model);
        console.log(model);
        console.log(currentObject);
        // setObjects([...objects, model]);
    };
    let placeObject = (pos) => {
        console.log(pos, currentObject);
        console.log(objects);
        if (currentObject != null) {
            currentObject.pos = pos;
            if (currentObject.pos[1] < currentObject.pos[0] && currentObject.pos[1] < currentObject.pos[2])
                currentObject.pos[1] += currentObject.dims[1] / 2;
            if (currentObject.pos[0] < currentObject.pos[1] && currentObject.pos[0] < currentObject.pos[2])
                currentObject.pos[0] += currentObject.dims[0] / 2;
            if (currentObject.pos[2] < currentObject.pos[0] && currentObject.pos[2] < currentObject.pos[1])
                currentObject.pos[2] += currentObject.dims[2] / 2;
            setObjects([...objects, currentObject]);
            // setCurrentObject(null);
            currentObject = null;
        }
    };
    const getObjects = useMemo(
        () => (
            <Suspense fallback={null}>
                {objects.map((object, index) => (
                    <Dragable
                        position={object.dims}
                        lockX={object.lockX}
                        lockY={object.lockY}
                        lockZ={object.lockZ}
                        transformGroup
                        key={'object' + index.toString()}
                    >
                        <BoundingBox dims={object.dims} mass={object.mass} offset={object.offset} position={object.pos}>
                            <Model key={'model' + index.toString()} scale={object.scale} path={object.url}></Model>
                        </BoundingBox>
                    </Dragable>
                ))}
            </Suspense>
        ),
        [objects],
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
    return (
        <div style={{ height: '100vh', width: '100vw' }}>
            <ColorPicker></ColorPicker>
            {/* <CameraButton></CameraButton> */}
            <FloatingButtons addModel={addModel} createWallHandle={createWallHandle}></FloatingButtons>
            <Canvas shadows style={{ background: 'black' }} camera={{ position: [7, 7, 7] }}>
                {/* <CameraControls></CameraControls> */}
                <Orbit></Orbit>
                <axesHelper args={[5]}></axesHelper>
                {/* <Suspense fallback={null}>
                    <Background></Background>
                </Suspense> */}
                <Lights></Lights>
                <gridHelper args={[20, 20]} />
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
                    {getObjects}
                </Physics>
            </Canvas>
        </div>
    );
}

export default App;

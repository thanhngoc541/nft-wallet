import Bulb from './Bulb';

const Lights = ({}) => {
    return (
        <>
            <ambientLight intensity={0.8} />
            <directionalLight position={[6, 3, 0]} intensity={1} castShadow></directionalLight>
            {/* <Bulb position={[-7, 3, 0]}></Bulb> */}
            {/* <Bulb position={[-7, 6, -4]}></Bulb> */}
            {/* <Bulb position={[7, 3, 0]}></Bulb> */}
        </>
    );
};
export default Lights;

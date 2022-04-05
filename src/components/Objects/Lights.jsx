import Bulb from "./Bulb"

const Lights=({})=>{
    return (<>
      <ambientLight intensity={0.2} />
      <directionalLight position={[6, 3, 0]} intensity={2} castShadow></directionalLight>
      {/* <Bulb position={[-7, 3, 0]}></Bulb> */}
      <Bulb position={[-7, 6, -4]}></Bulb>
      {/* <Bulb position={[7, 3, 0]}></Bulb> */}
    </>)
}
export default Lights
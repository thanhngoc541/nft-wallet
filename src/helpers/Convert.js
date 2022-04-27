import WallModel from '../models/wall.js';

// chiều cao mặc định là 5, độ dày là 0.2
export const ConvertJson2DTo3D = (data) => {
    let floorCorners = Object.getOwnPropertyNames(data.rooms)[0].split(',')
    let walls = data.walls
    let corners = data.corners
    let walls3D = []

    let floorX = null, floorZ = null, minX = corners[floorCorners[0]].x, minZ = corners[floorCorners[0]].y;
    for(let i = 0; i < floorCorners.length - 1; i++) {
        if (corners[floorCorners[i]].x !== corners[floorCorners[i + 1]].x) {
            floorX = Math.abs(corners[floorCorners[i]].x - corners[floorCorners[i + 1]].x)
        }
        if (corners[floorCorners[i]].y !== corners[floorCorners[i + 1]].y) {
            floorZ = Math.abs(corners[floorCorners[i]].y - corners[floorCorners[i + 1]].y)
        }
        if (minX > corners[floorCorners[i]].x) {
            minX = corners[floorCorners[i]].x
        }
        if (minZ > corners[floorCorners[i]].y) {
            minZ = corners[floorCorners[i]].y
        }
    }

    console.log('as floorX', floorX)
    console.log('as minZ', minZ)
    console.log('as pos floor', [floorX/2 + minX, 0.1, floorZ/2 + minZ])
    let floor3D = new WallModel([floorX, 0.2, floorZ], [floorX/2 + minX, -0.1, floorZ/2 + minZ], null, '/wood.jpg')

    // sàn nhà
    walls3D.push(floor3D);

    let Oxy = [], Oyz = [];

    for(let i = 0; i  < walls.length; i++) {
       if (corners[walls[i].corner1].x !== corners[walls[i].corner2].x
           && corners[walls[i].corner1].y === corners[walls[i].corner2].y) {
           Oxy.push(walls[i]);
       }
       if (corners[walls[i].corner1].y !== corners[walls[i].corner2].y
           && corners[walls[i].corner1].x === corners[walls[i].corner2].x) {
           Oyz.push(walls[i]);
       }
    }



    // Oyz
    let wallZ = Math.abs(corners[Oyz[0].corner1].y - corners[Oyz[0].corner2].y)
    let deltaX = Math.abs(corners[Oyz[0].corner1].x - corners[Oyz[1].corner2].x)

    walls3D.push(new WallModel([0.2, 5, wallZ], [minX - 0.1, 5/2, minZ + wallZ/2], 'white', null))
    walls3D.push(new WallModel([0.2, 5, wallZ], [minX + deltaX + 0.1, 5/2, minZ + wallZ/2], 'white', null))


    // Oxy
    let wallX = Math.abs(corners[Oxy[0].corner1].x - corners[Oxy[0].corner2].x)
    let deltaY = Math.abs(corners[Oxy[0].corner1].y - corners[Oxy[1].corner2].y)

    walls3D.push(new WallModel([wallX, 5, 0.2], [minX + wallX / 2, 5 / 2, minZ - 0.1 ], 'white', null));
    walls3D.push(new WallModel([wallX, 5, 0.2], [minX + wallX / 2, 5 / 2, minZ + deltaY + 0.1], 'white', null));



    console.log(walls3D)
    return walls3D
}
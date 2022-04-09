export default class ObjectModel {
    constructor(
        url,
        pos = [0, 0, 0],
        scale = [1, 1, 1],
        dims = [1, 1, 1],
        offset = [0, 0, 0],
        mass = 100,
        lockX = false,
        lockY = true,
        lockZ = false,
        rotation = [0, 0, 0],
    ) {
        this.url = url;
        this.pos = pos;
        this.scale = scale;
        this.dims = dims;
        this.calcDims = dims;
        this.offset = offset;
        this.mass = mass;
        this.lockX = lockX;
        this.lockY = lockY;
        this.lockZ = lockZ;
        this.rotation = rotation;
        this.customScale = 1;
        this.customRotationY = 0;
        this.createTime = new Date();
    }
}

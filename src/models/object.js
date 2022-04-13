export default class ObjectModel {
    constructor(
        url,
        position = [0, 0, 0],
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
        this.position = position;
        this.scale = scale;
        this.calcScale = [...scale];
        this.dims = dims;
        this.calcDims = [...dims] ?? [1, 1, 1];
        this.offset = offset;
        this.calcOffset = [...offset];
        this.mass = mass;
        this.lockX = lockX;
        this.lockY = lockY;
        this.lockZ = lockZ;
        this.rotation = rotation;
        this.calcRotation = [...rotation];
        this.customScale = 1;
        this.customRotationY = 0;
        this.calcPosition = [...position];
        if (lockY) this.calcPosition[1] = (this.dims[1] * this.customScale) / 2;
        this.createTime = new Date();
    }
}

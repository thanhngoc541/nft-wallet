export default class ObjectModel {
    constructor(url, pos, scale, dims, offset, mass, lockX = false, lockY = true, lockZ = false) {
        this.url = url;
        this.pos = pos;
        this.scale = scale;
        this.dims = dims;
        this.offset = offset;
        this.mass = mass;
        this.lockX = lockX;
        this.lockY = lockY;
        this.lockZ = lockZ;
        this.createTime = new Date();
    }
}

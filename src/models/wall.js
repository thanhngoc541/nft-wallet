export default class WallModel {
    constructor(args, position, color = null, texture = null, rotation = [0, 0, 0]) {
        this.args = args;
        this.position = position;
        this.color = color;
        this.texture = texture;
        this.rotation = rotation;
        this.isHiding = false;
        this.createTime = new Date();
    }
}

export default class WallModel {
    constructor(args, position, color = null, texture = null) {
        this.args = args;
        this.position = position;
        this.color = color;
        this.texture = texture;
        this.createTime = new Date();
    }
}

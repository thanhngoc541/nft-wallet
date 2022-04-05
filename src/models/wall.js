export default class WallModel {
    constructor(args, pos, color = null, texture = null) {
        this.args = args;
        this.pos = pos;
        this.color = color;
        this.texture = texture;
        this.createTime = new Date();
    }
}

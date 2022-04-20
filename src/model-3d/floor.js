export default class FloorModel {
    constructor(points, position, color = null, texture = null, rotation = [Math.PI / 2, 0, 0]) {
        this.points = points;
        this.position = position;
        this.color = color;
        this.texture = texture;
        this.rotation = rotation;
        this.createTime = new Date();
    }
}

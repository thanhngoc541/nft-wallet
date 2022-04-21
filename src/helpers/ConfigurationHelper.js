const { Configuration, gridSpacing, snapTolerance, boundsY, boundsX, dragOnlyY, dragOnlyX, directionalDrag, snapToGrid } = require("../core/configuration");

export class ConfigurationHelper {
    constructor() {
        this.__snapToGrid = Configuration.getValue(snapToGrid, 3);
        this.__directionalDrag = Configuration.getValue(directionalDrag, 3);
        this.__dragOnlyX = Configuration.getValue(dragOnlyX, 3);
        this.__dragOnlyY = Configuration.getValue(dragOnlyY, 3);
        this.__boundsX = Configuration.getValue(boundsX, 2);
        this.__boundsY = Configuration.getValue(boundsY, 2);
        this.__snapTolerance = Configuration.getValue(snapTolerance, 2);
        this.__gridSpacing = Configuration.getValue(gridSpacing, 2);
    }

    get snapToGrid() {
        return this.__snapToGrid;
    }
    set snapToGrid(flag) {
        this.__snapToGrid = flag;
        Configuration.setValue(snapToGrid, flag);
    }

    get directionalDrag() {
        return this.__directionalDrag;
    }
    set directionalDrag(flag) {
        this.__directionalDrag = flag;
        Configuration.setValue(directionalDrag, flag);
    }

    get dragOnlyX() {
        return this.__dragOnlyX;
    }
    set dragOnlyX(flag) {
        this.__dragOnlyX = flag;
        Configuration.setValue(dragOnlyX, flag);
    }

    get dragOnlyY() {
        return this.__dragOnlyY;
    }
    set dragOnlyY(flag) {
        this.__dragOnlyY = flag;
        Configuration.setValue(dragOnlyY, flag);
    }

    get boundsX() {
        return this.__boundsX;
    }
    set boundsX(value) {
        this.__boundsX = value;
        Configuration.setValue(boundsX, value);
    }

    get boundsY() {
        return this.__boundsY;
    }

    set boundsY(value) {
        this.__boundsY = value;
        Configuration.setValue(boundsY, value);
    }


    get snapTolerance() {
        return this.__snapTolerance;
    }

    set snapTolerance(value) {
        this.__snapTolerance = value;
        Configuration.setValue(snapTolerance, value);
    }

    get gridSpacing() {
        return this.__gridSpacing;
    }

    set gridSpacing(value) {
        this.__gridSpacing = value;
        Configuration.setValue(gridSpacing, value);
    }
}
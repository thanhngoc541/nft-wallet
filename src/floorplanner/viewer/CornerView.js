import { Point } from 'pixi.js';
import { isMobile } from 'detect-touch-device';
import {BaseFloorplanViewElement} from "./BaseFloorplanViewElement";
import {EVENT_DELETED, EVENT_MOVED} from "../../core/events";
import {Dimensioning} from "../../core/dimensioning";
import {Configuration, dragOnlyX, dragOnlyY, snapToGrid, snapTolerance} from "../../core/configuration";

export class CornerView extends BaseFloorplanViewElement {
    constructor(floorplan, options, corner) {
        super(floorplan, options);
        this.__options['corner-radius'] = 12.5;
        for (var opt in options) {
            if (this.__options.hasOwnProperty(opt) && options.hasOwnProperty(opt)) {
                this.__options[opt] = options[opt];
            }
        }

        this.__corner = corner;
        this.pivot.x = this.pivot.y = 0.5;

        this.__cornerUpdateEvent = this.__updateWithModel.bind(this);
        this.__cornerDeletedEvent = this.__cornerDeleted.bind(this);

        this.interactive = corner.isLocked;
        this.buttonMode = corner.isLocked;

        if (corner.isLocked) {
            this.__deactivate();
        }

        this.__drawHoveredOffState();

        this.__corner.addEventListener(EVENT_MOVED, this.__cornerUpdateEvent);
        this.__corner.addEventListener(EVENT_DELETED, this.__cornerDeletedEvent);
        this.__updateWithModel();
    }

    __drawCornerState(radius, borderColor, fillColor) {
        this.clear();
        let alpha = 0.5;//1.0;//
        let useRadius = (isMobile) ? radius * 2.5 : radius;
        let insideRadius = useRadius * 0.55;
        let xOut = 0;//useRadius * 0.5;//
        let yOut = 0;//useRadius * 0.5;//
        this.beginFill(borderColor, alpha);
        this.drawCircle(xOut, yOut, useRadius);
        this.endFill();
        this.beginFill(fillColor, alpha);
        this.drawCircle(xOut, yOut, insideRadius);
        this.endFill();
    }

    __drawSelectedState() {
        super.__drawSelectedState();
        let radius = this.__options['corner-radius'];
        this.__drawCornerState(radius, 0x04A9F5, 0x049995);
    }
    __drawHoveredOnState() {
        super.__drawHoveredOnState();
        let radius = this.__options['corner-radius'] * 1.0;
        this.__drawCornerState(radius, 0x000000, 0x04A9F5);
    }
    __drawHoveredOffState() {
        super.__drawHoveredOffState();
        let radius = this.__options['corner-radius'];
        this.__drawCornerState(radius, 0xCCCCCC, 0x000000);
    }

    __updateWithModel() {
        let xx = Dimensioning.cmToPixel(this.__corner.location.x);
        let yy = Dimensioning.cmToPixel(this.__corner.location.y);
        this.position.x = xx;
        this.position.y = yy;
    }

    __dragStart(evt) {
        super.__dragStart(evt);
    }

    __dragMove(evt) {
        super.__dragMove(evt);
        if (this.__isDragging) {
            let co = evt.data.getLocalPosition(this.parent);
            let cmCo = new Point(co.x, co.y);

            cmCo.x = Dimensioning.pixelToCm(cmCo.x);
            cmCo.y = Dimensioning.pixelToCm(cmCo.y);

            if (Configuration.getValue(snapToGrid, 3) || this.__snapToGrid) {
                cmCo.x = Math.floor(cmCo.x / Configuration.getValue(snapTolerance, 2)) * Configuration.getValue(snapTolerance, 2);
                cmCo.y = Math.floor(cmCo.y / Configuration.getValue(snapTolerance, 2)) * Configuration.getValue(snapTolerance, 2);
            }

            if (Configuration.getValue(dragOnlyX, 3) && !Configuration.getValue(dragOnlyY, 3)) {
                cmCo.y = this.__corner.location.y;
            }

            if (!Configuration.getValue(dragOnlyX, 3) && Configuration.getValue(dragOnlyY, 3)) {
                cmCo.x = this.__corner.location.x;
            }
            if(this.__floorplan.boundary){
                if(!this.__floorplan.boundary.containsPoint(cmCo.x, cmCo.y)){
                    return;
                }
                if(this.__floorplan.boundary.intersectsExternalDesign(cmCo.x, cmCo.y)){
                    return;
                }
            }
            this.__corner.move(cmCo.x, cmCo.y);
        }
    }

    __dragEnd(evt) {
        super.__dragEnd(evt);
        this.__floorplan.update();
    }

    __cornerDeleted(evt) {
        this.remove();
        this.__corner = null;
    }

    __removeFromFloorplan() {
        this.__corner.remove();
    }

    remove() {
        this.__corner.removeEventListener(EVENT_DELETED, this.__cornerDeletedEvent);
        this.__corner.removeEventListener(EVENT_MOVED, this.__cornerUpdateEvent);
        super.remove();
    }

    get corner() {
        return this.__corner;
    }
}
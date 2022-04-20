import {EventDispatcher} from "three";
import {dimCentiMeter} from "./constants";
import {EVENT_CHANGED} from "./events";


/** The dimensioning unit for 2D floorplan measurements */
export const configDimUnit = "dimUnit"

// in cm
export const configWallHeight = "wallHeight"

// in cm
export const configWallThickness = "wallThickness"

// in cm
export const gridSpacing = "gridSpacing"

// in cm
export const snapTolerance = "snapTolerance"

export const scale = "scale"


export const snapToGrid = 'snapToGrid';

export const directionalDrag = 'directionalDrag';

export const dragOnlyX = 'dragOnlyX';

export const dragOnlyY = 'dragOnlyY';

export const boundsX = 'boundsX'; //In CMS

export const boundsY = 'boundsY'; //In CMS

export const viewBounds = 'viewBounds';//In CMS



// The tolerance in cm between corners,  < tolerance (dung sai) then snap together in one corner
export const cornerTolerance = 20


export const config = { dimUnit: dimCentiMeter, wallHeight: 250,
    wallThickness: 20, systemUI: false,
    scale: 1, snapToGrid: true,
    dragOnlyX: false, dragOnlyY: false,
    snapTolerance: 50, gridSpacing: 50,
    directionalDrag: true,
    boundsX: 500, boundsY: 500,
    viewBounds: 5000 };

export const wallInformation = {
    // define information of wall
}

export class Configuration extends EventDispatcher {
    constructor() {
        super();
    }

    static getInstance() {
        if (this.__instance === undefined) this.__instance = new Configuration()
        return this.__instance
    }

    static getData() {
        return config
    }

    static setValue(key, value) {
        config[key] = value
        Configuration.getInstance().dispatchEvent({
            type: EVENT_CHANGED,
            item: Configuration.getInstance(),
            'key': key,
            'value': value
        })
    }

    /**
     * @param type
     *  String: 1,
     *  Number: 2,
     *  Boolean: 3
     * */
    static getValue(key, type) {
        if (type === 1) {
            switch (key) {
                case configDimUnit:
                    return String(Configuration.getData()[key])
                default:
                    throw new Error(`Invalid key: ${key}`)
            }
        } else if (type === 2) {
            switch (key) {
                case configWallHeight:
                case configWallThickness:
                case scale:
                case snapTolerance:
                case gridSpacing:
                case viewBounds:
                case boundsX:
                case boundsY:
                    return Number(Configuration.getData()[key])
                default:
                    throw new Error(`Invalid key: ${key}`)
            }
        } else {
            switch (key) {
                case snapToGrid:
                case directionalDrag:
                case dragOnlyX:
                case dragOnlyY:
                    return Boolean(Configuration.getData()[key]);
                default:
                    throw new Error('Invalid Boolean configuration parameter: ' + key);
            }
        }
    }
}



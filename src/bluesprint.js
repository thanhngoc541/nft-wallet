import {configDimUnit, Configuration} from "./core/configuration";
import {dimCentiMeter} from "./core/constants";
import {Model} from "./model/model";
import {ConfigurationHelper} from "./helpers/ConfigurationHelper";
import {floorplannerModes, Viewer} from "./floorplanner";
import {FloorplannerHelper} from "./helpers/FloorplannerHelper";

class Bluesprint {
    /**
     * Creates an instance of BlueprintJS. This is the entry point for the application
     *
     * @param {Object} - options The initialization options.
     * @param {string} options.floorplannerElement - Id of the html element to use as canvas. Needs to exist in the html
     * @param {string} options.threeElement - Id of the html element to use as canvas. Needs to exist in the html and should be #idofhtmlelement
     * @param {string} options.threeCanvasElement - Id of the html element to use as threejs-canvas. This is created automatically
     * @param {string} options.textureDir - path to texture directory. No effect
     * @param {boolean} options.widget - If widget mode then disable the controller from interactions
     * @example
     * let blueprint3d = new BP3DJS.BlueprintJS(opts);
     */
    constructor(options) {
        Configuration.setValue(configDimUnit, dimCentiMeter)

        this.options = options
        this.model = new Model(options.textureDir);
        this.configurationHelper = new ConfigurationHelper();
        this.floorplanningHelper = null; // Note: ???
        if (!options.widget) {
            let viewerOptions = this.options.viewer2d.viewer2dOptions || {};
            viewerOptions.resize = this.options.resize ? true : false
            this.floorplanner = new Viewer(options.viewer2d.id, this.model.floorplan, viewerOptions)
            this.floorplanningHelper = new FloorplannerHelper(this.model.floorplan, this.floorplanner)
        }
        this.view_now = 2;
        this.switchView();
    }
    switchView () {
        if (this.options.widget) {
            return;
        }

        this.floorplanner.switchMode(floorplannerModes.MOVE);
        if (this.view_now === 3 && !this.options.widget) {
            this.view_now = 2;
            document.getElementById(this.options.viewer2d.id).style.visibility = "visible";
            // document.getElementById(this.options.viewer3d.id).style.visibility = "hidden";
            // this.roomplanner.enabled = false;
        } else if (this.view_now === 2 && !this.options.widget) {
            this.view_now = 3;
            document.getElementById(this.options.viewer2d.id).style.visibility = "visible";
            // document.getElementById(this.options.viewer3d.id).style.visibility = "visible";
            // this.roomplanner.enabled = true;
        }
    }
    setViewerModeToDraw(mode) {
        if (this.options.widget) {
            return;
        }
        this.floorplanner.switchMode(floorplannerModes.DRAW);
    }
    setViewerModeToMove(mode) {
        if (this.options.widget) {
            return;
        }
        this.floorplanner.switchMode(floorplannerModes.MOVE);
    }
    switchViewerToTransform(mode) {
        if (this.options.widget) {
            return;
        }
        this.floorplanner.switchMode(floorplannerModes.EDIT_ISLANDS);
    }
    get currentView() {
        return this.view_now; // Note: for view mode (2D or 3D)
    }
}
export { Bluesprint }
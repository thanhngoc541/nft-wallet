import CloseIcon from '@mui/icons-material/Close';
import WallModel from '../../models/wall.js';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
export default (props) => {
    let wall = new WallModel([0, 0, 0], [0, 0, 0], '#ffffff', null);

    const handleSummit = () => {
        console.log(wall);
        props.createWallHandle(wall);
        props.close();
    };

    const handleFileSelect = (evt) => {
        let files = evt.target.files;
        console.log("file", evt.target.files)
        if (!files.length) {
            alert('No file select');
            return;
        }
        let file = files[0];
        ;
        let that = this;
        let reader = new FileReader();
        reader.onload = function (e) {
            console.log(e.target.result);
        };
        reader.readAsText(file);
    };

    return (
        <form className="modal" action="index.html" method="post">
            <ArrowRightAltIcon fontSize="large" className="closeButton" onClick={props.close} />
            <h1>Wall Creator</h1>
            <fieldset>
                <legend>
                    <span className="number">1</span>Shape
                </legend>
                <label className="label3" htmlFor="X">
                    X:
                </label>
                <label className="label3" htmlFor="Y">
                    Y:
                </label>
                <label className="label3" htmlFor="Z">
                    Z:
                </label>
                <input
                    className="input3"
                    onChange={(e) => (wall.args[0] = e.target.value)}
                    defaultValue="0"
                    type="number"
                    step="0.1"
                    id="x"
                    name="x"
                />
                <input
                    className="input3"
                    onChange={(e) => (wall.args[1] = e.target.value)}
                    defaultValue="0"
                    type="number"
                    step="0.1"
                    id="Y"
                    name="Y"
                />
                <input
                    className="input3"
                    onChange={(e) => (wall.args[2] = e.target.value)}
                    defaultValue="0"
                    type="number"
                    step="0.1"
                    id="Z"
                    name="Z"
                />
            </fieldset>

            <fieldset>
                <legend>
                    <span className="number">2</span>Position
                </legend>
                <label className="label3" htmlFor="X">
                    X:
                </label>
                <label className="label3" htmlFor="Y">
                    Y:
                </label>
                <label className="label3" htmlFor="Z">
                    Z:
                </label>
                <input
                    className="input3"
                    onChange={(e) => (wall.position[0] = e.target.value)}
                    defaultValue="0"
                    type="number"
                    step="0.1"
                    id="x"
                    name="x"
                />
                <input
                    className="input3"
                    onChange={(e) => (wall.position[1] = e.target.value)}
                    defaultValue="0"
                    type="number"
                    step="0.1"
                    id="Y"
                    name="Y"
                />
                <input
                    className="input3"
                    onChange={(e) => (wall.position[2] = e.target.value)}
                    defaultValue="0"
                    type="number"
                    step="0.1"
                    id="Z"
                    name="Z"
                />
            </fieldset>

            <fieldset>
                <legend>
                    <span className="number">3</span>Appearance
                </legend>
                <label className="label3" htmlFor="color">
                    Color:
                </label>
                <input
                    type="color"
                    id="color"
                    name="color"
                    onChange={(e) => (wall.color = e.target.value)}
                    value={wall.color}
                />
                <br />
                <label className="label3" htmlFor="texture">
                    Upload Texture:
                </label>
                <input type="file" id="texture" onChange={handleFileSelect} name="texture" />
            </fieldset>
            <button style={{ marginTop: 20 }} type="button" onClick={handleSummit}>
                Create
            </button>
        </form>
    );
};

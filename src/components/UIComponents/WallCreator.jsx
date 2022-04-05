import CloseIcon from '@mui/icons-material/Close';
import WallModel from'../../models/wall.js';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
export default (props)=>{
  let wall = new WallModel([0,0,0],[0,0,0],'#ffffff',null);
  const handleSummit=()=>{
    console.log(wall);
    props.createWallHandle(wall);
    props.close();
  }
    return(
      <form  className="modal" action="index.html" method="post">
        <ArrowRightAltIcon fontSize="large" className="closeButton" onClick={props.close}/>
        <h1>Wall Creator</h1>
        <fieldset>
          <legend><span className="number">1</span>Shape</legend>
          <label className="label3" htmlFor="X">X:</label>
          <label className="label3" htmlFor="Y">Y:</label>
          <label className="label3" htmlFor="Z">Z:</label>
          <input className="input3" onChange={e=>wall.args[0]=e.target.value} defaultValue="0" type="number" step="0.1" id="x" name="x"/>
          <input className="input3" onChange={e=>wall.args[1]=e.target.value} defaultValue="0" type="number" step="0.1" id="Y" name="Y"/>
          <input className="input3" onChange={e=>wall.args[2]=e.target.value} defaultValue="0" type="number" step="0.1" id="Z" name="Z"/>
          {/* <label for="password">Password:</label>
          <input class="input3" type="password" id="password" name="user_password"/>

          <label>Age:</label>
          <input type="radio" id="under_13" value="under_13" name="user_age"/><label for="under_13" class="light">Under 13</label><br/>
          <input type="radio" id="over_13" value="over_13" name="user_age"/><label for="over_13" class="light">13 or older</label> */}
        </fieldset>

        <fieldset>
          <legend><span className="number">2</span>Position</legend>
          <label className="label3" htmlFor="X">X:</label>
          <label className="label3" htmlFor="Y">Y:</label>
          <label className="label3" htmlFor="Z">Z:</label>
          <input className="input3" onChange={e=>wall.pos[0]=e.target.value} defaultValue="0" type="number" step="0.1" id="x" name="x"/>
          <input className="input3" onChange={e=>wall.pos[1]=e.target.value} defaultValue="0" type="number" step="0.1" id="Y" name="Y"/>
          <input className="input3" onChange={e=>wall.pos[2]=e.target.value} defaultValue="0" type="number" step="0.1" id="Z" name="Z"/>
        </fieldset>

        <fieldset>
          <legend><span className="number">3</span>Appearance</legend>
            <label className="label3" htmlFor="color">Color:</label>
              <input type="color" id="color" name="color"
                    onChange={e=>wall.color=e.target.value}
                    value={wall.color}/>
            <br/>
            <label className="label3" htmlFor="texture">Upload Texture:</label>
            <input type="file" id="texture" name="texture"/>
        </fieldset>
        <button style={{marginTop: 20}} type="button" onClick={handleSummit}>Create</button>
      </form>
)
}
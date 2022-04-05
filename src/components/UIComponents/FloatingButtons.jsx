import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';
import ConstructionIcon from '@mui/icons-material/Construction';
import WallCreator from './WallCreator';
import AddModel from './AddModel';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

export default function FloatingActionButtons(props) {
    const [openWallCreator, setOpenWallCreator] = useState(false);
    const [ openAddModel,setOpenaddModel] = useState(false);
  return (
    <Box style={{position:'absolute' , bottom:'10px',right:'10px'}} sx={{ '& > :not(style)': { m: 1 } }}>
          <SwipeableDrawer
            anchor={"right"}
            open={openAddModel}
            onClose={()=>setOpenaddModel(false)}
            onOpen={()=>setOpenaddModel(true)}
          >
            <AddModel addModel={props.addModel} close={()=>setOpenaddModel(false)} ></AddModel>
          </SwipeableDrawer>
        <Fab color="secondary" aria-label="add furniture" onClick={() => setOpenaddModel(!openAddModel)}>
            <AddIcon />
        </Fab>
        <SwipeableDrawer
            anchor={"right"}
            open={openWallCreator}
            onClose={()=>setOpenWallCreator(false)}
            onOpen={()=>setOpenWallCreator(false)}
          >
            <WallCreator createWallHandle={props.createWallHandle} close={()=>{setOpenWallCreator(false);}} ></WallCreator>
          </SwipeableDrawer>
        <Fab color="primary" aria-label="add wall" onClick={() => setOpenWallCreator(!openWallCreator)}>
            <ConstructionIcon />
        </Fab>
    </Box>
  );
}
